"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import type { StaticImageData } from "next/image";
import "./ZenPolaroidStrip.css";

type Card = {
  image: string | StaticImageData;
  caption?: string;
};

interface ZenPolaroidStripProps {
  cards: Card[];
}

export default function ZenPolaroidStrip({
  cards,
}: ZenPolaroidStripProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeCardRef = useRef<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const positions = [
    { x: -250, y: 22, r: -14, z: 1 },
    { x: -125, y: 8,  r: -7,  z: 3 },
    { x: 0,    y: -8, r: 0,   z: 4 },
    { x: 125,  y: 8,  r: 7,   z: 5 },
    { x: 250,  y: 22, r: 14,  z: 4 },
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    const cardsEls =
      containerRef.current.querySelectorAll<HTMLElement>(".zen-polaroid");

    gsap.set(cardsEls, { opacity: 0, y: 120, scale: 0.9 });

    gsap.to(cardsEls, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.15,
      stagger: 0.08,
      ease: "power3.out",
    });

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const resetCards = () => {
    if (!containerRef.current) return;

    const cardsEls =
      containerRef.current.querySelectorAll<HTMLElement>(".zen-polaroid");

    cardsEls.forEach((card, i) => {
      gsap.to(card, {
        x: positions[i].x,
        y: positions[i].y,
        rotate: positions[i].r,
        scale: 1,
        duration: 0.55,
        ease: "power3.out",
        zIndex: positions[i].z,
      });
    });

    activeCardRef.current = null;
  };

  const animateCardFocus = (index: number) => {
    if (!containerRef.current) return;

    const cardsEls =
      containerRef.current.querySelectorAll<HTMLElement>(".zen-polaroid");

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    activeCardRef.current = index;

    cardsEls.forEach((card, i) => {
      if (i === index) {
        gsap.to(card, {
          x: positions[i].x,
          y: positions[i].y - 38,
          rotate: 0,
          scale: 1.06,
          duration: 0.45,
          ease: "power3.out",
          zIndex: 50,
        });
      } else {
        gsap.to(card, {
          x: positions[i].x + (i < index ? -28 : 28),
          y: positions[i].y,
          duration: 0.45,
          ease: "power3.out",
          zIndex: positions[i].z,
        });
      }
    });

    timeoutRef.current = setTimeout(() => {
      resetCards();
    }, 2200);
  };

  const handleHoverEnter = (index: number) => {
    if (activeCardRef.current !== null) return;

    const card = containerRef.current?.querySelector<HTMLElement>(
      `.zen-polaroid-${index}`
    );
    if (!card) return;

    gsap.to(card, { y: positions[index].y - 10, duration: 0.25, ease: "power2.out" });
  };

  const handleHoverLeave = (index: number) => {
    if (activeCardRef.current !== null) return;

    const card = containerRef.current?.querySelector<HTMLElement>(
      `.zen-polaroid-${index}`
    );
    if (!card) return;

    gsap.to(card, { y: positions[index].y, duration: 0.25, ease: "power2.out" });
  };

  const getSrc = (img: string | StaticImageData) =>
    typeof img === "string" ? img : img.src;

  return (
    <div className="zen-strip-wrapper" ref={containerRef}>
      {cards.map((card, i) => (
        <div
          key={i}
          className={`zen-polaroid zen-polaroid-${i}`}
          style={{
            transform: `translate(${positions[i].x}px, ${positions[i].y}px) rotate(${positions[i].r}deg)`,
            zIndex: positions[i].z,
          }}
          onMouseEnter={() => handleHoverEnter(i)}
          onMouseLeave={() => handleHoverLeave(i)}
          onClick={() => animateCardFocus(i)}
        >
          <div className="zen-polaroid-image">
            <img src={getSrc(card.image)} alt={card.caption || `polaroid-${i}`} />
          </div>

          <div className="zen-polaroid-caption">
            {card.caption}
          </div>
        </div>
      ))}
    </div>
  );
}