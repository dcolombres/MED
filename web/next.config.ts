import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/MED',
  // assetPrefix ya NO es necesario si basePath está bien configurado en Next.js moderno
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
