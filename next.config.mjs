/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // La opción optimizeFonts ya no es necesaria ni válida en esta versión
};

export default nextConfig;