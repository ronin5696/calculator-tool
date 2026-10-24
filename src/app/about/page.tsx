import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us & Editorial Standards – DevsPoint Home Loan Engine",
  description:
    "Learn about DevsPoint Home Loan Engine: our editorial team, banking credentials, mathematical methodology, and open-source financial algorithms for Indian home loan borrowers.",
  alternates: { canonical: "https://www.devspoint.in/about" },
  openGraph: { title: "About DevsPoint Home Loan Engine", url: "https://www.devspoint.in/about" },
};

const team = [
  {
    initials: "A",
    name: "Anshul",
    role: "Lead Software Engineer & Creator",
    bio: "Software engineer and open-source developer. Created the DevsPoint Indian Home Loan Calculator engine to bring mathematical transparency and client-side privacy to home loan balance transfer decisions, helping Indian borrowers understand EMI schedules and RBI lending rate transmission without commercial bias.",
    credentials: "Open-Source Developer · Creator · GitHub: @ronin5696",
    color: "#1a56db",
  },
  {
    initials: "DP",
    name: "DevsPoint Financial Research Desk",
    role: "Banking & Regulatory Research",
    bio: "Editorial and research desk tracking Reserve Bank of India (RBI) notifications, Master Directions on Advances, bank tariff schedules (SBI, HDFC Bank, ICICI Bank, BoB, PNB), and Indian Income Tax provisions (Section 24b/80C). Every calculation and guide is verified against statutory guidelines and published lender benchmarks.",
    credentials: "RBI Policy & Banking Research · Independent Desk",
    color: "#059669",
  },
];

const values = [
  {
    icon: "🎯",
    title: "RBI-Aligned Methodology",
    desc: "Every calculation and guide conforms to official Reserve Bank of India (RBI) master directions, including zero foreclosure charges on floating retail loans.",
  },
  {
    icon: "🔓",
    title: "Open-Source Mathematical Rigor",
    desc: "Our closed-form annuity amortization algorithms are transparent and open-source on GitHub, ensuring verifiable, unmanipulated mathematical results.",
  },
  {
    icon: "🔒",
    title: "100% Client-Side Privacy",
    desc: "Your financial numbers are calculated entirely in your browser memory. We never upload, save, or sell your loan balance or personal financial inputs.",
  },
  {
    icon: "⚖️",
    title: "Strict Editorial Independence",
    desc: "We are not a loan broker, direct selling agent (DSA), or bank affiliate. We accept zero commissions for recommending specific lenders.",
  },
];

