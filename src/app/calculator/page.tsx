import type { Metadata } from "next";
import Link from "next/link";
import RefinanceCalculator from "@/components/RefinanceCalculator";
import CalculatorNav from "@/components/CalculatorNav";

export const metadata: Metadata = {
  title: "Home Loan Balance Transfer Calculator (India) – Compare SBI, HDFC, ICICI Rates",
  description:
    "Free Indian Home Loan Balance Transfer & EMI Calculator. Calculate monthly EMI savings, total interest saved, and switching break-even period across Indian banks and HFCs.",
  keywords: [
    "home loan balance transfer calculator india",
    "home loan emi calculator",
    "sbi home loan balance transfer",
    "hdfc home loan balance transfer",
    "modt charges home loan transfer",
    "rbi repo linked lending rate calculator",
    "reduce home loan interest rate",
  ],
  alternates: { canonical: "https://www.devspoint.in/calculator" },
  openGraph: {
    title: "Home Loan Balance Transfer Calculator – DevsPoint",
    description: "Compare your current home loan with new bank interest rates in Indian Rupees. Instant EMI savings and break-even math.",
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
            name: "DevsPoint Home Loan Balance Transfer Calculator",
            url: "https://devspoint.in/calculator",
            applicationCategory: "FinanceApplication",
            operatingSystem: "Web",
            description: "Free, client-side Indian home loan balance transfer and EMI calculation engine.",
            offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
            featureList: [
              "Closed-form annuity amortization formula",
              "Monthly EMI reduction calculation",
              "Switching fee break-even recovery velocity",
              "Total lifetime interest savings in Indian Rupees",
              "Side-by-side annual balance decay table",
              "Visual cumulative savings charts",
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
              <li aria-current="page">Balance Transfer Calculator</li>
            </ol>
          </nav>
          <div style={{ display: "inline-block", background: "rgba(59,130,246,0.2)", color: "#93c5fd", padding: "4px 12px", borderRadius: "100px", fontSize: "12px", fontWeight: 700, marginBottom: "12px" }}>
            🇮🇳 INDIAN HOME LOANS · REPO-LINKED (RLLR)
          </div>
          <h1 id="calc-page-title" className="page-hero-title">
            Home Loan Balance Transfer Calculator
          </h1>
          <p className="page-hero-sub">
            Calculate your exact monthly EMI savings, total interest saved across remaining tenure, and the break-even period to recover bank switching charges (processing fee + MODT stamp duty).
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 20, flexWrap: "wrap" }}>
            {["⚡ Sub-ms Browser Compute", "🇮🇳 Indian Rupee (₹)", "🔒 100% Client-Side Private", "📋 Amortization Schedule", "🏛️ RBI Aligned"].map(b => (
              <span key={b} className="trust-badge">{b}</span>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "24px auto 0", padding: "0 24px" }}>
        <CalculatorNav active="refinance" />
      </div>

      <RefinanceCalculator />

      {/* Guide section */}
      <section className="section section-surface" aria-labelledby="guide-title" style={{ paddingTop: "32px", paddingBottom: "48px" }}>
        <div className="section-container" style={{ maxWidth: 960 }}>
          <details className="dev-docs-accordion">
            <summary className="dev-docs-summary">
              <div className="dev-docs-summary-left">
                <span className="dev-docs-badge">Indian Banking Regulations</span>
                <h2 id="guide-title" className="dev-docs-title">How Home Loan Balance Transfers Work in India</h2>
                <p className="dev-docs-desc">Click to review RBI guidelines on zero foreclosure penalties, MODT stamp duty, and the step-by-step transfer process.</p>
              </div>
              <span className="dev-docs-chevron" aria-hidden="true">▼</span>
            </summary>

            <div className="dev-docs-content">
              <div className="prose" style={{ maxWidth: "100%", margin: "0 auto", fontSize: "15px", color: "var(--text-secondary)", lineHeight: 1.8 }}>
                <h3>1. What Is a Home Loan Balance Transfer?</h3>
                <p>
                  A home loan balance transfer (refinancing) involves transferring your outstanding home loan principal from your existing bank or Housing Finance Company (HFC) to a new lender that offers a lower interest rate or superior terms.
                </p>

                <h3>2. Reserve Bank of India (RBI) Rule on Foreclosure Charges</h3>
                <p>
                  Under RBI circulars (DBOD.Dir.BC.107/13.03.00/2011-12 and subsequent Master Directions), <strong>banks and NBFCs are strictly prohibited from charging any foreclosure fees or pre-payment penalties on floating rate home loans</strong> sanctioned to individual borrowers. That means you can transfer your loan at any time with zero penalty from your existing lender!
                </p>

                <h3>3. Switching Costs You Should Expect</h3>
                <p>
                  While your existing bank cannot levy prepayment penalties, the new bank will incur transaction charges:
                </p>
                <ul>
                  <li><strong>Processing Fee:</strong> Typically 0.25% to 0.50% of the loan amount (often capped between ₹5,000 and ₹15,000 by public sector banks like SBI, PNB, or Bank of Baroda).</li>
                  <li><strong>MODT (Memorandum of Deposit of Title Deeds) Stamp Duty:</strong> Varies by state (0.1% to 0.5% of the loan amount depending on Maharashtra, Karnataka, Delhi, Tamil Nadu, etc.).</li>
                  <li><strong>Legal &amp; Technical Valuation Fee:</strong> Usually ₹3,000 to ₹7,000 to inspect the property and verify title clear status.</li>
                </ul>

                <h3>4. The Formula for Monthly EMI in Indian Rupees</h3>
                <div style={{ background: "#0f172a", color: "#f8fafc", padding: "18px 22px", borderRadius: "14px", fontFamily: "monospace", margin: "20px 0", border: "1px solid #334155" }}>
                  <div style={{ color: "#93c5fd", fontSize: "12px", marginBottom: "6px" }}>// Standard Amortization Formula:</div>
                  <div style={{ fontSize: "clamp(18px, 4vw, 22px)", fontWeight: "bold", color: "#38bdf8", textAlign: "center", padding: "10px 0" }}>
                    EMI = P · [ r(1 + r)ⁿ ] / [ (1 + r)ⁿ - 1 ]
                  </div>
                  <div style={{ fontSize: "12px", color: "#94a3b8", textAlign: "center" }}>
                    where P = Principal balance, r = monthly rate (Annual Rate / 12 / 100), n = tenure in months
                  </div>
                </div>

                <div className="info-box" style={{ marginTop: 24 }}>
                  <span className="info-box-icon">💡</span>
                  <p>
                    <strong>Expert Tip:</strong> Before initiating a full balance transfer to another bank, request an internal <strong>&quot;Rate Conversion / Switch&quot;</strong> from your existing bank. Most lenders will match the market rate for an administrative fee of ₹1,000 to ₹5,000, saving you from repeating document verification!
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
