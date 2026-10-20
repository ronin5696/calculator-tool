import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy – DevsPoint Calc",
  description: "DevsPoint Financial Engine Privacy Policy — learn how we collect, use, and protect your information, including our Google AdSense and cookie practices.",
  alternates: { canonical: "https://devspoint.in/privacy-policy" },
  robots: { index: true, follow: true },
};

const lastUpdated = "October 20, 2024";

export default function PrivacyPolicyPage() {
  return (
    <>
      <div className="page-hero" aria-labelledby="privacy-title">
        <div className="hero-grid" aria-hidden="true" />
        <div className="page-hero-container">
          <nav aria-label="Breadcrumb">
            <ol className="breadcrumb" style={{ listStyle: "none", padding: 0 }}>
              <li><Link href="/">Home</Link></li>
              <li><span className="breadcrumb-sep" aria-hidden="true">›</span></li>
              <li aria-current="page">Privacy Policy</li>
            </ol>
          </nav>
          <h1 id="privacy-title" className="page-hero-title">Privacy Policy</h1>
          <p className="page-hero-sub">Last updated: {lastUpdated}</p>
        </div>
      </div>

      <section className="section" aria-labelledby="privacy-content">
        <div className="section-container">
          <div className="prose">
            <p>
              Welcome to DevsPoint Financial Engine (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We operate the website{" "}
              <a href="https://devspoint.in">https://devspoint.in</a> (the &quot;Site&quot;). This
              Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our Site.
              Please read this policy carefully. If you disagree with its terms, please discontinue use of the Site.
            </p>

            <h2>1. Information We Collect</h2>

            <h3>1.1 Information You Provide Voluntarily</h3>
            <p>We may collect personal information you voluntarily provide when you:</p>
            <ul>
              <li>Submit a contact form (name, email address, message)</li>
              <li>Subscribe to our developer newsletter (email address)</li>
              <li>Report a bug or send feedback</li>
            </ul>

            <h3>1.2 Calculator Data</h3>
            <p>
              <strong>Important:</strong> All mortgage calculations performed on DevsPoint Financial Engine happen entirely within your
              browser. We do not collect, store, transmit, or record any financial data you enter into our calculator,
              including loan balances, interest rates, or personal financial information.
            </p>

            <h3>1.3 Automatically Collected Information</h3>
            <p>When you visit our Site, we automatically collect certain information, including:</p>
            <ul>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Pages visited and time spent on pages</li>
              <li>Referring URLs</li>
              <li>IP address (anonymized)</li>
              <li>Device type (desktop, mobile, tablet)</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Operate, maintain, and improve the Site</li>
              <li>Respond to your contact form submissions and support requests</li>
              <li>Analyze usage patterns to enhance user experience</li>
              <li>Monitor Site performance and security</li>
              <li>Comply with legal obligations</li>
              <li>Send transactional emails (e.g., responses to your inquiries)</li>
            </ul>

            <h2>3. Cookies and Tracking Technologies</h2>
            <p>We use cookies and similar tracking technologies to operate and analyze Site traffic. Specifically:</p>

            <h3>3.1 Essential Cookies</h3>
            <p>These cookies are necessary for the Site to function and cannot be switched off. They include your cookie consent preference.</p>

            <h3>3.2 Analytics Cookies</h3>
            <p>
              We use <strong>Google Analytics</strong> to understand how visitors interact with the Site. Google Analytics
              collects information such as how often users visit the Site, what pages they visit, and what other sites they
              used prior to visiting our Site. We use this information to improve DevsPoint. Google Analytics collects
              only the IP address assigned to you on the date you visit the Site, not your name or other personally
              identifying information.
            </p>
            <p>You can opt out of Google Analytics by installing the <a href="https://tools.google.com/dlpage/gaoptout" rel="noopener noreferrer" target="_blank">Google Analytics Opt-out Browser Add-on</a>.</p>

            <h3>3.3 Advertising Cookies (Google AdSense)</h3>
            <p>
              We use <strong>Google AdSense</strong> to display advertisements on our Site. Google AdSense uses cookies
              to serve ads based on your visits to our Site and other sites on the Internet. Google&apos;s use of advertising
              cookies enables it and its partners to serve ads based on your visit to our Site and/or other sites on the Internet.
            </p>
            <p>
              You may opt out of personalized advertising by visiting{" "}
              <a href="https://www.google.com/settings/ads" rel="noopener noreferrer" target="_blank">Google Ads Settings</a> or{" "}
              <a href="https://www.aboutads.info" rel="noopener noreferrer" target="_blank">aboutads.info</a>. You can also
              opt out of third-party vendor&apos;s use of cookies for personalized advertising by visiting{" "}
              <a href="http://www.networkadvertising.org/managing/opt_out.asp" rel="noopener noreferrer" target="_blank">Network Advertising Initiative</a>.
            </p>
            <p>
              For more information on how Google uses data when you use our site, see:{" "}
              <a href="https://policies.google.com/technologies/partner-sites" rel="noopener noreferrer" target="_blank">
                How Google uses data when you use our partners&apos; sites or apps
              </a>.
            </p>

            <h3>3.4 Managing Cookies</h3>
            <p>
              You can control cookies through your browser settings. Note that disabling cookies may affect the functionality
              of the Site. For more information about managing cookies, visit{" "}
              <a href="https://www.allaboutcookies.org" rel="noopener noreferrer" target="_blank">www.allaboutcookies.org</a>.
            </p>

            <h2>4. Third-Party Services</h2>
            <p>We may use the following third-party services, each with their own privacy policies:</p>
            <ul>
              <li><strong>Google Analytics</strong> – <a href="https://policies.google.com/privacy" rel="noopener noreferrer" target="_blank">Privacy Policy</a></li>
              <li><strong>Google AdSense</strong> – <a href="https://policies.google.com/privacy" rel="noopener noreferrer" target="_blank">Privacy Policy</a></li>
            </ul>

            <h2>5. Data Sharing and Disclosure</h2>
            <p>We do not sell, trade, or otherwise transfer your personally identifiable information to third parties, except as described below:</p>
            <ul>
              <li><strong>Service Providers:</strong> We may share information with third-party vendors who assist in operating our website (e.g., hosting providers). These parties agree to keep your information confidential.</li>
              <li><strong>Legal Requirements:</strong> We may disclose your information if required to do so by law or in response to valid requests by public authorities.</li>
              <li><strong>Business Transfers:</strong> If DevsPoint is involved in a merger, acquisition, or sale of assets, your information may be transferred.</li>
            </ul>

            <h2>6. Data Retention</h2>
            <p>
              We retain contact form submissions for up to 24 months to enable us to respond to follow-up inquiries.
              Analytics data is retained per Google Analytics&apos; default retention settings (14 months).
              We do not retain financial calculator data as it is never transmitted to our servers.
            </p>

            <h2>7. Your Rights (GDPR &amp; CCPA)</h2>
            <p>Depending on your location, you may have certain rights regarding your personal information:</p>
            <ul>
              <li><strong>Right to Access:</strong> Request a copy of the personal data we hold about you</li>
              <li><strong>Right to Rectification:</strong> Request correction of inaccurate personal data</li>
              <li><strong>Right to Erasure:</strong> Request deletion of your personal data</li>
              <li><strong>Right to Restrict Processing:</strong> Request that we limit our use of your data</li>
              <li><strong>Right to Data Portability:</strong> Request transfer of your data to another service</li>
              <li><strong>Right to Object:</strong> Object to processing of your personal data</li>
              <li><strong>California Residents (CCPA):</strong> You have the right to know what personal information is collected, request deletion, and opt out of the sale of personal information (we do not sell personal information).</li>
            </ul>
            <p>To exercise any of these rights, please contact us at <a href="mailto:privacy@devspoint.in">privacy@devspoint.in</a>.</p>

            <h2>8. Children&apos;s Privacy</h2>
            <p>
              Our Site is not directed to children under the age of 13. We do not knowingly collect personal information
              from children under 13. If you believe we have inadvertently collected such information, please contact us
              immediately and we will take steps to delete it.
            </p>

            <h2>9. Security</h2>
            <p>
              We implement appropriate technical and organizational security measures to protect your information against
              unauthorized access, alteration, disclosure, or destruction. Our Site uses SSL/TLS encryption for all data
              in transit. However, no method of transmission over the Internet is 100% secure.
            </p>

            <h2>10. Links to Other Sites</h2>
            <p>
              Our Site may contain links to other websites not operated by us. We strongly advise you to review the
              Privacy Policy of every site you visit. We have no control over and assume no responsibility for the
              content, privacy policies, or practices of any third-party sites.
            </p>

            <h2>11. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the
              new Privacy Policy on this page and updating the &quot;Last updated&quot; date at the top. Your continued
              use of the Site after any changes constitutes your acceptance of the new Privacy Policy.
            </p>

            <h2>12. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us:</p>
            <ul>
              <li><strong>Email:</strong> <a href="mailto:privacy@devspoint.in">privacy@devspoint.in</a></li>
              <li><strong>Website:</strong> <Link href="/contact">https://devspoint.in/contact</Link></li>
              <li><strong>Organization:</strong> DevsPoint Engineering Labs (<a href="https://devspoint.in">devspoint.in</a>)</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
