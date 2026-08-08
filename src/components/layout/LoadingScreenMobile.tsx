"use client";

import { useEffect, useRef, useState } from "react";
import BootSequenceUI, { BOOT_LINES } from "./BootSequenceUI";

const STEP_MS = 550;
const LINE_REVEAL_MS = 640;
const READ_HOLD_MS = 700;

interface Props { onComplete?: () => void; }

export default function LoadingScreenMobile({ onComplete = () => {} }: Props) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [mounted, setMounted] = useState(true);
  const [displayProgress, setDisplayProgress] = useState(0);
  const lineChangeTime = useRef<number>(Date.now());

  useEffect(() => {
    if (visibleLines >= BOOT_LINES.length) return;
    const t = setTimeout(() => setVisibleLines((v) => v + 1), visibleLines === 0 ? 200 : STEP_MS);
    return () => clearTimeout(t);
  }, [visibleLines]);

  useEffect(() => { lineChangeTime.current = Date.now(); }, [visibleLines]);

  useEffect(() => {
    if (exiting) { setDisplayProgress(100); return; }
    let raf: number;
    const loop = () => {
      const prev = visibleLines > 1 ? BOOT_LINES[visibleLines - 2].threshold : 0;
      const curr = visibleLines > 0 ? BOOT_LINES[visibleLines - 1].threshold : 0;
      const t = Math.min(1, (Date.now() - lineChangeTime.current) / LINE_REVEAL_MS);
      setDisplayProgress(Math.floor(prev + (curr - prev) * t));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [visibleLines, exiting]);

  useEffect(() => {
    if (exiting || visibleLines < BOOT_LINES.length) return;
    const t = setTimeout(() => setExiting(true), LINE_REVEAL_MS + READ_HOLD_MS);
    return () => clearTimeout(t);
  }, [visibleLines, exiting]);

  useEffect(() => {
    if (!exiting) return;
    const t = setTimeout(() => { setMounted(false); onComplete(); }, 1000);
    return () => clearTimeout(t);
  }, [exiting, onComplete]);

  if (!mounted) return null;
  return <BootSequenceUI exiting={exiting} displayProgress={displayProgress} visibleLines={visibleLines} />;
}