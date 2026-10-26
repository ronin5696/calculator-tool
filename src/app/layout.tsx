import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0f172a",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.devspoint.in"),
  title: {
    default: "DevsPoint Home Loan Engine: Smart Balance Transfer & EMI Calculator (India)",
    template: "%s | DevsPoint Home Loan Engine",
  },
  description:
    "Free, client-side Indian Home Loan Balance Transfer & EMI Calculator. Calculate monthly EMI savings, switching break-even period, and interest saved across SBI, HDFC, ICICI, Axis and other Indian banks.",
  keywords: [
    "home loan balance transfer calculator",
    "home loan transfer charges",
    "modt charges in home loan",
    "modt in home loan",
    "modt charges calculator",
    "pmay clss",
    "clss subsidy",
    "pmay clss subsidy calculator",
    "home loan emi calculator india",
    "home loan prepayment calculator",
    "sbi home loan balance transfer",
    "hdfc home loan balance transfer",
    "icici bank home loan transfer",
    "bank of baroda home loan takeover",
    "rbi guidelines home loan foreclosure charges",
    "memorandum of deposit of title deeds charges",
    "reduce home loan tenure vs emi",
    "home loan top up vs personal loan",
    "home loan tax benefits section 24b 80c",
  ],
  authors: [
    { name: "Anshul", url: "https://www.devspoint.in/about" },
    { name: "DevsPoint Research Desk", url: "https://www.devspoint.in/about" },
  ],
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
    locale: "en_IN",
    url: "https://www.devspoint.in",
    siteName: "DevsPoint Home Loan Engine",
    title: "DevsPoint Home Loan Engine: Smart Balance Transfer & EMI Calculator",
    description:
      "Client-side computational engine for Indian home loan balance transfers, EMI amortization, and interest savings simulation. 100% private in-browser computation.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "DevsPoint Home Loan Engine – Balance Transfer & EMI Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DevsPoint Home Loan Engine: Smart Balance Transfer & EMI Calculator",
    description:
      "Calculate your home loan balance transfer savings, break-even period, and EMI amortization in Indian Rupees.",
    images: ["/og-image.png"],
    creator: "@devspoint",
  },
  alternates: {
    canonical: "https://www.devspoint.in",
  },
  category: "finance",
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

        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2326721628992125"
          crossOrigin="anonymous"
        />

        {/* Structured Data – WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "DevsPoint Home Loan Engine",
              url: "https://www.devspoint.in",
              description: "Free, client-side Indian Home Loan Balance Transfer & EMI Calculator developed by DevsPoint.",
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: "https://www.devspoint.in/calculator?q={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />

        {/* Structured Data – FinancialService */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FinancialService",
              name: "DevsPoint Home Loan Engine",
              url: "https://www.devspoint.in",
              description: "Independent educational home loan analytics and balance transfer calculation platform for Indian borrowers.",
              areaServed: {
                "@type": "Country",
                name: "India",
              },
              knowsAbout: [
                "Home Loan Balance Transfer",
                "Equated Monthly Installments (EMI)",
                "RBI Repo Linked Lending Rate (RLLR)",
                "Home Loan Prepayment",
                "Section 24(b) Tax Deductions",
              ],
              author: {
                "@type": "Person",
                name: "Anshul",
                jobTitle: "Software Engineer & Creator",
                url: "https://www.devspoint.in/about",
              },
            }),
          }}
        />

        {/* Favicon & icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
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
