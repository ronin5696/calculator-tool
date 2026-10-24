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
      // Old duplicate blog slugs permanently redirecting to canonical versions
      {
        source: "/blog/refinancing-guide",
        destination: "/blog/home-loan-balance-transfer-guide",
        permanent: true,
      },
      {
        source: "/blog/when-to-refinance",
        destination: "/blog/when-to-transfer-home-loan",
        permanent: true,
      },
      {
        source: "/blog/refinancing-costs",
        destination: "/blog/home-loan-transfer-charges-modt",
        permanent: true,
      },
      {
        source: "/blog/refinance-costs",
        destination: "/blog/home-loan-transfer-charges-modt",
        permanent: true,
      },
      {
        source: "/blog/fixed-vs-arm",
        destination: "/blog/rllr-vs-mclr-home-loan-interest-rates",
        permanent: true,
      },
      {
        source: "/blog/heloc-vs-cash-out-refinance",
        destination: "/blog/home-loan-top-up-vs-personal-loan",
        permanent: true,
      },
      {
        source: "/blog/cash-out-refinance-guide",
        destination: "/blog/home-loan-top-up-vs-personal-loan",
        permanent: true,
      },
      {
        source: "/blog/break-even-analysis",
        destination: "/blog/when-to-transfer-home-loan",
        permanent: true,
      },
      {
        source: "/blog/improve-credit-score",
        destination: "/blog/cibil-score-home-loan-balance-transfer",
        permanent: true,
      },
      {
        source: "/blog/refinance-with-bad-credit",
        destination: "/blog/cibil-score-home-loan-balance-transfer",
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
