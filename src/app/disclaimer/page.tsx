import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Disclaimer – DevsPoint Home Loan Engine",
  description:
    "Financial and regulatory disclaimer for DevsPoint Home Loan Engine (devspoint.in). Our computational tools and guides are for informational and educational purposes only.",
  alternates: { canonical: "https://www.devspoint.in/disclaimer" },
};

export default function DisclaimerPage() {
  return (
    <>
      <div className="page-hero" aria-labelledby="disclaimer-title">
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
              <li aria-current="page">Disclaimer</li>
            </ol>
          </nav>
          <h1 id="disclaimer-title" className="page-hero-title">
            Financial &amp; Regulatory Disclaimer
          </h1>
          <p className="page-hero-sub">Last updated: October 24, 2026</p>
        </div>
      </div>

      <section className="section" aria-labelledby="disclaimer-content">
        <div className="section-container">
          <div className="prose">
            <div
              className="info-box"
              style={{
                background: "linear-gradient(135deg, #fef2f2, #fee2e2)",
                borderColor: "#ef4444",
                marginBottom: 32,
                padding: "24px",
              }}
            >
              <span className="info-box-icon" style={{ fontSize: "28px" }}>
                ⚠️
              </span>
              <div>
                <h3 style={{ margin: "0 0 6px", color: "#991b1b", fontSize: "18px" }}>
                  Important Notice: Educational Tool, Not a Depository or Lending Entity
                </h3>
                <p style={{ margin: 0, color: "#7f1d1d", fontSize: "14px", lineHeight: 1.6 }}>
                  <strong>DevsPoint Home Loan Engine is an independent educational and analytical platform.</strong> We are
                  not a bank, Non-Banking Financial Company (NBFC), Housing Finance Company (HFC), or Direct Selling Agent
                  (DSA). Nothing published on this site constitutes a credit sanction, loan offer, or financial advice.
                </p>
              </div>
            </div>

            <h2>1. Informational &amp; Computational Purposes Only</h2>
            <p>
              The calculators, amortization tables, interest rate models, and educational guides provided on DevsPoint (
              <a href="https://www.devspoint.in">https://www.devspoint.in</a>) are designed strictly for general informational
              and mathematical simulation purposes.
            </p>
            <p>
              Calculations are generated client-side using standard compound annuity formulas and prevailing Reserve Bank
              of India (RBI) benchmark rate conventions. They are estimates and do not guarantee that any specific bank or
              housing finance company will sanction a loan or approve a balance transfer at the computed rates.
            </p>

            <h2>2. Not a Lender or Direct Selling Agent (DSA)</h2>
            <p>DevsPoint does not participate in the lending process. Specifically, we do not:</p>
            <ul>
              <li>Originate, underwrite, or disburse home loans</li>
              <li>Issue formal in-principle sanction letters or legally binding credit agreements</li>
              <li>Collect loan documentation (LODs, title deeds, KYC documents) for submission to banks</li>
              <li>Earn referral fees or sales commissions from banks or HFCs for recommending specific lenders</li>
              <li>Influence credit underwriting decisions or credit score assessments</li>
            </ul>

            <h2>3. Accuracy &amp; Lender Discretion</h2>
            <p>
              While our computational algorithms are designed with high precision, actual loan terms offered by Indian
              lenders will depend on multiple individual credit factors, including:
            </p>
            <ul>
              <li>Your credit score (CIBIL / Experian score of 750+ typically qualifies for the lowest rates)</li>
              <li>Fixed Obligation to Income Ratio (FOIR) and net monthly disposable income</li>
              <li>Loan-to-Value (LTV) ratio based on an independent technical property valuation</li>
              <li>Title clearance report provided by the bank&apos;s empaneled legal advocates</li>
              <li>State-specific MODT (Memorandum of Deposit of Title Deeds) stamp duty and registration rules</li>
            </ul>

            <h2>4. Tax Information Disclaimer</h2>
            <p>
              Any discussion of home loan tax benefits (including Section 24(b) interest deduction, Section 80C principal
              repayment, or Section 80EEA) is for educational reference under the Indian Income Tax Act 1961. Tax laws are
              subject to annual budget amendments, and eligibility depends on your choice of tax regime (Old vs. New Tax
              Regime). Always consult a qualified <strong>Chartered Accountant (CA)</strong> regarding your specific tax
              filings.
            </p>

            <h2>5. Advertising Transparency</h2>
            <p>
              DevsPoint is supported by transparent advertising, including Google AdSense, which allows us to keep our
              calculators and guides free for all Indian homeowners. Advertisements are clearly designated and do not
              affect our calculation algorithms or editorial ratings.
            </p>

            <h2>6. Contact Legal &amp; Editorial Desk</h2>
            <p>
              If you have any questions or require clarification regarding this disclaimer, please reach out to us at{" "}
              <a href="mailto:legal@devspoint.in" style={{ color: "var(--primary)" }}>
                legal@devspoint.in
              </a>{" "}
              or through our <Link href="/contact">Contact Form</Link>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
