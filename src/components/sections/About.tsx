import "./About.scss";

import AboutPolaroids from "../effects/AboutPolaroids";
import Reveal from "../shared/Reveal";
import TextScramble from "../shared/TextScramble";

import polaroid1 from "@/assets/polaroid1.jpeg";
import polaroid4 from "@/assets/polaroid4.jpeg";

export default function About() {
  const cards = [
    {
      image: polaroid1,
      caption: "Maggie ♡",
      annotation: "Meu refúgio de paz tem quatro patas e um coração gigante.",
    },
    { image: polaroid4 },
  ];

  return (
    <section id="about" data-nav-theme="light" className="about-section">
      <div className="about-glow" />

      <div className="about-inner">
        <h2 className="about-title">
          <Reveal variant="lines" duration={700} stagger={45}>
            Sobre mim
          </Reveal>
        </h2>

        <div className="about-columns">
          <AboutPolaroids cards={cards} />

          <Reveal y={18} duration={450} className="about-text-reveal">
            <div className="about-text-col">
              <p className="about-name">
                <TextScramble
                  text="Olá! Sou a"
                  duration={1500}
                  scrambleIntensity={50}
                  playOnView
                  viewDelay={250}
                />{" "}
                <TextScramble
                  text="Ana Julia Dias :)"
                  duration={1700}
                  scrambleIntensity={50}
                  playOnView
                  viewDelay={550}
                  className="about-name-highlight"
                />
              </p>

              <p className="about-paragraph">
                Uma estudante de <strong>Engenharia de Software</strong>{" "}
                apaixonada por combinar{" "}
                <strong>criatividade com impacto</strong> no mundo real.
              </p>

              <p className="about-paragraph">
                Busco constantemente expandir e aprimorar meus conhecimentos
                nas diversas áreas da tecnologia, movida a cafeína,
                curiosidade e muitas abas abertas no navegador.
              </p>

              <p className="about-paragraph about-paragraph--last">
                Minha meta é levar o meu trabalho a{" "}
                <strong>novos horizontes</strong>, sempre priorizando a
                qualidade e a experiência de quem usa o que eu crio.
              </p>

              <div className="dots-line" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}