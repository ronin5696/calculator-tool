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
    }, 1200);
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
          <h1 id="contact-title" className="page-hero-title">Contact Us</h1>
          <p className="page-hero-sub">
            Have a question, suggestion, or found an issue with our calculator?
            We&apos;d love to hear from you and typically respond within 24 hours.
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
                Whether you have a question about how our calculator works, want to report an inaccuracy,
                or have a partnership inquiry, we&apos;re here to help.
              </p>

              <div className="contact-info-item">
                <div className="contact-info-icon" aria-hidden="true">📧</div>
                <div className="contact-info-text">
                  <h4>Email Support &amp; Inquiries</h4>
                  <p>
                    <a href="mailto:support@devspoint.in" style={{ color: "var(--primary)", textDecoration: "none", fontWeight: 600 }}>support@devspoint.in</a>
                    <span style={{ margin: "0 8px", color: "var(--border)" }}>•</span>
                    <a href="mailto:contact@devspoint.in" style={{ color: "var(--primary)", textDecoration: "none" }}>contact@devspoint.in</a>
                  </p>
                  <p style={{ fontSize: 13, marginTop: 2 }}>Dedicated developer &amp; user support responding within 24 business hours</p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon" aria-hidden="true">💬</div>
                <div className="contact-info-text">
                  <h4>General Inquiries</h4>
                  <p>Questions about the calculator engine, educational content, or developer API specs.</p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon" aria-hidden="true">🐛</div>
                <div className="contact-info-text">
                  <h4>Report a Bug</h4>
                  <p>Spotted an error in calculation results or precision? Please let us know and we&apos;ll investigate immediately.</p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon" aria-hidden="true">🤝</div>
                <div className="contact-info-text">
                  <h4>Developer &amp; Open Source</h4>
                  <p>For API integrations, data partnerships, or open-source inquiries, use the form or email us directly.</p>
                </div>
              </div>

              <div className="info-box" style={{ marginTop: 12 }}>
                <span className="info-box-icon">⚠️</span>
                <p>
                  <strong>Important:</strong> DevsPoint Financial Engine is a computational tool — we are not a lender, mortgage broker,
                  or financial advisor. We cannot provide personalized mortgage advice or loan quotes.
                  Please consult a licensed mortgage professional for specific guidance.
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
                    Thank you for reaching out. We&apos;ll get back to you at <strong>{formState.email}</strong> within 24 business hours.
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
                  <div className="contact-form-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="contact-name">Name</label>
                      <div className="form-input-wrapper">
                        <input
                          id="contact-name"
                          type="text"
                          className="form-input no-prefix"
                          placeholder="Jane Smith"
                          value={formState.name}
                          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                          required
                          autoComplete="name"
                          aria-required="true"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="contact-email">Email</label>
                      <div className="form-input-wrapper">
                        <input
                          id="contact-email"
                          type="email"
                          className="form-input no-prefix"
                          placeholder="jane@example.com"
                          value={formState.email}
                          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                          required
                          autoComplete="email"
                          aria-required="true"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-subject">Subject</label>
                    <div className="form-input-wrapper">
                      <select
                        id="contact-subject"
                        className="form-input no-prefix"
                        value={formState.subject}
                        onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                        required
                        aria-required="true"
                        style={{ cursor: "pointer" }}
                      >
                        <option value="">Select a topic…</option>
                        <option value="calculator-question">Calculator Question</option>
                        <option value="bug-report">Bug Report</option>
                        <option value="content-feedback">Content Feedback</option>
                        <option value="partnership">Partnership / Advertising</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-message">Message</label>
                    <textarea
                      id="contact-message"
                      className="form-input no-prefix"
                      placeholder="Tell us how we can help…"
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      required
                      rows={5}
                      aria-required="true"
                    />
                  </div>
                  <button
                    id="contact-submit-btn"
                    type="submit"
                    className="submit-btn"
                    disabled={loading}
                    aria-label="Submit contact form"
                  >
                    {loading ? "Sending…" : "Send Message →"}
                  </button>
                  <p style={{ fontSize: 12, color: "var(--text-muted)", textAlign: "center", marginTop: 14 }}>
                    By submitting this form, you agree to our{" "}
                    <Link href="/privacy-policy" style={{ color: "var(--primary)" }}>Privacy Policy</Link>.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
