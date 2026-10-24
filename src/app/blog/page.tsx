import type { Metadata } from "next";
import Link from "next/link";
import { articlesList, blogCategories } from "@/data/blog";

export const metadata: Metadata = {
  title: "Indian Home Loan Balance Transfer & EMI Guides – DevsPoint",
  description:
    "Explore 20+ comprehensive Indian home loan guides: balance transfer procedures, RBI repo-linked rates (RLLR), MODT charges, prepayment math, tax benefits under Section 24(b), and bank comparisons.",
  alternates: { canonical: "https://devspoint.in/blog" },
  openGraph: { title: "Indian Home Loan Balance Transfer Guides – DevsPoint", url: "https://devspoint.in/blog" },
};

export default function BlogPage() {
  const featured = articlesList.filter((a) => a.featured);
  const rest = articlesList.filter((a) => !a.featured);

  return (
    <>
      <div className="page-hero" aria-labelledby="blog-title">
        <div className="hero-grid" aria-hidden="true" />
        <div className="page-hero-container">
          <nav aria-label="Breadcrumb">
            <ol className="breadcrumb" style={{ listStyle: "none", padding: 0 }}>
              <li><Link href="/">Home</Link></li>
              <li><span className="breadcrumb-sep" aria-hidden="true">›</span></li>
              <li aria-current="page">Home Loan Guides</li>
            </ol>
          </nav>
          <div style={{ display: "inline-block", background: "rgba(59,130,246,0.2)", color: "#93c5fd", padding: "4px 12px", borderRadius: "100px", fontSize: "12px", fontWeight: 700, marginBottom: "12px" }}>
            🇮🇳 INDIAN HOME LOANS · EXPERT GUIDES
          </div>
          <h1 id="blog-title" className="page-hero-title">Home Loan Balance Transfer Knowledge Base</h1>
          <p className="page-hero-sub">
            Practitioner-grade financial analyses, RBI regulatory circular breakdowns, discrete EMI math, and actionable guidance to help Indian homeowners save lakhs on their loans.
          </p>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "24px" }}>
            {blogCategories.map((cat) => (
              <span
                key={cat}
                style={{
                  background: "rgba(255,255,255,0.12)",
                  color: "#e2e8f0",
                  padding: "5px 14px",
                  borderRadius: "100px",
                  fontSize: "12px",
                  fontWeight: 600,
                  backdropFilter: "blur(6px)",
                }}
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </div>

      <section className="section" aria-labelledby="featured-articles-title">
        <div className="section-container">
          {/* Featured Guides */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
              <h2 id="featured-articles-title" style={{ fontSize: 24, color: "var(--dark)", margin: 0 }}>
                📌 Featured Master Guides
              </h2>
              <span style={{ fontSize: 14, color: "var(--text-muted)" }}>
                Core foundational guides for Indian home loan borrowers
              </span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
              {featured.map((article) => (
                <Link
                  key={article.slug}
                  href={`/blog/${article.slug}`}
                  style={{ textDecoration: "none" }}
                  aria-label={`Read: ${article.title}`}
                >
                  <article
                    className="feature-card"
                    style={{ height: "100%", display: "flex", flexDirection: "column", boxSizing: "border-box" }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                      <span style={{
                        background: "var(--primary-light)",
                        color: "var(--primary)",
                        padding: "3px 12px",
                        borderRadius: 100,
                        fontSize: 12,
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}>{article.category}</span>
                      <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{article.readTime}</span>
                    </div>
                    <div style={{ fontSize: 32, marginBottom: 12 }} aria-hidden="true">{article.emoji}</div>
                    <h3 style={{ fontSize: 18, color: "var(--dark)", marginBottom: 10, lineHeight: 1.35 }}>{article.title}</h3>
                    <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.65, flex: 1 }}>{article.excerpt}</p>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 20, paddingTop: 14, borderTop: "1px solid var(--border)" }}>
                      <span style={{ fontSize: 12, color: "var(--text-muted)" }}>Published {article.date}</span>
                      <span style={{ fontSize: 14, color: "var(--primary)", fontWeight: 600 }}>Read Guide →</span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>

          {/* Remaining Guides */}
          <div style={{ marginTop: 56 }}>
            <h2 style={{ fontSize: 24, color: "var(--dark)", marginBottom: 24 }}>
              📖 Complete Research &amp; Analysis Library
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
              {rest.map((article) => (
                <Link
                  key={article.slug}
                  href={`/blog/${article.slug}`}
                  style={{ textDecoration: "none" }}
                  aria-label={`Read: ${article.title}`}
                >
                  <article
                    className="feature-card"
                    style={{ height: "100%", display: "flex", flexDirection: "column", boxSizing: "border-box", padding: 22 }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                      <span style={{
                        background: "var(--surface)",
                        border: "1px solid var(--border)",
                        color: "var(--text-secondary)",
                        padding: "2px 10px",
                        borderRadius: 100,
                        fontSize: 11,
                        fontWeight: 600,
                      }}>{article.category}</span>
                      <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{article.readTime}</span>
                    </div>
                    <div style={{ fontSize: 26, marginBottom: 8 }} aria-hidden="true">{article.emoji}</div>
                    <h3 style={{ fontSize: 16, color: "var(--dark)", marginBottom: 8, lineHeight: 1.4 }}>{article.title}</h3>
                    <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6, flex: 1 }}>{article.excerpt}</p>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 16, paddingTop: 12, borderTop: "1px solid var(--border)" }}>
                      <span style={{ fontSize: 11, color: "var(--text-muted)" }}>{article.date}</span>
                      <span style={{ fontSize: 13, color: "var(--primary)", fontWeight: 600 }}>Read →</span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
