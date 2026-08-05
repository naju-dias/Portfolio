"use client";

import { useRef, useState } from "react";
import { projects, type Project } from "@/data/projects";
import "./Projects.css";
import { motion, AnimatePresence, type Variants } from "framer-motion";

const headerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const headerItemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } },
};

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

                  {/* Techs */}
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

                  {/* Botão do card */}
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

                {/* Imagem */}
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
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="proj-card-image"
                    whileHover={{ scale: 1.035 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        `https://placehold.co/900x560/1a1a1a/444444?text=${encodeURIComponent(project.title)}`;
                      }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="modal"
              data-lenis-prevent
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close" onClick={() => setSelected(null)}>✕</button>

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
                    <a href={selected.liveUrl} target="_blank" rel="noopener noreferrer" className="modal-btn-hard modal-btn-hard--primary">
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                      Live Demo
                    </a>
                  )}
                  {selected.codeUrl && (
                    <a href={selected.codeUrl} target="_blank" rel="noopener noreferrer" className="modal-btn-hard modal-btn-hard--secondary">
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
                      <motion.div key={tech.name} className="modal-tech" whileHover={{ scale: 1.12 }} transition={{ duration: 0.2 }}>
                        <span className="modal-tech-icon" dangerouslySetInnerHTML={{ __html: tech.modalIcon ?? tech.icon }} />
                        <span className="modal-tech-name">{tech.name}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}