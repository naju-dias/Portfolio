'use client';

import { createRef, RefObject, useLayoutEffect, useMemo, useRef } from 'react';

type Transition = {
  from: string;
  to: string;
  zoneHeight?: number;
  backgroundImage?: string;
};

const BACKGROUND_KEY = 'portfolio-background-color';

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  if (!result) return { r: 0, g: 0, b: 0 };

  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  };
}

function lerp(a: number, b: number, t: number) {
  return Math.round(a + (b - a) * t);
}

function ease(t: number) {
  return t < 0.5
    ? 2 * t * t
    : -1 + (4 - 2 * t) * t;
}

export function useBgTransition(
  transitions: Transition[]
): RefObject<HTMLDivElement | null>[] {
  const refs = useMemo(
    () => transitions.map(() => createRef<HTMLDivElement>()),
    [transitions.length]
  );

  const transitionsRef = useRef(transitions);
  transitionsRef.current = transitions;

  useLayoutEffect(() => {
    let raf = 0;
    let lastBackgroundColor = '';
    let lastBackgroundImage = '';

    const setBackground = (color: string, image: string) => {
      if (color !== lastBackgroundColor) {
        document.body.style.backgroundColor = color;

        // Mantém html e body com a mesma cor
        document.documentElement.style.setProperty('--page-background', color);

        // Guarda a última cor para restaurar antes do paint no F5
        try {
          sessionStorage.setItem(BACKGROUND_KEY, color);
        } catch {}

        lastBackgroundColor = color;
      }

      if (image !== lastBackgroundImage) {
        document.body.style.backgroundImage = image;
        lastBackgroundImage = image;
      }
    };

    const update = () => {
      const currentTransitions = transitionsRef.current;

      if (currentTransitions.length === 0) return;

      let active = -1;
      let progress = 0;

      const vh = window.innerHeight;

      for (let i = 0; i < refs.length; i++) {
        const el = refs[i].current;
        if (!el) continue;

        const transition = currentTransitions[i];
        if (!transition) continue;

        const zone = transition.zoneHeight ?? 900;
        const rect = el.getBoundingClientRect();
        const dist = vh / 2 - rect.top;

        const p = Math.min(
          Math.max((dist + zone / 2) / zone, 0),
          1
        );

        if (p > 0 && p < 1) {
          active = i;
          progress = p;
          break;
        }

        if (p === 1) {
          active = i;
          progress = 1;
        }
      }

      if (active === -1) {
        const first = hexToRgb(currentTransitions[0].from);

        setBackground(
          `rgb(${first.r}, ${first.g}, ${first.b})`,
          'none'
        );

        return;
      }

      const tr = currentTransitions[active];
      const from = hexToRgb(tr.from);
      const to = hexToRgb(tr.to);
      const p = ease(progress);

      const r = lerp(from.r, to.r, p);
      const g = lerp(from.g, to.g, p);
      const b = lerp(from.b, to.b, p);

      let backgroundImage = 'none';

      if (tr.backgroundImage) {
        backgroundImage =
          progress < 1
            ? `radial-gradient(circle at top left, rgba(214,214,214,${p * 0.18}), transparent 40%)`
            : tr.backgroundImage;
      } else {
        const isLight =
          to.r + to.g + to.b > from.r + from.g + from.b;

        if (progress > 0.03) {
          backgroundImage = isLight
            ? `radial-gradient(circle at top left, rgba(214,214,214,${p * 0.18}), transparent 40%)`
            : `radial-gradient(circle at top left, rgba(214,214,214,${(1 - p) * 0.18}), transparent 40%)`;
        }
      }

      setBackground(`rgb(${r}, ${g}, ${b})`, backgroundImage);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    
    update();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [refs]);

  return refs;
}