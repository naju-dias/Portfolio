"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";

const DesktopSmoothScroll = dynamic(
  () => import("./DesktopSmoothScroll"),
  { ssr: false }
);

export default function SmoothScroll({
  children,
}: {
  children: ReactNode;
}) {
  const isMobile = useIsMobile(1280);

  if (isMobile !== false) {
    return <>{children}</>;
  }

  return (
    <DesktopSmoothScroll>
      {children}
    </DesktopSmoothScroll>
  );
}