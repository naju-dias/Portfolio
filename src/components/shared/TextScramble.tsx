"use client";

import { useState, useEffect, useRef, useLayoutEffect, startTransition } from "react";
import type { CSSProperties } from "react";

interface TextScrambleProps {
  text: string;
  duration?: number;
  characters?: string;
  scrambleIntensity?: number;
  className?: string;
  style?: CSSProperties;
}

export default function TextScramble({
  text,
  duration = 500,
  characters = "!@#$%^&*()_+-=[]{}|;:,.<>?",
  scrambleIntensity = 100,
  className,
  style,
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);
  const frameRef = useRef<number>(0);
  const startTimeRef = useRef(0);
  const measureRef = useRef<HTMLSpanElement>(null);
  const [lockedWidth, setLockedWidth] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (measureRef.current) {
      const width = measureRef.current.offsetWidth;
      startTransition(() => setLockedWidth(width));
    }
  }, [text, className]);

  useEffect(() => {
    if (!isHovering) {
      startTransition(() => setDisplayText(text));
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
  }, [isHovering, text, duration, characters, scrambleIntensity]);

  return (
    <span
      className={className}
      style={{
        ...style,
        display: "inline-block",
        width: lockedWidth ? `${lockedWidth}px` : undefined,
        overflow: "hidden",
        whiteSpace: "nowrap",
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
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