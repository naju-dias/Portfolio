import type { Metadata } from "next";

import localFont from "next/font/local";
import {
  Geist,
  Geist_Mono,
  Instrument_Serif,
  Caveat,
  JetBrains_Mono,
} from "next/font/google";

import "./globals.css";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import LoadingScreen from "@/components/layout/LoadingScreen";
import Navbar from "@/components/layout/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  style: ["normal"],
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const tanker = localFont({
  src: "../../public/fonts/Tanker-Regular.woff2",
  variable: "--font-tanker",
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  weight: ["500"],
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  style: ["normal"],
  weight: "variable",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ana Julia Dias - Engenheira de Software",
  description: "Portfolio Profissional",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body
        className={`
          min-h-full
          ${geistSans.variable}
          ${geistMono.variable}
          ${instrumentSerif.variable}
          ${tanker.variable}
          ${caveat.variable}
          ${jetbrainsMono.variable}
        `}
      >
        <LoadingScreen />

        <div className="background-grid" />

        <Navbar />

        {children}

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}