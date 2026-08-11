"use client";

import { useEffect, useRef } from "react";
import "./Noise.css";

interface NoiseProps {
  patternSize?: number;
  patternAlpha?: number;
  refreshRate?: number;
}

export default function Noise({
  patternSize = 128,
  patternAlpha = 8,
  refreshRate = 120,
}: NoiseProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", {
      alpha: true,
    });

    if (!ctx) return;

    /*
     * No mobile usamos ainda menos pixels.
     */
    const isMobile = window.matchMedia(
      "(max-width: 768px)"
    ).matches;

    const size = isMobile
      ? 64
      : patternSize;

    canvas.width = size;
    canvas.height = size;

    let timer: ReturnType<typeof setInterval> | null =
      null;

    let visible = true;

    const draw = () => {
      if (!visible || document.hidden) return;

      const imageData =
        ctx.createImageData(size, size);

      const data = imageData.data;

      /*
       * Só ~4 mil pixels no mobile,
       * em vez de mais de 1 milhão.
       */
      for (let i = 0; i < data.length; i += 4) {
        const value = Math.random() * 255;

        data[i] = value;
        data[i + 1] = value;
        data[i + 2] = value;
        data[i + 3] = patternAlpha;
      }

      ctx.putImageData(imageData, 0, 0);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      {
        threshold: 0,
      }
    );

    observer.observe(canvas);

    draw();

    /*
     * Não precisamos reconstruir noise a 30 FPS.
     * 120ms ≈ 8 atualizações por segundo.
     */
    timer = setInterval(
      draw,
      isMobile ? 180 : refreshRate
    );

    return () => {
      observer.disconnect();

      if (timer) {
        clearInterval(timer);
      }
    };
  }, [
    patternSize,
    patternAlpha,
    refreshRate,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className="noise-overlay"
      aria-hidden="true"
    />
  );
}