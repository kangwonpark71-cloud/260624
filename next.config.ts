import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cloudflare Pages 정적 배포를 위한 설정
  output: "export",
  images: {
    unoptimized: true,
  },
  turbopack: {
    resolveAlias: {},
  },
};

export default nextConfig;
