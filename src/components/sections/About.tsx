"use client";

import { useEffect, useRef, useState } from "react";
import "./About.css";
import polaroid1 from "@/assets/polaroid1.jpeg";
import polaroid4 from "@/assets/polaroid4.jpeg";
import Image, { StaticImageData } from "next/image";

type Card = {
  image: string | StaticImageData;
  caption?: string;
  annotation?: string;
};

/* ─── Desktop ─── */
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
            top: "0px",
            left: "-130px",
            fontFamily: "'Caveat', cursive",
            fontWeight: 500,
            fontSize: "1.3rem",
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
          <svg width="70" height="60" viewBox="-5 -5 70 60" style={{ position: "relative", left: "78px", marginTop: "2px", overflow: "visible" }}><path d="M8 6 C 6 20, 19 20, 33.6 36" fill="none" stroke="#4a3e72" strokeWidth="2" strokeLinecap="round" /><path d="M22 36 L 36 38 L 35 24" fill="none" stroke="#4a3e72" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
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
        <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: "12px", overflow: "hidden", background: "#e7e7e7" }}>
          <Image
          src={cards[0].image}
          alt={cards[0].caption || "polaroid"}
          fill
          sizes="(max-width: 480px) 70vw, 320px"
          quality={95}
          style={{ objectFit: "cover" }}
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
        <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: "16px", overflow: "hidden", background: "#e7e7e7" }}>
          <Image
            src={cards[1].image}
            alt={cards[1].caption || "polaroid"}
            fill
            sizes="(max-width: 480px) 70vw, 320px"
            quality={95}
            style={{ objectFit: "cover" }}
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

/* ─── Mobile ─── */
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
              <div className="pd-mobile-card-inner" style={{ position: "relative" }}>
                <Image
                  src={card.image}
                  alt={card.caption || "polaroid"}
                  fill
                  sizes="(max-width: 480px) 60vw, 300px"
                  quality={90}
                  draggable={false}
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Seção Principal ──── */
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
    </section>
  );
}