import Noise from "../effects/Noise";
import { SparkEffect } from "../effects/spark-effect";
import LocalTime from '@/components/shared/LocalTime';
import TextScramble from "../shared/TextScramble";
import "./Hero.css";

export default function Hero({ children }: { children?: React.ReactNode }) {
  
  return (
    <section
      id="hero"
      className="relative w-full min-h-100svh p-3 sm:p-5 bg-[#1c1d24z]"
    >
      <div
        className="
        hero-inner 
        w-full 
        min-h-[calc(100svh-24px)]
        sm:min-h-[calc(100svh-40px)]
        rounded-2xl
        sm:rounded-3xl
        relative
        flex
        flex-col
        items-start
        justify-center
        px-4
        pt-16
        sm:px-24
        overflow-hidden"
        >
        <div className="absolute inset-0 z-0 pointer-events-none">
          <SparkEffect />
          <Noise patternAlpha={8} />
        </div>

        {/* Lanyard some no mobile */}
        <div className="hero-lanyard-slot">
          <div className="hero-lanyard-inner">
            {children}
          </div>
        </div>

        <div className="hero-content-wrap">
          <div className="hero-title-block">

            <span className="hero-label">
              <span className="hero-label-slash">
                {"//"}
              </span>{" "}
              Olá, eu sou a
            </span>

            <span className="hero-name">
              Ana Julia Dias
            </span>

            <span className="hero-role">
              Engenheira de Software
            </span>

            <span className="hero-desc">
              Uma estudante curiosa que projeta com intenção e clareza,
              transformo ideias complexas em experiências com propósito.
            </span>

          </div>
        </div>

        {/* CTAs + LocalTime */}
        <div className="hero-bottom-row">
          <div className="hero-ctas">
            <a href="#projects" className="hero-cta hero-cta--filled">
              <span className="bracket">[</span> <TextScramble text="Ver Projetos" duration={920} /> <span className="bracket">]</span>
            </a>
            <a href="#about" className="hero-cta hero-cta--ghost">
              <span className="bracket">[</span> <TextScramble text="Sobre mim" duration={920} /> <span className="bracket">]</span>
            </a>
          </div>

          <div className="hero-localtime-wrap">
            <LocalTime />
          </div>
        </div>

        {/* SCROLL */}
        <div className="hero-scroll-indicator">
          <svg width="26" height="42" viewBox="0 0 26 42" fill="none">
            <rect
              x="1"
              y="1"
              width="24"
              height="40"
              rx="12"
              stroke="#a9a9afa2"
              strokeWidth="1.5"
            />
            <circle
              cx="13"
              cy="13"
              r="3"
              fill="#e7e1d1"
              className="hero-scroll-dot"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}