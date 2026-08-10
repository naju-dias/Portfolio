import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif, Caveat, Cormorant_Garamond, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

import Navbar from "@/components/layout/Navbar";
import SmoothScroll from "@/components/layout/SmoothScroll";

<link rel="preload" href="/fonts/Tanker-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  style: ["italic", "normal"],
  weight: "400",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  weight: ["400","500","600","700"],
  subsets: ["latin"],
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  style: ["italic", "normal"],
  weight: ["300","400","500","600","700"],
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  style: ["italic", "normal"],
  weight: "variable",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ana Julia Dias - Engenheira de Software",
  description: "Portfolio Profissional",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body className={`min-h-full ${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} ${caveat.variable} ${cormorantGaramond.variable} ${jetbrainsMono.variable}`}>
        <div className="background-grid"></div>
        <Navbar />
        <SmoothScroll>{children}</SmoothScroll>
        <Analytics />
        <SpeedInsights/>
      </body>
    </html>
  );
}
