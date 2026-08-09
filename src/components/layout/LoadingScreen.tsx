"use client";

import { useEffect, useRef, useState } from "react";
import { useProgress } from "@react-three/drei";
import BootSequenceUI, { BOOT_LINES } from "./BootSequenceUI";

const STEP_MS = 550;
const LINE_REVEAL_MS = 640;
const READ_HOLD_MS = 700;
const MAX_WAIT_MS = 8000;

interface LoadingScreenProps {
  onComplete?: () => void;
}

function targetVisibleCount(progress: number, active: boolean) {
  let count = 0;
  for (const line of BOOT_LINES) {
    const reached = line.threshold === 100 ? progress >= 100 && !active : progress >= line.threshold;
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

  return <BootSequenceUI exiting={exiting} displayProgress={displayProgress} visibleLines={visibleLines} />;
}