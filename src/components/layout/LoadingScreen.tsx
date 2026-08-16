"use client";

import { useEffect, useRef, useState } from "react";
import BootSequenceUI, { BOOT_LINES } from "./BootSequenceUI";

const FIRST_STEP_MS = 120;
const STEP_MS = 300;
const HOLD_MS = 250;
const EXIT_MS = 1000;

const SESSION_KEY = "portfolio-loader-seen";

interface LoadingScreenProps {
  onComplete?: () => void;
}

export default function LoadingScreen({
  onComplete,
}: LoadingScreenProps) {
  const [visibleLines, setVisibleLines] = useState(0);

  // Começa mostrando para impedir o flash do site.
  const [shouldShow, setShouldShow] = useState(true);

  const [exiting, setExiting] = useState(false);
  const [sessionChecked, setSessionChecked] = useState(false);

  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const alreadySeen =
      sessionStorage.getItem(SESSION_KEY) === "true";

    if (alreadySeen) {
      setShouldShow(false);
      setSessionChecked(true);
      onCompleteRef.current?.();
      return;
    }

    sessionStorage.setItem(SESSION_KEY, "true");

    setSessionChecked(true);
  }, []);

  useEffect(() => {
    if (!sessionChecked || !shouldShow) return;

    const timers: ReturnType<typeof setTimeout>[] = [];

    BOOT_LINES.forEach((_, index) => {
      const timer = setTimeout(() => {
        setVisibleLines(index + 1);
      }, FIRST_STEP_MS + index * STEP_MS);

      timers.push(timer);
    });

    const sequenceDuration =
      FIRST_STEP_MS +
      (BOOT_LINES.length - 1) * STEP_MS;

    timers.push(
      setTimeout(() => {
        setExiting(true);
      }, sequenceDuration + HOLD_MS)
    );

    timers.push(
      setTimeout(() => {
        setShouldShow(false);
        onCompleteRef.current?.();
      }, sequenceDuration + HOLD_MS + EXIT_MS)
    );

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [sessionChecked, shouldShow]);

  if (!shouldShow) {
    return null;
  }

  const progressTarget =
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
      displayProgress={progressTarget}
      visibleLines={visibleLines}
    />
  );
}