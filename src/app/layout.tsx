import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";

export const metadata: Metadata = {
  metadataBase: new URL("https://devspoint.in"),
  title: {
    default: "DevsPoint Financial Engine: Open-Source Mortgage & Amortization Calculator",
    template: "%s | DevsPoint Financial Engine",
  },
  description:
    "DevsPoint Financial Engine (dp-calc-engine) — An open-source, client-side mortgage refinance & amortization engine. Computes monthly payment deltas, break-even velocity, and complete amortized schedules using IEEE 754 precision math. Features interactive JSON export and raw API views.",
  keywords: [
    "DevsPoint financial engine",
    "open source mortgage calculator",
    "mortgage amortization calculator",
    "mortgage formula M = P[r(1+r)^n]/[(1+r)^n - 1]",
    "refinance break even calculator",
    "developer mortgage tools",
    "client-side amortization engine",
    "export mortgage json",
    "financial software engineering",
  ],
  authors: [{ name: "DevsPoint Engineering Labs", url: "https://devspoint.in/about" }],
  creator: "DevsPoint",
  publisher: "DevsPoint",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://devspoint.in",
    siteName: "DevsPoint Financial Engine",
    title: "DevsPoint Financial Engine: Open-Source Mortgage & Amortization Calculator",
    description:
      "Open-source computational finance module for client-side mortgage refinance analysis, loan amortization, and break-even simulation. High precision, zero tracking.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "DevsPoint Financial Engine – Mortgage & Amortization Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DevsPoint Financial Engine: Open-Source Mortgage & Amortization Calculator",
    description:
      "Open-source client-side mortgage refinance and amortization software engine. Includes raw JSON export & formula analysis.",
    images: ["/og-image.png"],
    creator: "@devspoint",
  },
  alternates: {
    canonical: "https://devspoint.in",
  },
  verification: {
    google: "REPLACE_WITH_YOUR_GOOGLE_VERIFICATION_CODE",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />

        {/* Google AdSense — replace with your publisher ID */}
        {/* <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
          crossOrigin="anonymous"
        ></script> */}

        {/* Structured Data – WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "DevsPoint Financial Engine",
              url: "https://devspoint.in",
              description: "Open-source computational finance engine and mortgage amortization software developed by DevsPoint.",
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: "https://devspoint.in/calculator?q={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />

        {/* Structured Data – SoftwareApplication */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "DevsPoint Financial Engine (dp-calc-engine)",
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web",
              url: "https://devspoint.in",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              author: {
                "@type": "Organization",
                name: "DevsPoint",
                url: "https://devspoint.in",
              },
            }),
          }}
        />

        {/* Favicon & icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#1a56db" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body>
        <Navbar />
        <main id="main-content" role="main">
          {children}
        </main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
