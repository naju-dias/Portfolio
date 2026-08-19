"use client";

import LoadingScreen from "./LoadingScreen";
import { useLoaderDone } from "@/context/LoaderContext";

export default function LoadingScreenConnected() {
  const { markLoaderDone } = useLoaderDone();
  return <LoadingScreen onComplete={markLoaderDone} />;
}