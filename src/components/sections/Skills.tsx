import type { CSSProperties } from "react";
import "./Skills.css";
import Reveal from "../shared/Reveal";
import { SparkEffect } from "../effects/spark-effect";

import {htmlIcon, cssIcon, tailwindIcon, javascriptIcon, typescriptIcon, reactIcon, pythonIcon, nextjsIcon, mysqlIcon, dockerIcon, gitIcon, githubIcon, jestIcon, figmaIcon, framerIcon, notionIcon, claudeIcon, fastapiIcon, postgresqlIcon, prismaIcon, vercelIcon } from "../../lib/icons";

type Skill = {
  name: string;
  icon: string;
  color: string;
};

type SkillCategory = {
  label: string;
  icon: string;
  skills: Skill[];
};

const frontendCategoryIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M6 21v-2l1-1H4q-.825 0-1.412-.587T2 16V5q0-.825.588-1.412T4 3h16q.825 0 1.413.588T22 5v11q0 .825-.587 1.413T20 18h-3l1 1v2zm-2-5h16V5H4zm0 0V5z"/></svg>`;
const backendCategoryIcon = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="12" cy="5" rx="8" ry="3" stroke="currentColor" stroke-width="2"/><path d="M4 5V19C4 20.6569 7.58172 22 12 22C16.4183 22 20 20.6569 20 19V5" stroke="currentColor" stroke-width="2"/><path d="M4 12C4 13.6569 7.58172 15 12 15C16.4183 15 20 13.6569 20 12" stroke="currentColor" stroke-width="2"/></svg>`;
const toolingCategoryIcon = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const designCategoryIcon = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="13.5" cy="6.5" r="2.5" stroke="currentColor" stroke-width="2"/><circle cx="19" cy="12" r="2.5" stroke="currentColor" stroke-width="2"/><circle cx="6" cy="12" r="4" stroke="currentColor" stroke-width="2"/><circle cx="13.5" cy="17.5" r="2.5" stroke="currentColor" stroke-width="2"/></svg>`;

const skillCategories: SkillCategory[] = [
  {
    label: "Frontend",
    icon: frontendCategoryIcon,
    skills: [
      { name: "HTML", color: "#E34F26", icon: htmlIcon },
      { name: "CSS", color: "#1572B6", icon: cssIcon },
      { name: "Tailwind CSS", color: "#38bdf8", icon: tailwindIcon },
      { name: "JavaScript", color: "#d9c421", icon: javascriptIcon },
      { name: "TypeScript", color: "#3178C6", icon: typescriptIcon },
      { name: "React", color: "#61DAFB", icon: reactIcon },
      { name: "Next.js", color: "#000000", icon: nextjsIcon },
    ],
  },
  {
    label: "Backend & Dados",
    icon: backendCategoryIcon,
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
    icon: toolingCategoryIcon,
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
    icon: designCategoryIcon,
    skills: [
      { name: "Figma", color: "#f4511e", icon: figmaIcon },
      { name: "Framer", color: "#000000", icon: framerIcon },
      { name: "Notion", color: "#000000", icon: notionIcon },
      { name: "Claude", color: "#d97757", icon: claudeIcon },
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" data-nav-theme="light" className="skills-section">

      <Reveal y={40} duration={450}>
        <div className="skills-heading">
          <h2 className="skills-title">
            <span className="skills-title-accent">Skills & Tools</span>
          </h2>
          <Reveal y={40} duration={450} delay={150}>
          <p className="skills-subtitle">{'<'} As cartas que eu sei jogar {'>'}</p>
          </Reveal>
        </div>
      </Reveal>


      <div className="skills-categories">
        {skillCategories.map((category, idx) => (
          <Reveal y={30} duration={450} key={category.label} delay={idx * 80}>
            <div className="skills-category">
              <div className="skills-category-header">
                <span
                  className="skills-category-icon"
                  aria-hidden="true"
                  dangerouslySetInnerHTML={{ __html: category.icon }}
                />

                <span className="skills-bracket">[</span>
                <span className="skills-category-label">{category.label}</span>
                <span className="skills-bracket">]</span>

              </div>
 
              <div className="skills-card">
                <div className="skills-card-noise" aria-hidden="true">
                  <SparkEffect />
                </div>

                <div className="skills-icons-grid">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="skill-chip"
                      style={{ "--skill-color": skill.color } as CSSProperties}
                      aria-label={skill.name}
                    >
                      <span
                        className="skill-icon"
                        aria-hidden="true"
                        dangerouslySetInnerHTML={{ __html: skill.icon }}
                      />
                      <span className="skill-label">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}