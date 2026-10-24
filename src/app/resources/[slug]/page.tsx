import { redirect } from "next/navigation";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

const slugMap: Record<string, string> = {
  "refinancing-guide": "home-loan-balance-transfer-guide",
  "when-to-refinance": "when-to-transfer-home-loan",
  "refinancing-costs": "home-loan-transfer-charges-modt",
  "refinance-costs": "home-loan-transfer-charges-modt",
  "fixed-vs-arm": "rllr-vs-mclr-home-loan-interest-rates",
};

export async function generateStaticParams() {
  return [
    { slug: "refinancing-guide" },
    { slug: "when-to-refinance" },
    { slug: "refinancing-costs" },
    { slug: "fixed-vs-arm" },
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const target = slugMap[slug] || slug;
  return {
    alternates: {
      canonical: `https://devspoint.in/blog/${target}`,
    },
  };
}

export default async function ResourcePage({ params }: Props) {
  const { slug } = await params;
  const target = slugMap[slug] || slug;
  redirect(`/blog/${target}`);
}
