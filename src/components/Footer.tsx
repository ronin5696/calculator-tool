import Link from "next/link";

const toolLinks = [
  { href: "/calculator", label: "Refinance Calculator" },
  { href: "/calculator/amortization", label: "Amortization Schedule" },
  { href: "/calculator/break-even", label: "Break-Even Calculator" },
  { href: "/calculator/cash-out", label: "Cash-Out Refinance" },
];

const resourceLinks = [
  { href: "/resources/refinancing-guide", label: "Refinancing Guide" },
  { href: "/resources/when-to-refinance", label: "When to Refinance" },
  { href: "/resources/refinancing-costs", label: "Refinancing Costs Explained" },
  { href: "/resources/fixed-vs-arm", label: "Fixed vs. ARM Loans" },
];

const companyLinks = [
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-of-service", label: "Terms of Service" },
  { href: "/disclaimer", label: "Disclaimer" },
  { href: "/sitemap.xml", label: "Sitemap" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-grid">
        {/* Brand */}
        <div className="footer-brand">
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <div className="nav-logo-icon" aria-hidden="true" style={{ width: 38, height: 38, fontSize: 16, background: "linear-gradient(135deg, #10b981, #1a56db)", fontFamily: "monospace" }}>&lt;/&gt;</div>
            <div>
              <span className="nav-logo-text" style={{ fontSize: 18 }}>DevsPoint</span>
              <span style={{ display: "block", fontSize: 10, color: "#93c5fd", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700 }}>Financial Engine</span>
            </div>
          </Link>
          <p>
            An open-source, client-side computational finance suite developed under DevsPoint (<a href="https://devspoint.in" style={{ color: "#60a5fa" }}>devspoint.in</a>). High-precision debt simulation and amortization modeling with zero server-side telemetry.
          </p>
          <div style={{ display: "flex", gap: 10, marginTop: 20, flexWrap: "wrap" }}>
            {["🔒 100% Client-Side", "⚡ Zero Telemetry", "📐 IEEE 754 Math", "📦 Open Spec"].map((b) => (
              <span key={b} className="trust-badge">{b}</span>
            ))}
          </div>
        </div>

        {/* Tools */}
        <div>
          <h3 className="footer-heading">Tools</h3>
          <ul className="footer-links">
            {toolLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="footer-heading">Resources</h3>
          <ul className="footer-links">
            {resourceLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="footer-heading">Company</h3>
          <ul className="footer-links">
            {companyLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {currentYear} DevsPoint (<a href="https://devspoint.in" style={{ color: "inherit", textDecoration: "underline" }}>devspoint.in</a>). All rights reserved.</span>
        <div style={{ display: "flex", gap: 20 }}>
          <Link href="/privacy-policy" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none", fontSize: 13 }}>Privacy</Link>
          <Link href="/terms-of-service" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none", fontSize: 13 }}>Terms</Link>
          <Link href="/disclaimer" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none", fontSize: 13 }}>Disclaimer</Link>
          <Link href="/contact" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none", fontSize: 13 }}>Contact</Link>
        </div>
      </div>

      <div className="footer-disclaimer">
        <strong style={{ color: "rgba(255,255,255,0.5)" }}>Technical & Financial Disclaimer:</strong> DevsPoint Financial Engine is an independent software tool and educational utility hosted on devspoint.in. Numerical computations are calculated client-side according to standard continuous/discrete annuity and amortization mathematics. DevsPoint is not a licensed mortgage lender, broker, or financial depository institution. Outputs do not constitute binding credit offers or financial advice.
      </div>
    </footer>
  );
}
