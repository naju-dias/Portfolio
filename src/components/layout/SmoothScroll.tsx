"use client";

import dynamic from "next/dynamic";
import { useIsMobile } from "@/hooks/useIsMobile";

const DesktopSmoothScroll = dynamic(
  () => import("./DesktopSmoothScroll"),
  {
    ssr: false,
  }
);

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMobile = useIsMobile(768);

  if (isMobile === null) {
    return <>{children}</>;
  }

  /*
   * Mobile usa scroll nativo.
   * O chunk do Lenis não precisa ser carregado.
   */
  if (isMobile) {
    return <>{children}</>;
  }

  return (
    <DesktopSmoothScroll>
      {children}
    </DesktopSmoothScroll>
  );
}