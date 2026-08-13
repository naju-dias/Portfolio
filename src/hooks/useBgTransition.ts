'use client';

import { createRef, RefObject, useEffect, useMemo } from 'react';

type Transition = {
  from: string;
  to: string;
  zoneHeight?: number;
  backgroundImage?: string;
};

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

  useEffect(() => {
    let raf = 0;
    let lastBackgroundColor = '';
    let lastBackgroundImage = '';

    const setBackground = (color: string, image: string) => {
      if (color !== lastBackgroundColor) {
        document.body.style.backgroundColor = color;
        lastBackgroundColor = color;
      }

      if (image !== lastBackgroundImage) {
        document.body.style.backgroundImage = image;
        lastBackgroundImage = image;
      }
    };

    const update = () => {
      let active = -1;
      let progress = 0;

      for (let i = 0; i < refs.length; i++) {
        const el = refs[i].current;
        if (!el) continue;

        const zone = transitions[i].zoneHeight ?? 900;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
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
        const first = hexToRgb(transitions[0].from);
        setBackground(`rgb(${first.r},${first.g},${first.b})`, 'none');
        return;
      }

      const tr = transitions[active];
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

      setBackground(`rgb(${r},${g},${b})`, backgroundImage);
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

      document.body.style.backgroundColor = '';
      document.body.style.backgroundImage = '';
    };
  }, [refs, transitions]);

  return refs;
}