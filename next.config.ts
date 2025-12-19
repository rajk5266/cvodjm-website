import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/en',
        permanent: true,
      },
    ];
  },

  images: {
    // Option 1: simpler
    domains: ['images.unsplash.com'],

    // Option 2: remotePatterns (more flexible)
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'images.unsplash.com',
    //     port: '',           // optional
    //     pathname: '/**',    // match all paths
    //   },
    // ],
  },
};

export default nextConfig;
