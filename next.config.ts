import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
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
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
  // Permanent 301 Redirects: Normalize www to non-www and resolve duplicate resources URLs
  async redirects() {
    return [
      // www to non-www redirect
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.devspoint.in",
          },
        ],
        destination: "https://devspoint.in/:path*",
        permanent: true,
      },
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
