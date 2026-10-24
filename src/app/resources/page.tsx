import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Loan Educational Guides & Resources – DevsPoint",
  alternates: { canonical: "https://devspoint.in/blog" },
};

export default function ResourcesPage() {
  redirect("/blog");
}
