import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['localhost'],
    remotePatterns: [
      
      {
        protocol: 'http',
        hostname: 'localhost',
        port: process.env.SERVER_PORT || '3000',
        pathname: '/attachments/**',
      },
    ],
  },
  logging: {
    fetches: {
      fullUrl: true,
    }
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    }
  }
};

export default nextConfig;
