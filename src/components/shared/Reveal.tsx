"use client";

import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { isValidElement, useRef } from "react";
import type { ReactNode } from "react";

import "./Reveal.scss";

type RevealVariant = "soft" | "mask" | "media" | "fade" | "lines";
type RevealDirection = "up" | "left";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  once?: boolean;
  className?: string;
  variant?: RevealVariant;
  threshold?: number;
  stagger?: number;
  direction?: RevealDirection;
  active?: boolean;
}

const EASE = [0.16, 1, 0.3, 1] as const;

function getText(children: ReactNode): string {
  if (typeof children === "string") return children;
  if (typeof children === "number") return String(children);

  if (Array.isArray(children)) {
    return children.map(getText).join("");
  }

  if (isValidElement(children)) {
    return getText((children.props as any).children);
  }

  return "";
}

export default function Reveal({
  children,
  delay = 0,
  y = 48,
  duration = 1100,
  once = true,
  className = "",
  variant = "soft",
  threshold = 0.15,
  stagger = 55,
  direction = "up",
  active = true,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const isInView = useInView(ref as React.RefObject<Element>, {
    once,
    amount: threshold,
    margin: "0px 0px -8% 0px",
  });

  const visible = reduceMotion || (active && isInView);

  const transition = {
    duration: duration / 1000,
    delay: delay / 1000,
    ease: EASE,
  };

  /*
   * LINES
   * direction="left" -> uma única cortina contínua revelando a frase inteira
   *                     da esquerda pra direita (clip-path).
   * direction="up"    -> cada palavra sobe individualmente, com stagger.
   * Ideal para headings e frases de destaque de cor sólida.
   * NÃO usar em texto com gradiente/background-clip: text (usar "mask" nesses casos).
   */
  if (variant === "lines") {
    if (direction === "left") {
      return (
        <span
          ref={ref as React.RefObject<HTMLSpanElement>}
          className={`reveal reveal--lines reveal--wipe ${className}`}
        >
          <motion.span
            className="reveal__wipe-inner"
            initial={false}
            animate={
              visible
                ? { clipPath: "inset(0% 0% 0% 0%)" }
                : { clipPath: "inset(0% 100% 0% 0%)" }
            }
            transition={transition}
          >
            {children}
          </motion.span>
        </span>
      );
    }

    const words = getText(children)
      .split(" ")
      .filter(Boolean);

    const container: Variants = {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: stagger / 1000,
          delayChildren: delay / 1000,
        },
      },
    };

    const wordVariant: Variants = {
      hidden: {
        y: "115%",
        opacity: 0.3,
      },

      visible: {
        y: "0%",
        opacity: 1,

        transition: {
          duration: duration / 1000,
          ease: EASE,
        },
      },
    };

    return (
      <motion.span
        ref={ref as React.RefObject<HTMLSpanElement>}
        className={`reveal reveal--lines ${className}`}
        initial="hidden"
        animate={visible ? "visible" : "hidden"}
        variants={container}
      >
        {words.map((word, i) => (
          <span key={`${word}-${i}`}>
            <span className="reveal__word-mask">
              <motion.span
                className="reveal__word"
                variants={wordVariant}
              >
                {word}
              </motion.span>
            </span>

            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </motion.span>
    );
  }

  /*
   * SOFT
   * Entrada editorial suave.
   * Ideal para textos, labels, infos e componentes menores.
   */
  if (variant === "soft") {
    return (
      <motion.div
        ref={ref as React.RefObject<HTMLDivElement>}
        className={`reveal reveal--soft ${className}`}
        initial={false}
        animate={
          visible
            ? {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              }
            : {
                opacity: 0,
                y,
                filter: "blur(4px)",
              }
        }
        transition={transition}
      >
        {children}
      </motion.div>
    );
  }

  /*
   * MASK
   * Conteúdo emerge de dentro do próprio layout.
   * Ideal para headings grandes e texto com gradiente.
   *
   * Movimento propositalmente simples:
   * sem blur e sem rotateX para ficar mais editorial.
   */
  if (variant === "mask") {
    return (
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className={`reveal reveal--mask ${className}`}
      >
        <motion.div
          className="reveal__mask-inner"
          initial={false}
          animate={
            visible
              ? {
                  y: "0%",
                  opacity: 1,
                }
              : {
                  y: "105%",
                  opacity: 0,
                }
          }
          transition={transition}
        >
          {children}
        </motion.div>
      </div>
    );
  }

  /*
   * MEDIA
   * Reveal por máscara + zoom muito sutil.
   * Para imagens, cards, mockups e vídeos.
   */
  if (variant === "media") {
    return (
      <motion.div
        ref={ref as React.RefObject<HTMLDivElement>}
        className={`reveal reveal--media ${className}`}
        initial={false}
        animate={
          visible
            ? {
                clipPath: "inset(0% 0% 0% 0%)",
              }
            : {
                clipPath: "inset(10% 0% 10% 0%)",
              }
        }
        transition={transition}
      >
        <motion.div
          className="reveal__media-inner"
          initial={false}
          animate={
            visible
              ? {
                  scale: 1,
                  y: 0,
                  filter: "blur(0px)",
                }
              : {
                  scale: 1.075,
                  y: 18,
                  filter: "blur(3px)",
                }
          }
          transition={{
            ...transition,
            duration: duration / 1000 + 0.2,
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    );
  }

  /*
   * FADE
   * Quase imperceptível.
   * Para elementos que não precisam disputar atenção.
   */
  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`reveal reveal--fade ${className}`}
      initial={false}
      animate={
        visible
          ? { opacity: 1 }
          : { opacity: 0 }
      }
      transition={{
        duration: duration / 1000,
        delay: delay / 1000,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
}