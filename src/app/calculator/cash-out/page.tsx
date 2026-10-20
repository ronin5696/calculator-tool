import type { Metadata } from "next";
import Link from "next/link";
import CashOutCalculator from "@/components/CashOutCalculator";
import CalculatorNav from "@/components/CalculatorNav";

export const metadata: Metadata = {
  title: "Cash-Out Refinance Calculator – DevsPoint",
  description:
    "Calculate how much home equity you can convert into cash with a cash-out refinance. Check 80% LTV limits, new monthly payments, and post-closing equity retained.",
  alternates: { canonical: "https://devspoint.in/calculator/cash-out" },
  openGraph: {
    title: "Cash-Out Refinance Calculator – DevsPoint",
    description: "Model cash-out refinance scenarios with 80% LTV safety checks and property equity distribution visuals.",
    url: "https://devspoint.in/calculator/cash-out",
  },
};

export default function CashOutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "DevsPoint Cash-Out Refinance Calculator",
            url: "https://devspoint.in/calculator/cash-out",
            applicationCategory: "FinanceApplication",
            operatingSystem: "Web",
            description: "Interactive client-side cash-out refinance simulator with conventional 80% LTV ceiling validation and equity analysis.",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />

      <div className="page-hero" aria-labelledby="co-hero-title">
        <div className="hero-grid" aria-hidden="true" />
        <div className="page-hero-container">
          <nav aria-label="Breadcrumb">
            <ol className="breadcrumb" style={{ listStyle: "none", padding: 0 }}>
              <li><Link href="/">Home</Link></li>
              <li><span className="breadcrumb-sep" aria-hidden="true">›</span></li>
              <li><Link href="/calculator">Calculators</Link></li>
              <li><span className="breadcrumb-sep" aria-hidden="true">›</span></li>
              <li aria-current="page">Cash-Out Refinance</li>
            </ol>
          </nav>
          <div style={{ display: "inline-block", background: "rgba(59,130,246,0.2)", color: "#93c5fd", padding: "4px 12px", borderRadius: "100px", fontSize: "12px", fontWeight: 700, marginBottom: "12px" }}>
            EQUITY EXTRACTION · 80% LTV GUARD
          </div>
          <h1 id="co-hero-title" className="page-hero-title">
            Cash-Out Refinance Calculator
          </h1>
          <p className="page-hero-sub">
            Tap into your accumulated home equity for home improvements, debt consolidation, or liquidity while keeping your loan within healthy loan-to-value limits.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <CalculatorNav active="cash-out" />
        <CashOutCalculator />
      </div>

      {/* Educational Section */}
      <section className="section section-surface" style={{ marginTop: 60, padding: "60px 24px" }}>
        <div className="section-container" style={{ maxWidth: 960 }}>
          <div className="prose">
            <h2>Understanding Cash-Out Refinancing Mechanics</h2>
            <p>
              A <strong>cash-out refinance</strong> replaces your existing mortgage with a brand-new loan that has a higher principal balance than what you currently owe. The difference between your old mortgage balance and the new loan amount is disbursed to you as a lump-sum cash deposit at closing.
            </p>

            <h3>The Conventional 80% Loan-to-Value (LTV) Ceiling</h3>
            <p>
              Under underwriting rules established by Fannie Mae and Freddie Mac, conventional conforming cash-out refinances are capped at <strong>80% of your home&apos;s appraised market value</strong>. Lenders require you to retain at least a 20% equity cushion in the property to protect against housing market downturns.
            </p>
            <p>
              For example, if your home appraises for $500,000, your maximum allowable total mortgage balance is $400,000 ($500,000 × 0.80). If you currently owe $280,000, the maximum cash you could extract is $120,000 minus closing costs.
            </p>

            <h3>Cash-Out Refinance vs. HELOC vs. Home Equity Loan</h3>
            <p>
              Before committing to a cash-out refinance, evaluate which debt structure best fits your goals:
            </p>
            <ul>
              <li><strong>Cash-Out Refinance:</strong> One single fixed monthly payment and resets your entire mortgage. Best if current market rates are equal to or lower than your existing mortgage rate.</li>
              <li><strong>HELOC (Home Equity Line of Credit):</strong> A revolving second mortgage with a variable interest rate. Best for ongoing projects with phased cash needs where you want to keep a low first mortgage rate intact.</li>
              <li><strong>Home Equity Loan (HELOAN):</strong> A fixed-rate second mortgage providing a lump sum. Allows you to borrow equity without disturbing a low first mortgage rate (e.g. 3% locked in 2021).</li>
            </ul>

            <div className="info-box" style={{ marginTop: 28 }}>
              <span className="info-box-icon">💡</span>
              <p>
                <strong>Tax Note:</strong> Interest on cash-out refinanced funds is generally tax-deductible only if the proceeds are used to <em>substantially improve</em> the home securing the loan (IRS Publication 936). Consult a certified CPA regarding your specific tax situation.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
