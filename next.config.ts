import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimize images
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Security headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
  // Permanent 301 Redirects: Resolve duplicate resources URLs & legacy paths
  async redirects() {
    return [
      // Duplicate URL resolution: /resources/:slug permanently redirects to canonical /blog/:slug
      {
        source: "/resources/:slug",
        destination: "/blog/:slug",
        permanent: true,
      },
      {
        source: "/resources",
        destination: "/blog",
        permanent: true,
      },
      // Legacy routes
      {
        source: "/amortization-schedule",
        destination: "/calculator/amortization",
        permanent: true,
      },
      {
        source: "/break-even-calculator",
        destination: "/calculator/break-even",
        permanent: true,
      },
      {
        source: "/cash-out-refinance",
        destination: "/calculator/cash-out",
        permanent: true,
      },
    ];
  },
  // Compression
  compress: true,
  // Powered by header
  poweredByHeader: false,
};

export default nextConfig;
