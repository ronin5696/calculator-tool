import { MetadataRoute } from "next";
import { articles, articlesList } from "@/data/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.devspoint.in";
  const now = "2026-10-29T00:00:00.000Z";

  // Static site routes
  const staticPages: MetadataRoute.Sitemap = [
    { url: base, priority: 1.0, changeFrequency: "daily", lastModified: now },
    { url: `${base}/calculator`, priority: 0.95, changeFrequency: "weekly", lastModified: now },
    { url: `${base}/calculator/amortization`, priority: 0.95, changeFrequency: "weekly", lastModified: now },
    { url: `${base}/calculator/break-even`, priority: 0.95, changeFrequency: "weekly", lastModified: now },
    { url: `${base}/calculator/cash-out`, priority: 0.95, changeFrequency: "weekly", lastModified: now },
    { url: `${base}/blog`, priority: 0.90, changeFrequency: "daily", lastModified: now },
    { url: `${base}/about`, priority: 0.75, changeFrequency: "monthly", lastModified: now },
    { url: `${base}/contact`, priority: 0.70, changeFrequency: "monthly", lastModified: now },
    { url: `${base}/privacy-policy`, priority: 0.50, changeFrequency: "monthly", lastModified: "2026-10-24T00:00:00.000Z" },
    { url: `${base}/terms-of-service`, priority: 0.40, changeFrequency: "yearly", lastModified: "2026-10-24T00:00:00.000Z" },
    { url: `${base}/disclaimer`, priority: 0.40, changeFrequency: "yearly", lastModified: "2026-10-24T00:00:00.000Z" },
  ];

  // Comprehensive union of all registered blog slugs
  const allSlugs = Array.from(
    new Set([
      ...articlesList.map((a) => a.slug),
      ...Object.keys(articles),
    ])
  );

  const blogPages: MetadataRoute.Sitemap = allSlugs.map((slug) => {
    const card = articlesList.find((a) => a.slug === slug);
    const detail = articles[slug];

    const rawDate = card?.updatedDate || detail?.updatedDate || card?.date || detail?.date || "October 26, 2026";
    let dateObj: Date;
    try {
      dateObj = new Date(rawDate);
      if (isNaN(dateObj.getTime())) {
        dateObj = new Date("2026-10-26");
      }
    } catch {
      dateObj = new Date("2026-10-26");
    }

    const isFeatured = card?.featured ?? false;

    return {
      url: `${base}/blog/${slug}`,
      priority: isFeatured ? 0.85 : 0.80,
      changeFrequency: "weekly" as const,
      lastModified: dateObj.toISOString(),
    };
  });

  return [...staticPages, ...blogPages];
}
