import type { Metadata } from "next";
import PlaceholderPage from "@/components/PlaceholderPage";
import { buildMetadata } from "@/sanity/lib/seo";

export function generateMetadata(): Metadata {
  return buildMetadata({
    // Placeholder page (remove `noIndex` once the real terms are published)
    seo: { noIndex: true },
    path: "/terms-and-conditions",
    fallback: {
      title: "Terms & Conditions | Royal Grain",
      description:
        "The terms that apply to using the Royal Grain Woodcraft & Interiors website and services.",
    },
  });
}

export default function TermsAndConditionsPage() {
  return (
    <PlaceholderPage
      eyebrow="Legal"
      headingWhite="Terms &"
      headingBlue="Conditions"
      description="The terms that apply to using the Royal Grain Woodcraft & Interiors website and services."
      cardHeading="This page is being prepared"
      cardText="Our full terms and conditions will be published here soon. If you have any questions in the meantime, please get in touch with us."
    />
  );
}
