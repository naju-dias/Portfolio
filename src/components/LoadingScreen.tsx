"use client";

import { useEffect, useRef, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { useProgress } from "@react-three/drei";

const GREETINGS = ["Hello", "Bonjour", "Ciao", "Hola", "こんにちは", "Hallå", "Guten Tag", "Olá"];
const STATUS_WORDS = [
  "carregando ativos",
  "renderizando cena",
  "invocando a carta",
  "quase lá",
];
const SCRAMBLE_CHARS = "!<>-_\\/[]{}—=+*^?#________";

// Keeps the loader on screen for at least this long, even if assets
// resolve instantly (e.g. localhost, cached builds). Without this the
// screen can flash for ~100ms and feel like a glitch rather than a beat.
const MIN_DISPLAY_MS = 2400;

const EASE = [0.76, 0, 0.24, 1] as const;

interface LoadingScreenProps {
  onComplete?: () => void;
}

function useScramble(words: string[], active: boolean) {
  const [display, setDisplay] = useState(words[0]);
  const frame = useRef(0);
  const wordIndex = useRef(0);

  useEffect(() => {
    if (!active) return;

    let raf: number;
    let holdTimeout: ReturnType<typeof setTimeout>;
    let queue: { from: string; to: string; start: number; end: number; char: string }[] = [];

    const setupQueue = (from: string, to: string) => {
      const length = Math.max(from.length, to.length);
      queue = [];
      for (let i = 0; i < length; i++) {
        const start = Math.floor(Math.random() * 20);
        const end = start + Math.floor(Math.random() * 20);
        queue.push({ from: from[i] || "", to: to[i] || "", start, end, char: "" });
      }
    };

    const run = () => {
      let output = "";
      let complete = 0;
      for (let i = 0; i < queue.length; i++) {
        const item = queue[i];
        if (frame.current >= item.end) {
          complete++;
          output += item.to;
        } else if (frame.current >= item.start) {
          if (!item.char || Math.random() < 0.28) {
            item.char = SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          }
          output += item.char;
        } else {
          output += item.from;
        }
      }
      setDisplay(output);
      frame.current++;

      if (complete < queue.length) {
        raf = requestAnimationFrame(run);
      } else {
        holdTimeout = setTimeout(() => {
          const nextIndex = (wordIndex.current + 1) % words.length;
          setupQueue(words[wordIndex.current], words[nextIndex]);
          wordIndex.current = nextIndex;
          frame.current = 0;
          raf = requestAnimationFrame(run);
        }, 900);
      }
    };

    setupQueue("", words[0]);
    frame.current = 0;
    raf = requestAnimationFrame(run);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(holdTimeout);
    };
  }, [active, words]);

  return display;
}

export default function LoadingScreen({ onComplete = () => {} }: LoadingScreenProps) {
  // progress/active come from everything currently loading inside your <Canvas>
  // (lanyard model, textures, fonts) — no manual tracking needed.
  const { progress, active } = useProgress();

  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  const [greetIndex, setGreetIndex] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [mounted, setMounted] = useState(true);
  const startTime = useRef<number>(Date.now());

  const statusText = useScramble(STATUS_WORDS, !exiting);

  // Real viewport size — needed for the curve path, which is drawn in
  // actual pixels rather than a fixed 0-100 viewBox.
  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  // Advance through greetings: first one holds a beat, then it accelerates
  // and settles on the last word ("olá") — no looping.
  useEffect(() => {
    if (greetIndex >= GREETINGS.length - 1) return;
    const t = setTimeout(
      () => setGreetIndex((i) => i + 1),
      greetIndex === 0 ? 1000 : 150
    );
    return () => clearTimeout(t);
  }, [greetIndex]);

  // Trigger the exit once loading is truly done AND the minimum display
  // time has elapsed — whichever finishes last wins.
  useEffect(() => {
    if (active || progress < 100 || exiting) return;
    const elapsed = Date.now() - startTime.current;
    const wait = Math.max(MIN_DISPLAY_MS - elapsed, 0);
    const t = setTimeout(() => setExiting(true), wait);
    return () => clearTimeout(t);
  }, [active, progress, exiting]);

  // Unmount and hand off once the exit animation has fully played out
  // (curve settles at 0.3s delay + 0.7s duration = 1s; container slide
  // matches at 0.2s delay + 0.8s duration = 1s).
  useEffect(() => {
    if (!exiting) return;
    const t = setTimeout(() => {
      setMounted(false);
      onComplete();
    }, 1000);
    return () => clearTimeout(t);
  }, [exiting, onComplete]);

  if (!mounted || dimension.width === 0) return null;

  const displayProgress = Math.floor(progress);
  const { width, height } = dimension;

  // Resting state: curve bulges 300px below the viewport (invisible,
  // just sets up the shape). Exit state: curve flattens to the bottom edge.
  const initialPath = `M0 0 L${width} 0 L${width} ${height} Q${width / 2} ${height + 300} 0 ${height} L0 0`;
  const targetPath = `M0 0 L${width} 0 L${width} ${height} Q${width / 2} ${height} 0 ${height} L0 0`;

  const curve: Variants = {
    initial: { d: initialPath },
    exit: { d: targetPath, transition: { duration: 0.7, ease: EASE, delay: 0.3 } },
  };

  const slideUp: Variants = {
    initial: { top: 0 },
    exit: { top: "-100vh", transition: { duration: 0.8, ease: EASE, delay: 0.2 } },
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
      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <motion.path
          variants={curve}
          initial="initial"
          animate={exiting ? "exit" : "initial"}
          fill="#06060a"
        />
      </svg>

      <div
        style={{
          position: "relative",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
          opacity: exiting ? 0 : 1,
          transition: "opacity 0.4s ease",
          fontFamily: "var(--font-jetbrains-mono, monospace)",
        }}
      >
        <div
          style={{
            fontFamily: "Geist, sans-serif",
            fontWeight: 400,
            fontSize: "clamp(40px, 6vw, 64px)",
            color: "#d9d5c5",
            lineHeight: 1,
            minHeight: "1.2em",
            display: "flex",
            alignItems: "center",
          }}
        >
          {GREETINGS[greetIndex]}
        </div>

        <div
          style={{
            fontSize: "13px",
            letterSpacing: "0.01em",
            color: "#6f6c78",
            textTransform: "uppercase",
            fontFamily: "Geist Mono, monospace",
            fontWeight: 500,
          }}
        >
          [ {statusText} ... {displayProgress}% ]
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: "24px",
          height: "1px",
          background: "#26212f",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            background: "#d9d5c5",
            transition: "width 0.1s linear",
          }}
        />
      </div>
    </motion.div>
  );
}