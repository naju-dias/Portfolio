"use client";

import { useEffect, useRef } from "react";
import "./SectionBreak.css";

export default function SectionBreak() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    content.style.opacity = "0";
    content.style.transform = "translateY(48px)";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        content.style.transition =
          "opacity 1.1s cubic-bezier(0.16,1,0.3,1), transform 1.1s cubic-bezier(0.16,1,0.3,1)";
        content.style.opacity = "1";
        content.style.transform = "translateY(0)";
        observer.disconnect();
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="sb-section" style={{ position: "relative", overflow: "hidden" }}>
      <div ref={contentRef} className="sb-content">
        
        {/* Linha 1 */}
        <p className="sb-line sb-bold">Em algum lugar, algo incrível</p>
        
        {/* Linha 2 — Agora o itálico e o SVG estão envelopados juntos com o texto final */}
        <p className="sb-line sb-bold">
          está esperando para{" "}
          <span className="sb-italic-wrap">
            <span className="sb-italic">ser projetado.</span>
            
            {/* O SVG agora acompanha exatamente a largura do span acima */}
            <svg
              className="sb-underline"
              viewBox="0 0 900 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <path
                d="
                  M 8 42
                  C 120 30, 210 18, 320 12
                  C 390 8, 420 10, 435 20
                  C 450 30, 425 38, 350 36
                  C 500 30, 650 28, 892 28
                "
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="sb-path"
              />
            </svg>
          </span>
        </p>

      </div>
    </section>
  );
}