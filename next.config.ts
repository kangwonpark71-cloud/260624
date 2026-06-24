import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cloudflare Pages: disable Turbopack to avoid path resolution issues
  turbopack: {
    resolveAlias: {},
  },
};

export default nextConfig;
