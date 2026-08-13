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
  delay = 2500,
}: LazyLanyardProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [shouldLoad, setShouldLoad] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Segurança extra: nunca carrega o 3D em mobile/tablet
    const desktop = window.matchMedia("(min-width: 1280px)");

    if (!desktop.matches) return;

    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let idleId: number | undefined;

    const load = () => {
      timeoutId = setTimeout(() => {
        setShouldLoad(true);
      }, delay);
    };

    // Espera o navegador ficar livre antes de sequer iniciar o delay
    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(load, {
        timeout: 3000,
      });
    } else {
      timeoutId = setTimeout(() => {
        setShouldLoad(true);
      }, delay);
    }

    return () => {
      if (idleId !== undefined) {
        window.cancelIdleCallback(idleId);
      }

      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }
    };
  }, [delay]);

  useEffect(() => {
    if (!shouldLoad || !containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.05,
      }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [shouldLoad]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
        opacity: shouldLoad && isVisible ? 1 : 0,
        transition: "opacity 0.6s ease",
        pointerEvents: shouldLoad && isVisible ? "auto" : "none",
      }}
    >
      {shouldLoad && isVisible && <Lanyard />}
    </div>
  );
}