import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import CollectionHero from "@/components/collection/CollectionHero";
import CollectionKeyFeatures from "@/components/collection/CollectionKeyFeatures";
import CollectionWhySection from "@/components/collection/CollectionWhySection";
import CollectionHighlightsGrid from "@/components/collection/CollectionHighlightsGrid";
import CollectionBenefits from "@/components/collection/CollectionBenefits";
import CollectionCoverGrid from "@/components/collection/CollectionCoverGrid";
import CollectionCtaBanner from "@/components/collection/CollectionCtaBanner";
import WhyChooseSection from "@/components/collection/WhyChooseSection";
import FaqAccordion from "@/components/collection/FaqAccordion";
import {
  getCollection,
  getCollectionSlugs,
  getExploreCollectionsPage,
} from "@/sanity/lib/getCollections";
import { buildMetadata } from "@/sanity/lib/seo";
import { FALLBACK_COLLECTIONS, fallbackCollection } from "@/lib/collections";

type Props = { params: Promise<{ slug: string }> };

// Prerender every collection at build time. With Cache Components this must return at
// least one param, so a placeholder is used while the CMS has no collections yet
// (the page answers it with a 404). Collections published later render on first visit.
export async function generateStaticParams() {
  const slugs = (await getCollectionSlugs()).filter((s) => s?.slug);
  return slugs.length > 0 ? slugs : FALLBACK_COLLECTIONS.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const collection = (await getCollection(slug)) ?? fallbackCollection(slug);
  if (!collection)
    return {
      title: "Collection not found | Royal Grain",
      robots: { index: false },
    };

  return buildMetadata({
    seo: "seo" in collection ? collection.seo : undefined,
    path: `/explore-collections/${slug}`,
    fallback: {
      title: `${collection.title} | Royal Grain`,
      description: ("heroSubtitle" in collection && collection.heroSubtitle) || collection.shortDescription,
      image: collection.image,
    },
  });
}

// NOT async: `params` is URL data, so it is passed down as a promise and only
// awaited inside <Suspense>. The header is static (plain links, no data),
// so it needs no boundary.
export default function CollectionDetailPage({ params }: Props) {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<CollectionPageSkeleton />}>
          <CollectionContent params={params} />
        </Suspense>
      </main>
    </>
  );
}

// Roughly the size of the real hero, so nothing jumps when the content streams in
function CollectionPageSkeleton() {
  return (
    <div aria-hidden className="animate-pulse motion-reduce:animate-none">
      <section className="bg-[#2F1200]">
        <div className="mx-auto max-w-[1338px] px-6 pb-14 pt-36 lg:px-12 lg:pb-16 lg:pt-[10rem]">
          <div className="h-12 w-3/4 max-w-[640px] rounded bg-white/10 lg:h-16" />
          <div className="mt-4 h-12 w-1/3 max-w-[300px] rounded bg-white/10 lg:h-16" />
          <div className="mt-8 h-4 w-full max-w-[520px] rounded bg-white/10" />
          <div className="mt-3 h-4 w-2/3 max-w-[360px] rounded bg-white/10" />
          <div className="mt-12 h-24 border-t border-white/15" />
        </div>
      </section>
      <div className="h-[480px] bg-[#FEF8F0]" />
    </div>
  );
}

async function CollectionContent({ params }: Props) {
  const { slug } = await params;
  const [cms, shared] = await Promise.all([
    getCollection(slug),
    getExploreCollectionsPage(), // the "Why Choose" block is shared by every collection
  ]);
  // Built-in cards (shown before anything is published in Sanity) must not lead to a 404
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const collection: any = cms ?? fallbackCollection(slug);
  if (!collection) notFound();

  const faqs = (collection.faqs ?? []).filter(
    (f: { question?: string; answer?: string }) =>
      f?.question?.trim() && f?.answer?.trim(),
  );

  // Structured data so search engines can show the questions as rich results
  const faqJsonLd =
    faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f: { question: string; answer: string }) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }
      : null;

  return (
    <>
      <CollectionHero
        title={collection.title}
        titleWhite={collection.heroTitleWhite}
        titleBlue={collection.heroTitleBlue}
        subtitle={collection.heroSubtitle || collection.shortDescription}
        image={collection.heroImage || collection.image}
        imageAlt={collection.heroImage ? collection.heroImageAlt : collection.imageAlt}
        hotspot={collection.heroImage ? collection.heroHotspot : collection.hotspot}
        features={collection.features}
      />

      <CollectionKeyFeatures
        heading={collection.keyFeaturesHeading}
        intro={collection.keyFeaturesIntro}
        items={collection.keyFeatures}
      />

      <CollectionWhySection
        heading={collection.whyHeading || `Why choose ${collection.title}?`}
        text={collection.whyText}
        points={collection.whyPoints}
        image={collection.whyImage}
        imageAlt={collection.whyImageAlt}
      />

      <CollectionHighlightsGrid
        heading={collection.highlightsHeading}
        items={collection.highlightItems}
      />

      <CollectionBenefits
        heading={
          collection.benefitsHeading || `What makes ${collection.title} special?`
        }
        items={collection.benefits}
      />

      <CollectionCoverGrid
        heading={collection.coverHeading}
        intro={collection.coverIntro}
        items={collection.coverItems}
      />

      <CollectionCtaBanner
        eyebrow={collection.ctaEyebrow}
        heading={collection.ctaHeading}
        text={collection.ctaText}
        buttonLabel={collection.ctaButtonLabel}
        link={collection.ctaLink}
      />

      <WhyChooseSection
        heading={collection.whyChooseHeading || shared?.whyChooseHeading}
        items={
          collection.whyChooseItems?.length
            ? collection.whyChooseItems
            : shared?.whyChooseItems
        }
      />

      <FaqAccordion heading={collection.faqHeading} items={faqs} />

      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      )}
    </>
  );
}
