"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("mw-cookie-consent");
    if (!consent) {
      // Short delay so it doesn't pop up immediately
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("mw-cookie-consent", "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("mw-cookie-consent", "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-banner" role="dialog" aria-label="Cookie consent" aria-live="polite">
      <p className="cookie-text">
        🍪 We use cookies to enhance your experience, analyze site traffic, and serve relevant ads. By clicking <strong>&quot;Accept&quot;</strong>, you consent to our use of cookies as described in our{" "}
        <Link href="/privacy-policy">Privacy Policy</Link> and{" "}
        <Link href="/terms-of-service">Terms of Service</Link>.
      </p>
      <div className="cookie-buttons">
        <button
          id="cookie-decline-btn"
          className="cookie-decline"
          onClick={decline}
          aria-label="Decline cookies"
        >
          Decline
        </button>
        <button
          id="cookie-accept-btn"
          className="cookie-accept"
          onClick={accept}
          aria-label="Accept cookies"
        >
          Accept All Cookies
        </button>
      </div>
    </div>
  );
}
