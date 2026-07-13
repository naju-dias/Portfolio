'use client';

import dynamic from 'next/dynamic';
import LoadingScreen from "@/components/LoadingScreen";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { useBgTransition } from '@/hooks/useBgTransition';

const Lanyard = dynamic(() => import('@/components/Lanyard'), { ssr: false });

export default function Home() {
  const triggerRef = useBgTransition('#06060a', '#dddadb', 900);

  return (
    <main className="min-h-screen">
      <div id="bg-transition-layer" />
      <LoadingScreen />
      <Navbar />

      <div className="relative w-full">
        <Hero>
          <div className="absolute inset-0 pointer-events-none z-5">
            <div className="w-full h-full pointer-events-auto">
              <Lanyard position={[0, 0, 10]} gravity={[0, -40, 0]} transparent={true} />
            </div>
          </div>
        </Hero>

        <Projects />
        <div ref={triggerRef} aria-hidden="true" />

        <div className="about-skills-wrapper" style={{ background: 'transparent' }}>
          <About />
          <Skills />
        </div>

        <Contact />
        <Footer />
      </div>
    </main>
  );
}