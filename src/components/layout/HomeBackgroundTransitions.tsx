"use client";

import {
  useMemo,
  type ReactNode,
} from "react";

import { useBgTransition } from "@/hooks/useBgTransition";

interface HomeBackgroundTransitionsProps {
  about: ReactNode;
  skills: ReactNode;
  contact: ReactNode;
  footer: ReactNode;
}

export default function HomeBackgroundTransitions({
  about,
  skills,
  contact,
  footer,
}: HomeBackgroundTransitionsProps) {
  const transitions = useMemo(
    () => [
      {
        from: "#06060a",
        to: "#dddadb",
        zoneHeight: 700,
      },
      {
        from: "#dddadb",
        to: "#06060a",
        zoneHeight: 900,
      },
    ],
    []
  );

  const [
    aboutTrigger,
    contactTrigger,
  ] = useBgTransition(transitions);

  return (
    <>
      <div
        ref={aboutTrigger}
        aria-hidden="true"
      />

      <div className="about-skills-wrapper bg-transparent">
        {about}
        {skills}
      </div>

      <div
        ref={contactTrigger}
        className="h-px"
        aria-hidden="true"
      />

      {contact}
      {footer}
    </>
  );
}