"use client";

import { useEffect, useRef, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { useProgress } from "@react-three/drei";

const BOOT_LINES = [
  { label: "CARTA CORINGA", status: "INVOCANDO", threshold: 25 },
  { label: "CENA 3D", status: "RENDERIZANDO", threshold: 50 },
  { label: "ATIVOS DO PORTFÓLIO", status: "CARREGANDO", threshold: 75 },
  { label: "SISTEMA", status: "PRONTO", threshold: 100 },
];

const STEP_MS = 550;
const LINE_REVEAL_MS = 640;
const READ_HOLD_MS = 700;

// Trava de segurança: força a exibição se o WebGL/Three.js travar no carregamento
const MAX_WAIT_MS = 8000;

const EASE = [0.76, 0, 0.24, 1] as const;

interface LoadingScreenProps {
  onComplete?: () => void;
}

function targetVisibleCount(progress: number, active: boolean) {
  let count = 0;
  for (const line of BOOT_LINES) {
    const reached =
      line.threshold === 100 ? progress >= 100 && !active : progress >= line.threshold;
    if (!reached) break;
    count++;
  }
  return count;
}

function useBootSequence(progress: number, active: boolean) {
  const [visible, setVisible] = useState(0);
  const target = targetVisibleCount(progress, active);

  useEffect(() => {
    if (visible >= target) return;
    const t = setTimeout(() => setVisible((v) => v + 1), visible === 0 ? 200 : STEP_MS);
    return () => clearTimeout(t);
  }, [visible, target]);

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible((v) => (v < BOOT_LINES.length ? BOOT_LINES.length : v));
    }, MAX_WAIT_MS);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return visible;
}

export default function LoadingScreen({ onComplete = () => {} }: LoadingScreenProps) {
  const { progress, active } = useProgress();

  const [exiting, setExiting] = useState(false);
  const [mounted, setMounted] = useState(true);
  const [displayProgress, setDisplayProgress] = useState(0);
  const lineChangeTime = useRef<number>(Date.now());

  const visibleLines = useBootSequence(progress, active);

  useEffect(() => {
    lineChangeTime.current = Date.now();
  }, [visibleLines]);

  useEffect(() => {
    if (exiting) {
      setDisplayProgress(100);
      return;
    }
    let raf: number;
    const loop = () => {
      const prevThreshold = visibleLines > 1 ? BOOT_LINES[visibleLines - 2].threshold : 0;
      const currThreshold = visibleLines > 0 ? BOOT_LINES[visibleLines - 1].threshold : 0;
      const t = Math.min(1, (Date.now() - lineChangeTime.current) / LINE_REVEAL_MS);
      const value = prevThreshold + (currThreshold - prevThreshold) * t;
      setDisplayProgress(Math.floor(value));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [visibleLines, exiting]);

  useEffect(() => {
    if (exiting) return;
    if (visibleLines < BOOT_LINES.length) return;
    const t = setTimeout(() => setExiting(true), LINE_REVEAL_MS + READ_HOLD_MS);
    return () => clearTimeout(t);
  }, [visibleLines, exiting]);

  useEffect(() => {
    if (!exiting) return;
    const t = setTimeout(() => {
      setMounted(false);
      onComplete();
    }, 1000);
    return () => clearTimeout(t);
  }, [exiting, onComplete]);

  if (!mounted) return null;

  const slideUp: Variants = {
    initial: { top: 0 },
    exit: { top: "-100vh", transition: { duration: 0.8, ease: EASE, delay: 0.2 } },
  };

  const lineVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.18 } },
  };
  
  const pieceVariants: Variants = {
    hidden: { opacity: 0, y: 4 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.28, ease: EASE } },
  };

  return (
    <motion.div
      variants={slideUp}
      initial="initial"
      animate={exiting ? "exit" : "initial"}
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        height: "100vh",
        zIndex: 9999,
        background: "#06060a",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "relative",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "clamp(28px, 6vw, 50px)",
          opacity: exiting ? 0 : 1,
          transition: "opacity 0.4s ease",
          padding: "0 24px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(6px, 1.6vw, 14px)",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontFamily: "Geist Mono, monospace",
              fontWeight: 500,
              fontSize: "clamp(16px, 2.4vw, 28px)",
              color: "#6f6c78",
            }}
          >
            +
          </span>

          <span
            style={{
              fontFamily: "Geist Mono, monospace",
              fontWeight: 400,
              fontSize: "clamp(24px, 5vw, 52px)",
              color: "#6f6c78",
              lineHeight: 0.9,
            }}
          >
            (
          </span>

          <h3
            style={{
              margin: 0,
              marginTop: "clamp(4px, 1vw, 7px)",
              fontFamily: "Tanker, serif",
              fontWeight: 400,
              fontSize: "clamp(22px, 5vw, 52px)",
              lineHeight: 0.9,
              color: "#6758bf",
              whiteSpace: "nowrap",
            }}
          >
            NAJU DIAS
          </h3>

          <span
            style={{
              fontFamily: "Geist Mono, monospace",
              fontWeight: 400,
              fontSize: "clamp(24px, 5vw, 52px)",
              color: "#6f6c78",
              lineHeight: 0.9,
            }}
          >
            )
          </span>

          <span
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontWeight: 500,
              fontSize: "clamp(13px, 1.6vw, 22px)",
              color: "#f7f7ff",
              marginLeft: "4px",
              minWidth: "3ch",
            }}
          >
            {displayProgress}%
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "clamp(6px, 1.4vw, 8px)",
            width: "min(360px, 100%)",
            marginTop: "8px",
          }}
        >
          {BOOT_LINES.map((line, i) => (
            <motion.div
              key={line.label}
              variants={lineVariants}
              initial="hidden"
              animate={i < visibleLines ? "visible" : "hidden"}
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "clamp(4px, 1.2vw, 8px)",
                fontFamily: "JetBrains Mono, monospace",
                fontSize: "clamp(10px, 3.2vw, 15px)",
                letterSpacing: "0.02em",
                textTransform: "uppercase",
              }}
            >
              <motion.span variants={pieceVariants} style={{ color: "#a9a9af", whiteSpace: "nowrap" }}>
                {line.label}
              </motion.span>
              <motion.span
                variants={pieceVariants}
                style={{
                  flex: 1,
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  letterSpacing: "1px",
                  color: "#a9a9af",
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: "clamp(10px, 3.2vw, 15px)",
                  transform: "translateY(-1px)",
                }}
              >
                {".".repeat(80)}
              </motion.span>
              <motion.span
                variants={pieceVariants}
                style={{ color: "#6758bf", fontWeight: 500, whiteSpace: "nowrap" }}
              >
                [{line.status}]
              </motion.span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}