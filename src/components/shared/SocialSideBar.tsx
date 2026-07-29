'use client';

import { Github, Mail } from 'lucide-react';
import { FaLinkedinIn } from "react-icons/fa";
import { CiAt } from "react-icons/ci";

export default function SocialSideBar() {
  return (
    <div className="social-sidebar">
      <a
        href="https://linkedin.com/in/najudias"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        className="social-sidebar__icon"
      >
        <FaLinkedinIn size={22} strokeWidth={1.9} />
      </a>
      <a
        href="https://github.com/naju-dias"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
        className="social-sidebar__icon"
      >
        <Github size={22} strokeWidth={1.9} />
      </a>
      <a
        href="mailto:seuemail@email.com"
        aria-label="E-mail"
        className="social-sidebar__icon"
      >
        <CiAt size={22} strokeWidth={1.9} />
      </a>

      <style>{`
        .social-sidebar {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 1.4rem;
        }

        .social-sidebar__icon {
          color: #dddadb;
          opacity: 0.8;
          transition: color 0.25s ease, opacity 0.25s ease, transform 0.25s ease;
        }

        .social-sidebar__icon:hover {
          color: #a78bfa;
          opacity: 1;
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
}