import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  reactStrictMode: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  images: {
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 480, 640, 768, 828],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: [
      'lucide-react',
      'framer-motion',
      '@react-three/drei',
      'three',
    ],
  },
};

export default withBundleAnalyzer(nextConfig);