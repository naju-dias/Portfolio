"use client";

import { useEffect, useRef } from "react";
import "./Noise.scss";

interface NoiseProps {
  patternSize?: number;
  patternAlpha?: number;
  refreshInterval?: number;
  frames?: number;
}

export default function Noise({
  patternSize = 180,
  patternAlpha = 10,
  refreshInterval = 90,
  frames = 4,
}: NoiseProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", {
      alpha: true,
    });

    if (!ctx) return;

    let timer: ReturnType<typeof setInterval> | null = null;
    let visible = true;
    let currentFrame = 0;

    const textures: HTMLCanvasElement[] = [];

    const createTexture = () => {
      const textureCanvas =
        document.createElement("canvas");

      textureCanvas.width = patternSize;
      textureCanvas.height = patternSize;

      const textureCtx =
        textureCanvas.getContext("2d");

      if (!textureCtx) {
        return textureCanvas;
      }

      const imageData =
        textureCtx.createImageData(
          patternSize,
          patternSize
        );

      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const value =
          Math.random() * 255;

        data[i] = value;
        data[i + 1] = value;
        data[i + 2] = value;
        data[i + 3] = patternAlpha;
      }

      textureCtx.putImageData(
        imageData,
        0,
        0
      );

      return textureCanvas;
    };

    for (let i = 0; i < frames; i++) {
      textures.push(createTexture());
    }

    const resize = () => {
      const rect =
        canvas.getBoundingClientRect();

      const dpr = Math.min(
        window.devicePixelRatio || 1,
        1.5
      );

      canvas.width =
        Math.floor(rect.width * dpr);

      canvas.height =
        Math.floor(rect.height * dpr);

      ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
      );
    };

    const draw = () => {
      if (!visible || document.hidden) {
        return;
      }

      const rect =
        canvas.getBoundingClientRect();

      const texture =
        textures[currentFrame];

      const pattern =
        ctx.createPattern(
          texture,
          "repeat"
        );

      if (!pattern) return;

      ctx.clearRect(
        0,
        0,
        rect.width,
        rect.height
      );

      ctx.save();

      /*
       * Pequeno deslocamento a cada frame
       * deixa o grain mais "vivo".
       */
      const offsetX =
        (currentFrame * 17) %
        patternSize;

      const offsetY =
        (currentFrame * 29) %
        patternSize;

      ctx.translate(
        -offsetX,
        -offsetY
      );

      ctx.fillStyle = pattern;

      ctx.fillRect(
        offsetX,
        offsetY,
        rect.width + patternSize,
        rect.height + patternSize
      );

      ctx.restore();

      currentFrame =
        (currentFrame + 1) %
        textures.length;
    };

    resize();
    draw();

    timer = setInterval(
      draw,
      refreshInterval
    );

    const observer =
      new IntersectionObserver(
        ([entry]) => {
          visible =
            entry.isIntersecting;

          if (visible) {
            draw();
          }
        },
        {
          threshold: 0,
        }
      );

    observer.observe(canvas);

    window.addEventListener(
      "resize",
      resize,
      { passive: true }
    );

    return () => {
      observer.disconnect();

      window.removeEventListener(
        "resize",
        resize
      );

      if (timer) {
        clearInterval(timer);
      }
    };
  }, [
    patternSize,
    patternAlpha,
    refreshInterval,
    frames,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className="noise-overlay"
      aria-hidden="true"
    />
  );
}