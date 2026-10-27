import type { Metadata } from "next";
import Link from "next/link";
import CashOutCalculator from "@/components/CashOutCalculator";
import CalculatorNav from "@/components/CalculatorNav";

export const metadata: Metadata = {
  title: "Home Loan Top-Up vs Personal Loan Calculator (India) – DevsPoint",
  description:
    "Compare taking a low-cost Home Loan Top-Up (8.75%–9.5%) vs an expensive Unsecured Personal Loan (13%–16%) in India. Calculate monthly EMI differences and Section 24(b) tax savings.",
  alternates: { canonical: "https://www.devspoint.in/calculator/cash-out" },
  openGraph: {
    title: "Home Loan Top-Up vs Personal Loan Calculator – DevsPoint",
    description: "Model home loan top-up eligibility under RBI 75% LTV caps and compare against personal loans.",
    url: "https://www.devspoint.in/calculator/cash-out",
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
            name: "DevsPoint Home Loan Top-Up vs Personal Loan Calculator",
            url: "https://www.devspoint.in/calculator/cash-out",
            applicationCategory: "FinanceApplication",
            operatingSystem: "Web",
            description: "Interactive client-side Indian home loan top-up vs personal loan calculator with RBI LTV ceiling validation.",
            offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
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
              <li aria-current="page">Top-Up vs Personal Loan</li>
            </ol>
          </nav>
          <div style={{ display: "inline-block", background: "rgba(59,130,246,0.2)", color: "#93c5fd", padding: "4px 12px", borderRadius: "100px", fontSize: "12px", fontWeight: 700, marginBottom: "12px" }}>
            🇮🇳 INDIAN HOME EQUITY · TOP-UP COMPARISON
          </div>
          <h1 id="co-hero-title" className="page-hero-title">
            Home Loan Top-Up vs. Personal Loan Calculator
          </h1>
          <p className="page-hero-sub">
            Tap your home equity at competitive mortgage rates (8.75%–9.5% p.a.) rather than paying 13%–16% on expensive personal loans. Check maximum eligible top-up under RBI 75% LTV rules.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "24px auto 0", padding: "0 24px" }}>
        <CalculatorNav active="cash-out" />
      </div>

      <CashOutCalculator />
    </>
  );
}
