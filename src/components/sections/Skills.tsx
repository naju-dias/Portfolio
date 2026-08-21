"use client";

import type { CSSProperties } from "react";
import { motion, type Variants } from "framer-motion";
import "./Skills.scss";
import Reveal from "../shared/Reveal";
import { SparkEffect } from "../effects/spark-effect";
import { MonitorIcon, DatabaseIcon, WrenchIcon, SwatchesIcon } from "@phosphor-icons/react";

import {htmlIcon, cssIcon, tailwindIcon, javascriptIcon, typescriptIcon, reactIcon, pythonIcon, nextjsIcon, mysqlIcon, dockerIcon, gitIcon, githubIcon, jestIcon, figmaIcon, framerIcon, notionIcon, claudeIcon, fastapiIcon, postgresqlIcon, prismaIcon, vercelIcon, scssIcon } from "../../lib/icons";

type Skill = {
  name: string;
  icon: string;
  color: string;
};

type SkillCategory = {
  label: string;
  icon: React.ReactNode;
  skills: Skill[];
};

const skillCategories: SkillCategory[] = [
  {
    label: "Frontend",
    icon: <MonitorIcon size={68} weight="regular" />,
    skills: [
      { name: "React", color: "#61DAFB", icon: reactIcon },
      { name: "Next.js", color: "#000000", icon: nextjsIcon },
      { name: "TypeScript", color: "#3178C6", icon: typescriptIcon },
      { name: "JavaScript", color: "#d9c421", icon: javascriptIcon },
      { name: "HTML", color: "#E34F26", icon: htmlIcon },
      { name: "CSS", color: "#1572B6", icon: cssIcon },
      { name: "SCSS", color: "#cf649a", icon: scssIcon },
      { name: "Tailwind CSS", color: "#38bdf8", icon: tailwindIcon },
    ],
  },
  {
    label: "Backend & Dados",
    icon: <DatabaseIcon size={68} weight="regular" />,
    skills: [
      { name: "Python", color: "#3776AB", icon: pythonIcon },
      { name: "FastAPI", color: "#009688", icon: fastapiIcon },
      { name: "MySQL", color: "#4479A1", icon: mysqlIcon },
      { name: "PostgreSQL", color: "#336791", icon: postgresqlIcon },
      { name: "Prisma", color: "#000000", icon: prismaIcon },
    ],
  },
  {
    label: "Tooling & DevOps",
    icon: <WrenchIcon size={68} weight="regular" />,
    skills: [
      { name: "Docker", color: "#008fe2", icon: dockerIcon },
      { name: "Git", color: "#F05032", icon: gitIcon },
      { name: "GitHub", color: "#000000", icon: githubIcon },
      { name: "Vercel", color: "#000000", icon: vercelIcon },
      { name: "Jest", color: "#99425b", icon: jestIcon },
    ],
  },
  {
    label: "Design & Workflow",
    icon: <SwatchesIcon size={48} weight="regular" />,
    skills: [
      { name: "Figma", color: "#f4511e", icon: figmaIcon },
      { name: "Framer", color: "#000000", icon: framerIcon },
      { name: "Notion", color: "#000000", icon: notionIcon },
      { name: "Claude", color: "#d97757", icon: claudeIcon },
    ],
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;

const chipContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.15 },
  },
};

const chipItemVariants: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.93, ease: EASE },
  },
};

export default function Skills() {
  return (
    <section id="skills" data-nav-theme="light" className="skills-section">

      <Reveal y={56} duration={1000}>
        <div className="skills-heading">
          <h2 className="skills-title">
            <Reveal variant="lines" duration={1000} stagger={75}>
              Skills & Tools
            </Reveal>
          </h2>
          <Reveal y={56} duration={1000} delay={150}>
            <p className="skills-subtitle">{'<'} As cartas que eu sei jogar {'>'}</p>
          </Reveal>
        </div>
      </Reveal>

      <div className="skills-categories">
        {skillCategories.map((category, idx) => (
          <Reveal y={40} duration={900} key={category.label} delay={idx * 120} threshold={0.05}>
            <div className="skills-category">

            {/* Header desktop */}
            <div className="skills-category-header skills-category-header--desktop">
              <span
                className="skills-category-icon"
                aria-hidden="true"
              >
                {category.icon}
              </span>

              <span className="skills-category-label">
                {category.label}
              </span>
            </div>

            <div className="skills-card">

              {/* Header mobile */}
              <div className="skills-category-header skills-category-header--mobile">
                <span
                  className="skills-category-icon"
                  aria-hidden="true"
                >
                  {category.icon}
                </span>

                <span className="skills-category-label">
                  {category.label}
                </span>
              </div>
                <div className="skills-card-spark" aria-hidden="true">
                  <SparkEffect fitContainer amount={25} maxopacity={0.60} speed={0.006} />
                </div>

                {/* Icons */}
                <motion.div
                  className="skills-icons-grid"
                  variants={chipContainerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {category.skills.map((skill) => (
                    <motion.div
                      key={skill.name}
                      className="skill-chip"
                      variants={chipItemVariants}
                      whileHover={{ y: -3, scale: 1.03 }}
                      transition={{ duration: 0.25, ease: EASE }}
                      style={{ "--skill-color": skill.color } as CSSProperties}
                      aria-label={skill.name}
                    >
                      <span
                        className="skill-icon"
                        aria-hidden="true"
                        dangerouslySetInnerHTML={{ __html: skill.icon }}
                      />
                      <span className="skill-label">{skill.name}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}