import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 – Page Not Found | DevsPoint Calc",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "60px 24px", textAlign: "center" }}>
      <div>
        <div style={{ fontSize: 80, marginBottom: 20 }}>🏠</div>
        <h1 style={{ fontSize: 42, color: "var(--dark)", marginBottom: 12 }}>404</h1>
        <h2 style={{ fontSize: 24, color: "var(--text-secondary)", marginBottom: 16, fontWeight: 500 }}>
          Page Not Found
        </h2>
        <p style={{ fontSize: 16, color: "var(--text-muted)", marginBottom: 32, maxWidth: 420, margin: "0 auto 32px" }}>
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/" style={{ padding: "13px 28px", background: "linear-gradient(135deg, #1a56db, #7c3aed)", color: "white", borderRadius: 12, textDecoration: "none", fontWeight: 700, fontSize: 15 }}>
            ← Back to Home
          </Link>
          <Link href="/calculator" style={{ padding: "13px 28px", border: "2px solid var(--border)", color: "var(--dark)", borderRadius: 12, textDecoration: "none", fontWeight: 600, fontSize: 15 }}>
            Open Calculator
          </Link>
        </div>
      </div>
    </div>
  );
}
