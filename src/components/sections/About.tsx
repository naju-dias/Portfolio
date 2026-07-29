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

/* ────────────────────────────────────────────────────────────────────────
   DESKTOP: composição diagonal original (intacta)
   ──────────────────────────────────────────────────────────────────────── */
function PolaroidDuo({ cards, visible }: { cards: Card[]; visible: boolean }) {
  const [backFocused, setBackFocused] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleBackClick = () => {
    if (backFocused) return;
    setBackFocused(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setBackFocused(false), 2400);
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
    ? { transform: "rotate(10deg) translate(20px, 30px)", zIndex: 3 }
    : { transform: "rotate(6deg) translateY(0px)", zIndex: 3 };

  return (
    <div
      style={{
        position: "relative",
        width: "360px",
        height: "460px",
        flexShrink: 0,
        opacity: visible ? 1 : 0,
        transform: visible ? "scale(1) translateY(0)" : "scale(0.92) translateY(40px)",
        transition: "opacity 1.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s, transform 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.1s",
        willChange: "transform, opacity",
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
            color: "#4a3e72",
            lineHeight: 1.4,
            maxWidth: "240px",
            zIndex: 10,
            pointerEvents: "none",
            opacity: visible ? 1 : 0,
            transform: visible ? "rotate(0deg)" : "rotate(-10deg)",
            transition: "opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.8s, transform 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.8s",
          }}
        >
          {cards[0].annotation}
          <div style={{ position: "relative", left: "80px", marginTop: "-5px", fontSize: "2.5rem", color: "#4a3e72" }}>↘</div>
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
        <div style={{ width: "100%", height: "100%", borderRadius: "12px", overflow: "hidden", background: "#e7e7e7" }}>
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
              color: "#dddadb",
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
        <div style={{ width: "100%", height: "100%", borderRadius: "16px", overflow: "hidden", background: "#e7e7e7" }}>
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
            opacity: visible ? 1 : 0,
            transform: visible ? "rotate(0deg)" : "rotate(10deg)",
            transition: "opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.9s, transform 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.9s",
          }}
        >
          ↙<br />{cards[1].annotation}
        </div>
      )}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────
   MOBILE: pilha de cartões do mesmo tamanho, estilo Zenwood — toque no
   card da frente manda ele pro fundo da pilha, revelando o de trás.
   ──────────────────────────────────────────────────────────────────────── */
