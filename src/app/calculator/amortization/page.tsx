import type { Metadata } from "next";
import Link from "next/link";
import AmortizationCalculator from "@/components/AmortizationCalculator";
import CalculatorNav from "@/components/CalculatorNav";

export const metadata: Metadata = {
  title: "Mortgage Amortization Schedule Calculator – DevsPoint",
  description:
    "Generate complete month-by-month and annual mortgage amortization schedules. Model extra principal prepayments, analyze balance decay curves, and export CSV/JSON data.",
  alternates: { canonical: "https://devspoint.in/calculator/amortization" },
  openGraph: {
    title: "Mortgage Amortization Schedule Calculator – DevsPoint",
    description: "Interactive loan amortization schedule with prepayment acceleration simulation and balance decay visualizer.",
    url: "https://devspoint.in/calculator/amortization",
  },
};

export default function AmortizationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "DevsPoint Amortization Schedule Calculator",
            url: "https://devspoint.in/calculator/amortization",
            applicationCategory: "FinanceApplication",
            operatingSystem: "Web",
            description: "Interactive client-side amortization table generator with extra payment acceleration and exportable CSV/JSON schedules.",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />

      <div className="page-hero" aria-labelledby="amort-hero-title">
        <div className="hero-grid" aria-hidden="true" />
        <div className="page-hero-container">
          <nav aria-label="Breadcrumb">
            <ol className="breadcrumb" style={{ listStyle: "none", padding: 0 }}>
              <li><Link href="/">Home</Link></li>
              <li><span className="breadcrumb-sep" aria-hidden="true">›</span></li>
              <li><Link href="/calculator">Calculators</Link></li>
              <li><span className="breadcrumb-sep" aria-hidden="true">›</span></li>
              <li aria-current="page">Amortization Schedule</li>
            </ol>
          </nav>
          <div style={{ display: "inline-block", background: "rgba(59,130,246,0.2)", color: "#93c5fd", padding: "4px 12px", borderRadius: "100px", fontSize: "12px", fontWeight: 700, marginBottom: "12px" }}>
            SCHEDULE ENGINE · DISCRETE COMPOUNDING
          </div>
          <h1 id="amort-hero-title" className="page-hero-title">
            Mortgage Amortization Schedule Calculator
          </h1>
          <p className="page-hero-sub">
            Inspect every monthly installment over the lifetime of your loan. See how much goes to principal versus interest, and model how extra payments slash your debt-free timeline.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <CalculatorNav active="amortization" />
        <AmortizationCalculator />
      </div>

      {/* Educational Section */}
      <section className="section section-surface" style={{ marginTop: 60, padding: "60px 24px" }}>
        <div className="section-container" style={{ maxWidth: 960 }}>
          <div className="prose">
            <h2>How Mortgage Amortization Works in Practice</h2>
            <p>
              When you take out a fixed-rate mortgage, your total monthly payment remains constant for the entire duration of the loan. However, the internal distribution between <strong>principal reduction</strong> and <strong>interest charge</strong> changes with every passing month.
            </p>

            <h3>Why Interest Is Front-Loaded</h3>
            <p>
              Because monthly interest is calculated against the remaining unpaid principal balance (Interest = Prior Balance · [r / 12]), interest charges are at their peak during the earliest years of repayment. In Year 1 of a 30-year 6.5% mortgage, roughly <strong>75% to 80%</strong> of every dollar you pay goes directly to bank interest, with only a small portion chipping away at your debt balance.
            </p>
            <p>
              As your balance slowly declines, the monthly interest charge shrinks, allowing a larger percentage of your fixed payment to attack the principal. By Year 20, the dynamic flips: the majority of your payment builds home equity.
            </p>

            <h3>The Compounding Multiplier of Extra Monthly Payments</h3>
            <p>
              When you send an extra $100 or $200 per month labeled as &quot;Principal Only,&quot; that cash bypasses the interest formula completely. It immediately reduces the baseline upon which all future interest payments are calculated. As our calculator above illustrates, adding just $150 per month on a $400,000 mortgage at 6.5% knocks <strong>over 4.5 years</strong> off your mortgage and eliminates <strong>more than $80,000 in lifetime bank interest</strong>.
            </p>

            <div className="info-box" style={{ marginTop: 28 }}>
              <span className="info-box-icon">💡</span>
              <p>
                <strong>Refinancing Tip:</strong> Thinking about refinancing into a lower rate or shorter term? Compare your options side-by-side using our <Link href="/calculator" style={{ color: "var(--primary)", fontWeight: 600 }}>Mortgage Refinance Calculator</Link> or calculate your exact break-even velocity on the <Link href="/calculator/break-even" style={{ color: "var(--primary)", fontWeight: 600 }}>Break-Even Calculator</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
