"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import TextScramble from "./TextScramble";
import { useNavTheme } from "../hooks/useNavTheme";

const navItems = [
  { label: "Projetos", href: "#projects" },
  { label: "Sobre", href: "#about" },
  { label: "Skills", href: "#skills" },
];

export default function Navbar() {
  const [active, setActive] = useState("Início");
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
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

  return (
    <>
      <style>{`
        .navbar-wrapper {
          position: fixed;
          top: 2.1em;
          left: 0;
          right: 0;

          display: flex;
          align-items: center;
          justify-content: space-between;

          padding: 0 clamp(8rem, 4vw, 8rem);

          z-index: 1000;

          font-family: 'Geist Mono', monospace;

          transition: top 0.3s ease;
        }

        .navbar-wrapper.scrolled {
          top: 1rem;
        }

        .navbar-wrapper > * {
          pointer-events: auto;
        }

        .nav-logo {
          display: inline-block;
          font-size: 36px;
          letter-spacing: 0.02em;
          color: #a78bfa;
          text-decoration: none;
          font-family: 'Tanker', sans-serif;

          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), color 0.4s ease;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 2.2rem;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 0.3rem;

          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;

          color: #dddadb;
          text-decoration: none;

          transition: color 0.4s ease;
        }

        .nav-item .plus {
          display: inline-block;
          color: #a78bfa;
          font-weight: 400;
          transform-origin: center;

          transition: transform 0.6s ease;
        }

        .nav-item:hover .plus {
          transform: rotate(90deg);
        }

        .nav-item.active {
          color: #e7e1d1;
        }

        .nav-item.active .plus {
          transform: rotate(90deg);
        }

        .nav-contato {
          display: flex;
          align-items: center;
          gap: 0.35rem;

          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.05em;
          text-transform: uppercase;

          color: #dddadb;
          text-decoration: none;

          transition: color 0.4s ease;
        }

        .nav-contato .arrow-icon {
          display: inline-block;
          transform: rotate(-35deg);
          transition: transform 0.55s cubic-bezier(0.16, 1, 0.3, 1);
          color: #a78bfa;
        }

        .nav-contato:hover .arrow-icon {
          transform: rotate(0deg);
        }

        /* ---- TEMA CLARO (sobre fundo branco) ---- */
        .navbar-wrapper.theme-light .nav-item {
          color: #2a2a2a;
        }

        .navbar-wrapper.theme-light .nav-item.active {
          color: #2a2a2a;
        }

        .navbar-wrapper.theme-light .nav-contato {
          color: #2a2a2a;
        }

        .navbar-wrapper.theme-light .nav-contato:hover {
          color: #2a2a2a;
        }

        .nav-item.theme-light .plus {
          color: #5e50b1;
        }

        @media (max-width: 768px) {
          .nav-links {
            display: none;
          }
        }
      `}</style>

      <motion.nav
        className={`navbar-wrapper${scrolled ? " scrolled" : ""}${
          theme === "light" ? " theme-light" : ""
        }`}
        role="navigation"
        aria-label="Navegação principal"
        initial={false}
        animate={{
          y: visible ? 0 : "-130%",
          opacity: visible ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          mass: 0.8,
        }}
      >
        <a href="#hero" className="nav-logo" onClick={() => setActive("Início")}>
          AJ
        </a>

        <div className="nav-links">
          {navItems.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className={`nav-item${active === label ? " active" : ""}`}
              onClick={() => setActive(label)}
            >
              <span className="plus">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
              </span>
              <TextScramble text={label} duration={900} />
            </a>
          ))}
        </div>

        <a href="#contact" className="nav-contato" onClick={() => setActive("Contato")}>
          <TextScramble text="Contato" duration={900} />
          <span className="arrow-icon">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </span>
        </a>
      </motion.nav>
    </>
  );
}