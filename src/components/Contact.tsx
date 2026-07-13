"use client";

import "./Contact.css";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

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
        {/* left */}
        <div className="contact-heading">
          <h2>
            Vamos fazer as coisas se
            <br />
            encaixarem
          </h2>
        </div>

        {/* right */}
        <div className="contact-form-wrapper">
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

          <div className="container-botao-direita">
            <Button
              className="btn-animado-conversar"
              onClick={handleSubmit}
              disabled={status === "loading"}
            >
              <span className="btn-texto">
                {status === "loading" ? "Enviando..." : "Enviar mensagem"}
              </span>
              <div className="btn-icone">
                <ArrowUpRight size={18} />
              </div>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}