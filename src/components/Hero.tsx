"use client";

import { useEffect, useRef } from "react";
import Noise from "./Noise";
import { SparkEffect } from "./spark-effect";
import SocialSideBar from '@/components/SocialSideBar';
import LocalTime from '@/components/LocalTime';

export default function Hero({ children }: { children?: React.ReactNode }) {
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(18px)";
    setTimeout(() => {
      el.style.transition =
        "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, 100);
  }, []);

  const h1Size = "clamp(2.8rem, 9vw, 6rem)";
  const h1Style: React.CSSProperties = {
    fontFamily: "'Geist', sans-serif",
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: h1Size,
    whiteSpace: "nowrap",
    margin: 0,
    color: "#e7e1d1",
    lineHeight: 1.1,
    letterSpacing: "0.03em",
    transform: "scaleY(1.08)",
    display: "block",
    zIndex: 1,
  };

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen p-3 sm:p-5 bg-[#06060a]"
    >
      <div
        className="w-full min-h-[calc(100vh-24px)] sm:min-h-[calc(100vh-40px)] rounded-2xl sm:rounded-3xl relative flex flex-col items-start justify-center px-4 sm:px-24 overflow-hidden"
        style={{ backgroundColor: "#0b0b11" }}
      >
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Noise patternAlpha={10} />
          <SparkEffect />
        </div>

        {children}

        <div
          className="hero-content"
          style={{
            textAlign: "left",
            maxWidth: "860px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "24px",
            marginLeft: "clamp(2rem, 5vw, 6rem)",
            position: "relative",
            zIndex: 10,
          }}
        >
          <div
            ref={titleRef}
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              width: "100%",
              gap: 0,
            }}
          >
            <span
              style={{
                fontFamily: "'Geist', sans-serif",
                fontSize: "clamp(0.85rem, 2vw, 1.5rem)",
                fontWeight: 500,
                color: "#dddadb",
                letterSpacing: "0.05em",
                lineHeight: 1.2,
                marginBottom: "0.7em",
              }}
            >
            <span style={{ color: "#97999d", fontFamily: "'JetBrains Mono', monospace", fontSize: "21px", fontWeight: 700 }}>{'//'}</span> Olá, eu sou a <b>Ana Julia Dias</b>
            </span>

            <h1 style={h1Style}>
              <span style={{ color: "#5e50b1" }}>E</span>ngenheira
            </h1>

            <h1 style={{ ...h1Style, marginTop: "0.15em" }}>
              de <span style={{ color: "#5e50b1" }}>S</span>oftware.
            </h1>

            <span
              style={{
                fontFamily: "'Geist', sans-serif",
                fontSize: "22px",
                fontWeight: 500,
                color: "#979799",
                letterSpacing: "0.04em",
                marginTop: "1em",
                zIndex: 1,
                display: "block",
                maxWidth: "1000px",
              }}
            >
              Uma estudante curiosa que projeta com intenção e clareza, transformo
              ideias complexas em experiências com propósito.
            </span>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1.4rem",
                marginTop: "2rem",
                flexWrap: "wrap",
              }}
            >
              <a href="#projects" className="hero-cta hero-cta--filled">
                <span className="bracket">[</span> Ver Projetos <span className="bracket">]</span>
              </a>
              <a href="#about" className="hero-cta hero-cta--ghost">
                <span className="bracket">[</span> Sobre mim <span className="bracket">]</span>
              </a>

              <div className="hero-cta-divider" />

              <SocialSideBar />
            </div>
          </div>
        </div>

         {/* HORA LOCAL */}
        <div
          style={{
            position: "absolute",
            bottom: "2.2rem",
            left: "clamp(6.5rem, 4vw, 7rem)",
            zIndex: 10,
          }}
        >
          <LocalTime />
        </div>

        {/* SCROLL */}
        <div
          style={{
            position: "absolute",
            bottom: "2.5rem",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1,
          }}
        >
          <svg width="26" height="42" viewBox="0 0 26 42" fill="none">
            <rect
              x="1"
              y="1"
              width="24"
              height="40"
              rx="12"
              stroke="rgba(231, 225, 209, 0.55)"
              strokeWidth="1.5"
            />
            <circle
              cx="13"
              cy="13"
              r="3"
              fill="#e7e1d1"
              style={{
                animation: "scrollDot 1.8s ease-in-out infinite",
              }}
            />
          </svg>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap');

        .hero-content {
          padding-left: clamp(2rem, 5vw, 6rem);
        }

        @keyframes scrollDot {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          60% {
            transform: translateY(14px);
            opacity: 0.3;
          }
          61% {
            transform: translateY(0);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
          
        .hero-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;

          padding: 0.75rem 1.4rem;
          border-radius: 6px; /* cantos quase retos, não mais pill */

          font-family: 'JetBrains Mono', monospace;
          font-size: 0.9rem;
          font-weight: 500;
          letter-spacing: 0.02em;

          text-decoration: none;
          cursor: pointer;

          transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), 
                      box-shadow 0.3s ease, 
                      border-color 0.3s ease,
                      color 0.3s ease;
        }

        .hero-cta-divider {
          width: 1px;
          height: 24px;
          background: rgba(217, 213, 197, 0.2);
        }

        .hero-cta .bracket {
          color: #5e50b1;
          font-weight: 700;
        }

        .hero-cta--filled {
          background: rgba(94, 80, 177, 0.12);
          color: #e7e1d1;
          border: 1px solid rgba(94, 80, 177, 0.4);
        }

        .hero-cta--filled:hover {
          border-color: rgba(94, 80, 177, 0.8);
          background: rgba(94, 80, 177, 0.2);
          transform: translateY(-2px);
        }

        .hero-cta--filled .bracket {
          color: #a78bfa;
        }

        .hero-cta--ghost {
          background: transparent;
          color: #979799;
          border: 1px solid rgba(217, 213, 197, 0.15);
        }

        .hero-cta--ghost:hover {
          border-color: rgba(217, 213, 197, 0.4);
          color: #e7e1d1;
          transform: translateY(-2px);
        }

        .hero-cta--ghost .bracket {
          color: #5e50b1;
        }

        .local-time {
          display: flex;
          flex-direction: column;
          gap: 1px;
          font-family: 'DM Sans', sans-serif;
        }

        .local-time__label {
          display: flex;
          align-items: center;
          gap: 6px;

          font-size: 16.5px;
          font-weight: 400;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #d9d5c5;
        }

        .local-time__icon {
          color: #a78bfa;
          margin-bottom: 2px;
        }

        .local-time__value {
          font-size: 16.5px;
          font-weight: 400;
          color: #d9d5c5;
          letter-spacing: 0.02em;
        }
      `}</style>
    </section>
  );
}