function PolaroidStackMobile({ cards, visible }: { cards: Card[]; visible: boolean }) {
  const [order, setOrder] = useState<number[]>(() => cards.map((_, i) => i).reverse());

  const cycle = () => {
    setOrder((prev) => {
      const [front, ...rest] = prev;
      return [...rest, front];
    });
  };

  const tiltPattern = [3, -8];

  return (
    <div
      className="pd-mobile-wrapper"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: "opacity 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.1s, transform 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.1s",
      }}
    >
      <div className="pd-mobile-stack">
        {order.map((cardIndex, stackPos) => {
          const card = cards[cardIndex];
          const isFront = stackPos === 0;
          const tilt = tiltPattern[stackPos % tiltPattern.length];

          return (
            <div
              key={cardIndex}
              className="pd-mobile-card"
              onClick={isFront ? cycle : undefined}
              style={{
                zIndex: cards.length - stackPos,
                transform: `translate(${stackPos * -7}px, ${stackPos * -12}px) rotate(${tilt}deg) scale(${1 - stackPos * 0.035})`,
                cursor: isFront ? "pointer" : "default",
              }}
            >
              <div className="pd-mobile-card-inner">
                <img
                  src={getSrc(card.image)}
                  alt={card.caption || "polaroid"}
                  draggable={false}
                />
              </div>
              {card.caption && <div className="pd-mobile-caption">{card.caption}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────
   SEÇÃO PRINCIPAL
   ──────────────────────────────────────────────────────────────────────── */
export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
  const title = titleRef.current;
  const textParagraphs = textContainerRef.current
    ? Array.from(textContainerRef.current.querySelectorAll("p, .dots-line"))
    : [];

  const elementsToAnimate = [title, ...textParagraphs].filter(Boolean) as HTMLElement[];

  elementsToAnimate.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(50px)";
  });

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return;
      setVisible(true);

      elementsToAnimate.forEach((el, i) => {
        const delay = i * 220;
        setTimeout(() => {
          el.style.transition =
            "opacity 1.6s cubic-bezier(0.16, 1, 0.3, 1), transform 1.3s cubic-bezier(0.16, 1, 0.3, 1)";
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";

          // Devolve o elemento ao fluxo normal após a animação terminar,
          // eliminando a camada de composição que causava o blur do texto
          setTimeout(() => {
            el.style.transition = "";
            el.style.transform = "";
            el.style.willChange = "auto";
          }, 1300 + 50);
        }, delay);
      });

      observer.disconnect();
    },
    { threshold: 0.15 }
  );

  if (sectionRef.current) observer.observe(sectionRef.current);
  return () => observer.disconnect();
}, []);

  const cards: Card[] = [
    {
      image: polaroid1,
      caption: "Maggie ♡",
      annotation: "Meu refúgio de paz tem quatro patas e um coração gigante.",
    },
    { image: polaroid4 },
  ];

  return (
    <section ref={sectionRef} id="about" data-nav-theme="light" className="about-section">
      {/* Glow */}
      <div className="about-glow" />

      <div className="about-inner">
        <h2 ref={titleRef} className="about-title" style={{ willChange: "transform, opacity" }}>
          Sobre mim
        </h2>

        <div className="about-columns">
          {/* Polaroids — desktop */}
          <div className="pd-desktop-only about-polaroid-col">
            <PolaroidDuo visible={visible} cards={cards} />
          </div>

          {/* Polaroids — mobile */}
          <div className="pd-mobile-only about-polaroid-col">
            <PolaroidStackMobile visible={visible} cards={cards} />
          </div>

          {/* Texto */}
          <div ref={textContainerRef} className="about-text-col">
            <p className="about-name" style={{ willChange: "transform, opacity" }}>
              Olá! Sou a
              <b style={{ color: "#3a3a4a" }}> Ana Julia Dias {":)"} </b>
            </p>

            <p className="about-paragraph" style={{ willChange: "transform, opacity" }}>
              Uma estudante de <strong>Engenharia de Software</strong> apaixonada por combinar{" "}
              <strong>criatividade com impacto</strong> no mundo real.
            </p>

            <p className="about-paragraph" style={{ willChange: "transform, opacity" }}>
              Busco constantemente expandir e aprimorar meus conhecimentos nas diversas áreas da tecnologia, movida a cafeína, curiosidade e muitas abas abertas no navegador.
            </p>

            <p className="about-paragraph about-paragraph--last" style={{ willChange: "transform, opacity" }}>
              Minha meta é levar o meu trabalho a <strong>novos horizontes</strong>, sempre priorizando a qualidade e a experiência de quem usa o que eu crio.
            </p>

            <div className="dots-line" style={{ willChange: "transform, opacity" }} />
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

        html, body { 
          margin: 0; 
          padding: 0; 
          overflow-x: 
          hidden; 
        }

        #about * { 
          box-sizing: border-box;
          -webkit-font-smoothing: antialiased;
          text-rendering: optimizeLegibility;
        }

        #about.about-section {
          position: relative;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 5rem 2rem 5rem;
          overflow: hidden;
          background: transparent;
          --about-gap: clamp(6rem, 8vw, 12rem);
          --pd-col-margin: 3.5rem;
        }

        .about-glow {
          position: absolute;
          top: 40%;
          left: 30%;
          transform: translateX(-50%);
          width: 500px;
          height: 300px;
          background: radial-gradient(circle, rgba(117,112,110,0.12), rgba(166,152,197,0.09) 55%);
          filter: blur(80px);
          pointer-events: none;
          z-index: 1;
        }

        .about-inner {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 1100px;
        }

        .about-title {
          font-family: 'Tanker', serif;
          font-weight: 400;
          font-size: clamp(3.5rem, 10vw, 6.5rem);
          color: #5e50b1;
          margin: 0 0 0.4em;
          margin-top: clamp(2rem, 7vw, 5rem);
          line-height: 0.92;
          text-align: center;
        }

        .about-columns {
          display: flex;
          align-items: center;
          gap: var(--about-gap);
          flex-wrap: wrap;
          justify-content: center;
          margin-top: clamp(2rem, 7vw, 5rem);
        }

        .about-polaroid-col { margin-top: var(--pd-col-margin); }

        .pd-mobile-only { display: none; }

        .about-text-col {
          flex: 1 1 320px;
          max-width: 504px;
          padding-top: 1rem;
        }

        .about-name {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 700;
          font-size: clamp(1.6rem, 3.5vw, 2rem);
          color: #5e50b1;
          margin: 0 0 1.4rem;
          line-height: 1.15;
        }

        .about-paragraph {
          font-family: 'Geist', sans-serif;
          font-weight: 500;
          font-size: clamp(1rem, 1.8vw, 1.15rem);
          color: #2b2938;
          line-height: 1.9;
          margin: 0 0 1.4rem;
        }

        .about-paragraph--last { margin: 0; }

        /* ── Linha de pontos: gradiente em vez de 61 divs ── */
        .dots-line {
          margin-top: 2.5rem;
          width: 100%;
          height: 4px;
          background-image: repeating-linear-gradient(
            to right,
            #5e50b1 0px, #5e50b1 4px, transparent 4px 8px,
            #c8c4d9 8px, #c8c4d9 12px, transparent 12px 16px,
            #c8c4d9 16px, #c8c4d9 20px, transparent 20px 24px
          );
          background-repeat: repeat-x;
        }

        /* ── Pilha mobile ── */
        .pd-mobile-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .pd-mobile-stack {
          position: relative;
          width: 240px;
          height: 300px;
        }

        .pd-mobile-card {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, #dddadb 0%, #dddadb 50%, #5e50b1 100%);
          border-radius: 18px;
          padding: 10px 10px 40px 10px;
          box-shadow: 0 14px 34px rgba(0,0,0,0.18), 0 6px 14px rgba(0,0,0,0.1);
          transform-origin: center center;
          transition: transform 0.5s cubic-bezier(0.34, 1.3, 0.64, 1), box-shadow 0.3s ease;
        }

        .pd-mobile-card-inner {
          width: 100%;
          height: 100%;
          border-radius: 12px;
          overflow: hidden;
          background: #e7e7e7;
        }

        .pd-mobile-card-inner img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .pd-mobile-caption {
          position: absolute;
          bottom: 12px;
          left: 0;
          width: 100%;
          text-align: center;
          font-family: 'Caveat', cursive;
          font-size: 1.15rem;
          color: #f0eef5;
          user-select: none;
          pointer-events: none;
        }

        .pd-mobile-hint {
          font-family: 'Geist', sans-serif;
          font-size: 0.78rem;
          color: rgba(43, 41, 56, 0.5);
          letter-spacing: 0.02em;
        }

        /* ==========================================================
           RESPONSIVO
           ========================================================== */
        @media (max-width: 968px) {
          .about-columns {
            flex-direction: column;
          }
          .about-polaroid-col { margin-top: 1.5rem; }
        }

        @media (max-width: 768px) {
          #about.about-section {
            padding: 3.5rem 1.25rem 8rem;
            --about-gap: 2.5rem;
          }

          .pd-desktop-only { display: none; }
          .pd-mobile-only { display: flex; justify-content: center; }

          .about-name {
            font-size: 1.75rem;
          }

          .about-paragraph {
            font-size: 2rem;
            line-height: 1.75;
          }
        }

        @media (max-width: 480px) {
          #about.about-section {
            padding: 3rem 1rem 7rem;
          }

          .pd-mobile-stack {
            width: 208px;
            height: 262px;
          }

          .about-paragraph {
            font-size: 1rem;
          }
        }
      `}</style>
    </section>
  );
}