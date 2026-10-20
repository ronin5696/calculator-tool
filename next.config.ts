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
  // Redirects
  async redirects() {
    return [
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
