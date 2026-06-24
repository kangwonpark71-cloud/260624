import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // OpenNext Cloudflare 배포를 위한 설정 (output: export 제거 — OpenNext가 번들링)
  images: {
    unoptimized: true,
  },
  turbopack: {
    resolveAlias: {},
  },
};

export default nextConfig;
