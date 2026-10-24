import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mortgage Refinancing Resources & Educational Guides – DevsPoint",
  description:
    "Comprehensive educational guides and financial analysis for mortgage refinancing: mechanics, when to refinance, fee breakdowns, and fixed vs. ARM loan comparisons.",
  alternates: { canonical: "https://devspoint.in/resources" },
  openGraph: { title: "Mortgage Refinancing Resources – DevsPoint", url: "https://devspoint.in/resources" },
};

const resources = [
  {
    slug: "refinancing-guide",
    title: "The Complete Mortgage Refinance Master Guide: Mechanics, Process, & Pitfalls",
    excerpt: "Everything you need to know about refinancing your home loan. From rate-and-term strategies and equity requirements to loan estimates and hidden fees.",
    category: "Master Guide",
    readTime: "12 min read",
    date: "October 12, 2026",
    emoji: "🧭",
  },
  {
    slug: "when-to-refinance",
    title: "When Does It Make Sense to Refinance Your Mortgage?",
    excerpt: "Timing is everything when it comes to refinancing. Learn the key indicators that tell you it's the right time — and red flags that say otherwise.",
    category: "Strategy",
    readTime: "10 min read",
    date: "October 14, 2026",
    emoji: "📅",
  },
  {
    slug: "refinancing-costs",
    title: "Understanding Refinancing Costs: Every Fee Explained",
    excerpt: "Closing costs can eat into your savings if you're not careful. Here's a complete line-by-line breakdown of every fee you might pay when refinancing.",
    category: "Costs",
    readTime: "10 min read",
    date: "October 15, 2026",
    emoji: "💸",
  },
  {
    slug: "fixed-vs-arm",
    title: "Fixed-Rate vs. ARM Mortgage: Which Is Better for Refinancing?",
    excerpt: "Should you refinance into a fixed-rate or adjustable-rate mortgage? We break down the math, SOFR index, 2/2/5 caps, and worst-case stress tests.",
    category: "Loan Types",
    readTime: "10 min read",
    date: "October 16, 2026",
    emoji: "⚖️",
  },
];

export default function ResourcesPage() {
  return (
    <>
      <div className="page-hero" aria-labelledby="resources-title">
        <div className="hero-grid" aria-hidden="true" />
        <div className="page-hero-container">
          <nav aria-label="Breadcrumb">
            <ol className="breadcrumb" style={{ listStyle: "none", padding: 0 }}>
              <li><Link href="/">Home</Link></li>
              <li><span className="breadcrumb-sep" aria-hidden="true">›</span></li>
              <li aria-current="page">Resources</li>
            </ol>
          </nav>
          <h1 id="resources-title" className="page-hero-title">Mortgage Refinancing Resources</h1>
          <p className="page-hero-sub">
            Authoritative, practitioner-written educational guides designed to help homeowners make sound, mathematically verified mortgage decisions.
          </p>
        </div>
      </div>

      <section className="section" aria-labelledby="featured-resources-title">
        <div className="section-container">
          <div>
            <h2 id="featured-resources-title" style={{ fontSize: 24, color: "var(--dark)", marginBottom: 24 }}>
              📚 Core Educational Guides
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
              {resources.map((resource) => (
                <Link
                  key={resource.slug}
                  href={`/resources/${resource.slug}`}
                  style={{ textDecoration: "none" }}
                  aria-label={`Read: ${resource.title}`}
                >
                  <article
                    className="feature-card"
                    style={{ height: "100%", display: "flex", flexDirection: "column" }}
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
                      }}>{resource.category}</span>
                      <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{resource.readTime}</span>
                    </div>
                    <div style={{ fontSize: 32, marginBottom: 12 }} aria-hidden="true">{resource.emoji}</div>
                    <h3 style={{ fontSize: 18, color: "var(--dark)", marginBottom: 10, lineHeight: 1.35 }}>{resource.title}</h3>
                    <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.65, flex: 1 }}>{resource.excerpt}</p>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 20 }}>
                      <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{resource.date}</span>
                      <span style={{ fontSize: 14, color: "var(--primary)", fontWeight: 600 }}>Read Full Guide →</span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>

          {/* Interactive Tool Banner */}
          <div style={{ marginTop: 60, background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", borderRadius: 20, padding: 36, color: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24 }}>
            <div style={{ maxWidth: 600 }}>
              <span style={{ background: "rgba(59,130,246,0.2)", color: "#93c5fd", padding: "4px 12px", borderRadius: 100, fontSize: 12, fontWeight: 700 }}>
                INTERACTIVE SIMULATOR
              </span>
              <h3 style={{ fontSize: 24, fontWeight: 700, margin: "12px 0 8px", color: "#fff" }}>
                Ready to Run Your Own Refinance Scenarios?
              </h3>
              <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 15, lineHeight: 1.6, margin: 0 }}>
                Input your loan numbers and evaluate your exact break-even timeline, total lifetime interest deltas, and monthly payment comparisons client-side.
              </p>
            </div>
            <Link href="/calculator" className="calc-btn" style={{ textDecoration: "none", whiteSpace: "nowrap" }}>
              Open Refinance Engine →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
