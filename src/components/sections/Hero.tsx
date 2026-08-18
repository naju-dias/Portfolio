import { motion } from "framer-motion";
import Noise from "../effects/Noise";
import { SparkEffect } from "../effects/spark-effect";
import LocalTime from '@/components/shared/LocalTime';
import Reveal from "../shared/Reveal";
import TextScramble from "../shared/TextScramble";
import "./Hero.scss";

const EASE = [0.16, 1, 0.3, 1] as const;

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

        <div className="hero-lanyard-slot">
          <div className="hero-lanyard-inner">
            {children}
          </div>
        </div>

        <div className="hero-content-wrap">
          <div className="hero-title-block">

            <Reveal variant="soft" duration={500} y={16}>
              <span className="hero-label">
                <span className="hero-label-slash">{"//"}</span>{" "}
                Olá, eu sou a
              </span>
            </Reveal>

            <Reveal
              variant="lines"
              duration={650}
              stagger={70}
              delay={150}
              className="hero-name"
            >
              Ana Julia Dias
            </Reveal>

            <Reveal
              variant="lines"
              duration={650}
              stagger={70}
              delay={380}
              className="hero-role"
            >
              Engenheira de Software
            </Reveal>

            <Reveal
              variant="lines"
              duration={550}
              stagger={45}
              delay={650}
              className="hero-desc"
            >
              Uma estudante curiosa que projeta com intenção e clareza, transformo ideias complexas em experiências com propósito.
            </Reveal>

          </div>
        </div>

        <div className="hero-bottom-row">
          <div className="hero-ctas">
            <a href="#projects" className="hero-cta hero-cta--filled">
              <span className="bracket">[</span>{" "}
              <TextScramble text="Ver Projetos" duration={920} playOnView viewDelay={1100} />{" "}
              <span className="bracket">]</span>
            </a>
            <a href="#about" className="hero-cta hero-cta--ghost">
              <span className="bracket">[</span>{" "}
              <TextScramble text="Sobre mim" duration={920} playOnView viewDelay={1250} />{" "}
              <span className="bracket">]</span>
            </a>
          </div>

          <motion.div
            className="hero-localtime-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.3, ease: EASE }}
          >
            <LocalTime />
          </motion.div>
        </div>

        <motion.div
          className="hero-scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5, ease: EASE }}
        >
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
        </motion.div>
      </div>
    </section>
  );
}