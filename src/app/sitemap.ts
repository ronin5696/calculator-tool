import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://devspoint.in";
  const now = new Date().toISOString();

  const staticPages = [
    { url: base, priority: 1.0, changeFrequency: "weekly" as const },
    { url: `${base}/calculator`, priority: 0.95, changeFrequency: "weekly" as const },
    { url: `${base}/blog`, priority: 0.85, changeFrequency: "weekly" as const },
    { url: `${base}/about`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${base}/contact`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${base}/privacy-policy`, priority: 0.4, changeFrequency: "yearly" as const },
    { url: `${base}/terms-of-service`, priority: 0.4, changeFrequency: "yearly" as const },
    { url: `${base}/disclaimer`, priority: 0.4, changeFrequency: "yearly" as const },
  ];

  const blogSlugs = [
    "when-to-refinance",
    "refinance-costs",
    "fixed-vs-arm",
    "break-even-analysis",
    "cash-out-refinance-guide",
    "improve-credit-score",
  ];

  const blogPages = blogSlugs.map((slug) => ({
    url: `${base}/blog/${slug}`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
    lastModified: now,
  }));

  return [
    ...staticPages.map((p) => ({ ...p, lastModified: now })),
    ...blogPages,
  ];
}
