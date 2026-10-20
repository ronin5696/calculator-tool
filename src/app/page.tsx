import type { Metadata } from "next";
import Link from "next/link";
import RefinanceCalculator from "@/components/RefinanceCalculator";

export const metadata: Metadata = {
  title: "DevsPoint Financial Engine: Open-Source Mortgage & Amortization Calculator",
  description:
    "DevsPoint Financial Engine — Open-source client-side mortgage refinance calculator. Computes monthly savings, break-even velocity, and amortization schedules using standard annuity mechanics.",
  alternates: { canonical: "https://devspoint.in" },
};

const features = [
  {
    icon: "💰",
    color: "blue",
    title: "Monthly Payment Savings",
    desc: "Calculate exact monthly payment deltas after refinancing, accounting for new rates, terms, and closing fees.",
  },
  {
    icon: "📈",
    color: "purple",
    title: "Break-Even Velocity",
    desc: "Determine the exact number of months needed to recoup upfront closing costs and achieve positive net ROI.",
  },
  {
    icon: "🗓️",
    color: "green",
    title: "Dual Amortization Schedule",
    desc: "Side-by-side annual balance progression and cumulative interest savings across the entire loan lifespan.",
  },
  {
    icon: "💻",
    color: "orange",
    title: "API & JSON Spec View",
    desc: "Inspect the raw computational engine output payload or export full JSON schedules for developer workflows.",
  },
  {
    icon: "⚡",
    color: "sky",
    title: "Client-Side V8 Execution",
    desc: "Sub-millisecond execution directly in browser memory with zero server hops or backend latency.",
  },
  {
    icon: "🔒",
    color: "pink",
    title: "100% Private (Zero Tracking)",
    desc: "All financial simulations run strictly locally. Zero server telemetry, zero tracking cookies, zero database logging.",
  },
];

const faqs = [
  {
    q: "What is the DevsPoint Financial Engine?",
    a: "The DevsPoint Financial Engine is an open-source, client-side mortgage refinance and debt simulation tool. It provides mathematically verifiable amortization modeling, interest delta calculations, and break-even analysis directly within your browser.",
  },
  {
    q: "What formula is used to calculate monthly mortgage payments?",
    a: "The engine uses the standard closed-form annuity amortization formula: M = P * [r(1+r)^n] / [(1+r)^n - 1], where M is monthly payment, P is principal balance, r is monthly interest rate, and n is the total number of monthly payments.",
  },
  {
    q: "How does the break-even calculator work?",
    a: "The break-even velocity formula divides total closing costs by monthly payment savings: BreakEvenMonths = ceil(ClosingCosts / MonthlySavings). If monthly savings are negative or zero, the engine flags the transaction as non-recovering.",
  },
  {
    q: "Can I export the calculation as JSON?",
    a: "Yes. Switch to the 'API / JSON' tab in the calculator or click 'Export JSON' to download a complete machine-readable payload containing input parameters, calculated metrics, and the full amortization schedule.",
  },
  {
    q: "When does it make financial sense to refinance?",
    a: "Refinancing typically makes sense when you can lower your rate enough to recover closing costs well before you plan to sell or move, when switching from an adjustable-rate mortgage (ARM) to a stable fixed rate, or when shortening terms to save on lifetime interest.",
  },
  {
    q: "Why does the engine run 100% client-side?",
    a: "Running in the user's browser guarantees sub-millisecond calculation speeds and absolute data confidentiality. Your financial balances and loan details never travel across the internet or touch remote servers.",
  },
];

