"use client";
import { useState, useEffect, useRef } from "react";

export function useIsMobile(breakpoint = 1280) {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const lockedRef = useRef(false);

  useEffect(() => {
    if (lockedRef.current) return;
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    setIsMobile(mq.matches);
    lockedRef.current = true;
  }, [breakpoint]);

  return isMobile;
}