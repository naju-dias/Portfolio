"use client";

import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setVisible(false), 400);
          return 100;
        }
        return p + 2;
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#0a0a0a",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "32px",
        opacity: progress === 100 ? 0 : 1,
        transition: "opacity 0.4s ease",
        pointerEvents: progress === 100 ? "none" : "all",
      }}
    >
      {/* Iniciais */}
      <div
        style={{
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          background: "#84a98c",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#f0ece4",
          fontWeight: "bold",
          fontSize: "16px",
          letterSpacing: "0.05em",
          fontFamily: "var(--font-satoshi, sans-serif)",
        }}
      >
        AJD
      </div>

      {/* Barra de progresso */}
      <div
        style={{
          width: "160px",
          height: "1px",
          background: "rgba(240,236,228,0.1)",
          borderRadius: "999px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            background: "#84a98c",
            borderRadius: "999px",
            transition: "width 0.03s linear",
          }}
        />
      </div>
    </div>
  );
}