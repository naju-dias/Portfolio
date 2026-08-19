"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useRef, useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";

import { projects, type Project } from "@/data/projects";
import { useIsMobile } from "@/hooks/useIsMobile";

import "./Projects.scss";

const MotionImage = motion.create(Image);
const ProjectModal = dynamic(() => import("./ProjectModal"), { ssr: false });

let modalPromise: Promise<unknown> | null = null;
const preloadedImages = new Set<string>();

function preloadProjectModal(imageSrc?: string) {
  if (!modalPromise) modalPromise = import("./ProjectModal");
  if (imageSrc && !preloadedImages.has(imageSrc)) {
    preloadedImages.add(imageSrc);
    const img = new window.Image();
    img.src = imageSrc;
  }
}

const EASE = [0.16, 1, 0.3, 1] as const;

const desktopHeaderContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const desktopHeaderItemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

const mobileHeaderContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const mobileHeaderItemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

const imageMaskVariants: Variants = {
  hidden: { clipPath: "inset(9% 0% 9% 0%)" },
  visible: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 1.4, ease: EASE },
  },
};

const imageInnerVariants: Variants = {
  hidden: { scale: 1.08, filter: "blur(4px)" },
  visible: {
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 1.5, ease: EASE },
  },
};

const infoContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.35 },
  },
};

const infoItemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [activeCardId, setActiveCardId] = useState<string | number | null>(null);

  const isMobile = useIsMobile(768);
  const isDesktop = isMobile === false;

  const cursorRef = useRef<HTMLDivElement>(null);
  const cardRectRef = useRef<DOMRect | null>(null);
  const rafRef = useRef<number | null>(null);

  const positionCursor = (clientX: number, clientY: number, rect: DOMRect) => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const cursorWidth = cursor.offsetWidth;
    const cursorHeight = cursor.offsetHeight;
    const rawX = clientX - rect.left;
    const rawY = clientY - rect.top;
    const padding = 12;

    const x = Math.min(Math.max(rawX, cursorWidth / 2 + padding), rect.width - cursorWidth / 2 - padding);
    const y = Math.min(Math.max(rawY, cursorHeight / 2 + padding), rect.height - cursorHeight / 2 - padding);

    const roundedX = Math.round(x - cursorWidth / 2);
    const roundedY = Math.round(y - cursorHeight / 2);

    cursor.style.transform = `translate3d(${roundedX}px, ${roundedY}px, 0)`;
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>, projectId: string | number) => {
    if (!isDesktop) return;
    const rect = e.currentTarget.getBoundingClientRect();
    cardRectRef.current = rect;
    setActiveCardId(projectId);

    const clientX = e.clientX;
    const clientY = e.clientY;
    requestAnimationFrame(() => positionCursor(clientX, clientY, rect));
  };

  const handleMouseLeave = () => {
    if (!isDesktop) return;
    cardRectRef.current = null;
    setActiveCardId(null);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDesktop || !cursorRef.current || !cardRectRef.current) return;

    const clientX = e.clientX;
    const clientY = e.clientY;
    const rect = cardRectRef.current;

    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);

    rafRef.current = requestAnimationFrame(() => {
      positionCursor(clientX, clientY, rect);
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
              whileInView="visible"
              animate={undefined}
              viewport={{ once: true, amount: isMobile ? 0.05 : 0.15 }}
              variants={{
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: isMobile
                    ? { duration: 0.3, ease: "easeOut" }
                    : { duration: 1.1, delay: index * 0.12, ease: EASE },
                },
              }}
            >
              <div className="proj-card">
                <motion.div
                  className="proj-card-info"
                  variants={infoContainerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <div className="proj-card-info-top">
                    <motion.h3 variants={infoItemVariants} className="proj-card-title">
                      {project.title}
                    </motion.h3>
                    <motion.p variants={infoItemVariants} className="proj-card-type">
                      {project.type}
                    </motion.p>
                    <motion.p variants={infoItemVariants} className="proj-card-desc">
                      {project.description}
                    </motion.p>
                  </div>

                  <motion.div variants={infoItemVariants} className="proj-card-techs">
                    {project.techs.map((tech) => (
                      <div key={tech.name} className="proj-card-tech-pill" style={{ ["--tech-color" as any]: tech.color }}>
                        <span className="proj-card-tech-icon" aria-hidden="true" dangerouslySetInnerHTML={{ __html: tech.icon }} />
                        <span>{tech.name}</span>
                      </div>
                    ))}
                  </motion.div>

                  <motion.button
                    variants={infoItemVariants}
                    className="proj-card-link"
                    onClick={() => setSelected(project)}
                    onMouseEnter={preloadProjectModal.bind(null, project.image)}
                    onTouchStart={preloadProjectModal.bind(null, project.image)}
                  >
                    Ver Projeto
                    <svg className="proj-link-arrow-icon" xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="#f7f7ff" viewBox="0 0 256 256" aria-hidden="true">
                      <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z" />
                    </svg>
                  </motion.button>
                </motion.div>

                <div
                  className="proj-card-image-wrap"
                  onClick={() => setSelected(project)}
                  onTouchStart={preloadProjectModal.bind(null, project.image)}
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

                  <motion.div
                    className="proj-card-image-inner"
                    variants={imageMaskVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                  >
                    {isDesktop ? (
                      <motion.div variants={imageInnerVariants} style={{ width: "100%", height: "100%" }}>
                        <MotionImage
                          src={project.image}
                          alt={project.title}
                          fill
                          quality={85}
                          sizes="(max-width: 1024px) 90vw, 62vw"
                          className="proj-card-image"
                          whileHover={{ scale: 1.035 }}
                          transition={{ duration: 0.8, ease: EASE }}
                        />
                      </motion.div>
                    ) : (
                      <Image src={project.image} alt={project.title} fill quality={85} sizes="92vw" className="proj-card-image" />
                    )}
                  </motion.div>
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