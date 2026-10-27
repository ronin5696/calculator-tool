import type { Metadata } from "next";
import Link from "next/link";
import BreakEvenCalculator from "@/components/BreakEvenCalculator";
import CalculatorNav from "@/components/CalculatorNav";

export const metadata: Metadata = {
  title: "Home Loan Balance Transfer Break-Even Calculator (India) – DevsPoint",
  description:
    "Calculate exactly how many months it takes to recover MODT, stamp duty, and processing fees when transferring your home loan in India. Clear break-even analysis.",
  alternates: { canonical: "https://www.devspoint.in/calculator/break-even" },
  openGraph: {
    title: "Home Loan Balance Transfer Break-Even Calculator – DevsPoint",
    description: "Determine the exact break-even velocity when switching banks for a lower interest rate in India.",
    url: "https://www.devspoint.in/calculator/break-even",
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
            name: "DevsPoint Home Loan Break-Even Calculator",
            url: "https://www.devspoint.in/calculator/break-even",
            applicationCategory: "FinanceApplication",
            operatingSystem: "Web",
            description: "Interactive client-side Indian home loan break-even simulator comparing switching fees against monthly EMI reductions.",
            offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
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
            🇮🇳 INDIAN HOME LOANS · BREAK-EVEN VELOCITY
          </div>
          <h1 id="be-hero-title" className="page-hero-title">
            Home Loan Balance Transfer Break-Even Calculator
          </h1>
          <p className="page-hero-sub">
            The most crucial metric when transferring your home loan: Exactly how many months until your monthly EMI savings recover the upfront switching expenses (MODT, stamp duty, and processing fees)?
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "24px auto 0", padding: "0 24px" }}>
        <CalculatorNav active="break-even" />
      </div>

      <BreakEvenCalculator />
    </>
  );
}
