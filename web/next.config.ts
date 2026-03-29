import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/MED',
  assetPrefix: '/MED', // Asegura que los assets se carguen con la ruta del repo
  trailingSlash: true,
  images: {
    unoptimized: true, // Requerido para output: 'export'
  },
};

export default nextConfig;

