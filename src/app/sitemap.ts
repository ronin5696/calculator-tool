import { MetadataRoute } from "next";
import { articlesList } from "@/data/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.devspoint.in";

  const staticPages = [
    { url: base, priority: 1.0, changeFrequency: "weekly" as const, lastModified: "2026-10-24T00:00:00.000Z" },
    { url: `${base}/calculator`, priority: 0.95, changeFrequency: "weekly" as const, lastModified: "2026-10-24T00:00:00.000Z" },
    { url: `${base}/calculator/amortization`, priority: 0.95, changeFrequency: "weekly" as const, lastModified: "2026-10-22T00:00:00.000Z" },
    { url: `${base}/calculator/break-even`, priority: 0.95, changeFrequency: "weekly" as const, lastModified: "2026-10-22T00:00:00.000Z" },
    { url: `${base}/calculator/cash-out`, priority: 0.95, changeFrequency: "weekly" as const, lastModified: "2026-10-22T00:00:00.000Z" },
    { url: `${base}/blog`, priority: 0.90, changeFrequency: "weekly" as const, lastModified: "2026-10-24T00:00:00.000Z" },
    { url: `${base}/about`, priority: 0.75, changeFrequency: "monthly" as const, lastModified: "2026-10-24T00:00:00.000Z" },
    { url: `${base}/contact`, priority: 0.70, changeFrequency: "monthly" as const, lastModified: "2026-10-24T00:00:00.000Z" },
    { url: `${base}/privacy-policy`, priority: 0.50, changeFrequency: "monthly" as const, lastModified: "2026-10-24T00:00:00.000Z" },
    { url: `${base}/terms-of-service`, priority: 0.40, changeFrequency: "yearly" as const, lastModified: "2026-10-24T00:00:00.000Z" },
    { url: `${base}/disclaimer`, priority: 0.40, changeFrequency: "yearly" as const, lastModified: "2026-10-24T00:00:00.000Z" },
  ];

  // Canonical blog articles with natural staggered lastModified dates
  const blogPages = articlesList.map((article) => {
    let dateObj: Date;
    try {
      dateObj = new Date(article.updatedDate || article.date);
      if (isNaN(dateObj.getTime())) {
        dateObj = new Date("2026-10-01");
      }
    } catch {
      dateObj = new Date("2026-10-01");
    }

    return {
      url: `${base}/blog/${article.slug}`,
      priority: article.featured ? 0.85 : 0.80,
      changeFrequency: "monthly" as const,
      lastModified: dateObj.toISOString(),
    };
  });

  return [...staticPages, ...blogPages];
}
