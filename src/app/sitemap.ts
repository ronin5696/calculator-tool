import { MetadataRoute } from "next";
import { articlesList } from "@/data/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://devspoint.in";
  const now = new Date().toISOString();

  const staticPages = [
    { url: base, priority: 1.0, changeFrequency: "weekly" as const },
    { url: `${base}/calculator`, priority: 0.95, changeFrequency: "weekly" as const },
    { url: `${base}/calculator/amortization`, priority: 0.95, changeFrequency: "weekly" as const },
    { url: `${base}/calculator/break-even`, priority: 0.95, changeFrequency: "weekly" as const },
    { url: `${base}/calculator/cash-out`, priority: 0.95, changeFrequency: "weekly" as const },
    { url: `${base}/blog`, priority: 0.85, changeFrequency: "weekly" as const },
    { url: `${base}/resources`, priority: 0.85, changeFrequency: "weekly" as const },
    { url: `${base}/about`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${base}/contact`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${base}/privacy-policy`, priority: 0.4, changeFrequency: "yearly" as const },
    { url: `${base}/terms-of-service`, priority: 0.4, changeFrequency: "yearly" as const },
    { url: `${base}/disclaimer`, priority: 0.4, changeFrequency: "yearly" as const },
  ];

  // All 20+ blog articles
  const blogPages = articlesList.map((article) => ({
    url: `${base}/blog/${article.slug}`,
    priority: article.featured ? 0.85 : 0.8,
    changeFrequency: "monthly" as const,
    lastModified: now,
  }));

  const resourceSlugs = [
    "refinancing-guide",
    "when-to-refinance",
    "refinancing-costs",
    "fixed-vs-arm",
  ];

  const resourcePages = resourceSlugs.map((slug) => ({
    url: `${base}/resources/${slug}`,
    priority: 0.85,
    changeFrequency: "monthly" as const,
    lastModified: now,
  }));

  return [
    ...staticPages.map((p) => ({ ...p, lastModified: now })),
    ...blogPages,
    ...resourcePages,
  ];
}
