"use client";

import { useEffect, useRef, useState } from "react";
import BootSequenceUI, { BOOT_LINES } from "./BootSequenceUI";

const FIRST_STEP_MS = 150;
const STEP_MS = 280;
const HOLD_MS = 350;
const EXIT_MS = 1000;

interface LoadingScreenProps {
  onComplete?: () => void;
}

export default function LoadingScreen({
  onComplete,
}: LoadingScreenProps) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [mounted, setMounted] = useState(true);

  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    BOOT_LINES.forEach((_, index) => {
      const delay =
        FIRST_STEP_MS +
        index * STEP_MS;

      const timer = setTimeout(() => {
        setVisibleLines(index + 1);
      }, delay);

      timers.push(timer);
    });

    const sequenceDuration =
      FIRST_STEP_MS +
      (BOOT_LINES.length - 1) * STEP_MS;

    const exitTimer = setTimeout(() => {
      setExiting(true);
    }, sequenceDuration + HOLD_MS);

    timers.push(exitTimer);

    const unmountTimer = setTimeout(() => {
      setMounted(false);
      onCompleteRef.current?.();
    }, sequenceDuration + HOLD_MS + EXIT_MS);

    timers.push(unmountTimer);

    return () => {
      timers.forEach(clearTimeout);
    };
  }, []);

  if (!mounted) return null;

  const displayProgress =
    visibleLines === 0
      ? 0
      : BOOT_LINES[
          Math.min(
            visibleLines - 1,
            BOOT_LINES.length - 1
          )
        ].threshold;

  return (
    <BootSequenceUI
      exiting={exiting}
      displayProgress={displayProgress}
      visibleLines={visibleLines}
    />
  );
}