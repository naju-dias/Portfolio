import "./Skills.css";
import Reveal from "../shared/Reveal";
import { htmlIcon, cssIcon, tailwindIcon, javascriptIcon, typescriptIcon, reactIcon, pythonIcon, nextjsIcon, mysqlIcon, dockerIcon, gitIcon, githubIcon, jestIcon, figmaIcon, framerIcon, notionIcon, claudeIcon, fastapiIcon, postgresqlIcon, prismaIcon, vercelIcon } from "../../lib/icons";

type Skill = {
  name: string;
  icon: string;
  color: string;
};

const skills: Skill[] = [
  { name: "HTML", color: "#E34F26", icon: htmlIcon },
  { name: "CSS", color: "#1572B6", icon: cssIcon },
  { name: "Tailwind CSS", color: "#38bdf8", icon: tailwindIcon },
  { name: "JavaScript", color: "#d9c421", icon: javascriptIcon },
  { name: "TypeScript", color: "#3178C6", icon: typescriptIcon },
  { name: "React", color: "#61DAFB", icon: reactIcon },
  { name: "Python", color: "#3776AB", icon: pythonIcon },
  { name: "Next.js", color: "#24292e", icon: nextjsIcon },
  { name: "MySQL", color: "#4479A1", icon: mysqlIcon},
  { name: "PostgreSQL", color: "#336791", icon: postgresqlIcon },
  { name: "Docker", color: "#008fe2", icon: dockerIcon },
  { name: "Git", color: "#F05032", icon: gitIcon },
  { name: "GitHub",color: "#24292e", icon: githubIcon },
  { name: "Jest", color: "#99425b", icon: jestIcon },
  { name: "Figma", color: "#f4511e", icon: figmaIcon },
  { name: "Framer", color: "#24292e", icon: framerIcon },
  { name: "Notion", color: "#24292e", icon: notionIcon },
  { name: "Claude", color: "#d97757", icon: claudeIcon },
  { name: "FastAPI", color: "#009688", icon: fastapiIcon },
  { name: "Prisma", color: "#0C344B", icon: prismaIcon },
  { name: "Vercel", color: "#000000", icon: vercelIcon },
];

export default function Skills() {
  return (
    <section
      id="skills"
      data-nav-theme="light"
      className="skills-section"
    >
      <h2 className="skills-title">
        <Reveal y={20} duration={0.45}>
          <span className="skills-title-accent">
            Skills & Tools
          </span>
        </Reveal>
      </h2>

      <div className="skills-card">
        <Reveal y={18} duration={0.45}>
          <div className="skills-icons-grid">
            {skills.map((skill) => (
              <div
                key={skill.name}
                className="skill-chip"
                style={
                  {
                    "--skill-color": skill.color,
                  } as React.CSSProperties
                }
                aria-label={skill.name}
              >
                <span
                  className="skill-icon"
                  aria-hidden="true"
                  dangerouslySetInnerHTML={{
                    __html: skill.icon,
                  }}
                />

                <span className="skill-label">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}