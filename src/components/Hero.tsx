// components/Hero.tsx
"use client";

import { useEffect, useRef } from "react";

const ITEMS = [
  { delay: "0ms",   text: null, type: "dot" },
  { delay: "80ms",  text: null, type: "name" },
  { delay: "200ms", text: null, type: "role" },
];

export default function Hero() {
  const dotRef  = useRef<HTMLSpanElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const els = [
      { el: dotRef.current,  delay: 0   },
      { el: nameRef.current, delay: 100 },
      { el: roleRef.current, delay: 240 },
    ];

    els.forEach(({ el, delay }) => {
      if (!el) return;
      el.style.opacity = "0";
      el.style.transform = "translateY(18px)";
      setTimeout(() => {
        el.style.transition = "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)";
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, delay);
    });
  }, []);

  return (
    <section
      className="relative z-0 flex items-center justify-start"
      style={{
        width: "100%",
        minHeight: "100vh",
        padding: "0 5vw",
      }}
    >
      {/* Linha vertical decorativa */}
      <div
        style={{
          position: "absolute",
          left: "20vw",
          top: "50%",
          transform: "translateY(-50%)",
          width: "1px",
          height: "140px",
          background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.12), transparent)",
        }}
      />

      <div style={{ paddingLeft: "20%", display: "flex", flexDirection: "column", gap: "20px" }}>


        {/* Indicador de status */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span
            ref={dotRef}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: "'DM Mono', 'Fira Mono', monospace",
              fontSize: "0.7rem",
              letterSpacing: "0.14em",
              color: "rgba(134, 239, 172, 0.75)",
              textTransform: "uppercase",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#86efac",
                display: "inline-block",
                animation: "pulse 2.4s ease-in-out infinite",
              }}
            />
            open to work
          </span>
        </div>

        {/* Nome */}
        <h1
          ref={nameRef}
          style={{
            fontFamily: "'Halant', 'Georgia', serif",
            fontSize: "clamp(3.2rem, 5.5vw, 4rem)",
            fontWeight: 30,
            fontStyle: "",
            // lineHeight: .0,
            letterSpacing: "-0.02em",
            color: "#f5f0e8",
            margin: 0,
          }}
        >
          Olá! Eu sou a <strong>Ana Julia Dias</strong>
        </h1>

        {/* Cargo / tagline */}
        <p
          ref={roleRef}
          style={{
            fontFamily: "'DM Sans', serif",
            fontSize: "2.5rem",
            fontWeight: 900,
            letterSpacing: "0.1em",
            margin: 0,
            lineHeight: 1.2,

            background: "linear-gradient(to right, #3c7792, #6e98ac, blue, #6e98ac, #3c7792)",
            backgroundSize: "200%",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Engenheira de Software
        </p>

      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital@1&family=DM+Mono:wght@400;500&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Halant:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap');
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.35; }
        }
      `}</style>
    </section>
  );
}