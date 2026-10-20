import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service – DevsPoint Calc",
  description: "Terms of Service for DevsPoint Financial Engine (devspoint.in) — the open-source mortgage and amortization calculator. Understand the terms governing your use of our software.",
  alternates: { canonical: "https://devspoint.in/terms-of-service" },
};

const lastUpdated = "October 20, 2024";

export default function TermsOfServicePage() {
  return (
    <>
      <div className="page-hero" aria-labelledby="tos-title">
        <div className="hero-grid" aria-hidden="true" />
        <div className="page-hero-container">
          <nav aria-label="Breadcrumb">
            <ol className="breadcrumb" style={{ listStyle: "none", padding: 0 }}>
              <li><Link href="/">Home</Link></li>
              <li><span className="breadcrumb-sep" aria-hidden="true">›</span></li>
              <li aria-current="page">Terms of Service</li>
            </ol>
          </nav>
          <h1 id="tos-title" className="page-hero-title">Terms of Service</h1>
          <p className="page-hero-sub">Last updated: {lastUpdated}</p>
        </div>
      </div>

      <section className="section" aria-labelledby="tos-content">
        <div className="section-container">
          <div className="prose">
            <p>
              Please read these Terms of Service (&quot;Terms,&quot; &quot;Terms of Service&quot;) carefully before using the
              DevsPoint Financial Engine website located at{" "}
              <a href="https://devspoint.in">https://devspoint.in</a> (the &quot;Site&quot;)
              operated by DevsPoint (&quot;us,&quot; &quot;we,&quot; &quot;our&quot;).
            </p>
            <p>
              Your access to and use of the Site is conditioned on your acceptance of and compliance with these Terms.
              By accessing or using the Site, you agree to be bound by these Terms.
              If you disagree with any part of these terms, you may not access the Site.
            </p>

            <h2>1. Use of the Site</h2>
            <p>
              DevsPoint grants you a limited, non-exclusive, non-transferable, and revocable license to access and
              use the Site for your personal, educational, or developer evaluation purposes. You agree not to:
            </p>
            <ul>
              <li>Use the Site in any way that violates applicable laws or regulations</li>
              <li>Transmit any unsolicited or unauthorized advertising or promotional material</li>
              <li>Attempt to gain unauthorized access to any infrastructure or denial-of-service attacks</li>
              <li>Engage in any conduct that restricts or inhibits anyone&apos;s use of the Site</li>
              <li>Use automated tools to aggressively overload the server or scrape content without permission</li>
              <li>Misrepresent or claim ownership of our original software algorithms</li>
            </ul>

            <h2>2. Informational Purpose Only — Not Financial Advice</h2>
            <p>
              <strong>The content and computational tools on DevsPoint Financial Engine are provided for informational, educational, and developer evaluation purposes only.</strong>
              Nothing on this Site constitutes financial, investment, legal, or tax advice. The mortgage calculator
              results are mathematical estimates based on the parameters you input and standard annuity formulas.
            </p>
            <p>
              Actual loan terms, interest rates, monthly payments, closing costs, and savings will vary based on your
              individual circumstances, credit profile, lender policies, and prevailing market conditions. Always consult
              with a licensed mortgage lender, financial advisor, or real estate attorney before making any financial decisions.
            </p>
            <p>
              DevsPoint is not a mortgage lender, broker, bank, or financial institution. We do not originate or
              broker loan transactions, and we do not offer specific interest rates or loan products.
            </p>

            <h2>3. Accuracy of Information</h2>
            <p>
              While we strive to ensure the mathematical precision of the engine and calculator results on the Site, we make no
              warranties or representations as to the completeness or commercial suitability of any calculations or results for specific lending applications.
              We reserve the right to correct any algorithmic inaccuracies or omissions at any time.
            </p>

            <h2>4. Advertising</h2>
            <p>
              DevsPoint displays advertisements served by <strong>Google AdSense</strong> and potentially other
              advertising networks. These advertisements are clearly labeled as ads. DevsPoint is not responsible
              for the content of third-party advertisements and does not endorse any advertised products, services,
              or companies. Your interactions with advertisers, including clicking on ads, are governed by the
              advertiser&apos;s own terms and privacy policies.
            </p>

            <h2>5. Open-Source Utility &amp; MIT License</h2>
            <p>
              The core computational modules of the DevsPoint Financial Engine (<code>dp-calc-engine</code>), including its discrete amortization algorithms and break-even functions, are published and distributed as open-source software under the permissive <strong>MIT License</strong>:
            </p>
            <div style={{ background: "#0f172a", color: "#f8fafc", padding: "20px 24px", borderRadius: "12px", fontFamily: "monospace", fontSize: "13px", lineHeight: "1.6", border: "1px solid #334155", margin: "20px 0" }}>
              <div style={{ color: "#93c5fd", fontWeight: "bold", marginBottom: "8px" }}>MIT License</div>
              <div style={{ color: "#94a3b8", marginBottom: "12px" }}>Copyright (c) 2024–2026 DevsPoint (https://devspoint.in)</div>
              <p style={{ margin: "0 0 12px 0", color: "#e2e8f0" }}>
                Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the &quot;Software&quot;), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
              </p>
              <p style={{ margin: "0 0 12px 0", color: "#e2e8f0" }}>
                The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
              </p>
              <p style={{ margin: 0, color: "#94a3b8" }}>
                THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
              </p>
            </div>
            <p>
              The site design, educational editorial articles, and DevsPoint branding remain the intellectual property of DevsPoint.
            </p>

            <h2>6. Third-Party Links</h2>
            <p>
              Our Site may contain links to third-party websites or services that are not owned or controlled by
              DevsPoint. We have no control over and assume no responsibility for the content, privacy policies,
              or practices of any third-party websites or services.
            </p>

            <h2>7. Disclaimer of Warranties</h2>
            <p>
              THE SITE IS PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS WITHOUT ANY WARRANTIES OF ANY KIND,
              EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
              PARTICULAR PURPOSE, NON-INFRINGEMENT, OR COURSE OF PERFORMANCE.
            </p>
            <p>
              DEVSPOINT DOES NOT WARRANT THAT: (A) THE SITE WILL FUNCTION UNINTERRUPTED, SECURE, OR AVAILABLE
              AT ANY PARTICULAR TIME OR LOCATION; (B) ANY ERRORS OR DEFECTS WILL BE CORRECTED; OR (C) THE RESULTS OF USING THE SITE WILL MEET SPECIFIC COMMERCIAL CREDIT REQUIREMENTS.
            </p>

            <h2>8. Limitation of Liability</h2>
            <p>
              IN NO EVENT SHALL DEVSPOINT, ITS DIRECTORS, DEVELOPERS, EMPLOYEES, PARTNERS, OR AGENTS
              BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT
              LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES ARISING FROM YOUR USE OF THE SOFTWARE OR RELIANCE ON ITS CALCULATIONS.
            </p>

            <h2>9. Indemnification</h2>
            <p>
              You agree to defend, indemnify, and hold harmless DevsPoint and its developers, contractors, and agents
              from and against any and all claims, damages, obligations, losses, liabilities, costs, or debt arising from your misuse
              of the Site or from your violation of these Terms.
            </p>

            <h2>10. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with applicable laws,
              without regard to conflict of law provisions.
            </p>

            <h2>11. Changes to Terms</h2>
            <p>
              We reserve the right to modify or replace these Terms at any time at our sole discretion. We will
              provide notice of significant changes by updating the &quot;Last updated&quot; date. Your continued use of the
              Site following the posting of revised Terms means that you accept and agree to the changes.
            </p>

            <h2>12. Contact Us</h2>
            <p>If you have any questions about these Terms, please contact us:</p>
            <ul>
              <li><strong>Email:</strong> <a href="mailto:legal@devspoint.in">legal@devspoint.in</a></li>
              <li><strong>Contact form:</strong> <Link href="/contact">https://devspoint.in/contact</Link></li>
              <li><strong>Organization:</strong> DevsPoint Engineering Labs (<a href="https://devspoint.in">devspoint.in</a>)</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
