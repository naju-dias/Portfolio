"use client";

import { useEffect, useRef } from "react";

type Direction = {
  x: number;
  y: number;
};

type SparkEffectProps = {
  selector?: string;
  amount?: number;
  speed?: number;
  lifetime?: number;
  direction?: Direction;
  size?: [number, number];
  maxopacity?: number;
  color?: string;
  randColor?: boolean;
  acceleration?: [number, number];
};

type SparkType = {
  x: number;
  y: number;
  age: number;
  acceleration: number;
  color: string;
  opacity: number;
  go: () => void;
};

export function SparkEffect({
  selector = "#sparks",
  amount = 5000,
  speed = 0.016,
  lifetime = 200,
  direction = { x: -0.9, y: 1 },
  size = [2, 2],
  maxopacity = 1,
  color = "150, 150, 150",
  randColor = true,
  acceleration = [5, 1],
}: SparkEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvasElement = canvasRef.current;
    if (!canvasElement) return;

    const context = canvasElement.getContext("2d");
    if (!context) return;

    const canvas: HTMLCanvasElement = canvasElement;
    const ctx: CanvasRenderingContext2D = context;

    const isMobile = window.innerWidth < 768;

    const OPT = {
      selector,

      // quantidade
      amount: isMobile ? 120 : amount,

      // velocidade
      speed: isMobile ? 0.01 : speed,

      lifetime,
      direction,
      size,
      maxopacity,

      color:
        window.innerWidth < 520
          ? "150, 150, 150"
          : color,

      randColor,
      acceleration,
    };

    let sparks: SparkType[] = [];

    let interval: number | null = null;
    let animationId: number | null = null;

    let isVisible = true;

    function setCanvasWidth() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function rand(
      min: number,
      max: number
    ): number {
      return Math.floor(
        Math.random() *
          (max - min + 1)
      ) + min;
    }

    class Spark implements SparkType {
      x: number;
      y: number;
      age: number;
      acceleration: number;
      color: string;
      opacity: number;

      constructor(
        x: number,
        y: number
      ) {
        this.x = x;
        this.y = y;
        this.age = 0;

        this.acceleration = rand(
          OPT.acceleration[0],
          OPT.acceleration[1]
        );

        this.color = OPT.randColor
          ? `${rand(0, 255)},${rand(
              0,
              255
            )},${rand(0, 255)}`
          : OPT.color;

        this.opacity =
          OPT.maxopacity -
          this.age /
            (OPT.lifetime *
              rand(1, 10));
      }

      go() {
        this.x +=
          (OPT.speed *
            OPT.direction.x *
            this.acceleration) /
          2;

        this.y +=
          (OPT.speed *
            OPT.direction.y *
            this.acceleration) /
          2;

        this.opacity =
          OPT.maxopacity -
          ++this.age /
            OPT.lifetime;
      }
    }

    function addSpark() {
      const x = rand(
        -200,
        window.innerWidth + 200
      );

      const y = rand(
        -200,
        window.innerHeight + 200
      );

      sparks.push(
        new Spark(x, y)
      );
    }

    function drawSpark(
      spark: SparkType
    ) {
      const x = spark.x;
      const y = spark.y;

      spark.go();

      ctx.beginPath();

      ctx.fillStyle = `rgba(${spark.color}, ${spark.opacity})`;

      ctx.rect(
        x,
        y,
        OPT.size[0],
        OPT.size[1]
      );

      ctx.fill();
    }

    function draw() {
      if (!isVisible) {
        animationId = null;
        return;
      }

      ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
      );

      sparks = sparks.filter(
        (spark) =>
          spark.opacity > 0
      );

      sparks.forEach(
        (spark) => {
          drawSpark(spark);
        }
      );

      animationId =
        window.requestAnimationFrame(
          draw
        );
    }

    function start() {
      if (!isVisible) return;

      if (interval === null) {
        interval =
          window.setInterval(() => {
            if (
              sparks.length <
              OPT.amount
            ) {
              addSpark();
            }
          }, 1000 / OPT.amount);
      }

      if (
        animationId === null
      ) {
        animationId =
          window.requestAnimationFrame(
            draw
          );
      }
    }

    function stop() {
      if (interval !== null) {
        window.clearInterval(
          interval
        );

        interval = null;
      }

      if (
        animationId !== null
      ) {
        window.cancelAnimationFrame(
          animationId
        );

        animationId = null;
      }
    }

    function init() {
      setCanvasWidth();
      start();
    }

    const observer =
      new IntersectionObserver(
        ([entry]) => {
          isVisible =
            entry.isIntersecting;

          if (isVisible) {
            start();
          } else {
            stop();
          }
        },
        {
          threshold: 0,

          /*
           * Só desliga quando já saiu
           * um pouquinho do Hero,
           * para evitar liga/desliga
           * na borda da viewport.
           */
          rootMargin:
            "100px 0px",
        }
      );

    observer.observe(canvas);

    window.addEventListener(
      "resize",
      setCanvasWidth,
      {
        passive: true,
      }
    );

    init();

    return () => {
      observer.disconnect();

      window.removeEventListener(
        "resize",
        setCanvasWidth
      );

      stop();
    };
  }, [
    selector,
    amount,
    speed,
    lifetime,
    direction,
    size,
    maxopacity,
    color,
    randColor,
    acceleration,
  ]);

  return (
    <canvas
      ref={canvasRef}
      id="sparks"
      aria-hidden="true"
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        background:
          "transparent",
        pointerEvents: "none",
      }}
    />
  );
}