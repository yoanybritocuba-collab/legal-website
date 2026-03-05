/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // Desactivar optimización de fuentes para evitar advertencias
  experimental: {
    optimizeFonts: false,
  },
};

export default nextConfig;