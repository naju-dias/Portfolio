"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useRef, useState } from "react";

import { projects, type Project } from "@/data/projects";
import { useIsMobile } from "@/hooks/useIsMobile";
import Reveal from "../shared/Reveal";

import "./Projects.css";

const ProjectModal = dynamic(() => import("./ProjectModal"), {
  ssr: false,
  loading: () => null,
});

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [activeCardId, setActiveCardId] = useState<string | number | null>(null);

  const isMobile = useIsMobile(768);
  const isDesktop = isMobile === false;

  const cursorRef = useRef<HTMLDivElement>(null);
  const cardRectRef = useRef<DOMRect | null>(null);
  const cursorSizeRef = useRef({ width: 0, height: 0 });
  const rafRef = useRef<number | null>(null);

  const handleMouseEnter = (
    e: React.MouseEvent<HTMLDivElement>,
    projectId: string | number
  ) => {
    if (!isDesktop) return;

    cardRectRef.current = e.currentTarget.getBoundingClientRect();
    setActiveCardId(projectId);

    requestAnimationFrame(() => {
      if (!cursorRef.current) return;

      cursorSizeRef.current = {
        width: cursorRef.current.offsetWidth,
        height: cursorRef.current.offsetHeight,
      };
    });
  };

  const handleMouseLeave = () => {
    if (!isDesktop) return;

    cardRectRef.current = null;
    setActiveCardId(null);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDesktop || !cursorRef.current || !cardRectRef.current) return;

    const rect = cardRectRef.current;
    const cursor = cursorSizeRef.current;

    const rawX = e.clientX - rect.left;
    const rawY = e.clientY - rect.top;
    const padding = 12;

    const x = Math.min(
      Math.max(rawX, cursor.width / 2 + padding),
      rect.width - cursor.width / 2 - padding
    );

    const y = Math.min(
      Math.max(rawY, cursor.height / 2 + padding),
      rect.height - cursor.height / 2 - padding
    );

    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      if (!cursorRef.current) return;

      cursorRef.current.style.transform =
        `translate3d(${x - cursor.width / 2}px, ${y - cursor.height / 2}px, 0)`;
    });
  };

  return (
    <>
      <section id="projects" className="proj-section">
        <div className="proj-header">
          <Reveal y={isMobile ? 12 : 24} duration={isMobile ? 300 : 450}>
            <h2 className="proj-heading">
              Projetos <br /> Selecionados
            </h2>
          </Reveal>

          <Reveal
            y={isMobile ? 10 : 20}
            duration={isMobile ? 300 : 450}
            delay={isMobile ? 40 : 80}
          >
            <p className="proj-description">
              Criando experiências imersivas com foco em desempenho,
              qualidade de código e solução.
            </p>
          </Reveal>
        </div>

        <div className="proj-stack">
          {projects.map((project, index) => (
            <Reveal
              key={project.id}
              y={isMobile ? 12 : 28}
              duration={isMobile ? 300 : 450}
              delay={isMobile ? 0 : index * 70}
              className="proj-card-reveal"
            >
              <div className="proj-card-wrapper">
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
                          style={
                            {
                              "--tech-color": tech.color,
                            } as React.CSSProperties
                          }
                        >
                          <span
                            className="proj-card-tech-icon"
                            aria-hidden="true"
                            dangerouslySetInnerHTML={{ __html: tech.icon }}
                          />

                          <span>{tech.name}</span>
                        </div>
                      ))}
                    </div>

                    <button
                      className="proj-card-link"
                      onClick={() => setSelected(project)}
                    >
                      Ver Projeto

                      <svg
                        className="proj-link-arrow-icon"
                        xmlns="http://www.w3.org/2000/svg"
                        width="21"
                        height="21"
                        fill="#f7f7ff"
                        viewBox="0 0 256 256"
                        aria-hidden="true"
                      >
                        <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z" />
                      </svg>
                    </button>
                  </div>

                  <div
                    className="proj-card-image-wrap"
                    onClick={() => setSelected(project)}
                    onMouseEnter={
                      isDesktop
                        ? (e) => handleMouseEnter(e, project.id)
                        : undefined
                    }
                    onMouseLeave={isDesktop ? handleMouseLeave : undefined}
                    onMouseMove={isDesktop ? handleMouseMove : undefined}
                  >
                    {isDesktop && activeCardId === project.id && (
                      <div
                        ref={cursorRef}
                        className="proj-custom-cursor proj-custom-cursor--visible"
                      >
                        <span className="proj-cursor-eyes">🔍</span>
                        <span className="proj-cursor-text">Ver mais</span>
                      </div>
                    )}

                    <div className="proj-card-image-inner">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        quality={85}
                        sizes="(max-width: 768px) 92vw, (max-width: 1024px) 90vw, 62vw"
                        className="proj-card-image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {selected && (
        <ProjectModal
          project={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  );
}