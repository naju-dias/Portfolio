"use client";

import dynamic from "next/dynamic";

import Hero from "./Hero";

import { useIsMobile } from "@/hooks/useIsMobile";
import { useIdleMount } from "@/hooks/useIdleMount";

import LazyLanyard from "@/components/effects/LazyLanyard";

export default function HeroWithLanyard() {
  const isMobile = useIsMobile(1280);
  const idleReady = useIdleMount(3000);

  return (
    <Hero>
      {isMobile === false && idleReady && (
        <div className="absolute inset-0 pointer-events-none z-5">
          <div className="w-full h-full pointer-events-auto">
            <LazyLanyard />
          </div> 
        </div>
      )}
    </Hero>
  );
}