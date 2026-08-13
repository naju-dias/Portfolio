"use client";

import { useEffect } from "react";

export default function SmoothScroll() {
  useEffect(() => {
    // 1. Bloqueia a execução em dispositivos móveis por tamanho de tela
    if (window.innerWidth < 768) return;

    // 2. Importação dinâmica direto no useEffect (evita quebrar o SSR)
    import("lenis").then(({ default: Lenis }) => {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
      });

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);

      // 3. Limpeza do efeito ao desmontar o componente
      return () => {
        lenis.destroy();
      };
    });
  }, []);

  // Não renderiza nada visual, não envelopa os filhos, não gera jank
  return null;
}