"use client";

import { useEffect, useRef, useState } from "react";
import { projects, type Project } from "@/data/projects";
import "./Projects.css";

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);

  // Estados do Custom Cursor
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [activeCardId, setActiveCardId] = useState<string | number | null>(null);

  const headerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  // Animação de entrada dos cards e cabeçalho
  useEffect(() => {
  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  const headerEl = headerRef.current;
  if (headerEl) {
    const elements = Array.from(headerEl.children) as HTMLElement[];
    elements.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(40px)";
    });

    const headerObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        elements.forEach((el, i) => {
          setTimeout(() => {
            el.style.transition =
              "opacity 1.6s cubic-bezier(0.16, 1, 0.3, 1), transform 1.6s cubic-bezier(0.16, 1, 0.3, 1)";
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          }, i * 180);
        });
        headerObserver.disconnect();
      },
      { threshold: 0.15 }
    );
    headerObserver.observe(headerEl);
  }

  const cardsContainer = cardsContainerRef.current;
  if (cardsContainer) {
    const cards = Array.from(
      cardsContainer.querySelectorAll(".proj-card-wrapper")
    ) as HTMLElement[];

    cards.forEach((card) => {
      card.style.opacity = "0";
      card.style.transform = isMobile
        ? "translateY(40px)"
        : "translateY(80px) scale(0.96) rotateX(2deg)";
      card.style.transition =
        "opacity 1.8s cubic-bezier(0.16, 1, 0.3, 1), transform 1.8s cubic-bezier(0.16, 1, 0.3, 1)";
      card.style.willChange = "transform, opacity";
    });

    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            target.style.opacity = "1";
            target.style.transform = isMobile
              ? "translateY(0)"
              : "translateY(0) scale(1) rotateX(0deg)";
            cardObserver.unobserve(target);
            // limpa will-change após a transição pra evitar blur residual
            setTimeout(() => {
              target.style.willChange = "auto";
            }, 1900);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -50px 0px" }
    );

    cards.forEach((card) => cardObserver.observe(card));

    return () => {
      cardObserver.disconnect();
    };
  }
}, []);

  // Handlers para o Custom Cursor
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
  const rect = e.currentTarget.getBoundingClientRect();
  setCursorPos({
    x: Math.round(e.clientX - rect.left),
    y: Math.round(e.clientY - rect.top),
  });
};

  return (
    <>
      <section id="projects" className="proj-section">
        <div ref={headerRef} className="proj-header">
          <h2 className="proj-heading">
            Projetos <br /> Selecionados
          </h2>
          <p className="proj-description">
            Criando experiências imersivas com foco em desempenho, qualidade de código e solução.
          </p>
        </div>

        <div ref={cardsContainerRef} className="proj-stack">
          {projects.map((project) => (
            <div key={project.id} className="proj-card-wrapper">
              <div className="proj-card">
                <div className="proj-card-info">
                  <div className="proj-card-info-top">
                    <h3 className="proj-card-title">{project.title}</h3>
                    <p className="proj-card-type">{project.type}</p>
                    <p className="proj-card-desc">{project.description}</p>
                  </div>

                  <div className="proj-card-techs">
                    {project.techs.map((tech) => (
                      <div
                        key={tech.name}
                        className="proj-card-tech-pill"
                        style={{ ["--tech-color" as any]: tech.color }}
                      >
                        <span
                          className="proj-card-tech-icon"
                          dangerouslySetInnerHTML={{ __html: tech.icon }}
                        />
                        <span>{tech.name}</span>
                      </div>
                    ))}
                  </div>

                  <button className="proj-card-link" onClick={() => setSelected(project)}>
                    Ver Projeto
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#f7f7ff" viewBox="0 0 256 256"><path d="M200,64V168a8,8,0,0,1-16,0V83.31L69.66,197.66a8,8,0,0,1-11.32-11.32L172.69,72H88a8,8,0,0,1,0-16H192A8,8,0,0,1,200,64Z"></path></svg>
                  </button>
                </div>

                {/* Imagem do Card com Custom Cursor seguidor */}
                <div
                  className="proj-card-image-wrap"
                  onClick={() => setSelected(project)}
                  onMouseEnter={() => setActiveCardId(project.id)}
                  onMouseLeave={() => setActiveCardId(null)}
                  onMouseMove={handleMouseMove}
                >
                  {/* Badge Personalizado "VIEW" */}
                  {activeCardId === project.id && (
                    <div
                      className="proj-custom-cursor"
                      style={{
                        left: `${cursorPos.x}px`,
                        top: `${cursorPos.y}px`,
                      }}
                    >
                      <span className="proj-cursor-eyes">🔍</span>
                      <span className="proj-cursor-text">Ver mais</span>
                    </div>
                  )}

                  <img
                    src={project.image}
                    alt={project.title}
                    className="proj-card-image"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        `https://placehold.co/900x560/1a1a1a/444444?text=${encodeURIComponent(project.title)}`;
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal */}
      {selected && (
        <div className="modal-backdrop" onClick={() => setSelected(null)}>
          <div className="modal" data-lenis-prevent onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelected(null)}>
              ✕
            </button>

            <div className="modal-header">
              <h2 className="modal-title">{selected.title}</h2>
              <p className="modal-type">{selected.type}</p>
            </div>

            <div className="modal-image-wrap">
              <img
                src={selected.image}
                alt={selected.title}
                className="modal-image"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    `https://placehold.co/800x440/1a1a1a/444444?text=${encodeURIComponent(selected.title)}`;
                }}
              />
            </div>

            <div className="modal-body">
              <p className="modal-desc">{selected.longDescription}</p>
              <div className="modal-actions">
                {selected.liveUrl && (
                  <a
                    href={selected.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="modal-btn-hard modal-btn-hard--primary"
                  >
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    Live Demo
                  </a>
                )}
                {selected.codeUrl && (
                  <a
                    href={selected.codeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="modal-btn-hard modal-btn-hard--secondary"
                  >
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                    Ver Código
                  </a>
                )}
              </div>
              <div className="modal-techs-wrap">
                <p className="modal-techs-label">FEITO COM</p>
                <div className="modal-techs">
                  {selected.techs.map((tech) => (
                    <div key={tech.name} className="modal-tech">
                      <span className="modal-tech-icon" dangerouslySetInnerHTML={{ __html: tech.modalIcon ?? tech.icon }} />
                      <span className="modal-tech-name">{tech.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}