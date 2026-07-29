"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TextScramble from "../shared/TextScramble";
import LocalTime from "../shared/LocalTime";
import { useNavTheme } from "../../hooks/useNavTheme";
import "./Navbar.css";

// Links exclusivos para o Overlay (menu aberto)
const overlayNavItems = [
  { label: "Início", href: "#hero" },
  { label: "Projetos", href: "#projects" },
  { label: "Sobre", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Contato", href: "#contact" },
];

// Links para a barra do Desktop (SEM o "Início", pois o logo AJ já faz esse papel)
const desktopNavItems = overlayNavItems.filter((item) => item.label !== "Início" && item.label !== "Contato");

export default function Navbar() {
  const [active, setActive] = useState("Início");
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const theme = useNavTheme(48);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const diff = currentY - lastScrollY.current;

      setScrolled(currentY > 20);

      if (Math.abs(diff) > 4) {
        if (currentY < 80) {
          setVisible(true);
        } else if (diff > 0) {
          setVisible(false);
        } else {
          setVisible(true);
        }
        lastScrollY.current = currentY;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleNavClick = (label: string) => {
    setActive(label);
    setMenuOpen(false); // Fecha o overlay

    if (label === "Início") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        className={`navbar-wrapper${scrolled ? " scrolled" : ""}${
          theme === "light" ? " theme-light" : ""
        }`}
        role="navigation"
        aria-label="Navegação principal"
        initial={false}
        animate={{
          y: visible || menuOpen ? 0 : "-130%",
          opacity: visible || menuOpen ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          mass: 0.8,
        }}
      >
        <a
          href="#hero"
          className="nav-logo"
          onClick={() => handleNavClick("Início")}
        >
          AJ
        </a>

        {/* --- DESKTOP NAV (Usa desktopNavItems: Projetos, Sobre, Skills) --- */}
        <div className="nav-links">
          {desktopNavItems.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className={`nav-item${active === label ? " active" : ""}`}
              onClick={() => setActive(label)}
            >
              <span className="plus">
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
              </span>
              <TextScramble text={label} duration={900} />
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="nav-contato"
          onClick={() => setActive("Contato")}
        >
          <TextScramble text="Contato" duration={900} />
          <span className="arrow-icon">
            <svg width="100%" height="100%" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M17,6H7C6.4,6,6,6.4,6,7s0.4,1,1,1h7.6l-8.3,8.3c-0.4,0.4-0.4,1,0,1.4c0.4,0.4,1,0.4,1.4,0L16,9.4V17c0,0.6,0.4,1,1,1s1-0.4,1-1V7C18,6.4,17.6,6,17,6z"/>
            </svg>
          </span>
        </a>

        <button
          type="button"
          className={`nav-burger${menuOpen ? " open" : ""}`}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="nav-burger-icon">
            <span />
            <span />
            <span />
          </span>
        </button>
      </motion.nav>

      {/* --- OVERLAY MENU (Usa overlayNavItems: Início, Projetos, Sobre, Skills, Contato) --- */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="nav-overlay"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="nav-overlay-content">
              <div className="nav-overlay-header">
                <span className="nav-overlay-title">NAVEGAÇÃO</span>
                <hr className="nav-divider" />
              </div>

              <div className="nav-overlay-links">
                {overlayNavItems.map(({ label, href }) => {
                  const isActive = active === label;
                  return (
                    <a
                      key={label}
                      href={href}
                      className={`nav-overlay-item ${isActive ? "active" : ""}`}
                      onClick={() => handleNavClick(label)}
                    >
                      <span>{label}</span>
                      {isActive && <span className="nav-active-dot" />}
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="nav-overlay-footer-container">
              <hr className="nav-divider" />
              <div className="nav-overlay-footer">
                <div className="footer-socials-wrapper">
                  <span className="footer-socials-title">REDES SOCIAIS</span>
                  <div className="footer-socials">
                    <a
                      href="https://www.linkedin.com/in/najudias"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="footer-social-btn"
                    >
                      <TextScramble text="LinkedIn" duration={800} />
                    </a>

                    <a
                      href="https://github.com/naju-dias"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="footer-social-btn"
                    >
                      <TextScramble text="GitHub" duration={800} />
                    </a>

                    <a
                      href="mailto:anajuliaalvesd10@gmail.com"
                      className="footer-social-btn"
                    >
                      <TextScramble text="Email" duration={800} />
                    </a>
                  </div>
                </div>

                <LocalTime />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}