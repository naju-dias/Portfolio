'use client';

import dynamic from 'next/dynamic';
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import LoadingScreen from "@/components/LoadingScreen";

const Lanyard = dynamic(() => import('@/components/Lanyard'), { ssr: false });

export default function Home() {
  return (
    <main className="bg-[#120f17] min-h-screen">
      
      <LoadingScreen />

      {/* Grade de fundo */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(68, 47, 95, 0.56) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />

      <Navbar />

  {/* Hero + Lanyard lado a lado */}
  <div className="relative w-full h-screen">
    <div className="absolute inset-0">
      <Hero />
    </div>
    <div className="absolute inset-0 pointer-events-none">
      <div className="w-full h-full pointer-events-auto">
        <Lanyard position={[0, 0, 10]} gravity={[0, -40, 0]} transparent={true} />
      </div>
    </div>
  </div>
</main>
  );
}

