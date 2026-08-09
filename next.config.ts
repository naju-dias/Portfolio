import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 480, 640, 768, 828],
  },
};

module.exports = nextConfig;

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer(nextConfig);