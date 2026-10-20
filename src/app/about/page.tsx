import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About DevsPoint Financial Engine – DevsPoint Engineering Labs",
  description:
    "Learn about DevsPoint Financial Engine — an open-source, client-side computational finance suite engineered under devspoint.in for mathematical transparency and zero data tracking.",
  alternates: { canonical: "https://devspoint.in/about" },
  openGraph: { title: "About DevsPoint Financial Engine", url: "https://devspoint.in/about" },
};

const team = [
  {
    initials: "DP",
    name: "DevsPoint",
    role: "Engineering Labs & Lead Developer",
    bio: "Software engineering and financial technology initiative at devspoint.in. Designing open-source, client-side mathematical calculators, debt simulation models, and closed-form discrete amortization engines with zero telemetry.",
    color: "#1a56db",
  },
];

const values = [
  { icon: "🔓", title: "Open & Transparent", desc: "Our core math formulas and algorithms are documented publicly with open JSON schemas." },
  { icon: "🎯", title: "Mathematical Rigor", desc: "Every formula follows closed-form annuity solutions validated against standard financial benchmarks." },
  { icon: "🔒", title: "100% Client-Side Privacy", desc: "Zero telemetry. Calculations execute locally in your browser memory without sending financial numbers to any remote server." },
  { icon: "⚡", title: "Sub-Millisecond Speed", desc: "Optimized V8 numerical routines provide instantaneous feedback with zero server latency." },
];

export default function AboutPage() {
  return (
    <>
      <div className="page-hero" aria-labelledby="about-title">
        <div className="hero-grid" aria-hidden="true" />
        <div className="page-hero-container">
          <nav aria-label="Breadcrumb">
            <ol className="breadcrumb" style={{ listStyle: "none", padding: 0 }}>
              <li><Link href="/">Home</Link></li>
              <li><span className="breadcrumb-sep" aria-hidden="true">›</span></li>
              <li aria-current="page">About Labs</li>
            </ol>
          </nav>
          <div style={{ display: "inline-block", background: "rgba(59,130,246,0.2)", color: "#93c5fd", padding: "4px 12px", borderRadius: "100px", fontSize: "12px", fontWeight: 700, marginBottom: "12px" }}>
            DEVSPOINT ENGINEERING LABS
          </div>
          <h1 id="about-title" className="page-hero-title">About DevsPoint Financial Engine</h1>
          <p className="page-hero-sub">
            An open-source developer initiative under DevsPoint (<a href="https://devspoint.in" style={{ color: "#93c5fd" }}>devspoint.in</a>) providing client-side computational finance software with mathematical transparency and zero data harvesting.
          </p>
        </div>
      </div>

      {/* Mission */}
      <section className="section" aria-labelledby="mission-title">
        <div className="section-container">
          <div className="about-mission-grid">
            <div>
              <span className="section-tag">🎯 Engineering Mission</span>
              <h2 id="mission-title" className="section-title" style={{ marginTop: 12 }}>
                Mathematical Transparency in Consumer Debt
              </h2>
              <div className="prose">
                <p>
                  The DevsPoint Financial Engine was created as an open-source initiative by developers at DevsPoint (<a href="https://devspoint.in">devspoint.in</a>). Traditional online financial calculators are frequently closed-source, cluttered with lead-generation popups, and designed to harvest user financial data for mortgage brokers.
                </p>
                <p>
                  We built this engine on three foundational principles: <strong>open mathematical transparency</strong>, <strong>100% client-side execution</strong>, and <strong>developer accessibility</strong> via clean JSON data structures.
                </p>
                <p>
                  We built the tools we wished existed when we were homeowners navigating our own refinancing
                  decisions. Our calculators give you the same level of detail — amortization schedules,
                  break-even analysis, total interest comparisons — that mortgage professionals use every day.
                </p>
                <p>
                  We&apos;re not a lender, we don&apos;t earn referral fees, and we don&apos;t sell your data.
                  Our only goal is to help you make smarter decisions.
                </p>
              </div>
            </div>
            <div>
              <div className="about-values-grid">
                {values.map((v) => (
                  <div key={v.title} className="feature-card" style={{ padding: 24 }}>
                    <div style={{ fontSize: 28, marginBottom: 12 }} aria-hidden="true">{v.icon}</div>
                    <h3 style={{ fontSize: 16, marginBottom: 8 }}>{v.title}</h3>
                    <p style={{ fontSize: 14 }}>{v.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Creator & Engineering Identity */}
      <section className="section section-surface" aria-labelledby="team-title">
        <div className="section-container" style={{ maxWidth: 760 }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <span className="section-tag">💻 Engineering &amp; Development</span>
            <h2 id="team-title" className="section-title" style={{ marginTop: 12 }}>
              Built &amp; Maintained by DevsPoint
            </h2>
            <p className="section-subtitle" style={{ margin: "0 auto" }}>
              DevsPoint is an independent software development project focused on computational finance, transparency, and consumer privacy.
            </p>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {team.map((member) => (
              <article className="team-card" key={member.name} style={{ width: "100%", maxWidth: 580, textAlign: "center", padding: "36px 32px" }}>
                <div className="team-avatar" style={{ background: "linear-gradient(135deg, #10b981, #1a56db)", margin: "0 auto 20px", width: 68, height: 68, fontSize: 24, fontWeight: 800 }} aria-hidden="true">
                  {member.initials}
                </div>
                <h3 className="team-name" style={{ fontSize: 22 }}>{member.name}</h3>
                <p className="team-role" style={{ color: "var(--primary)", fontWeight: 700, marginTop: 4 }}>{member.role}</p>
                <p className="team-bio" style={{ marginTop: 16, lineHeight: 1.7, fontSize: 15, color: "var(--text-secondary)" }}>{member.bio}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Disclosure */}
      <section className="section" aria-labelledby="disclosure-title">
        <div className="section-container">
          <div className="prose" style={{ maxWidth: 720, margin: "0 auto" }}>
            <h2 id="disclosure-title">Editorial Disclosure &amp; Advertising</h2>
            <p>
              DevsPoint is supported by advertising revenue, including Google AdSense ads that may appear on this website.
              These ads are clearly labeled and do not influence our editorial content, calculator formulas, or recommendations.
            </p>
            <p>
              DevsPoint does not accept sponsored content, paid reviews, or referral fees from lenders or financial
              institutions. All information on this website is provided for general informational purposes only and does not
              constitute financial advice.
            </p>
            <p>
              For more information, please review our <Link href="/privacy-policy" style={{ color: "var(--primary)" }}>Privacy Policy</Link>,{" "}
              <Link href="/terms-of-service" style={{ color: "var(--primary)" }}>Terms of Service</Link>, and{" "}
              <Link href="/disclaimer" style={{ color: "var(--primary)" }}>Disclaimer</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" aria-labelledby="about-cta-title">
        <h2 id="about-cta-title" className="cta-title">Ready to Start Saving?</h2>
        <p className="cta-sub">Use our free calculator — no email, no account, no obligations.</p>
        <div className="cta-buttons">
          <Link href="/calculator" id="about-cta-btn" className="btn-white">🧮 Open Calculator</Link>
          <Link href="/contact" className="btn-outline-white">📬 Contact Us</Link>
        </div>
      </section>
    </>
  );
}
