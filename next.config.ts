import type { NextConfig } from "next";

const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "base-uri 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://logo.clearbit.com",
  "font-src 'self' https://fonts.gstatic.com",
  "connect-src 'self' https://vitals.vercel-insights.com https://va.vercel-scripts.com",
  "frame-src 'self' https://calendly.com",
  "form-action 'self'"
].join('; ');

const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), accelerometer=(), gyroscope=()"
  },
  { key: "Content-Security-Policy-Report-Only", value: CONTENT_SECURITY_POLICY },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" }
];

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
      },
      {
        source: "/portfolio/realtime-lead-buying",
        destination: "/portfolio/realtime-decision-routing-system",
        statusCode: 301
      }
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders
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
