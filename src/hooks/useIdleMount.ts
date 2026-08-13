"use client";

import { useEffect, useState } from "react";

export function useIdleMount(fallbackDelayMs = 2000) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if ("requestIdleCallback" in window) {
      const id = (window as any).requestIdleCallback(
        () => setReady(true),
        { timeout: fallbackDelayMs }
      );
      return () => (window as any).cancelIdleCallback?.(id);
    }

    // Safari não tem requestIdleCallback
    const t = setTimeout(() => setReady(true), fallbackDelayMs);
    return () => clearTimeout(t);
  }, [fallbackDelayMs]);

  return ready;
}