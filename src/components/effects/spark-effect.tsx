"use client";

import { useEffect, useRef } from "react";

type Spark = {
  x: number;
  y: number;

  vx: number;
  vy: number;

  life: number;
  maxLife: number;

  size: number;

  color: string;
};

interface SparkEffectProps {
  desktopAmount?: number;
  mobileAmount?: number;
}

export function SparkEffect({
  desktopAmount = 280,
  mobileAmount = 70,
}: SparkEffectProps) {
  const canvasRef =
    useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", {
      alpha: true,
    });

    if (!ctx) return;

    const isMobile = window.matchMedia(
      "(max-width: 768px)"
    ).matches;

    const amount = isMobile
      ? mobileAmount
      : desktopAmount;

    let width = 0;
    let height = 0;

    let animationId = 0;
    let running = true;

    const sparks: Spark[] = [];

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      /*
       * Não renderizamos canvas em Retina 2x/3x.
       * Para partículas pequenas não faz diferença.
       */
      const dpr = Math.min(
        window.devicePixelRatio,
        1.25
      );

      canvas.width = Math.floor(
        width * dpr
      );

      canvas.height = Math.floor(
        height * dpr
      );

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
      );
    };

    const random = (
      min: number,
      max: number
    ) =>
      Math.random() * (max - min) + min;

    const createSpark = (): Spark => ({
      x: random(0, width),
      y: random(0, height),

      vx: random(-0.06, 0.03),
      vy: random(0.015, 0.08),

      life: random(0, 200),
      maxLife: random(160, 260),

      size: isMobile
        ? random(1, 1.7)
        : random(1, 2),

      color: `${Math.floor(
        random(80, 230)
      )}, ${Math.floor(
        random(50, 190)
      )}, ${Math.floor(
        random(130, 255)
      )}`,
    });

    const resetSpark = (
      spark: Spark
    ) => {
      const next = createSpark();

      Object.assign(spark, next);

      /*
       * Entrando preferencialmente pela parte
       * de cima/lateral para não parecer reset.
       */
      spark.y = random(-40, height);
    };

    resize();

    for (let i = 0; i < amount; i++) {
      sparks.push(createSpark());
    }

    const draw = () => {
      if (!running) return;

      if (document.hidden) {
        animationId =
          requestAnimationFrame(draw);

        return;
      }

      ctx.clearRect(
        0,
        0,
        width,
        height
      );

      for (let i = 0; i < sparks.length; i++) {
        const spark = sparks[i];

        spark.x += spark.vx;
        spark.y += spark.vy;

        spark.life++;

        if (
          spark.life >= spark.maxLife ||
          spark.x < -50 ||
          spark.x > width + 50 ||
          spark.y > height + 50
        ) {
          resetSpark(spark);
          continue;
        }

        const progress =
          spark.life / spark.maxLife;

        /*
         * Fade de entrada + saída.
         */
        const opacity =
          Math.sin(
            progress * Math.PI
          ) * 0.8;

        ctx.fillStyle =
          `rgba(${spark.color}, ${opacity})`;

        ctx.fillRect(
          spark.x,
          spark.y,
          spark.size,
          spark.size
        );
      }

      animationId =
        requestAnimationFrame(draw);
    };

    const observer =
      new IntersectionObserver(
        ([entry]) => {
          running =
            entry.isIntersecting;

          if (running) {
            cancelAnimationFrame(
              animationId
            );

            animationId =
              requestAnimationFrame(draw);
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

    animationId =
      requestAnimationFrame(draw);

    return () => {
      running = false;

      cancelAnimationFrame(animationId);

      observer.disconnect();

      window.removeEventListener(
        "resize",
        resize
      );
    };
  }, [
    desktopAmount,
    mobileAmount,
  ]);

  return (
    <canvas
      ref={canvasRef}
      id="sparks"
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,

        width: "100%",
        height: "100%",

        background: "transparent",

        pointerEvents: "none",
      }}
    />
  );
}