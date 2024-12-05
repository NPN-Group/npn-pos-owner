import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'http', 
        hostname: 'localhost',
        port: process.env.SERVER_PORT || '3000',
        pathname: '/attachments/**', 
      },
    ],
  }
};

export default nextConfig;
