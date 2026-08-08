"use client";

import "./Footer.css";
import stickerLogo from "@/assets/stickerLogo.png";
import Noise from "../effects/Noise";
import TextScramble from "../shared/TextScramble";

import LocalTime from "../shared/LolcalTime2";

const scrollToTop = () => {
  if (typeof window !== "undefined") {
    try {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      // Fallback para navegadores mobile legados
      window.scrollTo(0, 0);
    }
  }
};

export default function Footer() {
  return (
      <footer
        style={{
          position: "relative",
          width: "100%",
          minHeight: "250px",
          backgroundColor: "#0b0b11",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            pointerEvents: "none",
          }}
        >
          <Noise patternAlpha={10} />
        </div>

        <div className="footer-container">

        <div className="footer-top">

        {/* LOGO */}
        <div className="footer-brand">
          <img src={stickerLogo.src} alt="Naju Dias" className="footer-brand__image" />
          <div className="footer-brand__text">
            <h3>Naju Dias <br /></h3>
            <h4>Engenheira de Software</h4>
          </div>
        </div>

        {/* SOCIALS + LOCAL TIME */}
        <div className="footer-right-group">

          
        <div className="footer-socials-wrapper">
        <span className="footer-socials-title">REDES SOCIAIS</span>
        <div className="footer-socials">
          <a
            href="https://www.linkedin.com/in/najudias"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-btn linkedin"
          >
            <TextScramble text="LinkedIn" duration={800} />
          </a>

          <a
            href="https://github.com/naju-dias"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-btn github"
          >
            <TextScramble text="GitHub" duration={800} />
          </a>

          <a
            href="mailto:anajuliaalvesd10@gmail.com"
            className="footer-social-btn email"
          >
            <TextScramble text="Email" duration={800} />
          </a>
        </div>
      </div>

        <div className="footer-local-time">
          <span className="footer-socials-title">HORA LOCAL</span>
          <LocalTime />
        </div>

      </div>

      </div>

      {/* CENTER LINE */}
      <div className="footer-divider" />

      <div className="footer-bottom">
      {/* COPYRIGHT */}
          <p className="footer-bottom__copy">
            © 2026 Ana Julia Dias
          </p>

          <p className="footer-bottom__made">
            Feito com <span className="footer-heart">♥ </span> e Next.js
          </p>

      </div>
    </div>

    {/* BACK TO TOP */}
    <button
      onClick={scrollToTop}
      className="footer-back-to-top"
      aria-label="Voltar ao topo"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="m12 10.8l-3.9 3.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.6-4.6q.3-.3.7-.3t.7.3l4.6 4.6q.275.275.275.7t-.275.7t-.7.275t-.7-.275z"/></svg>
    </button>

    </footer>
  );
}