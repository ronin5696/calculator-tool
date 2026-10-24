"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  advertising: boolean;
  timestamp: string;
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
  const [advertisingEnabled, setAdvertisingEnabled] = useState(true);

  // Load existing preferences or show banner if unset
  useEffect(() => {
    try {
      const stored = localStorage.getItem("devspoint-cookie-consent");
      if (stored) {
        const parsed: CookiePreferences = JSON.parse(stored);
        setAnalyticsEnabled(parsed.analytics);
        setAdvertisingEnabled(parsed.advertising);
      } else {
        // Show after a brief delay so it does not obstruct the initial paint
        const timer = setTimeout(() => setVisible(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  // Listen for custom trigger to reopen cookie settings from footer or policy links
  useEffect(() => {
    const handleOpen = () => {
      setVisible(true);
      setShowPreferences(true);
    };

    window.addEventListener("open-cookie-settings", handleOpen);
    return () => window.removeEventListener("open-cookie-settings", handleOpen);
  }, []);

  const saveConsent = useCallback((prefs: CookiePreferences) => {
    try {
      localStorage.setItem("devspoint-cookie-consent", JSON.stringify(prefs));
    } catch {
      // Ignore localStorage exceptions
    }
    setVisible(false);
    setShowPreferences(false);
  }, []);

  const handleAcceptAll = () => {
    saveConsent({
      essential: true,
      analytics: true,
      advertising: true,
      timestamp: new Date().toISOString(),
    });
  };

  const handleRejectNonEssential = () => {
    setAnalyticsEnabled(false);
    setAdvertisingEnabled(false);
    saveConsent({
      essential: true,
      analytics: false,
      advertising: false,
      timestamp: new Date().toISOString(),
    });
  };

  const handleSavePreferences = () => {
    saveConsent({
      essential: true,
      analytics: analyticsEnabled,
      advertising: advertisingEnabled,
      timestamp: new Date().toISOString(),
    });
  };

  if (!visible) return null;

  return (
    <div
      className="cookie-banner-overlay"
      role="region"
      aria-label="Cookie consent management"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        background: "rgba(15, 23, 42, 0.98)",
        backdropFilter: "blur(16px)",
        borderTop: "1px solid rgba(255, 255, 255, 0.12)",
        boxShadow: "0 -10px 40px rgba(0, 0, 0, 0.45)",
        color: "#f8fafc",
        padding: "20px 24px",
      }}
    >
      <div style={{ maxWidth: 1140, margin: "0 auto" }}>
        {!showPreferences ? (
          /* Main Banner View */
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 24,
              flexWrap: "wrap",
            }}
          >
            <div style={{ maxWidth: 680 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <span style={{ fontSize: 20 }} aria-hidden="true">
                  🍪
                </span>
                <span style={{ fontWeight: 700, fontSize: 16, color: "#ffffff" }}>
                  Cookie &amp; Privacy Preferences
                </span>
              </div>
              <p style={{ margin: 0, fontSize: 14, color: "#cbd5e1", lineHeight: 1.6 }}>
                We use cookies to measure aggregated site analytics (Google Analytics) and serve relevant
                advertisements (Google AdSense) to keep this tool 100% free. Calculator inputs remain 100% local in your
                browser memory. Review our{" "}
                <Link href="/privacy-policy" style={{ color: "#60a5fa", textDecoration: "underline" }}>
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link href="/terms-of-service" style={{ color: "#60a5fa", textDecoration: "underline" }}>
                  Terms
                </Link>
                .
              </p>
            </div>

            <div
              style={{
                display: "flex",
                gap: 10,
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <button
                id="cookie-custom-btn"
                onClick={() => setShowPreferences(true)}
                style={{
                  background: "transparent",
                  color: "#e2e8f0",
                  border: "1px solid rgba(255, 255, 255, 0.25)",
                  padding: "9px 18px",
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Customize
              </button>
              <button
                id="cookie-decline-btn"
                onClick={handleRejectNonEssential}
                style={{
                  background: "rgba(255, 255, 255, 0.08)",
                  color: "#f1f5f9",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  padding: "9px 18px",
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Reject Non-Essential
              </button>
              <button
                id="cookie-accept-btn"
                onClick={handleAcceptAll}
                style={{
                  background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                  color: "#ffffff",
                  border: "none",
                  padding: "9px 22px",
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(37, 99, 235, 0.35)",
                }}
              >
                Accept All
              </button>
            </div>
          </div>
        ) : (
          /* Granular Preferences View */
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 16,
                borderBottom: "1px solid rgba(255,255,255,0.1)",
                paddingBottom: 12,
              }}
            >
              <h3 style={{ margin: 0, fontSize: 18, color: "#ffffff" }}>Customize Cookie Preferences</h3>
              <button
                onClick={() => setShowPreferences(false)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#94a3b8",
                  cursor: "pointer",
                  fontSize: 14,
                }}
              >
                ← Back
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16, marginBottom: 20 }}>
              {/* Essential */}
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.04)",
                  padding: 16,
                  borderRadius: 10,
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <span style={{ fontWeight: 700, fontSize: 14, color: "#ffffff" }}>Essential &amp; Security</span>
                  <span style={{ fontSize: 11, background: "rgba(16, 185, 129, 0.2)", color: "#34d399", padding: "2px 8px", borderRadius: 4, fontWeight: 700 }}>
                    Always Active
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: 12, color: "#94a3b8", lineHeight: 1.5 }}>
                  Necessary for site navigation, security, and remembering your cookie choices.
                </p>
              </div>

              {/* Analytics */}
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.04)",
                  padding: 16,
                  borderRadius: 10,
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <span style={{ fontWeight: 700, fontSize: 14, color: "#ffffff" }}>Aggregated Analytics</span>
                  <label style={{ display: "inline-flex", alignItems: "center", cursor: "pointer" }}>
                    <input
                      type="checkbox"
                      checked={analyticsEnabled}
                      onChange={(e) => setAnalyticsEnabled(e.target.checked)}
                      style={{ cursor: "pointer", width: 16, height: 16, accentColor: "#2563eb" }}
                    />
                  </label>
                </div>
                <p style={{ margin: 0, fontSize: 12, color: "#94a3b8", lineHeight: 1.5 }}>
                  Allows us to analyze page views, calculator usage, and improve content using Google Analytics.
                </p>
              </div>

              {/* Advertising */}
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.04)",
                  padding: 16,
                  borderRadius: 10,
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <span style={{ fontWeight: 700, fontSize: 14, color: "#ffffff" }}>Advertising &amp; AdSense</span>
                  <label style={{ display: "inline-flex", alignItems: "center", cursor: "pointer" }}>
                    <input
                      type="checkbox"
                      checked={advertisingEnabled}
                      onChange={(e) => setAdvertisingEnabled(e.target.checked)}
                      style={{ cursor: "pointer", width: 16, height: 16, accentColor: "#2563eb" }}
                    />
                  </label>
                </div>
                <p style={{ margin: 0, fontSize: 12, color: "#94a3b8", lineHeight: 1.5 }}>
                  Enables Google AdSense to serve relevant ads that fund our free financial tools.
                </p>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
              <button
                onClick={handleRejectNonEssential}
                style={{
                  background: "transparent",
                  color: "#cbd5e1",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  padding: "8px 18px",
                  borderRadius: 8,
                  fontSize: 13,
                  cursor: "pointer",
                }}
              >
                Reject Non-Essential
              </button>
              <button
                onClick={handleSavePreferences}
                style={{
                  background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                  color: "#ffffff",
                  border: "none",
                  padding: "8px 22px",
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Save Preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
