import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'moransbikeshop.ie',
            }
    ]
  }
};

export default nextConfig;
