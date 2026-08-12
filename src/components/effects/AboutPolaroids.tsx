"use client";

import { useEffect, useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";

import { useIsMobile } from "@/hooks/useIsMobile";

type Card = {
  image: string | StaticImageData;
  caption?: string;
  annotation?: string;
};

interface AboutPolaroidsProps {
  cards: Card[];
}

function PolaroidDuo({
  cards,
  visible,
}: {
  cards: Card[];
  visible: boolean;
}) {
  const [backFocused, setBackFocused] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  const handleBackClick = () => {
    if (backFocused) return;

    setBackFocused(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setBackFocused(false);
    }, 2400);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const backStyle: React.CSSProperties = backFocused
    ? {
        transform: "rotate(-2deg) translate(-30px, -60px)",
        zIndex: 10,
        boxShadow:
          "0 22px 48px rgba(0,0,0,0.22), 0 8px 18px rgba(0,0,0,0.12)",
      }
    : {
        transform: "rotate(-8deg) translateY(-20px)",
        zIndex: 2,
        boxShadow:
          "0 10px 28px rgba(0,0,0,0.16), 0 4px 10px rgba(0,0,0,0.08)",
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

        transform: visible
          ? "scale(1) translateY(0)"
          : "scale(0.92) translateY(40px)",

        transition:
          "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s",
      }}
    >
      {cards[0]?.annotation && (
        <div
          style={{
            position: "absolute",
            top: "0px",
            left: "-130px",

            fontFamily: "var(--font-caveat)",
            fontWeight: 500,
            fontSize: "1.3rem",

            color: "#4a3e72",
            lineHeight: 1.4,
            maxWidth: "240px",

            zIndex: 10,
            pointerEvents: "none",

            opacity: visible ? 1 : 0,

            transform: visible
              ? "rotate(0deg)"
              : "rotate(-10deg)",

            transition:
              "opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.25s, transform 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.25s",
          }}
        >
          {cards[0].annotation}

          <svg
            width="70"
            height="60"
            viewBox="-5 -5 70 60"
            style={{
              position: "relative",
              left: "78px",
              marginTop: "2px",
              overflow: "visible",
            }}
            aria-hidden="true"
          >
            <path
              d="M8 6 C 6 20, 19 20, 33.6 36"
              fill="none"
              stroke="#4a3e72"
              strokeWidth="2"
              strokeLinecap="round"
            />

            <path
              d="M22 36 L 36 38 L 35 24"
              fill="none"
              stroke="#4a3e72"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
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

          background:
            "linear-gradient(180deg, #dddadb 0%, #dddadb 50%, #5e50b1 100%)",

          borderRadius: "18px",
          padding: "8px 8px 44px 8px",

          cursor: backFocused ? "default" : "pointer",

          transformOrigin: "bottom center",

          transition:
            "transform 0.55s cubic-bezier(0.34,1.4,0.64,1), box-shadow 0.4s ease",

          ...backStyle,
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            borderRadius: "12px",
            overflow: "hidden",
            background: "#e7e7e7",
          }}
        >
          <Image
            src={cards[0].image}
            alt={cards[0].caption || "Polaroid"}
            fill
            sizes="200px"
            quality={90}
            style={{
              objectFit: "cover",
            }}
          />
        </div>

        {cards[0].caption && (
          <div
            style={{
              position: "absolute",
              bottom: "11px",
              left: 0,

              width: "100%",

              textAlign: "center",

              fontFamily: "var(--font-caveat)",
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

              fontFamily: "var(--font-geist-sans)",

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

          background:
            "linear-gradient(180deg, #dddadb 0%, #dddadb 50%, #5e50b1 100%)",

          borderRadius: "22px",
          padding: "10px 10px 52px 10px",

          boxShadow:
            "0 14px 34px rgba(0,0,0,0.18), 0 6px 14px rgba(0,0,0,0.1)",

          transformOrigin: "bottom center",

          transition:
            "transform 0.55s cubic-bezier(0.34,1.4,0.64,1)",

          cursor: "default",

          ...frontStyle,
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            borderRadius: "16px",
            overflow: "hidden",
            background: "#e7e7e7",
          }}
        >
          <Image
            src={cards[1].image}
            alt={cards[1].caption || "Polaroid"}
            fill
            sizes="270px"
            quality={90}
            style={{
              objectFit: "cover",
            }}
          />
        </div>

        {cards[1].caption && (
          <div
            style={{
              position: "absolute",
              bottom: "14px",
              left: 0,

              width: "100%",

              textAlign: "center",

              fontFamily: "var(--font-caveat)",
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

            fontFamily: "var(--font-caveat)",
            fontSize: "0.88rem",

            color: "#6b6377",

            lineHeight: 1.4,

            maxWidth: "110px",

            zIndex: 10,

            pointerEvents: "none",

            textAlign: "right",

            opacity: visible ? 1 : 0,

            transform: visible
              ? "rotate(0deg)"
              : "rotate(10deg)",

            transition:
              "opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.3s, transform 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.3s",
          }}
        >
          ↙
          <br />
          {cards[1].annotation}
        </div>
      )}
    </div>
  );
}

function PolaroidStackMobile({
  cards,
  visible,
}: {
  cards: Card[];
  visible: boolean;
}) {
  const [order, setOrder] = useState<number[]>(() =>
    cards.map((_, index) => index).reverse()
  );

  const cycle = () => {
    setOrder((previous) => {
      const [front, ...rest] = previous;

      return [...rest, front];
    });
  };

  const tiltPattern = [3, -8];

  return (
    <div
      className="pd-mobile-wrapper"
      style={{
        opacity: visible ? 1 : 0,

        transform: visible
          ? "translateY(0)"
          : "translateY(24px)",

        transition:
          "opacity 0.55s cubic-bezier(0.16, 1, 0.3, 1), transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <div className="pd-mobile-stack">
        {order.map((cardIndex, stackPos) => {
          const card = cards[cardIndex];

          const isFront = stackPos === 0;

          const tilt =
            tiltPattern[
              stackPos % tiltPattern.length
            ];

          return (
            <div
              key={cardIndex}
              className="pd-mobile-card"
              onClick={isFront ? cycle : undefined}
              style={{
                zIndex:
                  cards.length - stackPos,

                transform: `
                  translate(
                    ${stackPos * -7}px,
                    ${stackPos * -12}px
                  )
                  rotate(${tilt}deg)
                  scale(${1 - stackPos * 0.035})
                `,

                cursor: isFront
                  ? "pointer"
                  : "default",
              }}
            >
              <div
                className="pd-mobile-card-inner"
                style={{
                  position: "relative",
                }}
              >
                <Image
                  src={card.image}
                  alt={
                    card.caption ||
                    "Polaroid"
                  }
                  fill
                  sizes="(max-width: 480px) 208px, 240px"
                  quality={85}
                  draggable={false}
                  style={{
                    objectFit: "cover",
                  }}
                />
              </div>

              {card.caption && (
                <div className="pd-mobile-caption">
                  {card.caption}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function AboutPolaroids({
  cards,
}: AboutPolaroidsProps) {
  const wrapperRef =
    useRef<HTMLDivElement>(null);

  const [visible, setVisible] =
    useState(false);

  const isMobile = useIsMobile(1024);

  useEffect(() => {
    const element =
      wrapperRef.current;

    if (!element) return;

    const observer =
      new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) {
            return;
          }

          setVisible(true);

          observer.disconnect();
        },
        {
          threshold: 0.12,
        }
      );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="about-polaroid-col"
    >
      {isMobile === true && (
        <div className="pd-mobile-only">
          <PolaroidStackMobile
            visible={visible}
            cards={cards}
          />
        </div>
      )}

      {isMobile === false && (
        <div className="pd-desktop-only">
          <PolaroidDuo
            visible={visible}
            cards={cards}
          />
        </div>
      )}
    </div>
  );
}