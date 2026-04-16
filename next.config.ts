import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/projects",
        destination: "/portfolio",
        statusCode: 301
      },
      {
        source: "/projects/:path*",
        destination: "/portfolio/:path*",
        statusCode: 301
      }
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "logo.clearbit.com"
      }
    ]
  }
};

export default nextConfig;
