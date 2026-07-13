// hooks/useBgTransition.ts
'use client';
import { useEffect, useRef } from 'react';

function hexToRgb(hex: string) {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)!;
  return { r: parseInt(r[1],16), g: parseInt(r[2],16), b: parseInt(r[3],16) };
}
function lerp(a: number, b: number, t: number) { return Math.round(a + (b-a)*t); }
function ease(t: number) { return t < 0.5 ? 2*t*t : -1+(4-2*t)*t; }

export function useBgTransition(from: string, to: string, zoneHeight = 900) {
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const f = hexToRgb(from);
    const t = hexToRgb(to);
    let raf: number;

    document.body.style.backgroundColor = `rgb(${f.r},${f.g},${f.b})`;

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = triggerRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const distFromCenter = vh / 2 - rect.top;
        const progress = Math.min(Math.max((distFromCenter + zoneHeight / 2) / zoneHeight, 0), 1);
        const p = ease(progress);

        const r = lerp(f.r, t.r, p);
        const g = lerp(f.g, t.g, p);
        const b = lerp(f.b, t.b, p);

        // Cor sólida como fallback
        document.body.style.backgroundColor = `rgb(${r},${g},${b})`;

        // Gradiente suave que aparece junto com a transição
        if (progress > 0.05 && progress < 1) {
          document.body.style.backgroundImage = `
            radial-gradient(
              circle at top left,
              rgba(214, 214, 214, ${p * 0.18}),
              transparent 40%
            )
          `;
        } else if (progress >= 1) {
          // Chegou na seção clara: aplica gradiente completo
          document.body.style.backgroundImage = `
            radial-gradient(
              circle at top left,
              rgba(214, 214, 214, 0.18),
              transparent 40%
            )
          `;
        } else {
          document.body.style.backgroundImage = 'none';
        }
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
      document.body.style.backgroundImage = '';
    };
  }, [from, to, zoneHeight]);

  return triggerRef;
}