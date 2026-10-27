import type { Metadata } from "next";
import Link from "next/link";
import AmortizationCalculator from "@/components/AmortizationCalculator";
import CalculatorNav from "@/components/CalculatorNav";

export const metadata: Metadata = {
  title: "Home Loan EMI & Amortization Schedule Calculator (India) – DevsPoint",
  description:
    "Generate complete month-by-month and annual home loan EMI amortization schedules in Indian Rupees (₹). Model part-prepayments, calculate interest savings, and export CSV data.",
  alternates: { canonical: "https://www.devspoint.in/calculator/amortization" },
  openGraph: {
    title: "Home Loan EMI & Amortization Schedule Calculator – DevsPoint",
    description: "Interactive Indian home loan EMI schedule with RBI zero-penalty prepayment simulation.",
    url: "https://www.devspoint.in/calculator/amortization",
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
            name: "DevsPoint Home Loan Amortization Schedule Calculator",
            url: "https://www.devspoint.in/calculator/amortization",
            applicationCategory: "FinanceApplication",
            operatingSystem: "Web",
            description: "Interactive client-side Indian home loan amortization schedule with prepayment acceleration and CSV export.",
            offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
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
              <li aria-current="page">EMI Amortization</li>
            </ol>
          </nav>
          <div style={{ display: "inline-block", background: "rgba(59,130,246,0.2)", color: "#93c5fd", padding: "4px 12px", borderRadius: "100px", fontSize: "12px", fontWeight: 700, marginBottom: "12px" }}>
            🇮🇳 INDIAN HOME LOANS · AMORTIZATION ENGINE
          </div>
          <h1 id="amort-hero-title" className="page-hero-title">
            Home Loan EMI &amp; Amortization Schedule Calculator
          </h1>
          <p className="page-hero-sub">
            Inspect every monthly installment across your 10 to 30 year loan. See how each payment divides between principal and interest, and model how part-prepayments cut years off your tenure.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "24px auto 0", padding: "0 24px" }}>
        <CalculatorNav active="amortization" />
      </div>

      <AmortizationCalculator />

      {/* Guide section */}
      <section className="section section-surface" aria-labelledby="amort-guide-title" style={{ paddingTop: "32px", paddingBottom: "48px" }}>
        <div className="section-container" style={{ maxWidth: 960 }}>
          <div className="prose" style={{ maxWidth: "100%", margin: "0 auto", fontSize: "15px", color: "var(--text-secondary)", lineHeight: 1.8 }}>
            <h2 id="amort-guide-title" style={{ fontSize: 22, color: "var(--dark)", marginBottom: 12 }}>
              Understanding Home Loan Amortization in India
            </h2>
            <p>
              In India, retail home loans issued by scheduled commercial banks (SBI, HDFC, ICICI, Axis, PNB) and Housing Finance Companies (LIC HFL, PNB Housing) follow a reducing balance method with discrete monthly compounding.
            </p>
            <h3>Why the First 5 to 7 Years Are Crucial</h3>
            <p>
              Due to the nature of compound amortization, up to 70% to 80% of your initial monthly EMI goes solely toward paying accrued interest. Making part-prepayments during the first 3 to 7 years yields the highest interest savings because it directly reduces the compounding principal base.
            </p>
            <div className="info-box" style={{ marginTop: 16 }}>
              <span className="info-box-icon">📜</span>
              <p>
                <strong>Statutory Exemption on Foreclosure Charges:</strong> Reserve Bank of India circulars mandate that banks shall not charge any prepayment penalties on floating rate home loans taken by individual borrowers. You are entitled to prepay any amount, anytime, without fee penalties.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
