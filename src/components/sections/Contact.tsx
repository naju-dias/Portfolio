"use client";

import { useEffect, useRef, useState } from "react";
import "./Contact.css";
import { Linkedin, Github, Mail, ArrowUpRight } from "lucide-react";
import TextScramble from "@/components/shared/TextScramble";


export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const headingRef = useRef<HTMLDivElement>(null);
  const formWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Revelação do título Sticky
    const heading = headingRef.current;
    if (heading) {
      heading.style.opacity = "0";
      heading.style.transform = "translateY(30px)";
      heading.style.transition = "opacity 1.4s cubic-bezier(0.16, 1, 0.3, 1), transform 1.4s cubic-bezier(0.16, 1, 0.3, 1)";
      heading.style.willChange = "transform, opacity";

      const headingObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            heading.style.opacity = "1";
            heading.style.transform = "translateY(0)";
            headingObserver.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      headingObserver.observe(heading);
    }

    // Surgimento cascata (stagger)
    const formWrapper = formWrapperRef.current;
    if (formWrapper) {
      const fields = Array.from(formWrapper.children) as HTMLElement[];
      fields.forEach((field) => {
        field.style.opacity = "0";
        field.style.transform = "translateY(25px)";
        field.style.transition = "opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)";
        field.style.willChange = "transform, opacity";
      });

      const formObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            fields.forEach((field, i) => {
              setTimeout(() => {
                field.style.opacity = "1";
                field.style.transform = "translateY(0)";
              }, i * 140);
            });
            formObserver.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      formObserver.observe(formWrapper);
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) return;

    setStatus("loading");

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } else {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="contact">
      <div className="contact-container">
        {/* Coluna título */}
        <div ref={headingRef} className="contact-heading">
          <span className="contact-micro-label">
            <span className="contact-micro-slash">{"//"}</span> contato
          </span>

          <h2>
            Vamos fazer as coisas se encaixarem
          </h2>
        </div>


        {/* Coluna formulário */}
        <div ref={formWrapperRef} className="contact-form-wrapper">
          <div className="contact-field">
            <label>NOME</label>
            <input
              type="text"
              name="name"
              placeholder="Seu nome *"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div className="contact-field">
            <label>EMAIL</label>
            <input
              type="email"
              name="email"
              placeholder="exemplo@email.com *"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="contact-field">
            <label>SUA MENSAGEM</label>
            <textarea
              name="message"
              placeholder="Olá Ana, você pode me ajudar com... *"
              value={form.message}
              onChange={handleChange}
            />
          </div>

          {status === "success" && (
            <p className="form-feedback success">
              Mensagem enviada! Entrarei em contato em breve. ✓
            </p>
          )}
          {status === "error" && (
            <p className="form-feedback error">
              Algo deu errado. Tenta de novo ou me manda e-mail direto.
            </p>
          )}

        {/* Botão formulário */}
         <div className="container-botao-direita">
          <button
            className="btn-enviar-scramble"
            onClick={handleSubmit}
            disabled={status === "loading"}
          >
            <span className="btn-text-underline">
              <TextScramble
                text={status === "loading" ? "ENVIANDO..." : "ENVIAR MENSAGEM"}
                duration={900}
              />
            </span>
            <span className="btn-arrow-icon">
              <svg fill="#6758bf" width="100%" height="100%" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24"><path d="M17,6H7C6.4,6,6,6.4,6,7s0.4,1,1,1h7.6l-8.3,8.3c-0.4,0.4-0.4,1,0,1.4c0.4,0.4,1,0.4,1.4,0L16,9.4V17c0,0.6,0.4,1,1,1s1-0.4,1-1V7C18,6.4,17.6,6,17,6z"/></svg>
            </span>
          </button>
        </div>
        </div>
      </div>
    </section>
  );
}