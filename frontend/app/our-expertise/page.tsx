import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import PlaceholderPage from "@/components/PlaceholderPage";
import { EXPERTISE_PAGES, getExpertisePage } from "@/lib/expertisePages";
import { buildMetadata } from "@/sanity/lib/seo";

type Props = { params: Promise<{ slug: string }> };

// Every expertise page is known at build time
export function generateStaticParams() {
  return EXPERTISE_PAGES.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getExpertisePage(slug);
  if (!page)
    return { title: "Page not found | Royal Grain", robots: { index: false } };

  return buildMetadata({
    // Placeholder page: keep it out of search results until the real content is added
    // (remove `noIndex` then)
    seo: { noIndex: true },
    path: `/our-expertise/${slug}`,
    fallback: {
      title: `${page.label} | Royal Grain`,
      description: page.description,
    },
  });
}

// NOT async: `params` is URL data, so it is awaited only inside <Suspense>
// (same pattern as the other [slug] pages).
export default function ExpertiseDetailPage({ params }: Props) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#2F1200]" />}>
      <ExpertiseContent params={params} />
    </Suspense>
  );
}

async function ExpertiseContent({ params }: Props) {
  const { slug } = await params;
  const page = getExpertisePage(slug);
  if (!page) notFound();

  return (
    <PlaceholderPage
      eyebrow="Our Expertise"
      headingWhite={page.headingWhite}
      headingBlue={page.headingBlue}
      description={page.description}
      cardHeading="Full details coming soon"
      cardText={`We are preparing a complete page for ${page.label.toLowerCase()}. Until then, tell us about your project and our team will be happy to help.`}
      relatedHeading="More from Our Expertise"
      related={[
        ...EXPERTISE_PAGES.filter((p) => p.slug !== slug).map((p) => ({
          title: p.label,
          href: `/our-expertise/${p.slug}`,
        })),
      ]}
    />
  );
}
