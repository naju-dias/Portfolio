'use client';

import dynamic from 'next/dynamic';
import Hero from "@/components/sections/Hero";

import { useBgTransition } from "@/hooks/useBgTransition";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useIdleMount } from "@/hooks/useIdleMount";

const Projects = dynamic(() => import("@/components/sections/Projects"));
const About = dynamic(() => import("@/components/sections/About"));
const Skills = dynamic(() => import("@/components/sections/Skills"));
const Contact = dynamic(() => import("@/components/sections/Contact"));
const Footer = dynamic(() => import("@/components/sections/Footer"));

// Não baixar Three.js no Mobile!
const Lanyard = dynamic(
  () => import("@/components/effects/Lanyard"),
  { ssr: false }
);

const LoadingScreen = dynamic(() => import("@/components/layout/LoadingScreen"), { ssr: false });
const LoadingScreenMobile = dynamic(() => import("@/components/layout/LoadingScreenMobile"), { ssr: false });

export default function Home() {
  const isMobile = useIsMobile(1280);
  const idleReady = useIdleMount(1500);

  const [aboutTrigger, contactTrigger] = useBgTransition([
    { from: "#06060a", to: "#dddadb", zoneHeight: 700 },
    { from: "#dddadb", to: "#06060a", zoneHeight: 900 },
  ]);

  return (
    <main className="min-h-screen">
      <div className="block xl:hidden">
        <LoadingScreenMobile />
      </div>
      <div className="hidden xl:block">
        <LoadingScreen />
      </div>

      <div className="relative w-full">
        <Hero>
          {isMobile === false && idleReady && (
            <div className="absolute inset-0 pointer-events-none z-5">
              <div className="w-full h-full pointer-events-auto">
                <Lanyard position={[0, 0, 10]} gravity={[0, -40, 0]} transparent />
              </div>
            </div>
          )}
        </Hero>
        <Projects />
        <div ref={aboutTrigger} aria-hidden />
        <div className="about-skills-wrapper bg-transparent">
          <About />
          <Skills />
        </div>
        <div ref={contactTrigger} className="h-px" aria-hidden />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}