"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

interface LoaderContextValue {
  loaderDone: boolean;
  markLoaderDone: () => void;
}

const LoaderContext = createContext<LoaderContextValue | null>(null);

export function LoaderProvider({ children }: { children: ReactNode }) {
  const [loaderDone, setLoaderDone] = useState(false);

  const markLoaderDone = useCallback(() => {
    setLoaderDone(true);
  }, []);

  return (
    <LoaderContext.Provider value={{ loaderDone, markLoaderDone }}>
      {children}
    </LoaderContext.Provider>
  );
}

export function useLoaderDone() {
  const ctx = useContext(LoaderContext);
  if (!ctx) {
    throw new Error("useLoaderDone deve ser usado dentro de <LoaderProvider>");
  }
  return ctx;
}