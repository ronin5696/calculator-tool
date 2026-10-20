import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mortgage Refinancing Guides & Docs – DevsPoint",
  description:
    "Learn everything about mortgage refinancing — when to refinance, mechanics, refinancing costs, fixed vs ARM loans, and amortization analysis from DevsPoint.",
  alternates: { canonical: "https://devspoint.in/blog" },
  openGraph: { title: "Mortgage Refinancing Guides – DevsPoint", url: "https://devspoint.in/blog" },
};

const articles = [
  {
    slug: "when-to-refinance",
    title: "When Does It Make Sense to Refinance Your Mortgage?",
    excerpt: "Timing is everything when it comes to refinancing. Learn the key indicators that tell you it's the right time — and red flags that say otherwise.",
    category: "Strategy",
    readTime: "8 min read",
    date: "October 15, 2024",
    emoji: "📅",
    featured: true,
  },
  {
    slug: "refinance-costs",
    title: "Understanding Refinancing Costs: Every Fee Explained",
    excerpt: "Closing costs can eat into your savings if you're not careful. Here's a complete breakdown of every fee you might pay when refinancing.",
    category: "Costs",
    readTime: "7 min read",
    date: "October 10, 2024",
    emoji: "💸",
    featured: true,
  },
  {
    slug: "fixed-vs-arm",
    title: "Fixed-Rate vs. ARM Mortgage: Which Is Better for Refinancing?",
    excerpt: "Should you refinance into a fixed-rate or adjustable-rate mortgage? We break down the pros and cons for different financial situations.",
    category: "Loan Types",
    readTime: "6 min read",
    date: "October 5, 2024",
    emoji: "⚖️",
    featured: true,
  },
  {
    slug: "break-even-analysis",
    title: "How to Calculate Your Refinance Break-Even Point",
    excerpt: "The break-even point is the single most important number in your refinancing decision. Here's exactly how to calculate it and use it.",
    category: "Analysis",
    readTime: "5 min read",
    date: "September 28, 2024",
    emoji: "📊",
    featured: false,
  },
  {
    slug: "cash-out-refinance-guide",
    title: "Cash-Out Refinance: Complete Guide for 2024",
    excerpt: "Want to tap your home equity? A cash-out refinance might be the answer — but it comes with important risks you need to understand first.",
    category: "Loan Types",
    readTime: "9 min read",
    date: "September 20, 2024",
    emoji: "💰",
    featured: false,
  },
  {
    slug: "improve-credit-score",
    title: "How to Improve Your Credit Score Before Refinancing",
    excerpt: "Your credit score directly affects the interest rate you'll be offered. Learn proven strategies to boost your score in 30–90 days.",
    category: "Credit",
    readTime: "7 min read",
    date: "September 15, 2024",
    emoji: "📈",
    featured: false,
  },
];

const categories = ["All", "Strategy", "Costs", "Loan Types", "Analysis", "Credit"];

export default function BlogPage() {
  const featured = articles.filter((a) => a.featured);
  const rest = articles.filter((a) => !a.featured);

  return (
    <>
      <div className="page-hero" aria-labelledby="blog-title">
        <div className="hero-grid" aria-hidden="true" />
        <div className="page-hero-container">
          <nav aria-label="Breadcrumb">
            <ol className="breadcrumb" style={{ listStyle: "none", padding: 0 }}>
              <li><Link href="/">Home</Link></li>
              <li><span className="breadcrumb-sep" aria-hidden="true">›</span></li>
              <li aria-current="page">Learn</li>
            </ol>
          </nav>
          <h1 id="blog-title" className="page-hero-title">Mortgage Refinancing Guides</h1>
          <p className="page-hero-sub">
            Expert articles to help you understand refinancing, make smarter decisions, and save more money on your home loan.
          </p>
        </div>
      </div>

      <section className="section" aria-labelledby="featured-articles-title">
        <div className="section-container">
          {/* Featured */}
          <div>
            <h2 id="featured-articles-title" style={{ fontSize: 24, color: "var(--dark)", marginBottom: 24 }}>
              📌 Featured Guides
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px,1fr))", gap: 24 }}>
              {featured.map((article) => (
                <Link
                  key={article.slug}
                  href={`/blog/${article.slug}`}
                  style={{ textDecoration: "none" }}
                  aria-label={`Read: ${article.title}`}
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
                      }}>{article.category}</span>
                      <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{article.readTime}</span>
                    </div>
                    <div style={{ fontSize: 32, marginBottom: 12 }} aria-hidden="true">{article.emoji}</div>
                    <h3 style={{ fontSize: 18, color: "var(--dark)", marginBottom: 10, lineHeight: 1.35 }}>{article.title}</h3>
                    <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.65, flex: 1 }}>{article.excerpt}</p>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 20 }}>
                      <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{article.date}</span>
                      <span style={{ fontSize: 14, color: "var(--primary)", fontWeight: 600 }}>Read More →</span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>

          {/* More articles */}
          <div style={{ marginTop: 56 }}>
            <h2 style={{ fontSize: 24, color: "var(--dark)", marginBottom: 24 }}>📚 More Articles</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {rest.map((article) => (
                <Link
                  key={article.slug}
                  href={`/blog/${article.slug}`}
                  style={{ textDecoration: "none" }}
                  aria-label={`Read: ${article.title}`}
                >
                  <article style={{
                    background: "white",
                    border: "1px solid var(--border)",
                    borderRadius: 16,
                    padding: "24px 28px",
                    display: "flex",
                    alignItems: "center",
                    gap: 20,
                    transition: "all 0.2s ease",
                  }}
                    className="feature-card"
                  >
                    <div style={{ fontSize: 36 }} aria-hidden="true">{article.emoji}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 6 }}>
                        <span style={{
                          background: "var(--primary-light)",
                          color: "var(--primary)",
                          padding: "2px 10px",
                          borderRadius: 100,
                          fontSize: 11,
                          fontWeight: 700,
                          textTransform: "uppercase",
                        }}>{article.category}</span>
                        <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{article.readTime} · {article.date}</span>
                      </div>
                      <h3 style={{ fontSize: 17, color: "var(--dark)", marginBottom: 6 }}>{article.title}</h3>
                      <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6 }}>{article.excerpt}</p>
                    </div>
                    <span style={{ color: "var(--primary)", fontSize: 20, flexShrink: 0 }} aria-hidden="true">→</span>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" aria-labelledby="blog-cta-title">
        <h2 id="blog-cta-title" className="cta-title">Ready to Run the Numbers?</h2>
        <p className="cta-sub">Use our free calculator to see your personalized refinance savings.</p>
        <div className="cta-buttons">
          <Link href="/calculator" id="blog-cta-btn" className="btn-white">🧮 Open Calculator</Link>
        </div>
      </section>
    </>
  );
}
