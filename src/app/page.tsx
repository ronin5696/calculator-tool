import type { Metadata } from "next";
import Link from "next/link";
import RefinanceCalculator from "@/components/RefinanceCalculator";

export const metadata: Metadata = {
  title: "Home Loan Balance Transfer Calculator (2026) – Compare EMI & Charges | DevsPoint",
  description:
    "Free Home Loan Balance Transfer Calculator India: compare current interest rates with SBI, HDFC, ICICI & Axis. Calculate monthly EMI savings, MODT charges, and break-even periods.",
  keywords: [
    "home loan balance transfer calculator",
    "home loan transfer charges",
    "modt charges in home loan",
    "modt in home loan",
    "pmay clss",
    "clss subsidy",
    "pmay clss subsidy calculator",
    "home loan balance transfer process",
    "sbi home loan balance transfer",
    "hdfc home loan balance transfer",
    "rbi repo linked lending rate rllr",
    "home loan emi calculator india",
  ],
  alternates: { canonical: "https://www.devspoint.in" },
  openGraph: {
    title: "Home Loan Balance Transfer Calculator (2026) – DevsPoint",
    description:
      "Compare your current home loan against top Indian lenders. Compute monthly EMI savings, MODT stamp duty, and break-even periods in Indian Rupees.",
    url: "https://www.devspoint.in",
  },
};

const features = [
  {
    icon: "💰",
    color: "blue",
    title: "Monthly EMI Reduction",
    desc: "Calculate your exact monthly EMI savings after transferring your home loan to a lower repo-linked lending rate (RLLR).",
  },
  {
    icon: "⏱️",
    color: "purple",
    title: "Switching Break-Even Period",
    desc: "Determine how many months it takes for EMI savings to fully recover MODT stamp duty, processing fees, and valuation charges.",
  },
  {
    icon: "📋",
    color: "green",
    title: "Dual Amortization Schedule",
    desc: "Side-by-side annual balance decay and cumulative interest savings across your remaining 10 to 30 year tenure.",
  },
  {
    icon: "🏛️",
    color: "orange",
    title: "RBI Guidelines Aligned",
    desc: "Simulate loans under official Reserve Bank of India mandates: zero foreclosure or prepayment penalties on all retail floating rate loans.",
  },
  {
    icon: "⚡",
    color: "sky",
    title: "Sub-Millisecond Browser Math",
    desc: "Calculations execute instantaneously in your browser memory using verified annuity mathematical routines.",
  },
  {
    icon: "🔒",
    color: "pink",
    title: "Private In-Browser Execution",
    desc: "All loan calculations stay strictly on your device. We do not transmit, log, or store your personal financial numbers on any server.",
  },
];

const faqs = [
  {
    q: "Can I transfer my home loan from one bank to another in India?",
    a: "Yes. Home Loan Balance Transfer is a standard retail banking process in India. If another bank offers a lower interest rate or superior terms, they will sanction a new loan that pays off your outstanding principal with your existing lender and takes over the title deeds.",
  },
  {
    q: "Can my existing bank charge a penalty for transferring my home loan?",
    a: "No. Under Reserve Bank of India (RBI) regulations, banks and Housing Finance Companies (HFCs) are strictly prohibited from levying foreclosure charges or prepayment penalties on floating-rate home loans sanctioned to individual borrowers.",
  },
  {
    q: "What expenses are involved in a home loan balance transfer?",
    a: "While there is zero foreclosure penalty from your old bank, the new bank typically charges a processing fee (typically ₹5,000 to ₹15,000 or 0.25%-0.50%), MODT (Memorandum of Deposit of Title Deeds) stamp duty (0.1% to 0.5% depending on your state), and legal/valuation fees (₹3,000 to ₹6,000). Our calculator accounts for all these costs in the break-even analysis.",
  },
  {
    q: "How much interest rate difference makes a balance transfer worthwhile?",
    a: "Generally, an interest rate difference of 0.35% to 0.50% or higher justifies a balance transfer if you have at least 7 to 10 years remaining on your loan. On a ₹50 Lakh loan with 15 years left, even a 0.50% drop saves over ₹2.8 Lakhs in interest!",
  },
  {
    q: "Can I negotiate a lower rate with my existing bank instead of transferring?",
    a: "Yes! Before completing a full balance transfer, ask your current bank for a 'Rate Conversion / Switch'. Many Indian banks (like SBI, HDFC, and ICICI) will reduce your interest rate to their current new-customer rate for a nominal conversion fee of ₹1,000 to ₹5,000.",
  },
  {
    q: "How does DevsPoint protect my financial privacy?",
    a: "Our calculators run 100% locally in your browser using pure JavaScript. Your outstanding loan balance, interest rate, and financial numbers are never uploaded to our servers or saved in any database.",
  },
];

