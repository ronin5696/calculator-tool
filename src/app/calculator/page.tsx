import type { Metadata } from "next";
import RefinanceCalculator from "@/components/RefinanceCalculator";
import Link from "next/link";

export const metadata: Metadata = {
  title: "DevsPoint Financial Engine: Open-Source Mortgage & Amortization Calculator",
  description:
    "Open-source client-side mortgage refinance & amortization engine by DevsPoint. Calculate monthly payment changes, total interest delta, and break-even velocity using discrete annuity math.",
  keywords: [
    "DevsPoint financial engine",
    "open source mortgage calculator",
    "mortgage amortization calculator",
    "mortgage formula M = P[r(1+r)^n]/[(1+r)^n - 1]",
    "refinance break even calculator",
    "mortgage json export",
  ],
  alternates: { canonical: "https://devspoint.in/calculator" },
  openGraph: {
    title: "DevsPoint Financial Engine: Open-Source Mortgage & Amortization Calculator",
    description: "Compare current vs. new loan with verified mathematical formulas, amortization schedules, and raw JSON export.",
    url: "https://devspoint.in/calculator",
  },
};

export default function CalculatorPage() {
  return (
    <>
      {/* Schema for the tool */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "DevsPoint Financial Engine (dp-calc-engine)",
            url: "https://devspoint.in/calculator",
            applicationCategory: "FinanceApplication",
            operatingSystem: "Web",
            description: "Open-source client-side mortgage refinance and amortization software engine. Compare loans, compute break-even velocity, and export full JSON schedules.",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            featureList: [
              "Closed-form annuity amortization formula",
              "Monthly payment comparison",
              "Break-even velocity algorithm",
              "Total interest savings calculation",
              "Dual amortization schedule table",
              "Interactive balance decay charts",
              "Raw JSON export and clipboard payload copying",
            ],
          }),
        }}
      />

      <div className="page-hero" aria-labelledby="calc-page-title">
        <div className="hero-grid" aria-hidden="true" />
        <div className="page-hero-container">
          <nav aria-label="Breadcrumb">
            <ol className="breadcrumb" style={{ listStyle: "none", padding: 0 }}>
              <li><Link href="/">Home</Link></li>
              <li><span className="breadcrumb-sep" aria-hidden="true">›</span></li>
              <li aria-current="page">Financial Engine</li>
            </ol>
          </nav>
          <div style={{ display: "inline-block", background: "rgba(59,130,246,0.2)", color: "#93c5fd", padding: "4px 12px", borderRadius: "100px", fontSize: "12px", fontWeight: 700, marginBottom: "12px" }}>
            DEV TOOL · OPEN-SOURCE ENGINE v2.4
          </div>
          <h1 id="calc-page-title" className="page-hero-title">
            DevsPoint Financial Engine: Open-Source Mortgage &amp; Amortization Calculator
          </h1>
          <p className="page-hero-sub">
            Client-side computational engine for debt simulation, continuous vs discrete amortization comparison, and break-even velocity analysis. Includes raw JSON export and formula verification.
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 20, flexWrap: "wrap" }}>
            {["⚡ Sub-ms V8 Compute", "📐 IEEE 754 Math", "🔒 100% Client-Side", "📦 Raw JSON Export", "📋 Schedule Amortization"].map(b => (
              <span key={b} className="trust-badge">{b}</span>
            ))}
          </div>
        </div>
      </div>

      <RefinanceCalculator />

      {/* Mathematical & Engineering Mechanics Breakdown (Collapsible) */}
      <section className="section section-surface" aria-labelledby="guide-title" style={{ paddingTop: "32px", paddingBottom: "48px" }}>
        <div className="section-container" style={{ maxWidth: 960 }}>
          <details className="dev-docs-accordion">
            <summary className="dev-docs-summary">
              <div className="dev-docs-summary-left">
                <span className="dev-docs-badge">Mathematical Specification</span>
                <h2 id="guide-title" className="dev-docs-title">The Engineering &amp; Mathematics Behind the Engine</h2>
                <p className="dev-docs-desc">Click to review annuity derivation, variable dimensions, and client-side IEEE 754 precision math.</p>
              </div>
              <span className="dev-docs-chevron" aria-hidden="true">▼</span>
            </summary>

            <div className="dev-docs-content">
              <div className="prose" style={{ maxWidth: "100%", margin: "0 auto", fontSize: "15px", color: "var(--text-secondary)", lineHeight: 1.8 }}>
                <p>
                  The <strong>DevsPoint Financial Engine</strong> operates entirely in your browser using pure client-side JavaScript (V8 / JavaScriptCore). Unlike server-rendered calculators that submit your sensitive financial data to remote databases, every equation is solved locally using standard financial annuity formulas.
                </p>

                <div style={{ background: "#0f172a", color: "#f8fafc", padding: "18px 22px", borderRadius: "14px", fontFamily: "monospace", margin: "20px 0", border: "1px solid #334155" }}>
                  <div style={{ color: "#93c5fd", fontSize: "12px", marginBottom: "6px" }}>// Standard Amortization Formula:</div>
                  <div style={{ fontSize: "clamp(18px, 4vw, 22px)", fontWeight: "bold", color: "#38bdf8", textAlign: "center", padding: "10px 0" }}>
                    M = P · [ r(1 + r)ⁿ ] / [ (1 + r)ⁿ - 1 ]
                  </div>
                  <div style={{ fontSize: "12px", color: "#94a3b8", textAlign: "center" }}>
                    Closed-form ordinary annuity present value solution
                  </div>
                </div>

                <h3>Variable Definitions:</h3>
                <ul>
                  <li><strong>P:</strong> Principal balance outstanding ($ USD).</li>
                  <li><strong>r:</strong> Monthly periodic interest rate, defined as <code>(Annual Nominal Percentage Rate / 12) / 100</code>.</li>
                  <li><strong>n:</strong> Total repayment periods, calculated as <code>Term in Years × 12</code>.</li>
                  <li><strong>M:</strong> Fixed periodic monthly payment covering principal reduction and accrued interest.</li>
                </ul>

                <h3 style={{ marginTop: "28px" }}>Break-Even Velocity Algorithm</h3>
                <p>
                  When refinancing, closing costs represent an upfront cash drain. The break-even velocity indicates how rapidly cumulative monthly savings offset transaction friction:
                </p>
                <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "12px", padding: "16px 20px", margin: "16px 0", fontFamily: "monospace" }}>
                  BreakEvenMonths = ⌈ ClosingCosts / (PaymentCurrent - PaymentNew) ⌉
                </div>
                <p>
                  If <code>PaymentNew ≥ PaymentCurrent</code>, the break-even is mathematically <code>Infinity</code> (a non-recovering trade).
                </p>

                <h3 style={{ marginTop: "28px" }}>Exporting Data &amp; Integrating with APIs</h3>
                <p>
                  We provide a first-class <strong>&quot;💻 API / JSON&quot;</strong> view directly in the results panel. Click <strong>&quot;Export JSON&quot;</strong> to download the complete data structure or <strong>&quot;Copy API Payload&quot;</strong> to copy the schema to your clipboard. You can paste this payload directly into Python data frames (<code>pandas.read_json</code>) or automated spreadsheet models.
                </p>

                <div className="info-box" style={{ marginTop: 24 }}>
                  <span className="info-box-icon">💡</span>
                  <p>
                    <strong>Developer Note:</strong> This engine implements IEEE 754 precision guards and integer-cent scaling to ensure zero penny drift over standard 360-month amortization cycles.
                  </p>
                </div>
              </div>
            </div>
          </details>
        </div>
      </section>
    </>
  );
}
