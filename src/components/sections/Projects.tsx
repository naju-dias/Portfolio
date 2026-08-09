"use client";

import { useRef, useState } from "react";
import { projects, type Project } from "@/data/projects";
import "./Projects.css";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import Image from "next/image";
import ProjectModal from "./ProjectModal";

const headerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const headerItemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } },
};

const MotionImage = motion.create(Image);

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [activeCardId, setActiveCardId] = useState<string | number | null>(null);

  const cursorRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cursorRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cursorRef.current.style.left = `${x}px`;
    cursorRef.current.style.top = `${y}px`;
  };

  return (
    <>
      <section id="projects" className="proj-section">
        <motion.div
          className="proj-header"
          variants={headerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
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
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 1.2, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
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
                    <svg
                      className="proj-link-arrow-icon"
                      xmlns="http://www.w3.org/2000/svg"
                      width="21"
                      height="21"
                      fill="#f7f7ff"
                      viewBox="0 0 256 256"
                    >
                      <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"></path>
                    </svg>
                  </button>
                </div>

                <div
                  className="proj-card-image-wrap"
                  onClick={() => setSelected(project)}
                  onMouseEnter={() => setActiveCardId(project.id)}
                  onMouseLeave={() => setActiveCardId(null)}
                  onMouseMove={handleMouseMove}
                >
                  <AnimatePresence>
                    {activeCardId === project.id && (
                      <motion.div
                        ref={cursorRef}
                        className="proj-custom-cursor"
                        initial={{ opacity: 0, scale: 0.6 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.6 }}
                        transition={{ duration: 0.15 }}
                      >
                        <span className="proj-cursor-eyes">🔍</span>
                        <span className="proj-cursor-text">Ver mais</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="proj-card-image-inner">
                    <MotionImage
                      src={project.image}
                      alt={project.title}
                      fill
                      quality={95}
                      sizes="(max-width: 1024px) 90vw, 62vw"
                      className="proj-card-image"
                      whileHover={{ scale: 1.035 }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </>
  );
}