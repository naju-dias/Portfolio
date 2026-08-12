"use client";

import { ReactLenis } from "lenis/react";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMobile = useIsMobile(768);

  if (isMobile === null) {
    return <>{children}</>;
  }

  if (isMobile) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 1,
      }}
    >
      {children}
    </ReactLenis>
  );
}