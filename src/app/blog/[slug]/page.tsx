import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, type ArticleData } from "@/data/blog";

// Re-export articles and type for backwards compatibility with any other route
export { articles, type ArticleData };

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = articles[slug];
  if (!article) return {};

  return {
    title: `${article.title} – DevsPoint Home Loans`,
    description: article.description,
    authors: [{ name: article.author }],
    alternates: {
      canonical: `https://devspoint.in/blog/${slug}`,
    },
    openGraph: {
      title: `${article.title} – DevsPoint Home Loans`,
      description: article.description,
      type: "article",
      locale: "en_IN",
      publishedTime: article.date,
      modifiedTime: article.updatedDate || article.date,
      authors: [article.author],
      url: `https://devspoint.in/blog/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const article = articles[slug];

  if (!article) {
    notFound();
  }

  // Related articles (prioritize same category first, excluding current)
  const allOtherSlugs = Object.keys(articles).filter(
    (s) => s !== slug && !s.includes("refinancing-costs") && !s.includes("refinance-costs")
  );
  
  const sameCategorySlugs = allOtherSlugs.filter(
    (s) => articles[s].category === article.category
  );
  const differentCategorySlugs = allOtherSlugs.filter(
    (s) => articles[s].category !== article.category
  );

  const relatedSlugs = [...sameCategorySlugs, ...differentCategorySlugs].slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    author: {
      "@type": "Person",
      name: article.author,
      jobTitle: article.authorRole,
      url: "https://devspoint.in/about",
    },
    editor: {
      "@type": "Person",
      name: article.reviewer || "Priya Nair, CFA",
      jobTitle: article.reviewerRole || "Quantitative Modeler & Software Engineer",
      url: "https://devspoint.in/about",
    },
    publisher: {
      "@type": "Organization",
      name: "DevsPoint Home Loan Engine",
      url: "https://devspoint.in",
    },
    datePublished: article.date,
    dateModified: article.updatedDate || article.date,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://devspoint.in/blog/${slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="page-hero" aria-labelledby="article-hero-title">
        <div className="hero-grid" aria-hidden="true" />
        <div className="page-hero-container">
          <nav aria-label="Breadcrumb">
            <ol className="breadcrumb" style={{ listStyle: "none", padding: 0 }}>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <span className="breadcrumb-sep" aria-hidden="true">›</span>
              </li>
              <li>
                <Link href="/blog">Guides</Link>
              </li>
              <li>
                <span className="breadcrumb-sep" aria-hidden="true">›</span>
              </li>
              <li aria-current="page" style={{ color: "rgba(255,255,255,0.9)", maxWidth: "320px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {article.title}
              </li>
            </ol>
          </nav>

          <div style={{ display: "inline-block", background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)", padding: "4px 14px", borderRadius: "100px", fontSize: "12px", fontWeight: 700, color: "#93c5fd", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "16px" }}>
            {article.category}
          </div>

          <h1 id="article-hero-title" className="page-hero-title" style={{ maxWidth: "900px" }}>
            {article.title}
          </h1>

          <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap", marginTop: "20px", color: "rgba(255,255,255,0.75)", fontSize: "14px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "38px", height: "38px", borderRadius: "50%", background: "linear-gradient(135deg, #10b981, #1a56db)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: "13px" }}>
                VS
              </div>
              <div>
                <strong style={{ color: "#fff", display: "block", fontSize: "14px" }}>{article.author}</strong>
                <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)" }}>{article.authorRole}</span>
              </div>
            </div>
            <span>•</span>
            <span>Published: {article.date}</span>
            {article.updatedDate && (
              <>
                <span>•</span>
                <span style={{ color: "#93c5fd", fontWeight: 600 }}>Updated: {article.updatedDate}</span>
              </>
            )}
            <span>•</span>
            <span>⏱️ {article.readTime}</span>
            <span>•</span>
            <span style={{ color: "#34d399", fontWeight: 600 }}>✓ Reviewed by Priya Nair, CFA</span>
          </div>
        </div>
      </div>

      <section className="section article-section" style={{ background: "#ffffff" }}>
        <div className="article-layout-grid">
          {/* Main article content */}
          <main>
            <div
              className="prose"
              style={{ maxWidth: "100%", lineHeight: 1.8 }}
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Author E-E-A-T Bio Box */}
            <div className="author-bio-box" style={{ marginTop: 40, background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 16, padding: 24, display: "flex", gap: 20, alignItems: "flex-start", flexWrap: "wrap" }}>
              <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "linear-gradient(135deg, #1a56db, #10b981)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: "20px", flexShrink: 0 }}>
                VS
              </div>
              <div style={{ flex: 1, minWidth: 260 }}>
                <h3 style={{ fontSize: "17px", fontWeight: 700, color: "#0f172a", marginBottom: "4px" }}>
                  Written by {article.author}
                </h3>
                <p style={{ fontSize: "13px", color: "#0284c7", fontWeight: 600, marginBottom: "8px" }}>
                  {article.authorRole} · Reviewed by {article.reviewer || "Priya Nair, CFA"}
                </p>
                <p style={{ fontSize: "14px", color: "#475569", lineHeight: 1.6, marginBottom: 8 }}>
                  Vikramaditya Sharma, CFP® has over 14 years of retail mortgage underwriting experience in Indian banking. DevsPoint editorial guidelines require all articles to be based on official Reserve Bank of India (RBI) notifications, bank tariff schedules, and verified mathematical models.
                </p>
                <div style={{ fontSize: 13, color: "var(--primary)" }}>
                  <Link href="/about" style={{ textDecoration: "none", fontWeight: 600 }}>
                    Learn more about our editorial and fact-checking methodology →
                  </Link>
                </div>
              </div>
            </div>

            {/* Disclosures box */}
            <div className="info-box" style={{ marginTop: "24px" }}>
              <span className="info-box-icon" aria-hidden="true">ℹ️</span>
              <p>
                <strong>Regulatory &amp; Editorial Disclaimer:</strong> DevsPoint Home Loan Engine is an independent educational publisher and calculator platform. We do not originate mortgages, issue loans, or act as a Direct Selling Agent (DSA). Calculations are estimates based on client-side annuity algorithms and published lender benchmarks.
              </p>
            </div>

            {/* Back link */}
            <div style={{ marginTop: "36px" }}>
              <Link href="/blog" style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "var(--primary)", fontWeight: 600, textDecoration: "none" }}>
                ← Back to all home loan guides
              </Link>
            </div>
          </main>

          {/* Sticky Sidebar */}
          <aside className="article-sidebar">
            {/* Interactive Calculator CTA */}
            <div style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", borderRadius: "20px", padding: "28px", color: "white", boxShadow: "0 10px 30px rgba(0,0,0,0.15)" }}>
              <div style={{ display: "inline-block", background: "rgba(59,130,246,0.2)", color: "#93c5fd", padding: "4px 12px", borderRadius: "100px", fontSize: "12px", fontWeight: 700, marginBottom: "12px" }}>
                FREE TOOL · 🇮🇳 INR
              </div>
              <h3 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "10px", color: "#ffffff" }}>
                Calculate Your Balance Transfer Savings
              </h3>
              <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.7)", lineHeight: 1.6, marginBottom: "20px" }}>
                Input your existing home loan rate and balance to check instant monthly EMI savings and switching break-even periods.
              </p>
              <Link
                href="/calculator"
                className="calc-btn"
                style={{ display: "block", textAlign: "center", textDecoration: "none", width: "100%", boxSizing: "border-box" }}
              >
                Launch Balance Transfer Calculator →
              </Link>
            </div>

            {/* Related Articles */}
            <div style={{ background: "#f8fafc", borderRadius: "20px", padding: "24px", border: "1px solid #e2e8f0" }}>
              <h4 style={{ fontSize: "15px", fontWeight: 700, color: "#0f172a", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "16px" }}>
                Related Guides
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {relatedSlugs.map((relSlug) => {
                  const rel = articles[relSlug];
                  if (!rel) return null;
                  return (
                    <Link
                      key={relSlug}
                      href={`/blog/${relSlug}`}
                      style={{ textDecoration: "none", color: "inherit", display: "block" }}
                    >
                      <div style={{ fontSize: "11px", color: "var(--primary)", fontWeight: 700, textTransform: "uppercase", marginBottom: "4px" }}>
                        {rel.category}
                      </div>
                      <div style={{ fontSize: "14px", fontWeight: 600, color: "#0f172a", lineHeight: 1.4, marginBottom: "4px" }}>
                        {rel.title}
                      </div>
                      <div style={{ fontSize: "12px", color: "#64748b" }}>
                        {rel.readTime}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
