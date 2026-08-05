"use client";

import React, { useState, useEffect } from "react";

export default function LocalTime({ className = "" }) {
  const [timeString, setTimeString] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      
      // Formata a hora para o fuso do Brasil
      const formattedTime = now.toLocaleTimeString("en-US", {
        timeZone: "America/Sao_Paulo",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      setTimeString(`${formattedTime} BRT`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`local-time-container ${className}`}>
      <span className="local-time-value">
        {timeString || "00:00 PM BRT"}
      </span>
    </div>
  );
}