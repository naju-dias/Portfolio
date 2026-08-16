"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useRef, useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";

import { projects, type Project } from "@/data/projects";
import { useIsMobile } from "@/hooks/useIsMobile";

import "./Projects.css";

const MotionImage = motion.create(Image);
const ProjectModal = dynamic(() => import("./ProjectModal"), { ssr: false });

// preload do modal: dispara no hover/touch, antes do clique de fato
let modalPromise: Promise<unknown> | null = null;
function preloadProjectModal() {
  if (!modalPromise) modalPromise = import("./ProjectModal");
}

const desktopHeaderContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const desktopHeaderItemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const mobileHeaderContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const mobileHeaderItemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [activeCardId, setActiveCardId] = useState<string | number | null>(null);

  const isMobile = useIsMobile(768);
  const isDesktop = isMobile === false;

  const cursorRef = useRef<HTMLDivElement>(null);
  const cardRectRef = useRef<DOMRect | null>(null);
  const rafRef = useRef<number | null>(null);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>, projectId: string | number) => {
    if (!isDesktop) return;
    cardRectRef.current = e.currentTarget.getBoundingClientRect();
    setActiveCardId(projectId);
  };

  const handleMouseLeave = () => {
    if (!isDesktop) return;
    cardRectRef.current = null;
    setActiveCardId(null);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDesktop || !cursorRef.current || !cardRectRef.current) return;

    const rect = cardRectRef.current;
    const cursor = cursorRef.current;
    const cursorWidth = cursor.offsetWidth;
    const cursorHeight = cursor.offsetHeight;
    const rawX = e.clientX - rect.left;
    const rawY = e.clientY - rect.top;
    const padding = 12;

    const x = Math.min(Math.max(rawX, cursorWidth / 2 + padding), rect.width - cursorWidth / 2 - padding);
    const y = Math.min(Math.max(rawY, cursorHeight / 2 + padding), rect.height - cursorHeight / 2 - padding);

    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);

    rafRef.current = requestAnimationFrame(() => {
      if (!cursorRef.current) return;
      cursorRef.current.style.transform = `translate3d(${x - cursorWidth / 2}px, ${y - cursorHeight / 2}px, 0)`;
    });
  };

  const headerContainerVariants = isMobile === true ? mobileHeaderContainerVariants : desktopHeaderContainerVariants;
  const headerItemVariants = isMobile === true ? mobileHeaderItemVariants : desktopHeaderItemVariants;

  return (
    <>
      <section id="projects" className="proj-section">
        <motion.div
          className="proj-header"
          variants={headerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: isMobile ? "-20px" : "-100px" }}
        >
          <motion.h2 variants={headerItemVariants} className="proj-heading">
            Projetos <br /> Selecionados
          </motion.h2>

          <motion.p variants={headerItemVariants} className="proj-description">
            Criando experiências imersivas com foco em desempenho, qualidade de código e solução.
          </motion.p>
        </motion.div>

        <div className="proj-stack">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="proj-card-wrapper"
              initial={isMobile ? { opacity: 0, y: 16 } : { opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: isMobile ? 0.05 : 0.15 }}
              transition={
                isMobile
                  ? { duration: 0.3, ease: "easeOut" }
                  : { duration: 0.8, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }
              }
            >
              <div className="proj-card">
                <div className="proj-card-info">
                  <div className="proj-card-info-top">
                    <h3 className="proj-card-title">{project.title}</h3>
                    <p className="proj-card-type">{project.type}</p>
                    <p className="proj-card-desc">{project.description}</p>
                  </div>

                  <div className="proj-card-techs">
                    {project.techs.map((tech) => (
                      <div key={tech.name} className="proj-card-tech-pill" style={{ ["--tech-color" as any]: tech.color }}>
                        <span className="proj-card-tech-icon" aria-hidden="true" dangerouslySetInnerHTML={{ __html: tech.icon }} />
                        <span>{tech.name}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    className="proj-card-link"
                    onClick={() => setSelected(project)}
                    onMouseEnter={preloadProjectModal}
                    onTouchStart={preloadProjectModal}
                  >
                    Ver Projeto
                    <svg className="proj-link-arrow-icon" xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="#f7f7ff" viewBox="0 0 256 256" aria-hidden="true">
                      <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z" />
                    </svg>
                  </button>
                </div>

                <div
                  className="proj-card-image-wrap"
                  onClick={() => setSelected(project)}
                  onTouchStart={preloadProjectModal}
                  onMouseEnter={(e) => {
                    preloadProjectModal();
                    if (isDesktop) handleMouseEnter(e, project.id);
                  }}
                  onMouseLeave={isDesktop ? handleMouseLeave : undefined}
                  onMouseMove={isDesktop ? handleMouseMove : undefined}
                >
                  {isDesktop && (
                    <AnimatePresence>
                      {activeCardId === project.id && (
                        <motion.div
                          ref={cursorRef}
                          className="proj-custom-cursor"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.12 }}
                        >
                          <span className="proj-cursor-eyes">🔍</span>
                          <span className="proj-cursor-text">Ver mais</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}

                  <div className="proj-card-image-inner">
                    {isDesktop ? (
                      <MotionImage
                        src={project.image}
                        alt={project.title}
                        fill
                        quality={85}
                        sizes="(max-width: 1024px) 90vw, 62vw"
                        className="proj-card-image"
                        whileHover={{ scale: 1.035 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      />
                    ) : (
                      <Image src={project.image} alt={project.title} fill quality={85} sizes="92vw" className="proj-card-image" />
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </>
  );
}