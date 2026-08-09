'use client';

import dynamic from 'next/dynamic';
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

import { useBgTransition } from "@/hooks/useBgTransition";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useIdleMount } from "@/hooks/useIdleMount";

const Lanyard = dynamic(
  () => import(/* webpackPrefetch: true */ "@/components/effects/Lanyard"),
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
      {isMobile === true && <LoadingScreenMobile />}
      {isMobile === false && <LoadingScreen />}

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