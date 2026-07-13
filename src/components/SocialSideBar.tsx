'use client';

import { Github, Mail } from 'lucide-react';
import { FaLinkedinIn } from "react-icons/fa";
import { CiAt } from "react-icons/ci";
import './SocialSideBar.css';

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
    </div>
  );
}