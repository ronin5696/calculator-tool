import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy – DevsPoint Home Loan Engine",
  description:
    "DevsPoint Home Loan Engine Privacy Policy — learn how we protect your information: 100% client-side calculator execution with transparent Google AdSense & analytics cookie disclosures.",
  alternates: { canonical: "https://devspoint.in/privacy-policy" },
  robots: { index: true, follow: true },
};

const lastUpdated = "October 24, 2026";

export default function PrivacyPolicyPage() {
  return (
    <>
      <div className="page-hero" aria-labelledby="privacy-title">
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
              <li aria-current="page">Privacy Policy</li>
            </ol>
          </nav>
          <h1 id="privacy-title" className="page-hero-title">
            Privacy Policy
          </h1>
          <p className="page-hero-sub">Last updated: {lastUpdated}</p>
        </div>
      </div>

      <section className="section" aria-labelledby="privacy-content">
        <div className="section-container">
          <div className="prose">
            <div
              className="info-box"
              style={{
                background: "linear-gradient(135deg, #ecfdf5, #d1fae5)",
                borderColor: "#10b981",
                marginBottom: "32px",
                padding: "24px",
              }}
            >
              <span className="info-box-icon" style={{ fontSize: "28px" }}>
                🔒
              </span>
              <div>
                <h3 style={{ margin: "0 0 6px", color: "#065f46", fontSize: "18px" }}>
                  Privacy at a Glance: Local Calculator Execution &amp; Transparent Cookie Use
                </h3>
                <p style={{ margin: 0, color: "#047857", fontSize: "14px", lineHeight: 1.6 }}>
                  <strong>Calculator Inputs Stay 100% Local:</strong> All home loan numbers, balances, interest rates,
                  and EMI schedules are computed entirely inside your web browser. We never collect, transmit, or store
                  your loan details on our servers. To keep this platform free and accessible, we use standard,
                  privacy-compliant analytics (Google Analytics) and advertising cookies (Google AdSense) to measure
                  aggregated site traffic and display relevant advertisements in accordance with your cookie preferences.
                </p>
              </div>
            </div>

            <p>
              Welcome to DevsPoint Home Loan Engine (&quot;DevsPoint,&quot; &quot;we,&quot; &quot;our,&quot; or
              &quot;us&quot;), hosted at{" "}
              <a href="https://devspoint.in">https://devspoint.in</a> (the &quot;Site&quot;). We are committed to
              protecting your personal privacy and providing complete transparency regarding how our tools operate and how
              standard website cookies are utilized.
            </p>
            <p>
              Please read this Privacy Policy carefully to understand our practices regarding your data. If you have any
              questions, please reach out via our <Link href="/contact">Contact Page</Link> or email us at{" "}
              <a href="mailto:privacy@devspoint.in">privacy@devspoint.in</a>.
            </p>

            <h2>1. Financial Calculator Data: 100% Client-Side Privacy</h2>
            <p>
              Traditional mortgage broker websites and lending portals frequently collect your phone number, salary,
              loan balance, and property city to generate marketing leads. DevsPoint operates under an entirely different
              architecture:
            </p>
            <ul>
              <li>
                <strong>Browser-Only Computation:</strong> Every calculation (including EMI amortization, balance
                transfer break-even period, and interest savings) runs strictly inside your local browser memory using
                JavaScript.
              </li>
              <li>
                <strong>Zero Financial Data Transmitted:</strong> Your outstanding principal, interest rates, tenure,
                and bank names never leave your device. They are not transmitted across the internet, logged in access
                logs, or saved to any database.
              </li>
              <li>
                <strong>Immediate In-Memory Purge:</strong> The moment you refresh or close your browser tab, all
                ephemeral calculator parameters are immediately cleared by your browser.
              </li>
            </ul>

            <h2>2. Information We Collect Automatically (Website Analytics &amp; Infrastructure)</h2>
            <p>
              Like almost all modern educational websites, our web hosting servers and analytics tools automatically
              receive standard technical diagnostic data when you browse our pages. This information does not contain your
              name or financial numbers and includes:
            </p>
            <ul>
              <li>Browser type, operating system, and screen resolution</li>
              <li>Referring URLs and pages visited on our Site</li>
              <li>Date, time, and duration of visits</li>
              <li>Approximate geographic region (country and state/city level derived from anonymized IP address)</li>
              <li>Device category (mobile, tablet, desktop)</li>
            </ul>

            <h2>3. Voluntary Communications</h2>
            <p>
              The only personally identifiable information we receive is data you choose to provide directly, such as:
            </p>
            <ul>
              <li>
                Your name, email address, and inquiry message submitted through our{" "}
                <Link href="/contact">Contact Form</Link>
              </li>
              <li>Communications or feedback sent directly to our editorial team via email</li>
            </ul>
            <p>
              We use this information exclusively to answer your questions, resolve technical reports, or provide
              editorial clarification. We never sell, rent, or trade your contact information.
            </p>

            <h2>4. Cookies, Google AdSense &amp; Tracking Technologies</h2>
            <p>
              Cookies are small text files placed on your device to remember preferences, analyze website traffic, and
              support advertising partners. We use the following categories of cookies:
            </p>

            <h3>4.1 Essential &amp; Functional Cookies</h3>
            <p>
              These cookies are strictly necessary for core website features, such as remembering your Cookie Consent
              preferences and calculator display modes. They do not track your browsing across other sites and cannot be
              switched off in our system.
            </p>

            <h3>4.2 Analytics Cookies (Google Analytics)</h3>
            <p>
              We use <strong>Google Analytics</strong> to evaluate aggregated website traffic patterns, identify which
              home loan articles are most helpful, and fix technical site performance issues. Google Analytics uses
              cookies to collect aggregated, non-identifying browsing metrics with IP anonymization enabled.
            </p>
            <p>
              You can opt out of Google Analytics measurement at any time by installing the official{" "}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                rel="noopener noreferrer"
                target="_blank"
              >
                Google Analytics Opt-out Browser Add-on
              </a>
              .
            </p>

            <h3>4.3 Advertising Cookies (Google AdSense)</h3>
            <p>
              To keep our home loan calculators, financial tools, and research guides freely available to everyone without
              a paywall, we display advertisements served by <strong>Google AdSense</strong> and its certified advertising
              partners.
            </p>
            <ul>
              <li>
                Third-party vendors, including Google, use cookies to serve ads based on a user&apos;s prior visits to our
                website or other websites on the Internet.
              </li>
              <li>
                Google&apos;s use of advertising cookies enables it and its partners to serve ads to users based on their
                visit to our sites and/or other sites on the Internet.
              </li>
              <li>
                Users may opt out of personalized advertising by visiting{" "}
                <a
                  href="https://www.google.com/settings/ads"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Google Ads Settings
                </a>{" "}
                or{" "}
                <a
                  href="https://www.aboutads.info"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  aboutads.info
                </a>
                .
              </li>
            </ul>

            <h3>4.4 How to Manage Your Cookie Preferences</h3>
            <p>You have full control over your cookie choices:</p>
            <ul>
              <li>
                <strong>On Our Site:</strong> You can click the <strong>&quot;Cookie Settings&quot;</strong> link located in
                our website footer at any time to review or update your consent preferences (Accept All, Reject Non-Essential,
                or Customize).
              </li>
              <li>
                <strong>Browser Controls:</strong> Most web browsers allow you to block, restrict, or delete cookies
                through their settings menu. For guidance, visit{" "}
                <a
                  href="https://www.allaboutcookies.org"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  www.allaboutcookies.org
                </a>
                .
              </li>
            </ul>

            <h2>5. Third-Party Service Providers</h2>
            <p>We work with trusted service providers to deliver our web infrastructure:</p>
            <ul>
              <li>
                <strong>Hosting Infrastructure:</strong> Cloud hosting providers who process encrypted web traffic under
                strict confidentiality obligations.
              </li>
              <li>
                <strong>Google AdSense &amp; Analytics:</strong> Ad serving and aggregated traffic analysis subject to{" "}
                <a
                  href="https://policies.google.com/privacy"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Google&apos;s Privacy &amp; Terms
                </a>
                .
              </li>
            </ul>

            <h2>6. Your Privacy Rights</h2>
            <p>
              Depending on your country or state of residence, you are entitled to specific statutory rights regarding
              your personal data:
            </p>
            <ul>
              <li>
                <strong>India (Digital Personal Data Protection Act - DPDPA 2023):</strong> You have the right to obtain
                a summary of personal data processed, request correction or erasure of your voluntary communications, and
                nominate a representative to exercise rights on your behalf.
              </li>
              <li>
                <strong>European Union &amp; United Kingdom (GDPR / UK GDPR):</strong> You have the right to access,
                rectify, erase, restrict processing of, and port your personal data, as well as withdraw cookie consent at
                any time.
              </li>
              <li>
                <strong>California (CCPA / CPRA):</strong> You have the right to know what personal data is collected,
                request deletion, and opt out of the sale or sharing of personal information. We do not sell personal
                information.
              </li>
            </ul>
            <p>
              To exercise any of these rights, please contact our Data Grievance Officer at{" "}
              <a href="mailto:privacy@devspoint.in">privacy@devspoint.in</a>.
            </p>

            <h2>7. Data Retention &amp; Security</h2>
            <p>
              Calculator inputs are never retained because they are never transmitted to our servers. Contact form
              submissions and support correspondence are retained for up to 24 months to address ongoing inquiries.
              We implement industry-standard SSL/TLS encryption across all site traffic to safeguard communications.
            </p>

            <h2>8. Changes to This Privacy Policy</h2>
            <p>
              We may periodically revise this Privacy Policy to reflect regulatory updates or changes to our site
              features. Any updates will be published directly on this page with an updated &quot;Last updated&quot; date.
            </p>

            <h2>9. Contact &amp; Grievance Redressal</h2>
            <p>If you have any questions, concerns, or requests regarding this Privacy Policy, please contact us:</p>
            <ul>
              <li>
                <strong>Email:</strong> <a href="mailto:privacy@devspoint.in">privacy@devspoint.in</a>
              </li>
              <li>
                <strong>Editorial Desk:</strong> <a href="mailto:editor@devspoint.in">editor@devspoint.in</a>
              </li>
              <li>
                <strong>Contact Form:</strong> <Link href="/contact">https://devspoint.in/contact</Link>
              </li>
              <li>
                <strong>Platform:</strong> DevsPoint Home Loan Engine (<a href="https://devspoint.in">devspoint.in</a>)
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
