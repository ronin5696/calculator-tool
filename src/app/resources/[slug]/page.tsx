import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles } from "@/app/blog/[slug]/page";

type Props = {
  params: Promise<{ slug: string }>;
};

const resourceSlugs = [
  "refinancing-guide",
  "when-to-refinance",
  "refinancing-costs",
  "fixed-vs-arm",
];

export async function generateStaticParams() {
  return resourceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = articles[slug];
  if (!article) return {};

  return {
    title: `${article.title} – DevsPoint Resources`,
    description: article.description,
    authors: [{ name: article.author }],
    alternates: {
      canonical: `https://devspoint.in/resources/${slug}`,
    },
    openGraph: {
      title: `${article.title} – DevsPoint Resources`,
      description: article.description,
      type: "article",
      publishedTime: article.date,
      authors: [article.author],
      url: `https://devspoint.in/resources/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
    },
  };
}

export default async function ResourcePage({ params }: Props) {
  const { slug } = await params;
  const article = articles[slug];

  if (!article) {
    notFound();
  }

  // Related resources
  const relatedSlugs = resourceSlugs.filter((s) => s !== slug);

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
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://devspoint.in/resources/${slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="page-hero" aria-labelledby="resource-hero-title">
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
                <Link href="/resources">Resources</Link>
              </li>
              <li>
                <span className="breadcrumb-sep" aria-hidden="true">›</span>
              </li>
              <li aria-current="page" style={{ color: "rgba(255,255,255,0.9)", maxWidth: "320px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {article.title}
              </li>
            </ol>
          </nav>

          <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "16px", flexWrap: "wrap" }}>
            <span style={{
              background: "rgba(16, 185, 129, 0.2)",
              color: "#34d399",
              padding: "4px 14px",
              borderRadius: "100px",
              fontSize: "12px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              border: "1px solid rgba(52, 211, 153, 0.3)",
            }}>
              {article.category}
            </span>
            <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px" }}>
              Comprehensive Guide
            </span>
          </div>

          <h1 id="resource-hero-title" className="page-hero-title" style={{ fontSize: "clamp(26px, 4vw, 42px)", lineHeight: 1.25 }}>
            {article.title}
          </h1>

          <p className="page-hero-sub" style={{ fontSize: "17px", color: "rgba(255,255,255,0.85)", maxWidth: "800px" }}>
            {article.description}
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginTop: "24px", color: "rgba(255,255,255,0.7)", fontSize: "14px", flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "linear-gradient(135deg, #10b981, #1a56db)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: "13px" }}>
                DP
              </div>
              <div>
                <strong style={{ color: "#fff", display: "block", fontSize: "14px" }}>{article.author}</strong>
                <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)" }}>{article.authorRole}</span>
              </div>
            </div>
            <span>•</span>
            <span>{article.date}</span>
            <span>•</span>
            <span>⏱️ {article.readTime}</span>
            <span>•</span>
            <span style={{ color: "#34d399", fontWeight: 600 }}>✓ Editorial Fact-Checked</span>
          </div>
        </div>
      </div>

      <section className="section article-section" style={{ background: "#ffffff" }}>
        <div className="article-layout-grid">
          {/* Main content */}
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
                  DevsPoint editorial standards require rigorous fact-checking against CFPB guidelines, Federal Reserve consumer credit publications, and closed-form discrete compounding annuity math.
                </p>
              </div>
            </div>

            {/* Disclosures box */}
            <div className="info-box" style={{ marginTop: "24px" }}>
              <span className="info-box-icon" aria-hidden="true">ℹ️</span>
              <p>
                <strong>Educational &amp; Legal Disclaimer:</strong> DevsPoint Financial Engine (<a href="https://devspoint.in">devspoint.in</a>) is an open-source educational utility. We are software engineers and financial analysts, not licensed mortgage brokers or depository institutions. Calculations are mathematical models for informational purposes.
              </p>
            </div>

            {/* Back link */}
            <div style={{ marginTop: "36px" }}>
              <Link href="/resources" style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "var(--primary)", fontWeight: 600, textDecoration: "none" }}>
                ← Back to all educational resources
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
                Test Your Refinance Numbers
              </h3>
              <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.7)", lineHeight: 1.6, marginBottom: "20px" }}>
                Simulate monthly payments, interest savings, and exact break-even months client-side with 0 server tracking.
              </p>
              <Link
                href="/calculator"
                className="calc-btn"
                style={{ display: "block", textAlign: "center", textDecoration: "none", width: "100%", boxSizing: "border-box" }}
              >
                Launch Refinance Calculator →
              </Link>
            </div>

            {/* Companion Guides */}
            <div style={{ background: "#f8fafc", borderRadius: "20px", padding: "24px", border: "1px solid #e2e8f0" }}>
              <h4 style={{ fontSize: "15px", fontWeight: 700, color: "#0f172a", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "16px" }}>
                Companion Resources
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
                        href={`/resources/${s}`}
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
    </>
  );
}
