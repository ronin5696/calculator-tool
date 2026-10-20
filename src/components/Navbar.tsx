"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Engine" },
  { href: "/calculator", label: "Calculator" },
  { href: "/blog", label: "Docs & Guides" },
  { href: "/about", label: "About Labs" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="nav-wrapper" role="navigation" aria-label="Main navigation">
      <div className="nav-container">
        <Link href="/" className="nav-logo" aria-label="DevsPoint Financial Engine">
          <div className="nav-logo-icon" style={{ background: "linear-gradient(135deg, #10b981, #1a56db)", fontFamily: "monospace", fontWeight: 800, fontSize: "16px" }} aria-hidden="true">
            &lt;/&gt;
          </div>
          <div>
            <span className="nav-logo-text" style={{ fontSize: "20px" }}>DevsPoint</span>
            <span style={{ display: "block", fontSize: "10px", color: "#93c5fd", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700 }}>
              Financial Engine
            </span>
          </div>
        </Link>

        <ul className="nav-links" role="menubar">
          {navLinks.map((link) => (
            <li key={link.href} role="none">
              <Link
                href={link.href}
                role="menuitem"
                className={link.href === "/calculator" ? "nav-cta" : ""}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          className="mobile-menu-btn"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          style={{
            background: "rgba(15,23,42,0.98)",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            padding: "16px 24px 24px",
          }}
        >
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "4px" }}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: "block",
                    color: "rgba(255,255,255,0.8)",
                    textDecoration: "none",
                    padding: "12px 14px",
                    borderRadius: "10px",
                    fontSize: "16px",
                    fontWeight: 500,
                    transition: "background 0.2s",
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
