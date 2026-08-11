"use client";

import { useState } from "react";
import "./Contact.css";
import TextScramble from "@/components/shared/TextScramble";
import Reveal from "@/components/shared/Reveal";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

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
      setForm({
        name: "",
        email: "",
        message: "",
      });
    } else {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="contact">
      <div className="contact-container">

        <Reveal y={24} duration={0.55}>
          <div className="contact-heading">
            <span className="contact-micro-label">
              <span className="contact-micro-slash">
                {"//"}
              </span>{" "}
              contato
            </span>

            <h2>
              Vamos fazer as coisas se encaixarem
            </h2>
          </div>
        </Reveal>

        <div className="contact-form-wrapper">

          <Reveal y={18} duration={0.4}>
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
          </Reveal>

          <Reveal y={18} duration={0.4}>
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
          </Reveal>

          <Reveal y={18} duration={0.4}>
            <div className="contact-field">
              <label>SUA MENSAGEM</label>

              <textarea
                name="message"
                placeholder="Olá Ana, você pode me ajudar com... *"
                value={form.message}
                onChange={handleChange}
              />
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

          <Reveal y={12} duration={0.35}>
            <div className="container-botao-direita">
              <button
                className="btn-enviar-scramble"
                onClick={handleSubmit}
                disabled={status === "loading"}
              >
                <span className="btn-text-underline">
                  <TextScramble
                    text={
                      status === "loading"
                        ? "ENVIANDO..."
                        : "ENVIAR MENSAGEM"
                    }
                    duration={900}
                  />
                </span>

                <span className="btn-arrow-icon">
                  {/* seu SVG */}
                </span>
              </button>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}