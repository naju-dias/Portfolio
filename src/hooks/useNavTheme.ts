"use client";

import { useState, useEffect } from "react";

export function useNavTheme(navTopOffset: number = 48) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-nav-theme]")
    );

    let ticking = false;

    const checkTheme = () => {
      let detected: "dark" | "light" = "dark";

      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= navTopOffset && rect.bottom >= navTopOffset) {
          detected =
            (section.getAttribute("data-nav-theme") as "light" | "dark") ??
            "dark";
          break;
        }
      }

      setTheme(detected);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(checkTheme);
      }
    };

    checkTheme();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [navTopOffset]);

  return theme;
}