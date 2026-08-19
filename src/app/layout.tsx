import type { Metadata } from "next";

import localFont from "next/font/local";
import { Geist, Geist_Mono, Instrument_Serif, Caveat, JetBrains_Mono } from "next/font/google";

import "./globals.css";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import LoadingScreenConnected from "@/components/layout/LoadingScreenConnected";
import Navbar from "@/components/layout/Navbar";
import { LoaderProvider } from "@/context/LoaderContext";

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

const loaderScript = `
  try {
    if (sessionStorage.getItem("portfolio-loader-seen") === "true") {
      document.documentElement.dataset.loaderSeen = "true";
    }

    const savedBackground =
      sessionStorage.getItem("portfolio-background-color");

    if (savedBackground) {
      document.documentElement.style.setProperty(
        "--page-background",
        savedBackground
      );
    }

    document.documentElement.classList.add("is-restoring-scroll");
    history.scrollRestoration = "auto";

    window.addEventListener("load", () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          document.documentElement.classList.remove("is-restoring-scroll");
        });
      });
    });
  } catch {}
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: loaderScript,
          }}
        />
      </head>

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
        <LoaderProvider>
          <LoadingScreenConnected />

          <div className="background-grid" />

          <Navbar />

          {children}
        </LoaderProvider>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}