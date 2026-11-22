import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  basePath: '/fr/controle-technique',
  output: 'export',
  images: {
    unoptimized: true
  }
};

export default nextConfig;