const featuredGuides = [
  {
    slug: "refinancing-guide",
    title: "The Comprehensive Guide to Mortgage Refinancing",
    excerpt: "Everything you need to know about replacing your mortgage: how the math actually works, evaluating closing friction, and avoiding common lender traps.",
    category: "Master Guide",
    readTime: "11 min read",
    emoji: "📘",
  },
  {
    slug: "when-to-refinance",
    title: "When Does It Actually Make Sense to Refinance?",
    excerpt: "The nuanced reality of refinancing timing. Why the old 1% rule is broken, how to calculate break-even velocity, and when refinancing is a mistake.",
    category: "Strategy",
    readTime: "8 min read",
    emoji: "⏱️",
  },
  {
    slug: "refinance-costs",
    title: "Refinancing Costs Explained: Line-by-Line Fee Breakdown",
    excerpt: "Closing costs can quietly wipe out your interest savings. We break down origination fees, appraisal costs, title insurance, and 'no-cost' refi traps.",
    category: "Cost Analysis",
    readTime: "9 min read",
    emoji: "💸",
  },
  {
    slug: "fixed-vs-arm",
    title: "Fixed-Rate vs. ARM Loans: Which Is Better for Refinancing?",
    excerpt: "Should you lock in a predictable 30-year fixed rate or capture short-term savings with a 5/1 or 7/1 ARM? A clear-eyed mathematical comparison.",
    category: "Loan Types",
    readTime: "8 min read",
    emoji: "⚖️",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-container">
          <div>
            <div className="hero-badge" role="note">
              <span>⚡</span> DevsPoint Labs · Open-Source Financial Engine v2.4
            </div>
            <h1 id="hero-title" className="hero-title">
              DevsPoint <span>Financial Engine</span>: Open-Source Mortgage &amp; Amortization Calculator
            </h1>
            <p className="hero-subtitle">
              High-precision debt mechanics, client-side amortization schedules, and break-even simulation engine. Built for transparency, reproducibility, and zero data tracking.
            </p>
            <div className="hero-stats">
              <div className="hero-stat">
                <span className="hero-stat-value">&lt;1ms</span>
                <span className="hero-stat-label">Client V8 compute</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-value">IEEE 754</span>
                <span className="hero-stat-label">Precision math</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-value">100%</span>
                <span className="hero-stat-label">Client-side &amp; private</span>
              </div>
            </div>
          </div>

          {/* Quick calc preview */}
          <div className="calc-card" style={{ maxWidth: 440 }}>
            <div style={{ textAlign: "center", padding: "16px 0" }}>
              <div style={{ fontSize: 40, marginBottom: 12, fontFamily: "monospace", color: "#38bdf8" }}>{`{ dp.engine }`}</div>
              <h2 style={{ fontSize: 20, color: "var(--dark)", marginBottom: 8 }}>
                Open-Source Mortgage Engine
              </h2>
              <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 20, lineHeight: 1.5 }}>
                Simulate refinancing scenarios, inspect mathematical formulas, and export complete JSON schemas.
              </p>
              <Link href="/calculator" id="hero-calc-btn" className="calc-btn" style={{ textDecoration: "none", display: "flex" }}>
                Launch Calculator Engine →
              </Link>
              <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 14 }}>
                Pure TypeScript · Zero telemetry · MIT License
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Embedded Calculator ─── */}
      <section className="section section-surface" id="calculator-section" aria-labelledby="calc-section-title">
        <div className="section-container">
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <span className="section-tag">🧮 Interactive Engine Widget</span>
          </div>
          <h2 id="calc-section-title" style={{ fontSize: "clamp(26px,3.5vw,36px)", color: "var(--dark)", textAlign: "center", marginBottom: 8 }}>
            Mortgage Refinance &amp; Amortization Engine
          </h2>
          <p style={{ textAlign: "center", color: "var(--text-secondary)", fontSize: "15px", maxWidth: "600px", margin: "0 auto 24px" }}>
            Adjust loan parameters below. View instant monthly deltas, amortization tables, visual charts, or export raw JSON data.
          </p>
        </div>
        <RefinanceCalculator />
      </section>

      {/* ─── Developer Perspective: Mechanics, Formula & Code Breakdown (Collapsible) ─── */}
      <section className="section" id="engine-mechanics" aria-labelledby="mechanics-title" style={{ background: "#ffffff", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", paddingTop: "40px", paddingBottom: "40px" }}>
        <div className="section-container" style={{ maxWidth: 1000 }}>
          <details className="dev-docs-accordion">
            <summary className="dev-docs-summary">
              <div className="dev-docs-summary-left">
                <span className="dev-docs-badge">🛠️ Developer Documentation</span>
                <h2 id="mechanics-title" className="dev-docs-title">
                  Engine Architecture, Mathematical Derivation &amp; TypeScript Source Code
                </h2>
                <p className="dev-docs-desc">
                  Click to inspect the discrete compounding formula, recurrence amort algorithm, and IEEE 754 precision safeguards.
                </p>
              </div>
              <span className="dev-docs-chevron" aria-hidden="true">▼</span>
            </summary>

            <div className="dev-docs-content">
              <div className="prose" style={{ maxWidth: "100%", margin: "0 auto", fontSize: "15px", color: "var(--text-secondary)", lineHeight: 1.8 }}>
                <h3>1. The Core Mathematical Formula: Closed-Form Monthly Amortization</h3>
                <p>
                  Under standard consumer credit underwriting, mortgage amortization schedules follow a fixed-payment annuity structure. Rather than computing continuous compounding, standard retail loans apply discrete monthly compounding where the periodic interest rate is defined as:
                </p>
                <div style={{ background: "#0f172a", color: "#f8fafc", padding: "18px 22px", borderRadius: "14px", fontFamily: "monospace", margin: "16px 0", border: "1px solid #334155" }}>
                  <div style={{ color: "#93c5fd", fontSize: "12px", marginBottom: "6px" }}>// Standard Amortization Formula:</div>
                  <div style={{ fontSize: "clamp(18px, 4vw, 22px)", fontWeight: "bold", color: "#38bdf8", textAlign: "center", padding: "10px 0" }}>
                    M = P · [ r(1 + r)ⁿ ] / [ (1 + r)ⁿ - 1 ]
                  </div>
                  <div style={{ fontSize: "12px", color: "#94a3b8", textAlign: "center" }}>
                    (Where M = monthly payment, P = principal, r = periodic interest rate, n = number of periods)
                  </div>
                </div>

                <h4>Variable Semantics &amp; Unit Dimensions:</h4>
                <ul>
                  <li><strong>P (Principal Loan Balance):</strong> The remaining debt balance outstanding at the execution timestamp.</li>
                  <li><strong>r (Periodic Monthly Rate):</strong> Calculated as <code>Annual Nominal Interest Rate / 12 / 100</code>. For a 6.25% loan, <code>r = 0.0625 / 12 ≈ 0.005208333...</code></li>
                  <li><strong>n (Compounding Intervals):</strong> The remaining loan lifespan in months (e.g., 30 years × 12 = 360 months).</li>
                  <li><strong>M (Periodic Payment):</strong> The constant monthly payment covering both accrued interest and principal reduction.</li>
                </ul>

                <h3 style={{ marginTop: "32px" }}>2. Mathematical Derivation from Ordinary Annuity Present Value</h3>
                <p>
                  The formula originates from the principle of discounted cash flows. A fixed-rate mortgage is mathematically equivalent to the present value of an ordinary annuity. The initial loan principal <em>P</em> must equal the discounted sum of all future monthly installments <em>M</em>:
                </p>
                <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "12px", padding: "16px 20px", margin: "14px 0", fontFamily: "monospace" }}>
                  P = ∑ [ M / (1 + r)ᵏ ] for k = 1 to n
                </div>
                <p>
                  Factoring out the constant monthly payment <em>M</em> yields a finite geometric series with common ratio <em>(1 + r)⁻¹</em>. Applying the sum formula for a geometric progression:
                </p>
                <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "12px", padding: "16px 20px", margin: "14px 0", fontFamily: "monospace" }}>
                  P = M · [ 1 - (1 + r)⁻ⁿ ] / r
                </div>
                <p>
                  Multiplying numerator and denominator by <em>(1 + r)ⁿ</em> and isolating <em>M</em> yields the closed-form equation implemented inside the <strong>DevsPoint Financial Engine</strong>.
                </p>

                <h3 style={{ marginTop: "32px" }}>3. Recurrence Algorithm for Amortization Schedules</h3>
                <p>
                  While total monthly payment <em>M</em> remains constant, the ratio allocated between interest and principal shifts dynamically each month. For month <em>k</em>:
                </p>
                <ol>
                  <li><strong>Accrued Periodic Interest:</strong> <code>I_k = Balance_(k-1) · r</code></li>
                  <li><strong>Principal Repayment:</strong> <code>P_k = M - I_k</code></li>
                  <li><strong>Updated Unpaid Principal Balance:</strong> <code>Balance_k = Balance_(k-1) - P_k</code></li>
                </ol>
                <p>
                  Because interest is recalculated against a declining balance, principal repayment velocity accelerates non-linearly over the loan lifecycle.
                </p>

                <h3 style={{ marginTop: "32px" }}>4. Production TypeScript Implementation</h3>
                <p>
                  Below is the exact pure functional TypeScript implementation running client-side inside this Web Application:
                </p>

                <div style={{ background: "#0f172a", borderRadius: "14px", padding: "18px", color: "#f8fafc", border: "1px solid #334155", margin: "16px 0", overflowX: "auto" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#64748b", borderBottom: "1px solid #1e293b", paddingBottom: "8px", marginBottom: "12px" }}>
                    <span>dp-financial-engine.ts</span>
                    <span>TypeScript / Pure Function</span>
                  </div>
                  <pre style={{ margin: 0, fontFamily: "monospace", fontSize: "13px", lineHeight: "1.6", color: "#e2e8f0" }}>
{`/**
 * DevsPoint Financial Engine - Discrete Amortization Calculation
 * @param principal - Outstanding loan balance ($ USD)
 * @param annualRate - Nominal annual interest rate in percent (e.g. 6.25)
 * @param termMonths - Total repayment intervals (years * 12)
 * @returns Monthly payment ($ USD) rounded to 2 decimal places
 */
export function calculateMonthlyPayment(
  principal: number,
  annualRate: number,
  termMonths: number
): number {
  if (annualRate <= 0) return principal / termMonths;
  const periodicRate = annualRate / 100 / 12;
  const compoundingFactor = Math.pow(1 + periodicRate, termMonths);
  
  // Closed-form annuity solution:
  const monthlyPayment = (principal * periodicRate * compoundingFactor) / (compoundingFactor - 1);
  
  // IEEE 754 precision guard:
  return Math.round((monthlyPayment + Number.EPSILON) * 100) / 100;
}

/**
 * Break-Even Velocity Algorithm
 * @param closingCosts - Upfront transaction fees
 * @param monthlySavings - Delta between current and new monthly payment
 * @returns Months required to achieve net-positive cashflow
 */
export function calculateBreakEvenMonths(
  closingCosts: number,
  monthlySavings: number
): number | null {
  if (monthlySavings <= 0) return null; // Non-amortizing or negative delta
  return Math.ceil(closingCosts / monthlySavings);
}`}
                  </pre>
                </div>

                <h3 style={{ marginTop: "32px" }}>5. IEEE 754 Floating-Point Precision Considerations</h3>
                <p>
                  JavaScript uses the <code>IEEE 754 standard</code> for double-precision binary floating-point numbers (64-bit). In cumulative amortization loops involving 360 monthly iterations, floating-point rounding errors (e.g. <code>0.1 + 0.2 = 0.30000000000000004</code>) can accumulate and cause rounding discrepancies on terminal payments.
                </p>
                <p>
                  To eliminate drift:
                </p>
                <ul>
                  <li>The engine isolates interest decay using scaled integer cents during schedule accumulation.</li>
                  <li>A boundary guard ensures the terminal month zeroes out any fractional penny balance rather than carrying negative or ghost liabilities.</li>
                  <li>JSON payloads export with explicitly typed floating-point numerics for seamless integration with backend APIs in Python, Go, or Java.</li>
                </ul>

                <h3 style={{ marginTop: "32px" }}>6. Open API &amp; JSON Specification</h3>
                <p>
                  Developers can export calculations via the <strong>&quot;💻 API / JSON&quot;</strong> tab or click <strong>&quot;Export JSON&quot;</strong> above to download the raw numerical schema. This allows programmatic validation against Excel financial models, Python NumPy financial functions (<code>numpy_financial.pmt</code>), and automated lending pipelines.
                </p>
              </div>
            </div>
          </details>
        </div>
      </section>

      {/* ─── Features ─── */}
      <section className="section" aria-labelledby="features-title">
        <div className="section-container">
          <div>
            <span className="section-tag">✨ Features</span>
            <h2 id="features-title" className="section-title" style={{ marginTop: 12 }}>
              Everything You Need to Make a Smart Refinance Decision
            </h2>
            <p className="section-subtitle">
              DevsPoint Financial Engine gives you professional-grade analysis that was previously only available through mortgage brokers — for free.
            </p>
          </div>
          <div className="card-grid">
            {features.map((f) => (
              <article className="feature-card" key={f.title}>
                <div className={`feature-icon ${f.color}`} aria-hidden="true">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section className="section section-surface" aria-labelledby="how-title">
        <div className="section-container">
          <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 48px" }}>
            <span className="section-tag">🚀 Simple Process</span>
            <h2 id="how-title" className="section-title" style={{ marginTop: 12 }}>
              How It Works in 3 Steps
            </h2>
            <p className="section-subtitle">
              Get your refinance analysis in under two minutes — no account required.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px,1fr))", gap: 24 }}>
            {[
              { step: "01", title: "Enter Current Loan Details", desc: "Input your outstanding balance, current interest rate, and remaining term." },
              { step: "02", title: "Enter New Loan Terms", desc: "Add the new rate you're being offered, the new term, and estimated closing costs." },
              { step: "03", title: "Review Your Analysis", desc: "Instantly see your savings, break-even point, amortization schedule, and charts." },
            ].map((s) => (
              <div key={s.step} style={{ background: "white", borderRadius: 20, padding: "32px 28px", border: "1px solid var(--border)", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 20, right: 20, fontFamily: "Outfit, sans-serif", fontSize: 64, fontWeight: 900, color: "var(--primary-light)", lineHeight: 1 }} aria-hidden="true">{s.step}</div>
                <h3 style={{ fontSize: 19, color: "var(--dark)", marginBottom: 10, position: "relative" }}>{s.title}</h3>
                <p style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.65, position: "relative" }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Featured Educational Guides & Knowledge Base (Internal Linking) ─── */}
      <section className="section" id="featured-guides" aria-labelledby="guides-title" style={{ background: "var(--surface)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div className="section-container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "16px", marginBottom: "36px" }}>
            <div>
              <span className="section-tag" style={{ background: "#e0f2fe", color: "#0369a1" }}>📚 Knowledge Base &amp; Strategy</span>
              <h2 id="guides-title" className="section-title" style={{ marginTop: 12 }}>
                In-Depth Mortgage Refinancing Guides
              </h2>
              <p className="section-subtitle" style={{ maxWidth: 640 }}>
                Written from a practitioner&apos;s perspective — practical math, real dollar figures, and honest trade-offs to help you navigate your loan decision.
              </p>
            </div>
            <Link href="/blog" className="nav-cta" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px", borderRadius: "10px", padding: "10px 20px" }}>
              Explore All Guides →
            </Link>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
            {featuredGuides.map((g) => (
              <article key={g.slug} className="feature-card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "28px", background: "white" }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                    <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--primary)", background: "var(--primary-light)", padding: "4px 10px", borderRadius: "100px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      {g.category}
                    </span>
                    <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>{g.readTime}</span>
                  </div>
                  <h3 style={{ fontSize: "18px", lineHeight: 1.4, marginBottom: "10px" }}>
                    <Link href={`/blog/${g.slug}`} style={{ color: "var(--dark)", textDecoration: "none" }}>
                      {g.title}
                    </Link>
                  </h3>
                  <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "20px" }}>
                    {g.excerpt}
                  </p>
                </div>
                <Link href={`/blog/${g.slug}`} style={{ color: "var(--primary)", fontWeight: 600, fontSize: "14px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                  Read Guide <span aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="section" aria-labelledby="faq-title">
        <div className="section-container">
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            <div style={{ textAlign: "center" }}>
              <span className="section-tag">❓ FAQ</span>
              <h2 id="faq-title" className="section-title" style={{ marginTop: 12 }}>
                Frequently Asked Questions About Mortgage Refinancing
              </h2>
              <p className="section-subtitle" style={{ margin: "0 auto 0" }}>
                Everything you need to know before refinancing your home loan.
              </p>
            </div>
            <div className="faq-list" role="list">
              {faqs.map((faq, idx) => (
                <FaqItem key={idx} q={faq.q} a={faq.a} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="cta-section" aria-labelledby="cta-title">
        <h2 id="cta-title" className="cta-title">Ready to See Your Savings?</h2>
        <p className="cta-sub">Use our free calculator — no email, no sign-up, no commitment.</p>
        <div className="cta-buttons">
          <Link href="/calculator" id="cta-main-btn" className="btn-white">
            🧮 Open Calculator
          </Link>
          <Link href="/blog" className="btn-outline-white">
            📚 Read the Guide
          </Link>
        </div>
      </section>
    </>
  );
}

// ─── Inline FAQ accordion (no useState import needed in server component) ──
function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="faq-item" role="listitem">
      <summary
        className="faq-question"
        style={{ cursor: "pointer", listStyle: "none", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, padding: "22px 28px", fontSize: 16, fontWeight: 600, color: "var(--dark)" }}
      >
        {q}
        <span className="faq-icon" aria-hidden="true" style={{ width: 28, height: 28, minWidth: 28, borderRadius: "50%", background: "var(--primary-light)", color: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 700 }}>+</span>
      </summary>
      <div style={{ padding: "0 28px 22px", fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.7 }}>
        {a}
      </div>
    </details>
  );
}
