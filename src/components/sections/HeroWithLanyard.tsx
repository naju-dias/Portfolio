"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import Hero from "./Hero";

const Lanyard = dynamic(
  () => import("@/components/effects/Lanyard"),
  {
    ssr: false,
    loading: () => null,
  }
);

export default function HeroWithLanyard() {
  const [canMount3D, setCanMount3D] = useState(false);

   useEffect(() => {
    const media = window.matchMedia("(min-width: 1280px)");

    if (!media.matches) return;

    let idleId: number | undefined;
    let fallbackTimer: ReturnType<typeof setTimeout> | undefined;
    let mounted = true;

    const mount = () => {
      if (!mounted) return;
      setCanMount3D(true);
    };

    /* Desktop */
    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(mount, {
        timeout: 1200,
      });
    } else {
      /* Safari e navegadores sem requestIdleCallback */
      fallbackTimer = setTimeout(mount, 700);
    }

    return () => {
      mounted = false;

      if (idleId !== undefined) {
        window.cancelIdleCallback(idleId);
      }

      if (fallbackTimer !== undefined) {
        clearTimeout(fallbackTimer);
      }
    };
  }, []);

   return (
    <Hero>
      {canMount3D && (
        <div className="absolute inset-0 pointer-events-none z-5">
          <div className="w-full h-full pointer-events-auto">
            <Lanyard />
          </div>
        </div>
      )}
    </Hero>
  );
}