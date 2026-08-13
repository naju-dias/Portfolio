"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const Lanyard = dynamic(() => import("./Lanyard"), {
  ssr: false,
});

type LazyLanyardProps = {
  delay?: number;
};

export default function LazyLanyard({
  delay = 50,
}: LazyLanyardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1280px)");

    if (!desktop.matches) return;

    let loaded = false;
    let timerId: ReturnType<typeof setTimeout> | undefined;
    let idleId: number | undefined;

    const load = () => {
      if (loaded) return;

      loaded = true;
      setShouldLoad(true);
    };

    /*
     * Se o browser ficar livre antes,
     * pode carregar antecipadamente.
     */
    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(load, {
        timeout: delay,
      });
    }

    /*
     * Mas nunca espera mais que `delay`.
     */
    timerId = setTimeout(load, delay);

    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }

      if (idleId !== undefined) {
        window.cancelIdleCallback(idleId);
      }
    };
  }, [delay]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      {shouldLoad && (
        <div
          style={{
            width: "100%",
            height: "100%",
            animation: "lanyardFadeIn 0.45s ease forwards",
          }}
        >
          <Lanyard />
        </div>
      )}

      <style jsx>{`
        @keyframes lanyardFadeIn {
          from {
            opacity: 0;
          }

          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}