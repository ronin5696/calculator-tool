import type { Metadata } from "next";
import Link from "next/link";
import BreakEvenCalculator from "@/components/BreakEvenCalculator";
import CalculatorNav from "@/components/CalculatorNav";

export const metadata: Metadata = {
  title: "Mortgage Refinance Break-Even Calculator – DevsPoint",
  description:
    "Calculate exactly how many months it takes to recoup refinancing closing costs. Model net cash flow over your planned holding period and determine if refinancing is worth it.",
  alternates: { canonical: "https://devspoint.in/calculator/break-even" },
  openGraph: {
    title: "Mortgage Refinance Break-Even Calculator – DevsPoint",
    description: "Interactive break-even velocity simulator with automated verdict and cumulative cash trajectory charts.",
    url: "https://devspoint.in/calculator/break-even",
  },
};

export default function BreakEvenPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "DevsPoint Mortgage Refinance Break-Even Calculator",
            url: "https://devspoint.in/calculator/break-even",
            applicationCategory: "FinanceApplication",
            operatingSystem: "Web",
            description: "Interactive client-side break-even simulator comparing loan friction fees against monthly payment reductions.",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />

      <div className="page-hero" aria-labelledby="be-hero-title">
        <div className="hero-grid" aria-hidden="true" />
        <div className="page-hero-container">
          <nav aria-label="Breadcrumb">
            <ol className="breadcrumb" style={{ listStyle: "none", padding: 0 }}>
              <li><Link href="/">Home</Link></li>
              <li><span className="breadcrumb-sep" aria-hidden="true">›</span></li>
              <li><Link href="/calculator">Calculators</Link></li>
              <li><span className="breadcrumb-sep" aria-hidden="true">›</span></li>
              <li aria-current="page">Break-Even Calculator</li>
            </ol>
          </nav>
          <div style={{ display: "inline-block", background: "rgba(59,130,246,0.2)", color: "#93c5fd", padding: "4px 12px", borderRadius: "100px", fontSize: "12px", fontWeight: 700, marginBottom: "12px" }}>
            DECISION ENGINE · VELOCITY METRICS
          </div>
          <h1 id="be-hero-title" className="page-hero-title">
            Mortgage Refinance Break-Even Calculator
          </h1>
          <p className="page-hero-sub">
            The single most critical number in mortgage finance: How long until your monthly savings fully pay off your upfront closing costs?
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <CalculatorNav active="break-even" />
        <BreakEvenCalculator />
      </div>

      {/* Educational Section */}
      <section className="section section-surface" style={{ marginTop: 60, padding: "60px 24px" }}>
        <div className="section-container" style={{ maxWidth: 960 }}>
          <div className="prose">
            <h2>The Mathematics of Break-Even Velocity</h2>
            <p>
              In personal finance, refinancing is essentially an upfront investment. You pay cash (or roll closing costs into your balance) today in exchange for a recurring monthly annuity dividend (your monthly payment savings).
            </p>

            <div style={{ background: "#0f172a", color: "#f8fafc", padding: "20px 24px", borderRadius: 14, fontFamily: "monospace", margin: "20px 0" }}>
              <div style={{ color: "#93c5fd", fontSize: 13, marginBottom: 8 }}>// The Fundamental Break-Even Formula:</div>
              <div style={{ fontSize: 20, color: "#38bdf8", fontWeight: 700 }}>
                Break-Even (Months) = Total Non-Recoverable Closing Costs ÷ Monthly Payment Savings
              </div>
            </div>

            <h3>The Golden Rule: The 24-Month Threshold</h3>
            <p>
              As a general rule among financial planners, a refinance is considered an <strong>unambiguous win if your break-even velocity is under 24 months</strong>, assuming you intend to stay in the home for at least 4 to 5 years. If your break-even stretches past 36 or 48 months, the risk of an unexpected life event (job transfer, family changes, or selling the property) makes the transaction risky.
            </p>

            <h3>Beware the Difference: Sunk Costs vs. Escrow Prepaids</h3>
            <p>
              Borrowers frequently miscalculate their break-even by including <strong>prepaid property taxes and homeowner&apos;s insurance</strong>. Those are not transaction costs; they are escrow reserves that belong to you. When you close on a refinance, your prior mortgage servicer is legally required to refund your old escrow balance within 30 days. Only include <strong>true transaction friction</strong> (origination fees, appraisal, title insurance, recording taxes) in your break-even equation.
            </p>

            <div className="info-box" style={{ marginTop: 28 }}>
              <span className="info-box-icon">📖</span>
              <p>
                <strong>Related In-Depth Reading:</strong> For an exhaustive analysis of all fees that count toward friction, read our guide on <Link href="/resources/refinancing-costs" style={{ color: "var(--primary)", fontWeight: 600 }}>Refinancing Costs Explained</Link> and <Link href="/resources/when-to-refinance" style={{ color: "var(--primary)", fontWeight: 600 }}>When Does It Make Sense to Refinance?</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
