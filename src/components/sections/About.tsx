import "./About.css";

import AboutPolaroids from "../effects/AboutPolaroids";
import Reveal from "../shared/Reveal";

import polaroid1 from "@/assets/polaroid1.jpeg";
import polaroid4 from "@/assets/polaroid4.jpeg";

export default function About() {
  const cards = [
    {
      image: polaroid1,
      caption: "Maggie ♡",
      annotation:
        "Meu refúgio de paz tem quatro patas e um coração gigante.",
    },
    {
      image: polaroid4,
    },
  ];

  return (
    <section
      id="about"
      data-nav-theme="light"
      className="about-section"
    >
      <div className="about-glow" />

      <div className="about-inner">
        <Reveal y={30} duration={0.5}>
          <h2 className="about-title">
            Sobre mim
          </h2>
        </Reveal>

        <div className="about-columns">
          <AboutPolaroids cards={cards} />

          <div className="about-text-col">
            <Reveal y={24} duration={0.45}>
              <p className="about-name">
                Olá! Sou a
                <b style={{ color: "#3a3a4a" }}>
                  {" "}
                  Ana Julia Dias {":)"}
                </b>
              </p>
            </Reveal>

            <Reveal
              y={24}
              duration={0.45}
              delay={0.05}
            >
              <p className="about-paragraph">
                Uma estudante de{" "}
                <strong>
                  Engenharia de Software
                </strong>{" "}
                apaixonada por combinar{" "}
                <strong>
                  criatividade com impacto
                </strong>{" "}
                no mundo real.
              </p>
            </Reveal>

            <Reveal
              y={24}
              duration={0.45}
              delay={0.1}
            >
              <p className="about-paragraph">
                Busco constantemente expandir e
                aprimorar meus conhecimentos nas
                diversas áreas da tecnologia,
                movida a cafeína, curiosidade e
                muitas abas abertas no navegador.
              </p>
            </Reveal>

            <Reveal
              y={24}
              duration={0.45}
              delay={0.15}
            >
              <p className="about-paragraph about-paragraph--last">
                Minha meta é levar o meu trabalho
                a{" "}
                <strong>
                  novos horizontes
                </strong>
                , sempre priorizando a qualidade
                e a experiência de quem usa o que
                eu crio.
              </p>
            </Reveal>

            <Reveal
              y={16}
              duration={0.4}
              delay={0.2}
            >
              <div className="dots-line" />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}