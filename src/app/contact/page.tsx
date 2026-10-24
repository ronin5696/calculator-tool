"use client";
import { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <>
      <div className="page-hero" aria-labelledby="contact-title">
        <div className="hero-grid" aria-hidden="true" />
        <div className="page-hero-container">
          <nav aria-label="Breadcrumb">
            <ol className="breadcrumb" style={{ listStyle: "none", padding: 0 }}>
              <li><Link href="/">Home</Link></li>
              <li><span className="breadcrumb-sep" aria-hidden="true">›</span></li>
              <li aria-current="page">Contact</li>
            </ol>
          </nav>
          <div style={{ display: "inline-block", background: "rgba(59,130,246,0.2)", color: "#93c5fd", padding: "4px 12px", borderRadius: "100px", fontSize: "12px", fontWeight: 700, marginBottom: "12px" }}>
            EDITORIAL &amp; USER SUPPORT · INDIA
          </div>
          <h1 id="contact-title" className="page-hero-title">Contact Editorial Desk</h1>
          <p className="page-hero-sub">
            Have a question about our home loan calculators, spotted a regulatory update, or need editorial clarification? We typically respond within 24–48 business hours.
          </p>
        </div>
      </div>

      <section className="section" aria-labelledby="contact-form-title">
        <div className="section-container">
          <div className="contact-grid">
            {/* Contact Info */}
            <div>
              <h2 id="contact-form-title" style={{ fontSize: 28, color: "var(--dark)", marginBottom: 8 }}>Get in Touch</h2>
              <p style={{ fontSize: 16, color: "var(--text-secondary)", marginBottom: 36, lineHeight: 1.7 }}>
                Whether you have a query regarding RBI Repo Linked Lending Rate (RLLR) mechanics, want to report an algorithm discrepancy, or discuss open-source contributions, our desk is here to assist.
              </p>

              <div className="contact-info-item">
                <div className="contact-info-icon" aria-hidden="true">📧</div>
                <div className="contact-info-text">
                  <h4>Editorial &amp; User Support</h4>
                  <p>
                    <a href="mailto:support@devspoint.in" style={{ color: "var(--primary)", textDecoration: "none", fontWeight: 600 }}>support@devspoint.in</a>
                    <span style={{ margin: "0 8px", color: "var(--border)" }}>•</span>
                    <a href="mailto:editor@devspoint.in" style={{ color: "var(--primary)", textDecoration: "none" }}>editor@devspoint.in</a>
                  </p>
                  <p style={{ fontSize: 13, marginTop: 2 }}>Dedicated team responding within 24 to 48 business hours</p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon" aria-hidden="true">📍</div>
                <div className="contact-info-text">
                  <h4>Operating Location</h4>
                  <p>Bengaluru &amp; Mumbai, India</p>
                  <p style={{ fontSize: 13, marginTop: 2 }}>Serving Indian home loan borrowers nationwide</p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon" aria-hidden="true">🐛</div>
                <div className="contact-info-text">
                  <h4>Report a Math Discrepancy or Regulatory Update</h4>
                  <p>Found a bank tariff update or algorithm question? Our quantitative team investigates all verified reports.</p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon" aria-hidden="true">🤝</div>
                <div className="contact-info-text">
                  <h4>Open Source &amp; Code Contributions</h4>
                  <p>
                    Inspect and contribute to our calculations on GitHub:{" "}
                    <a
                      href="https://github.com/ronin5696/calculator-tool"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "var(--primary)", textDecoration: "underline" }}
                    >
                      calculator-tool
                    </a>
                  </p>
                </div>
              </div>

              <div className="info-box" style={{ marginTop: 16 }}>
                <span className="info-box-icon">⚠️</span>
                <p>
                  <strong>Important Notice:</strong> DevsPoint is an independent educational publisher and computational analytics tool. We are <strong>not a bank, NBFC, or loan broker (DSA)</strong>. We do not process loan applications, sanction funds, or provide individual credit approval.
                </p>
              </div>
            </div>

            {/* Form */}
            <div>
              {submitted ? (
                <div className="contact-form" style={{ textAlign: "center", padding: "60px 40px" }}>
                  <div style={{ fontSize: 56, marginBottom: 20 }}>✅</div>
                  <h3 style={{ fontSize: 24, color: "var(--dark)", marginBottom: 12 }}>Message Sent!</h3>
                  <p style={{ color: "var(--text-secondary)", fontSize: 16, lineHeight: 1.7 }}>
                    Thank you for reaching out. Our editorial team will review your message and reply to <strong>{formState.email}</strong> within 24–48 business hours.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setFormState({ name: "", email: "", subject: "", message: "" }); }}
                    style={{ marginTop: 24, padding: "12px 24px", background: "var(--primary-light)", color: "var(--primary)", border: "none", borderRadius: 10, cursor: "pointer", fontWeight: 600, fontFamily: "Inter, sans-serif" }}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit} noValidate aria-labelledby="contact-form-title">
                  <h3 style={{ fontSize: 22, color: "var(--dark)", marginBottom: 24 }}>Send a Message</h3>
                  
                  <div className="form-group" style={{ marginBottom: 16 }}>
                    <label className="form-label" htmlFor="contact-name">Your Full Name</label>
                    <input
                      id="contact-name"
                      type="text"
                      className="form-input no-prefix"
                      placeholder="e.g. Ramesh Kumar"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: 16 }}>
                    <label className="form-label" htmlFor="contact-email">Email Address</label>
                    <input
                      id="contact-email"
                      type="email"
                      className="form-input no-prefix"
                      placeholder="name@example.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: 16 }}>
                    <label className="form-label" htmlFor="contact-subject">Inquiry Topic</label>
                    <select
                      id="contact-subject"
                      className="form-input no-prefix"
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      style={{ cursor: "pointer" }}
                    >
                      <option value="">Select a topic...</option>
                      <option value="calculator">Home Loan Calculator Feedback</option>
                      <option value="editorial">Editorial Question / Regulatory Clarification</option>
                      <option value="bug">Report an Algorithm Discrepancy</option>
                      <option value="opensource">Open Source Contribution</option>
                      <option value="other">Other Inquiry</option>
                    </select>
                  </div>

                  <div className="form-group" style={{ marginBottom: 24 }}>
                    <label className="form-label" htmlFor="contact-message">Message</label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      className="form-input no-prefix"
                      placeholder="Provide details about your query or feedback..."
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      style={{ resize: "vertical" }}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="calc-btn"
                    disabled={loading}
                    style={{ width: "100%", justifyContent: "center" }}
                  >
                    {loading ? "Sending..." : "Submit Message →"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
