import type { Metadata } from "next";
import PlaceholderPage from "@/components/PlaceholderPage";
import { buildMetadata } from "@/sanity/lib/seo";

export function generateMetadata(): Metadata {
  return buildMetadata({
    // Placeholder page (remove `noIndex` once the real policy is published)
    seo: { noIndex: true },
    path: "/privacy-policy",
    fallback: {
      title: "Privacy Policy | Royal Grain",
      description:
        "How Royal Grain Woodcraft & Interiors handles your personal information.",
    },
  });
}

export default function PrivacyPolicyPage() {
  return (
    <PlaceholderPage
      eyebrow="Legal"
      headingWhite="Privacy"
      headingBlue="Policy"
      description="How Royal Grain Woodcraft & Interiors handles your personal information."
      cardHeading="This page is being prepared"
      cardText="Our full privacy policy will be published here soon. If you have any questions about how your details are used in the meantime, please get in touch with us."
    />
  );
}
