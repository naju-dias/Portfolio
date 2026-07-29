"use client";

import { useState, useEffect } from "react";
import { RiGlobalLine } from "react-icons/ri";

interface LocalTimeProps {
  className?: string;
}

export default function LocalTime({ className }: LocalTimeProps) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const formatted = new Intl.DateTimeFormat("pt-BR", {
        timeZone: "America/Sao_Paulo",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }).format(new Date());
      setTime(formatted);
    };

    update();
    const interval = setInterval(update, 30 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`local-time ${className || ""}`}>
      <div className="local-time__label">
        <RiGlobalLine className="local-time__icon" />
        Br
      </div>
      <span></span> 
      <div className="local-time__value">{time || "--:--"}</div>
    </div>
  );
}