'use client';

import dynamic from 'next/dynamic';
import LoadingScreen from "@/components/layout/LoadingScreen";
import Navbar from "@/components/layout/Navbar";

import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

import { useBgTransition } from "@/hooks/useBgTransition";

const Lanyard = dynamic(
  () => import("@/components/effects/Lanyard"),
  { ssr: false }
);

export default function Home() {
  const [aboutTrigger, contactTrigger] = useBgTransition([
    {
      from: "#06060a",
      to: "#dddadb",
      zoneHeight: 700,
    },
    {
      from: "#dddadb",
      to: "#06060a",
      zoneHeight: 900,
    },
  ]);

  return (
    <main className="min-h-screen">
      <LoadingScreen />
      <Navbar />
      <div className="relative w-full">
        <Hero>
          <div className="absolute inset-0 pointer-events-none z-5">
            <div className="w-full h-full pointer-events-auto">
              <Lanyard
                position={[0, 0, 10]}
                gravity={[0, -40, 0]}
                transparent
              />
            </div>
          </div>
        </Hero>
        <Projects />

        {/* Escuro -> Claro (Inicia ao rolar para o About) */}
        <div ref={aboutTrigger} aria-hidden />
        
        <div className="about-skills-wrapper bg-transparent">
          <About />
          <Skills />
        </div>

        {/* Claro -> Escuro (Começa a escurecer ao entrar no Contact) */}
        <div
          ref={contactTrigger}
          className="h-px"
          aria-hidden
        />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}