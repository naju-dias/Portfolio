"use client";

import React, { useRef } from "react";
import { SparkEffect } from "./spark-effect";
import "./Footer.css";
import stickerLogo from "@/assets/stickerLogo.png";

import {
  Github,
  Linkedin,
  Mail,
} from "lucide-react";


export default function Footer() {
  return (
    <footer
      style={{
        position: "relative",
        width: "100%",
        minHeight: "250px",
        backgroundColor: "#1c1d24",
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
        <SparkEffect />
      </div>

    <div className="footer-container">

      <div className="footer-top">

      {/* LOGO */}
      <div className="footer-brand">
        <img
          src={stickerLogo.src}
          alt="Naju Dias"
          className="footer-brand__image"
        />

        <div className="footer-brand__text">
          <h3>NAJU <br />DIAS</h3>
        </div>
      </div>

      {/* SOCIAL BUTTONS */}
      <div className="footer-socials">
        <a
          href="https://www.linkedin.com/in/najudias"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-social-btn"
        >
          <Linkedin size={20} strokeWidth={1.8} />
          <span>LinkedIn</span>
        </a>

        <a
          href="mailto:anajuliaalvesd10@gmail.com"
          className="footer-social-btn"
        >
          <Mail size={20} strokeWidth={1.8} />
          <span>Email</span>
        </a>

        <a
          href="https://github.com/naju-dias"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-social-btn"
        >
          <Github size={20} strokeWidth={1.8} />
          <span>GitHub</span>
        </a>
      </div>
      </div>

      {/* CENTER LINE */}
      <div className="footer-divider" />

      <div className="footer-bottom">
      {/* COPYRIGHT */}
          <p className="footer-bottom__copy">
            © 2026 Ana Julia Dias
          </p>

          <p className="footer-bottom__made">
            Feito com <span className="footer-heart">♥ </span> e Next.js
          </p>

      </div>

    </div>
    </footer>
  );
}