const featuredGuides = [
  {
    slug: "modt-charges-in-home-loan",
    title: "MODT Charges in Home Loan: Meaning, State Rates & Calculation",
    excerpt: "Understand Memorandum of Deposit of Title Deeds (MODT) stamp duty rates across Maharashtra, Karnataka, Tamil Nadu, and step-by-step cancellation.",
    category: "Cost Analysis",
    readTime: "11 min read",
    emoji: "📜",
  },
  {
    slug: "pmay-clss-subsidy-guide-eligibility-calculator-status",
    title: "PMAY CLSS Subsidy: Eligibility, Slabs & Online Status Tracking",
    excerpt: "Complete guide to PMAY Credit Linked Subsidy Scheme (CLSS) & PMAY-U 2.0: income categories, NPV subsidy formulas, and CLAP portal tracking.",
    category: "Government Schemes",
    readTime: "12 min read",
    emoji: "🏛️",
  },
  {
    slug: "home-loan-balance-transfer-guide",
    title: "The Master Guide to Home Loan Balance Transfers in India",
    excerpt: "Everything you need to know about switching your home loan: RBI rules, NOC checklists, MODT stamp duty, and negotiating with your current bank.",
    category: "Master Guide",
    readTime: "12 min read",
    emoji: "📘",
  },
  {
    slug: "when-to-transfer-home-loan",
    title: "When Does It Make Sense to Transfer Your Home Loan?",
    excerpt: "The exact math of balance transfers. Why remaining tenure matters more than loan size, and how to calculate your break-even horizon.",
    category: "Strategy",
    readTime: "9 min read",
    emoji: "⏱️",
  },
];

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "DevsPoint Home Loan Balance Transfer Calculator",
        url: "https://www.devspoint.in",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        description:
          "Free Indian Home Loan Balance Transfer & EMI Calculator. Calculate monthly EMI savings, MODT charges, and switching break-even periods.",
        offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: f.a,
          },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* ─── Hero ─── */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-container">
          <div>
            <div className="hero-badge" role="note">
              <span>🇮🇳</span> Indian Home Loan Intelligence · Verified Mathematical Engine
            </div>
            <h1 id="hero-title" className="hero-title">
              Save Lakhs on Your Existing Home Loan: <span>Smart Balance Transfer</span> &amp; EMI Calculator
            </h1>
            <p className="hero-subtitle">
              Compare your current home loan interest rate against SBI, HDFC, ICICI, Axis and other leading Indian banks. Calculate your exact monthly EMI reduction, total interest savings, and break-even period with 100% private, client-side math.
            </p>
            <div className="hero-stats">
              <div className="hero-stat">
                <span className="hero-stat-value">₹0</span>
                <span className="hero-stat-label">RBI Foreclosure Fee</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-value">0.35% - 1.5%</span>
                <span className="hero-stat-label">Typical Rate Drop</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-value">100%</span>
                <span className="hero-stat-label">Private In-Browser</span>
              </div>
            </div>
          </div>

          {/* Quick calc preview */}
          <div className="calc-card" style={{ maxWidth: 440 }}>
            <div style={{ textAlign: "center", padding: "16px 0" }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>₹</div>
              <h2 style={{ fontSize: 20, color: "var(--dark)", marginBottom: 8 }}>
                Home Loan Balance Transfer
              </h2>
              <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 20, lineHeight: 1.5 }}>
                Simulate transferring your home loan balance to a lower rate, evaluate MODT charges, and inspect verified amortization schedules.
              </p>
              <Link href="/calculator" id="hero-calc-btn" className="calc-btn" style={{ textDecoration: "none", display: "flex", justifyContent: "center" }}>
                Launch Balance Transfer Calculator →
              </Link>
              <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 14 }}>
                Aligned with RBI Retail Lending Guidelines · 100% Client-Side
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Embedded Interactive Calculator ─── */}
      <section className="section section-surface" id="calculator-section" aria-labelledby="calc-section-title">
        <div className="section-container">
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <span className="section-tag">🧮 Interactive Financial Tool</span>
          </div>
          <h2 id="calc-section-title" style={{ fontSize: "clamp(26px,3.5vw,36px)", color: "var(--dark)", textAlign: "center", marginBottom: 8 }}>
            Home Loan Balance Transfer &amp; Savings Calculator
          </h2>
          <p style={{ textAlign: "center", color: "var(--text-secondary)", fontSize: "15px", maxWidth: "640px", margin: "0 auto 24px" }}>
            Adjust loan parameters below in Indian Rupees (₹). View instant monthly EMI deltas, annual amortization tables, visual charts, or export raw calculation data.
          </p>
        </div>
        <RefinanceCalculator />
      </section>

      {/* ─── Key Features ─── */}
      <section className="section" aria-labelledby="features-title">
        <div className="section-container">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span className="section-tag">⚡ Key Capabilities</span>
            <h2 id="features-title" className="section-title">
              Designed for Indian Home Loan Borrowers
            </h2>
            <p className="section-subtitle">
              Built on mathematical precision and Indian retail banking norms to provide transparent, unbiased financial modeling.
            </p>
          </div>

          <div className="features-grid">
            {features.map((f) => (
              <div key={f.title} className="feature-card">
                <div className={`feature-icon ${f.color}`} aria-hidden="true">
                  {f.icon}
                </div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Open-Source Mathematical Transparency ─── */}
      <section className="section section-surface" aria-labelledby="open-source-title">
        <div className="section-container" style={{ maxWidth: 860, textAlign: "center" }}>
          <span className="section-tag">📦 Open Financial Math</span>
          <h2 id="open-source-title" style={{ fontSize: "clamp(24px, 3.5vw, 32px)", color: "var(--dark)", marginBottom: 12 }}>
            Verifiable, Open-Source Mathematical Algorithms
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: 16, lineHeight: 1.7, marginBottom: 24 }}>
            Unlike commercial lead-generation portals that hide loan calculations behind sales paywalls, DevsPoint maintains its core amortization routines and financial formulas openly. You can review the underlying TypeScript source code and test our mathematical logic on GitHub.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
            <a
              href="https://github.com/ronin5696/calculator-tool"
              target="_blank"
              rel="noopener noreferrer"
              className="calc-btn"
              style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px" }}
            >
              <span>View Source Code on GitHub</span>
              <span aria-hidden="true">↗</span>
            </a>
            <Link
              href="/about"
              className="tab-btn"
              style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", padding: "12px 20px" }}
            >
              Editorial &amp; Review Standards
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Featured Educational Guides ─── */}
      <section className="section" aria-labelledby="guides-title">
        <div className="section-container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 32, flexWrap: "wrap", gap: 12 }}>
            <div>
              <span className="section-tag">📚 Expert Insights</span>
              <h2 id="guides-title" className="section-title" style={{ marginTop: 8 }}>
                Indian Home Loan Guides &amp; Research
              </h2>
            </div>
            <Link href="/blog" style={{ color: "var(--primary)", fontWeight: 600, textDecoration: "none" }}>
              Explore All Guides →
            </Link>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {featuredGuides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/blog/${guide.slug}`}
                style={{ textDecoration: "none" }}
                aria-label={`Read guide: ${guide.title}`}
              >
                <article className="feature-card" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                    <span
                      style={{
                        background: "var(--primary-light)",
                        color: "var(--primary)",
                        padding: "3px 10px",
                        borderRadius: 100,
                        fontSize: 12,
                        fontWeight: 700,
                      }}
                    >
                      {guide.category}
                    </span>
                    <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{guide.readTime}</span>
                  </div>
                  <div style={{ fontSize: 32, marginBottom: 12 }} aria-hidden="true">
                    {guide.emoji}
                  </div>
                  <h3 style={{ fontSize: 18, color: "var(--dark)", marginBottom: 10, lineHeight: 1.4 }}>
                    {guide.title}
                  </h3>
                  <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6, flex: 1 }}>
                    {guide.excerpt}
                  </p>
                  <span style={{ color: "var(--primary)", fontWeight: 600, fontSize: 14, marginTop: 16 }}>
                    Read Guide →
                  </span>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Frequently Asked Questions ─── */}
      <section className="section section-surface" aria-labelledby="faq-title">
        <div className="section-container" style={{ maxWidth: 880 }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <span className="section-tag">❓ Knowledge Base</span>
            <h2 id="faq-title" className="section-title">
              Frequently Asked Questions
            </h2>
            <p className="section-subtitle">
              Common questions about home loan balance transfers, RBI regulations, and switching costs in India.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {faqs.map((faq, i) => (
              <details
                key={i}
                style={{
                  background: "#ffffff",
                  border: "1px solid var(--border)",
                  borderRadius: 12,
                  padding: "18px 24px",
                  cursor: "pointer",
                }}
              >
                <summary style={{ fontWeight: 700, fontSize: 16, color: "var(--dark)", listStyle: "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span>{faq.q}</span>
                  <span style={{ color: "var(--primary)", fontSize: 18 }}>+</span>
                </summary>
                <p style={{ margin: "14px 0 0", color: "var(--text-secondary)", fontSize: 15, lineHeight: 1.7 }}>
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
