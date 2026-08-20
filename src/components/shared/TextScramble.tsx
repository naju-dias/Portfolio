"use client";

import { useState, useEffect, useRef, startTransition } from "react";
import type { CSSProperties } from "react";
import { useInView } from "framer-motion";

interface TextScrambleProps {
  text: string;
  duration?: number;
  characters?: string;
  scrambleIntensity?: number;
  className?: string;
  style?: CSSProperties;
  playOnView?: boolean;
  viewDelay?: number;
  hoverEnabled?: boolean; // NOVO
}

export default function TextScramble({
  text,
  duration = 500,
  characters = "!@#$%^&*()_+-=[]{}|;:,.<>?",
  scrambleIntensity = 100,
  className,
  style,
  playOnView = false,
  viewDelay = 0,
  hoverEnabled = true,
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(
    playOnView ? "" : text
  );
  const [isHovering, setIsHovering] = useState(false);
  const [viewTriggered, setViewTriggered] = useState(false);
  const hasPlayedOnViewRef = useRef(false);

  const frameRef = useRef<number>(0);
  const startTimeRef = useRef(0);
  const measureRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLSpanElement>(null);
  const [lockedWidth, setLockedWidth] = useState<number | undefined>(undefined);

  const isInView = useInView(containerRef, { once: true, amount: 0.4 });

  useEffect(() => {
    if (measureRef.current) {
      const width = measureRef.current.offsetWidth;
      startTransition(() => setLockedWidth(width));
    }
  }, [text, className]);

  useEffect(() => {
    if (!playOnView || hasPlayedOnViewRef.current || !isInView) return;

    const timeout = setTimeout(() => {
      hasPlayedOnViewRef.current = true;
      setViewTriggered(true);
    }, viewDelay);

    return () => clearTimeout(timeout);
  }, [playOnView, isInView, viewDelay]);

  const active = isHovering || viewTriggered;

  useEffect(() => {
      if (!active) {
        if (!playOnView || hasPlayedOnViewRef.current) {
          startTransition(() => setDisplayText(text));
        }
        return;
      }

      startTimeRef.current = Date.now();
      let lastFrameTime = 0;

      const animate = () => {
      const now = Date.now();
      const elapsed = now - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      if (progress >= 1) {
        startTransition(() => setDisplayText(text));
        if (viewTriggered) setViewTriggered(false);
        return;
      }

      if (now - lastFrameTime < 50) {
        frameRef.current = requestAnimationFrame(animate);
        return;
      }
      lastFrameTime = now;

      const easeProgress = 1 - Math.pow(1 - progress, 3);

      const scrambled = text
        .split("")
        .map((char, index) => {
          if (char === " ") return " ";
          const shouldScramble = Math.random() * 100 < scrambleIntensity;
          if (shouldScramble && Math.random() > easeProgress) {
            return characters[Math.floor(Math.random() * characters.length)];
          }
          return text[index];
        })
        .join("");

      startTransition(() => setDisplayText(scrambled));
      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [active, text, duration, characters, scrambleIntensity]);

  return (
    <span
      ref={containerRef}
      className={className}
      style={{
        ...style,
        display: "inline-block",
        width: lockedWidth ? `${lockedWidth}px` : undefined,
        overflow: "hidden",
        whiteSpace: "nowrap",
      }}
      onMouseEnter={hoverEnabled ? () => setIsHovering(true) : undefined}
      onMouseLeave={hoverEnabled ? () => setIsHovering(false) : undefined}
    >
      <span
        ref={measureRef}
        style={{ position: "absolute", visibility: "hidden", whiteSpace: "nowrap" }}
        aria-hidden="true"
      >
        {text}
      </span>
      {displayText}
    </span>
  );
}