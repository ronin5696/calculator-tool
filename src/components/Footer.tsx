"use client";

import Link from "next/link";

const toolLinks = [
  { href: "/calculator", label: "Home Loan Balance Transfer" },
  { href: "/calculator/amortization", label: "EMI & Amortization Schedule" },
  { href: "/calculator/break-even", label: "Switching Break-Even Calculator" },
  { href: "/calculator/cash-out", label: "Top-Up Loan vs Personal Loan" },
];

const guideLinks = [
  { href: "/blog/home-loan-balance-transfer-guide", label: "Balance Transfer Master Guide" },
  { href: "/blog/when-to-transfer-home-loan", label: "When to Transfer Your Home Loan" },
  { href: "/blog/home-loan-transfer-charges-modt", label: "MODT & Transfer Charges Explained" },
  { href: "/blog/rllr-vs-mclr-home-loan-interest-rates", label: "RLLR vs MCLR Rates in India" },
];

const companyLinks = [
  { href: "/about", label: "About Us & Authors" },
  { href: "/contact", label: "Contact Editorial Desk" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-of-service", label: "Terms of Service" },
  { href: "/disclaimer", label: "Financial Disclaimer" },
  { href: "/sitemap.xml", label: "XML Sitemap" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleOpenCookieSettings = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("open-cookie-settings"));
    }
  };

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-grid">
        {/* Brand */}
        <div className="footer-brand">
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <div
              className="nav-logo-icon"
              aria-hidden="true"
              style={{
                width: 38,
                height: 38,
                fontSize: 16,
                background: "linear-gradient(135deg, #10b981, #1a56db)",
                fontFamily: "monospace",
              }}
            >
              ₹
            </div>
            <div>
              <span className="nav-logo-text" style={{ fontSize: 18 }}>DevsPoint</span>
              <span
                style={{
                  display: "block",
                  fontSize: 10,
                  color: "#93c5fd",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  fontWeight: 700,
                }}
              >
                Home Loan Engine · India
              </span>
            </div>
          </Link>
          <p>
            An independent, client-side financial analytics portal developed under DevsPoint (
            <a href="https://www.devspoint.in" style={{ color: "#60a5fa" }}>
              devspoint.in
            </a>
            ). Helping Indian homeowners evaluate home loan balance transfers, EMI amortization, and interest reduction
            with verified mathematical formulas and 100% private in-browser computation.
          </p>
          <div style={{ display: "flex", gap: 10, marginTop: 16, flexWrap: "wrap" }}>
            {["🔒 100% Client-Side Calc", "⚡ Sub-ms Browser Compute", "🇮🇳 Indian Rupee (₹)", "📚 RBI Aligned"].map((b) => (
              <span key={b} className="trust-badge">
                {b}
              </span>
            ))}
          </div>

          <div style={{ marginTop: 18, fontSize: 13, color: "#94a3b8" }}>
            <span>Verified Open-Source Math: </span>
            <a
              href="https://github.com/ronin5696/calculator-tool"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#60a5fa", textDecoration: "underline" }}
            >
              github.com/ronin5696/calculator-tool
            </a>
          </div>
        </div>

        {/* Tools */}
        <div>
          <h3 className="footer-heading">Calculators</h3>
          <ul className="footer-links">
            {toolLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Educational Guides */}
        <div>
          <h3 className="footer-heading">Indian Home Loan Guides</h3>
          <ul className="footer-links">
            {guideLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
            <li>
              <Link href="/blog" style={{ color: "#60a5fa", fontWeight: 600 }}>
                View All 20+ Guides →
              </Link>
            </li>
          </ul>
        </div>

        {/* Company & Legal */}
        <div>
          <h3 className="footer-heading">Trust &amp; Legal</h3>
          <ul className="footer-links">
            {companyLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
            <li>
              <button
                onClick={handleOpenCookieSettings}
                id="footer-cookie-settings-btn"
                style={{
                  background: "transparent",
                  border: "none",
                  padding: 0,
                  color: "#94a3b8",
                  fontSize: 14,
                  cursor: "pointer",
                  textAlign: "left",
                  textDecoration: "underline",
                }}
              >
                ⚙️ Cookie Settings
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span>
          © {currentYear} DevsPoint (
          <a href="https://www.devspoint.in" style={{ color: "inherit", textDecoration: "underline" }}>
            devspoint.in
          </a>
          ). Educational financial technology. All rights reserved.
        </span>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
          <Link href="/privacy-policy" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: 13 }}>
            Privacy
          </Link>
          <Link href="/terms-of-service" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: 13 }}>
            Terms
          </Link>
          <Link href="/disclaimer" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: 13 }}>
            Disclaimer
          </Link>
          <Link href="/contact" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: 13 }}>
            Contact
          </Link>
          <button
            onClick={handleOpenCookieSettings}
            style={{
              background: "none",
              border: "none",
              color: "#60a5fa",
              fontSize: 13,
              cursor: "pointer",
              padding: 0,
            }}
          >
            Manage Cookies
          </button>
        </div>
      </div>

      <div className="footer-disclaimer">
        <strong style={{ color: "rgba(255,255,255,0.6)" }}>Regulatory &amp; Financial Notice:</strong> DevsPoint Home
        Loan Engine is an independent software and educational publishing portal hosted at devspoint.in. DevsPoint is
        NOT a licensed bank, non-banking financial company (NBFC), housing finance company (HFC), or direct selling
        agent (DSA). All simulations are performed client-side using standard compound annuity mathematics and Reserve
        Bank of India (RBI) benchmark guidelines. Computations are indicative estimates and do not constitute a credit
        sanction, loan commitment, or financial advice. Consult your certified financial planner or bank manager before
        making balance transfer decisions.
      </div>
    </footer>
  );
}
