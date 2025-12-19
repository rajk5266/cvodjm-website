import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects(){
    return [
      {
        source: '/',
        destination: '/en',
        permanent: true,
      }
    ]
  },
  
  /* config options here */
  images: {
        remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  }
};

export default nextConfig;

