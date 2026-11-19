import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import HolidayHero from "@/components/holiday/HolidayHero";
import HolidayKeyFeatures from "@/components/holiday/HolidayKeyFeatures";
import HolidayWhySection from "@/components/holiday/HolidayWhySection";
import HolidayHighlightsGrid from "@/components/holiday/HolidayHighlightsGrid";
import HolidayBenefits from "@/components/holiday/HolidayBenefits";
import HolidayCoverGrid from "@/components/holiday/HolidayCoverGrid";
import HolidayCtaBanner from "@/components/holiday/HolidayCtaBanner";
import WhyChooseSection from "@/components/holiday/WhyChooseSection";
import FaqAccordion from "@/components/holiday/FaqAccordion";
import {
  getHoliday,
  getHolidaySlugs,
  getExploreHolidaysPage,
} from "@/sanity/lib/getHolidays";
import { buildMetadata } from "@/sanity/lib/seo";

type Props = { params: Promise<{ slug: string }> };

// Prerender every holiday at build time. With Cache Components this must return at
// least one param, so a placeholder is used while the CMS has no holidays yet
// (the page answers it with a 404). Holidays published later render on first visit.
export async function generateStaticParams() {
  const slugs = (await getHolidaySlugs()).filter((s) => s?.slug);
  return slugs.length > 0 ? slugs : [{ slug: "no-holidays-yet" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const holiday = await getHoliday(slug);
  if (!holiday)
    return {
      title: "Holiday not found | Royal Grain",
      robots: { index: false },
    };

  return buildMetadata({
    seo: holiday.seo,
    path: `/explore-collections/${slug}`,
    fallback: {
      title: `${holiday.title} | Royal Grain`,
      description: holiday.heroSubtitle || holiday.shortDescription,
      image: holiday.image,
    },
  });
}

// NOT async: `params` is URL data, so it is passed down as a promise and only
// awaited inside <Suspense>. The header is static (plain links, no data),
// so it needs no boundary.
export default function HolidayDetailPage({ params }: Props) {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<HolidayPageSkeleton />}>
          <HolidayContent params={params} />
        </Suspense>
      </main>
    </>
  );
}

// Roughly the size of the real hero, so nothing jumps when the content streams in
function HolidayPageSkeleton() {
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
      <div className="h-[480px] bg-white" />
    </div>
  );
}

async function HolidayContent({ params }: Props) {
  const { slug } = await params;
  const [holiday, shared] = await Promise.all([
    getHoliday(slug),
    getExploreHolidaysPage(), // the "Why Choose" block is shared by every holiday
  ]);
  if (!holiday) notFound();

  const faqs = (holiday.faqs ?? []).filter(
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
      <HolidayHero
        title={holiday.title}
        titleWhite={holiday.heroTitleWhite}
        titleBlue={holiday.heroTitleBlue}
        subtitle={holiday.heroSubtitle || holiday.shortDescription}
        image={holiday.heroImage || holiday.image}
        imageAlt={holiday.heroImage ? holiday.heroImageAlt : holiday.imageAlt}
        hotspot={holiday.heroImage ? holiday.heroHotspot : holiday.hotspot}
        features={holiday.features}
      />

      <HolidayKeyFeatures
        heading={holiday.keyFeaturesHeading}
        intro={holiday.keyFeaturesIntro}
        items={holiday.keyFeatures}
      />

      <HolidayWhySection
        heading={holiday.whyHeading || `Why choose ${holiday.title}?`}
        text={holiday.whyText}
        points={holiday.whyPoints}
        image={holiday.whyImage}
        imageAlt={holiday.whyImageAlt}
      />

      <HolidayHighlightsGrid
        heading={holiday.highlightsHeading}
        items={holiday.highlightItems}
      />

      <HolidayBenefits
        heading={
          holiday.benefitsHeading || `What makes ${holiday.title} special?`
        }
        items={holiday.benefits}
      />

      <HolidayCoverGrid
        heading={holiday.coverHeading}
        intro={holiday.coverIntro}
        items={holiday.coverItems}
      />

      <HolidayCtaBanner
        eyebrow={holiday.ctaEyebrow}
        heading={holiday.ctaHeading}
        text={holiday.ctaText}
        buttonLabel={holiday.ctaButtonLabel}
        link={holiday.ctaLink}
      />

      <WhyChooseSection
        heading={holiday.whyChooseHeading || shared?.whyChooseHeading}
        items={
          holiday.whyChooseItems?.length
            ? holiday.whyChooseItems
            : shared?.whyChooseItems
        }
      />

      <FaqAccordion heading={holiday.faqHeading} items={faqs} />

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
