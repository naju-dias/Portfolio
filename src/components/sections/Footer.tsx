import "./Footer.scss";
import stickerLogo from "@/assets/stickerLogo.png";
import Noise from "../effects/Noise";
import TextScramble from "../shared/TextScramble";
import Image from "next/image";
import BackToTopButton from "../ui/BackToTopButton";
import Reveal from "@/components/shared/Reveal";

import LocalTime from "../shared/LocalTime2";

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
            <Reveal
              y={22}
              duration={950}
              threshold={0.2}
            >
              <div className="footer-brand">
                <Image
                  src={stickerLogo}
                  alt="Naju Dias"
                  width={166}
                  height={166}
                  quality={90}
                  className="footer-brand__image"
                />

                <div className="footer-brand__text">
                  <h3>Naju Dias</h3>
                  <h4>Engenheira de Software</h4>
                </div>
              </div>
            </Reveal>

            <Reveal
              y={22}
              duration={950}
              delay={100}
              threshold={0.2}
            >
              <div className="footer-right-group">
                <div className="footer-socials-wrapper">
                  <span className="footer-socials-title">
                    REDES SOCIAIS
                  </span>
                  
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
                  <span className="footer-socials-title">
                    HORA LOCAL
                  </span>

                  <LocalTime />
                </div>
              </div>
            </Reveal>
          </div>

          <div className="footer-divider" />
          <div className="footer-bottom">
            <p className="footer-bottom__copy">
              © 2026 Ana Julia Dias
            </p>

            <p className="footer-bottom__made">
              Feito com <span className="footer-heart">♥</span> e Next.js
            </p>
        </div>
      </div>

    <BackToTopButton />

    </footer>
  );
}