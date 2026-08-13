'use client';

import { useEffect, useState } from 'react';

type NavTheme = 'dark' | 'light';

type SectionData = {
  element: HTMLElement;
  theme: NavTheme;
};

export function useNavTheme(navTopOffset = 48) {
  const [theme, setTheme] = useState<NavTheme>('dark');

  useEffect(() => {
    let sections: SectionData[] = [];
    let raf = 0;

    const collectSections = () => {
      sections = Array.from(
        document.querySelectorAll<HTMLElement>('[data-nav-theme]')
      ).map((element) => ({
        element,
        theme:
          (element.getAttribute('data-nav-theme') as NavTheme) || 'dark',
      }));
    };

    const checkTheme = () => {
      let detected: NavTheme = 'dark';

      for (const section of sections) {
        const rect = section.element.getBoundingClientRect();

        if (
          rect.top <= navTopOffset &&
          rect.bottom >= navTopOffset
        ) {
          detected = section.theme;
          break;
        }
      }

      setTheme((current) =>
        current === detected ? current : detected
      );
    };

    const scheduleCheck = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(checkTheme);
    };

    collectSections();
    checkTheme();

    window.addEventListener('scroll', scheduleCheck, { passive: true });
    window.addEventListener('resize', scheduleCheck);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', scheduleCheck);
      window.removeEventListener('resize', scheduleCheck);
    };
  }, [navTopOffset]);

  return theme;
}