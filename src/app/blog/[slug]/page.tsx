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
    title: `${article.title} – DevsPoint Calc`,
    description: article.description,
    authors: [{ name: article.author }],
    alternates: {
      canonical: `https://devspoint.in/blog/${slug}`,
    },
    openGraph: {
      title: `${article.title} – DevsPoint Calc`,
      description: article.description,
      type: "article",
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

  // Related articles (prioritize same category first, excluding current and alias)
  const allOtherSlugs = Object.keys(articles).filter(
    (s) => s !== slug && s !== "refinancing-costs"
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
    },
    publisher: {
      "@type": "Organization",
      name: "DevsPoint",
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
              <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "linear-gradient(135deg, #10b981, #1a56db)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: "14px" }}>
                DP
              </div>
              <div>
                <strong style={{ color: "#fff", display: "block", fontSize: "14px" }}>{article.author}</strong>
                <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)" }}>{article.authorRole}</span>
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
            <span style={{ color: "#34d399", fontWeight: 600 }}>✓ Editorial Fact-Checked</span>
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
            <div className="author-bio-box">
              <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "linear-gradient(135deg, #10b981, #1a56db)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: "20px", flexShrink: 0 }}>
                DP
              </div>
              <div>
                <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#0f172a", marginBottom: "4px" }}>
                  Written by {article.author}
                </h3>
                <p style={{ fontSize: "13px", color: "#64748b", marginBottom: "10px" }}>
                  DevsPoint Financial Engine is an independent software development initiative focused on client-side financial computation, discrete amortization modeling, and debt simulation.
                </p>
                <p style={{ fontSize: "12px", color: "#94a3b8", lineHeight: 1.5 }}>
                  DevsPoint editorial guidelines require all articles to be based on verifiable empirical lending data, primary regulatory sources (CFPB, Federal Reserve), and reviewed for mathematical accuracy.
                </p>
              </div>
            </div>

            {/* Disclosures box */}
            <div className="info-box" style={{ marginTop: "24px" }}>
              <span className="info-box-icon" aria-hidden="true">ℹ️</span>
              <p>
                <strong>Editorial Disclaimer:</strong> DevsPoint Financial Engine is an independent educational publisher and calculator platform. We do not issue loans or originate mortgages. Calculator models are provided for informational and decision-support purposes only.
              </p>
            </div>

            {/* Back link */}
            <div style={{ marginTop: "36px" }}>
              <Link href="/blog" style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "var(--primary)", fontWeight: 600, textDecoration: "none" }}>
                ← Back to all refinancing guides
              </Link>
            </div>
          </main>

          {/* Sticky Sidebar */}
          <aside className="article-sidebar">
            {/* Interactive Calculator CTA */}
            <div style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", borderRadius: "20px", padding: "28px", color: "white", boxShadow: "0 10px 30px rgba(0,0,0,0.15)" }}>
              <div style={{ display: "inline-block", background: "rgba(59,130,246,0.2)", color: "#93c5fd", padding: "4px 12px", borderRadius: "100px", fontSize: "12px", fontWeight: 700, marginBottom: "12px" }}>
                FREE TOOL
              </div>
              <h3 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "10px", color: "#ffffff" }}>
                Calculate Your Exact Break-Even Point
              </h3>
              <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.7)", lineHeight: 1.6, marginBottom: "20px" }}>
                Plug in your current interest rate, remaining balance, and new loan quote to see exact monthly and lifetime savings.
              </p>
              <Link
                href="/calculator"
                className="calc-btn"
                style={{ display: "block", textAlign: "center", textDecoration: "none", width: "100%", boxSizing: "border-box" }}
              >
                Launch Refinance Calculator →
              </Link>
            </div>

            {/* Related Articles */}
            <div style={{ background: "#f8fafc", borderRadius: "20px", padding: "24px", border: "1px solid #e2e8f0" }}>
              <h4 style={{ fontSize: "15px", fontWeight: 700, color: "#0f172a", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "16px" }}>
                Related Guides
              </h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "14px" }}>
                {relatedSlugs.map((s) => {
                  const rel = articles[s];
                  if (!rel) return null;
                  return (
                    <li key={s} style={{ borderBottom: "1px solid #e2e8f0", paddingBottom: "12px" }}>
                      <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--primary)", textTransform: "uppercase" }}>
                        {rel.category}
                      </span>
                      <Link
                        href={`/blog/${s}`}
                        style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#1e293b", textDecoration: "none", marginTop: "4px", lineHeight: 1.4 }}
                      >
                        {rel.title}
                      </Link>
                      <span style={{ fontSize: "12px", color: "#64748b", marginTop: "4px", display: "block" }}>
                        {rel.readTime}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* Explore More Guides */}
      <section className="section section-surface" style={{ padding: "60px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <span className="section-tag">Continue Learning</span>
            <h2 className="section-title">More Mortgage Refinancing Guides</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
            {relatedSlugs.map((s) => {
              const rel = articles[s];
              if (!rel) return null;
              return (
                <article
                  key={s}
                  style={{
                    background: "white",
                    borderRadius: "16px",
                    padding: "24px",
                    border: "1px solid #e2e8f0",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--primary)", textTransform: "uppercase" }}>
                      {rel.category}
                    </span>
                    <h3 style={{ fontSize: "17px", fontWeight: 700, color: "#0f172a", marginTop: "8px", marginBottom: "10px", lineHeight: 1.4 }}>
                      <Link href={`/blog/${s}`} style={{ color: "inherit", textDecoration: "none" }}>
                        {rel.title}
                      </Link>
                    </h3>
                    <p style={{ fontSize: "13px", color: "#64748b", lineHeight: 1.6, marginBottom: "16px" }}>
                      {rel.description}
                    </p>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "12px", color: "#94a3b8", paddingTop: "12px", borderTop: "1px solid #f1f5f9" }}>
                    <span>⏱️ {rel.readTime}</span>
                    <Link href={`/blog/${s}`} style={{ color: "var(--primary)", fontWeight: 600, textDecoration: "none" }}>
                      Read Guide →
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
