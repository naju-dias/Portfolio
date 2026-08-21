"use client";

import { useState } from "react";
import "./Contact.scss";
import TextScramble from "@/components/shared/TextScramble";
import Reveal from "@/components/shared/Reveal";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) return;

    setStatus("loading");

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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

        <Reveal y={40} duration={1300} delay={200} threshold={0.4}>
          <div className="contact-heading">
            <span className="contact-micro-label">
              <span className="contact-micro-slash">{"//"}</span>{" "}
              contato
            </span>

            <h2>Vamos fazer as coisas se encaixarem</h2>
          </div>
        </Reveal>

        <div className="contact-form-wrapper">

          <Reveal y={40} duration={900} delay={350} threshold={0.4}>
            <div className="contact-fields-group">

              <div className="contact-field">
                <label>
                  <TextScramble
                    text="NOME"
                    duration={1500}
                    scrambleIntensity={60}
                    playOnView
                    viewDelay={250}
                    hoverEnabled={false}
                  />
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="Seu nome *"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>

              <div className="contact-field">
                <label>
                  <TextScramble
                    text="EMAIL"
                    duration={1500}
                    scrambleIntensity={60}
                    playOnView
                    viewDelay={280}
                    hoverEnabled={false}
                  />
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="exemplo@email.com *"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

              <div className="contact-field">
                <label>
                  <TextScramble
                    text="SUA MENSAGEM"
                    duration={1500}
                    scrambleIntensity={60}
                    playOnView
                    viewDelay={360}
                    hoverEnabled={false}
                  />
                </label>

                <textarea
                  name="message"
                  placeholder="Olá Ana, você pode me ajudar com... *"
                  value={form.message}
                  onChange={handleChange}
                />
              </div>

            </div>
          </Reveal>

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

          <Reveal y={28} duration={850} delay={400} threshold={0.02}>
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
          </Reveal>

        </div>
      </div>
    </section>
  );
}