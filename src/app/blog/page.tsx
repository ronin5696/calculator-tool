import type { Metadata } from "next";
import Link from "next/link";
import { articlesList, blogCategories } from "@/data/blog";

export const metadata: Metadata = {
  title: "Mortgage Refinancing Guides & Docs – DevsPoint",
  description:
    "Explore 20+ comprehensive mortgage refinancing guides: when to refinance, break-even velocity, FHA & VA streamline, HELOC vs cash-out, removing PMI, closing fees, and loan comparisons.",
  alternates: { canonical: "https://devspoint.in/blog" },
  openGraph: { title: "Mortgage Refinancing Guides – DevsPoint", url: "https://devspoint.in/blog" },
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
              <li aria-current="page">Guides &amp; Editorial</li>
            </ol>
          </nav>
          <h1 id="blog-title" className="page-hero-title">Mortgage Refinancing Knowledge Base</h1>
          <p className="page-hero-sub">
            Practitioner-grade financial analyses, discrete amortization math, regulatory disclosures, and actionable guidance to help you navigate your home loan.
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
                Core foundational guides for mortgage decision-making
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
                      <span style={{ fontSize: 12, color: "var(--text-muted)" }}>Updated {article.updatedDate || article.date}</span>
                      <span style={{ fontSize: 14, color: "var(--primary)", fontWeight: 600 }}>Read Guide →</span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>

          {/* Complete Library of Articles */}
          <div style={{ marginTop: 64 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
              <h2 style={{ fontSize: 24, color: "var(--dark)", margin: 0 }}>
                📚 Complete Guide Library ({articlesList.length} In-Depth Articles)
              </h2>
              <span style={{ fontSize: 14, color: "var(--text-muted)" }}>
                Fact-checked &amp; reviewed by DevsPoint Engineering Labs
              </span>
            </div>
            
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 20 }}>
              {rest.map((article) => (
                <Link
                  key={article.slug}
                  href={`/blog/${article.slug}`}
                  style={{ textDecoration: "none" }}
                  aria-label={`Read: ${article.title}`}
                >
                  <article
                    className="feature-card"
                    style={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      padding: "24px 26px",
                      background: "white",
                      boxSizing: "border-box",
                    }}
                  >
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                        <span style={{
                          background: "var(--primary-light)",
                          color: "var(--primary)",
                          padding: "3px 10px",
                          borderRadius: 100,
                          fontSize: 11,
                          fontWeight: 700,
                          textTransform: "uppercase",
                        }}>{article.category}</span>
                        <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{article.readTime}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 10 }}>
                        <span style={{ fontSize: 24, flexShrink: 0, marginTop: 2 }} aria-hidden="true">{article.emoji}</span>
                        <h3 style={{ fontSize: 17, color: "var(--dark)", margin: 0, lineHeight: 1.4 }}>{article.title}</h3>
                      </div>
                      <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 16 }}>
                        {article.excerpt}
                      </p>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12, color: "var(--text-muted)", paddingTop: 12, borderTop: "1px solid var(--border)" }}>
                      <span>Updated {article.updatedDate || article.date}</span>
                      <span style={{ color: "var(--primary)", fontWeight: 600 }}>Explore →</span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Tool Banner */}
      <section className="section section-surface" style={{ padding: "48px 24px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", borderRadius: 24, padding: "40px", color: "white", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
          <span style={{ background: "rgba(59,130,246,0.25)", color: "#93c5fd", padding: "6px 16px", borderRadius: 100, fontSize: 13, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 16 }}>
            Interactive Financial Engine
          </span>
          <h2 style={{ fontSize: 30, color: "white", marginBottom: 14 }}>
            Stop Guessing. Calculate Your Exact Break-Even Velocity.
          </h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.75)", maxWidth: 640, lineHeight: 1.6, marginBottom: 28 }}>
            Our client-side discrete amortization engine models your remaining term, closing friction, and net lifetime interest savings in real-time.
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
            <Link href="/calculator" className="calc-btn" style={{ textDecoration: "none", padding: "14px 28px", fontSize: 15 }}>
              🧮 Refinance Calculator
            </Link>
            <Link href="/calculator/break-even" className="btn-outline-white" style={{ textDecoration: "none", padding: "14px 28px", fontSize: 15 }}>
              ⏱️ Break-Even Calculator
            </Link>
            <Link href="/calculator/cash-out" className="btn-outline-white" style={{ textDecoration: "none", padding: "14px 28px", fontSize: 15 }}>
              💰 Cash-Out Calculator
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" aria-labelledby="blog-cta-title">
        <h2 id="blog-cta-title" className="cta-title">Ready to Optimize Your Mortgage?</h2>
        <p className="cta-sub">Run simulations across multiple scenarios and find the exact path that saves you the most money.</p>
        <div className="cta-buttons">
          <Link href="/calculator" id="blog-cta-btn" className="btn-white">Launch Free Calculator</Link>
        </div>
      </section>
    </>
  );
}
