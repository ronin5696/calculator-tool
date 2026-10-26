import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact DevsPoint Home Loan Engine – Banking & Research Desk",
  description:
    "Get in touch with DevsPoint financial research team and editorial desk for inquiries, partnership proposals, or computational feedback on Indian home loans.",
  alternates: { canonical: "https://www.devspoint.in/contact" },
  openGraph: {
    title: "Contact DevsPoint Home Loan Engine",
    description: "Connect with DevsPoint banking research desk and mortgage analytics team.",
    url: "https://www.devspoint.in/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
