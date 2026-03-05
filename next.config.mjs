/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Esto genera archivos estáticos
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;