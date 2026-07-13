"use client";

import { useEffect, useRef, useState } from "react";
import polaroid1 from "@/assets/polaroid1.jpeg";
import polaroid4 from "@/assets/polaroid4.jpeg";

type Card = {
  image: string | { src: string };
  caption?: string;
  annotation?: string;
};

const getSrc = (img: string | { src: string }) =>
  typeof img === "string" ? img : img.src;

function PolaroidDuo({ cards, visible }: { cards: Card[]; visible: boolean }) {
  const [backFocused, setBackFocused] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleBackClick = () => {
    if (backFocused) return;
    setBackFocused(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setBackFocused(false);
    }, 2400);
  };

  useEffect(() => () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }, []);

  const backStyle: React.CSSProperties = backFocused
    ? {
        transform: "rotate(-2deg) translate(-30px, -60px)",
        zIndex: 10,
        boxShadow: "0 22px 48px rgba(0,0,0,0.22), 0 8px 18px rgba(0,0,0,0.12)",
      }
    : {
        transform: "rotate(-8deg) translateY(-20px)",
        zIndex: 2,
        boxShadow: "0 10px 28px rgba(0,0,0,0.16), 0 4px 10px rgba(0,0,0,0.08)",
      };

  const frontStyle: React.CSSProperties = backFocused
    ? {
        transform: "rotate(10deg) translate(20px, 30px)",
        zIndex: 3,
      }
    : {
        transform: "rotate(6deg) translateY(0px)",
        zIndex: 3,
      };

  return (
    <div
      style={{
        position: "relative",
        width: "360px",
        height: "460px",
        flexShrink: 0,
        opacity: visible ? 1 : 0,
        transition: "opacity 1.2s cubic-bezier(0.16,1,0.3,1) 0.3s",
      }}
    >
      {cards[0]?.annotation && (
        <div
          style={{
            position: "absolute",
            top: "-5px",
            left: "-120px",
            fontFamily: "'Caveat', cursive",
            fontWeight: 500,
            fontSize: "1.25rem",
            color: "#615474",
            lineHeight: 1.4,
            maxWidth: "240px",
            zIndex: 10,
            pointerEvents: "none",
          }}
        >
          {cards[0].annotation}
          <div style={{ position: "relative", left: "80px", marginTop: "-5px", fontSize: "2.5rem", color: "#615474" }}>↘</div>
        </div>
      )}

      <div
        onClick={handleBackClick}
        style={{
          position: "absolute",
          bottom: "70px",
          left: "-40px",
          width: "200px",
          height: "248px",
          background: "linear-gradient(180deg, #dddadb 0%, #dddadb 50%, #5e50b1 100%)",
          borderRadius: "18px",
          padding: "8px 8px 44px 8px",
          cursor: backFocused ? "default" : "pointer",
          transformOrigin: "bottom center",
          transition: "transform 0.55s cubic-bezier(0.34,1.4,0.64,1), box-shadow 0.4s ease, z-index 0s",
          ...backStyle,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "12px",
            overflow: "hidden",
            background: "#e7e7e7",
          }}
        >
          <img
            src={getSrc(cards[0].image)}
            alt={cards[0].caption || "polaroid"}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>
        {cards[0].caption && (
          <div
            style={{
              position: "absolute",
              bottom: "11px",
              width: "100%",
              left: 0,
              textAlign: "center",
              fontFamily: "'Caveat', cursive",
              fontSize: "1.15rem",
              color: "#d9d5c5",
              userSelect: "none",
            }}
          >
            {cards[0].caption}
          </div>
        )}

        {!backFocused && (
          <div
            style={{
              position: "absolute",
              top: "8px",
              right: "8px",
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              background: "rgba(94,80,177,0.18)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "10px",
              color: "#5e50b1",
              fontFamily: "'Geist', sans-serif",
              pointerEvents: "none",
            }}
          >
            ↗
          </div>
        )}
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "70px",
          right: "0px",
          width: "270px",
          height: "360px",
          background: "linear-gradient(180deg, #dddadb 0%, #dddadb 50%, #5e50b1 100%)",
          borderRadius: "22px",
          padding: "10px 10px 52px 10px",
          boxShadow: "0 14px 34px rgba(0,0,0,0.18), 0 6px 14px rgba(0,0,0,0.1)",
          transformOrigin: "bottom center",
          transition: "transform 0.55s cubic-bezier(0.34,1.4,0.64,1)",
          cursor: "default",
          ...frontStyle,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "16px",
            overflow: "hidden",
            background: "#e7e7e7",
          }}
        >
          <img
            src={getSrc(cards[1].image)}
            alt={cards[1].caption || "polaroid"}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>
        {cards[1].caption && (
          <div
            style={{
              position: "absolute",
              bottom: "14px",
              width: "100%",
              left: 0,
              textAlign: "center",
              fontFamily: "'Caveat', cursive",
              fontSize: "1.3rem",
              color: "#d9d5c5",
              userSelect: "none",
            }}
          >
            {cards[1].caption}
          </div>
        )}
      </div>

      {cards[1]?.annotation && (
        <div
          style={{
            position: "absolute",
            bottom: "10px",
            right: "-24px",
            fontFamily: "'Caveat', cursive",
            fontSize: "0.88rem",
            color: "#6b6377",
            lineHeight: 1.4,
            maxWidth: "110px",
            zIndex: 10,
            pointerEvents: "none",
            textAlign: "right",
          }}
        >
          ↙<br />{cards[1].annotation}
        </div>
      )}
    </div>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const els = [titleRef.current, textRef.current];
    els.forEach((el) => {
      if (!el) return;
      el.style.opacity = "0";
      el.style.transform = "translateY(40px)";
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setVisible(true);
        els.forEach((el, i) => {
          if (!el) return;
          setTimeout(() => {
            el.style.transition =
              "opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1)";
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          }, i * 180);
        });
        observer.disconnect();
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      data-nav-theme="light"
      style={{
        position: "relative",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "5rem 2rem",
        overflow: "hidden",
        background: "transparent",
      }}
    >
      {/* Glow */}
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "30%",
          transform: "translateX(-50%)",
          width: "500px",
          height: "300px",
          background:
            "radial-gradient(circle, rgba(117,112,110,0.12), rgba(166,152,197,0.09) 55%)",
          filter: "blur(80px)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: "1100px",
        }}
      >
        {/* Title */}
        <h2
          ref={titleRef}
          style={{
            fontFamily: "'Tanker', serif",
            fontWeight: 400,
            fontSize: "clamp(3.5rem, 10vw, 6.5rem)",
            color: "#5e50b1",
            letterSpacing: "-0.04em",
            margin: "0 0 0.4em",
            marginTop: "clamp(2rem, 7vw, 5rem)",
            lineHeight: 0.92,
            textAlign: "center",
          }}
        >
          Sobre mim
        </h2>

        {/* Two-column layout */}
        <div
          ref={textRef}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(2rem, 6vw, 6rem)",
            flexWrap: "wrap",
            justifyContent: "center",
            marginTop: "clamp(2rem, 7vw, 6rem)",
          }}
        >
          {/* LEFT — Polaroids */}
          <PolaroidDuo
            visible={visible}
            cards={[
              {
                image: polaroid1,
                caption: "Maggie ♡",
                annotation: "Meu refúgio de paz tem quatro patas e um coração gigante.",
              },
              {
                image: polaroid4,
              },
            ]}
          />

          {/* RIGHT — Text */}
          <div
            style={{
              flex: "1 1 320px",
              maxWidth: "500px",
            }}
          >
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 700,
                fontSize: "clamp(1.6rem, 3.5vw, 2rem)",
                color: "#707070",
                margin: "0 0 1.4rem",
                lineHeight: 1.15,
              }}
            >
              Olá! Sou a
              <b style={{ color: "#3a3a4a" }}> Ana Julia Dias :) </b>
            </p>
            <p
              style={{
                fontFamily: "'Geist', sans-serif",
                fontWeight: 400,
                fontSize: "clamp(1rem, 1.8vw, 1.15rem)",
                color: "#3a3a4a",
                lineHeight: 1.9,
                margin: "0 0 1.4rem",
              }}
            >
              Uma estudante de <strong>Engenharia de Software</strong> apaixonada por combinar{" "}
              <strong>criatividade com impacto </strong>no mundo real.
            </p>
            
            <p
              style={{
                fontFamily: "'Geist', sans-serif",
                fontWeight: 400,
                fontSize: "clamp(1rem, 1.8vw, 1.15rem)",
                color: "#3a3a4a",
                lineHeight: 1.9,
                margin: "0 0 1.4rem",
              }}
            >
              Busco constantemente expandir e aprimorar meus conhecimentos nas diversas áreas da tecnologia, movida a cafeína, curiosidade e muitas abas abertas no navegador.
            </p>

            <p
              style={{
                fontFamily: "'Geist', sans-serif",
                fontWeight: 400,
                fontSize: "clamp(1rem, 1.8vw, 1.15rem)",
                color: "#3a3a4a",
                lineHeight: 1.9,
                margin: "0",
              }}
            >
              Minha meta é levar o meu trabalho a <strong>novos horizontes</strong>,
              sempre priorizando a qualidade e a experiência de quem usa o que eu crio.
            </p>

            {/* Decorative dots */}
            <div
              style={{
                marginTop: "2.5rem",
                display: "flex",
                gap: "4px",
              }}
            >
              {Array.from({ length: 61 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: "4px",
                    height: "4px",
                    borderRadius: "50%",
                    background: i % 3 === 0 ? "#5e50b1" : "#c8c4d9",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;500&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300..700;1,300..700&display=swap');

        @font-face {
          font-family: 'Tanker';
          src: url('/fonts2/Tanker-Regular.woff2') format('woff2');
          font-weight: 100 900;
          font-style: normal;
        }

        html, body { margin: 0; padding: 0; overflow-x: hidden; }
        * { box-sizing: border-box; }

        @media (max-width: 768px) {
          #about { padding: 3rem 1rem !important; }
        }
      `}</style>
    </section>
  );
}