export default function AboutPage() {
  return (
    <>
      <div className="page-hero" aria-labelledby="about-title">
        <div className="hero-grid" aria-hidden="true" />
        <div className="page-hero-container">
          <nav aria-label="Breadcrumb">
            <ol className="breadcrumb" style={{ listStyle: "none", padding: 0 }}>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <span className="breadcrumb-sep" aria-hidden="true">
                  ›
                </span>
              </li>
              <li aria-current="page">About Us</li>
            </ol>
          </nav>
          <div
            style={{
              display: "inline-block",
              background: "rgba(59,130,246,0.2)",
              color: "#93c5fd",
              padding: "4px 12px",
              borderRadius: "100px",
              fontSize: "12px",
              fontWeight: 700,
              marginBottom: "12px",
            }}
          >
            INDEPENDENT FINANCIAL INTELLIGENCE · INDIA
          </div>
          <h1 id="about-title" className="page-hero-title">
            About DevsPoint Home Loan Engine
          </h1>
          <p className="page-hero-sub">
            An independent, open-source financial analytics initiative under DevsPoint (
            <a href="https://devspoint.in" style={{ color: "#93c5fd" }}>
              devspoint.in
            </a>
            ) dedicated to empowering Indian homeowners with transparent loan balance transfer calculations, verified
            amortization math, and practitioner-grade banking guides.
          </p>
        </div>
      </div>

      {/* Mission */}
      <section className="section" aria-labelledby="mission-title">
        <div className="section-container">
          <div className="about-mission-grid">
            <div>
              <span className="section-tag">🎯 Our Mission</span>
              <h2 id="mission-title" className="section-title" style={{ marginTop: 12 }}>
                Eliminating the Asymmetry in Indian Home Loans
              </h2>
              <div className="prose">
                <p>
                  In the Indian home loan market, there is a persistent problem: <strong>existing borrowers almost always pay higher interest rates than new borrowers</strong>. When the Reserve Bank of India adjusts repo rates or banks lower their spreads to acquire new customers, existing loan books are rarely reduced automatically.
                </p>
                <p>
                  Most Indian homeowners unknowingly overpay by ₹3 Lakhs to ₹15 Lakhs in lifetime interest simply because calculating balance transfer break-even periods and navigating the bank switching process has historically been opaque and confusing.
                </p>
                <p>
                  DevsPoint Home Loan Engine was founded by banking analysts and software engineers in Bengaluru to change that. We combine practitioner banking experience with open-source mathematical transparency to provide exact, unbiased loan comparisons without aggressive sales calls or lead selling.
                </p>
                <p>
                  We are <strong>not a lender, NBFC, or loan broker</strong>. We do not sell your contact details to direct selling agents (DSAs), and we don&apos;t earn commissions from banks.
                </p>
              </div>
            </div>
            <div>
              <div className="about-values-grid">
                {values.map((v) => (
                  <div key={v.title} className="feature-card" style={{ padding: 24 }}>
                    <div style={{ fontSize: 28, marginBottom: 12 }} aria-hidden="true">
                      {v.icon}
                    </div>
                    <h3 style={{ fontSize: 16, marginBottom: 8 }}>{v.title}</h3>
                    <p style={{ fontSize: 14 }}>{v.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Authors & Editorial Team */}
      <section className="section section-surface" aria-labelledby="team-title">
        <div className="section-container" style={{ maxWidth: 880 }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <span className="section-tag">👥 Editorial Leadership &amp; Credentials</span>
            <h2 id="team-title" className="section-title" style={{ marginTop: 12 }}>
              Authored &amp; Reviewed by Banking Specialists
            </h2>
            <p className="section-subtitle">
              For Your Money or Your Life (YMYL) financial topics, qualified authorship matters. Meet the analysts behind our research.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {team.map((member) => (
              <div
                key={member.name}
                className="feature-card"
                style={{
                  display: "flex",
                  gap: 24,
                  alignItems: "flex-start",
                  flexWrap: "wrap",
                  padding: 28,
                }}
              >
                <div
                  style={{
                    width: 68,
                    height: 68,
                    borderRadius: "50%",
                    background: member.color,
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 22,
                    fontWeight: 800,
                    flexShrink: 0,
                  }}
                  aria-hidden="true"
                >
                  {member.initials}
                </div>
                <div style={{ flex: 1, minWidth: 260 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 8, marginBottom: 4 }}>
                    <h3 style={{ margin: 0, fontSize: 20, color: "var(--dark)" }}>{member.name}</h3>
                    <span style={{ fontSize: 12, background: "var(--primary-light)", color: "var(--primary)", padding: "3px 10px", borderRadius: 100, fontWeight: 700 }}>
                      {member.credentials}
                    </span>
                  </div>
                  <div style={{ fontSize: 14, color: "var(--primary)", fontWeight: 600, marginBottom: 12 }}>
                    {member.role}
                  </div>
                  <p style={{ margin: 0, fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.7 }}>
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial & Fact-Checking Policy */}
      <section className="section" aria-labelledby="editorial-title">
        <div className="section-container" style={{ maxWidth: 860 }}>
          <div className="prose" style={{ maxWidth: "100%" }}>
            <span className="section-tag">📋 Quality Assurance</span>
            <h2 id="editorial-title" style={{ marginTop: 12 }}>
              Editorial Standards &amp; Fact-Checking Policy
            </h2>
            <p>
              To ensure our research is trustworthy and actionable for Indian home loan borrowers, every guide and calculator follows our rigorous three-step verification process:
            </p>
            <ol>
              <li>
                <strong>Statutory &amp; Regulatory Alignment:</strong> All content is verified against active Reserve Bank of India (RBI) notifications, Master Directions on Interest Rates on Advances, and circulars governing retail foreclosure charges.
              </li>
              <li>
                <strong>Lender Tariff Auditing:</strong> Bank processing fees, MODT stamp duty rates, and rate-switch charges are regularly audited against published tariff sheets from major Indian lenders (including SBI, HDFC Bank, ICICI Bank, Bank of Baroda, and Punjab National Bank).
              </li>
              <li>
                <strong>Tax Code Compliance:</strong> Any tax guidance is vetted against current provisions of the Indian Income Tax Act 1961, specifically Section 24(b) (interest on housing loans), Section 80C (principal repayment), and Section 80EEA.
              </li>
            </ol>

            <h3 style={{ marginTop: 28 }}>Open-Source Code Verification</h3>
            <p>
              We believe financial algorithms should be open to public scrutiny. Our computational formulas, discrete amortization models, and break-even algorithms are published openly on GitHub under the MIT license:
            </p>
            <p>
              <a
                href="https://github.com/ronin5696/calculator-tool"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--primary)", fontWeight: 600, textDecoration: "underline" }}
              >
                https://github.com/ronin5696/calculator-tool
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
