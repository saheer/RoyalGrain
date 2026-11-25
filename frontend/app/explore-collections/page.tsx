import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import BannerEdge from "@/components/BannerEdge";
import LeafAccent from "@/components/LeafAccent";
import FadeInWhenVisible from "@/components/FadeInWhenVisible";
import CollectionCard from "@/components/CollectionCard";
import { SmartLink, ArrowIcon } from "@/components/FeaturedParts";
import { playfair } from "@/app/fonts";
import {
  getCollectionsList,
  getExploreCollectionsPage,
} from "@/sanity/lib/getCollections";
import { FALLBACK_COLLECTIONS, hotspotStyle } from "@/lib/collections";
import { titleParts } from "@/lib/expertisePages";
import { buildMetadata } from "@/sanity/lib/seo";
import { getPageSeo } from "@/sanity/lib/getPageSeo";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageSeo("exploreHolidaysPage");
  return buildMetadata({
    seo: page?.seo,
    path: "/explore-collections",
    fallback: {
      title: "Handcrafted Collections | Royal Grain",
      description:
        "Solid teakwood main doors, wardrobes, designer beds, traditional unjals and center tables, handcrafted by Royal Grain.",
    },
  });
}

// Heading with its gold part (see titleParts)
function GoldHeading({ text, accent }: { text: string; accent?: string | null }) {
  return (
    <>
      {titleParts(text, accent).map((p, i) =>
        p.gold ? (
          <span key={i} className="text-[#D68921]">
            {p.text}
          </span>
        ) : (
          <span key={i}>{p.text}</span>
        ),
      )}
    </>
  );
}

const PILL =
  "group/cta inline-flex items-center gap-2.5 rounded-full border border-[#F4ECDD]/60 bg-[#280F01]/40 px-7 py-3.5 text-[15px] font-semibold text-[#F4ECDD] backdrop-blur-sm transition-colors duration-300 hover:border-[#D68921] hover:bg-[#D68921] hover:text-[#280F01] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D68921]";

export default async function ExploreCollectionsPage() {
  const [pageData, list] = await Promise.all([
    getExploreCollectionsPage(),
    getCollectionsList(),
  ]);
  // Works even before the "Explore Collections Page" document is published
  const page = pageData ?? {};
  const fromCms = Array.isArray(list) ? list.filter((c) => c?.slug) : [];
  const collections = fromCms.length > 0 ? fromCms : FALLBACK_COLLECTIONS;

  const heroTitle = page.heroTitle || "Explore Our Handcrafted Collections";
  const heroSubtitle =
    page.heroSubtitle ||
    "Thoughtfully crafted solid teakwood furniture, architectural doors, and bespoke interior pieces designed for modern living and enduring warmth.";
  const introHeading = page.introHeading || "Our Masterpiece Collections";
  const introDescription =
    page.introDescription ||
    "From grand entrances to serene bedrooms and living spaces, explore dedicated collections tailored to every corner of your home.";
  const featuredHeading = page.featuredHeading || "Masterpieces in Solid Teakwood.";
  // Gold part: the Studio field, or the mockup's default while the default heading is in use
  const heroAccent = page.heroTitleAccent || (page.heroTitle ? null : "Collections");
  const introAccent = page.introHeadingAccent || (page.introHeading ? null : "Collections");
  const featuredAccent = page.featuredHeadingAccent || (page.featuredHeading ? null : "Solid Teakwood.");
  const featuredImage = page.featuredImage || null;

  return (
    <>
      <Header />
      <main className="overflow-x-clip">
        {/* Hero */}
        <section className="relative isolate overflow-hidden bg-[#280F01]">
          {page.heroBackground && (
            <Image
              src={page.heroBackground}
              alt={page.heroBackgroundAlt || ""}
              fill
              loading="eager"
              fetchPriority="high"
              sizes="100vw"
              style={hotspotStyle(page.heroHotspot)}
              className="object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-[#280F01]/95 via-[#280F01]/80 to-[#280F01]/45" />

          <div className="relative z-10 mx-auto max-w-[1338px] px-6 pb-24 pt-40 lg:px-12 lg:pb-32 lg:pt-[11rem]">
            <span aria-hidden className="mb-7 block h-[3px] w-14 rounded-full bg-[#D68921]" />
            <h1
              className={`${playfair.className} max-w-[820px] animate-fade-up text-[2.6rem] font-bold leading-[1.08] tracking-[-0.015em] text-[#F4ECDD] motion-reduce:animate-none sm:text-6xl lg:text-[4.5rem]`}
            >
              <GoldHeading text={heroTitle} accent={heroAccent} />
            </h1>
            <p
              style={{ animationDelay: "150ms" }}
              className="mt-7 max-w-[600px] animate-fade-up text-base leading-[1.75] text-[#F4ECDD]/85 motion-reduce:animate-none lg:text-[17px]"
            >
              {heroSubtitle}
            </p>
            <div
              style={{ animationDelay: "300ms" }}
              className="mt-9 animate-fade-up motion-reduce:animate-none"
            >
              <SmartLink
                href={page.heroCtaLink?.trim() || "#masterpiece-collections"}
                className={PILL}
              >
                {page.heroCtaLabel || "Explore Collections"}
                <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-1" />
              </SmartLink>
            </div>
          </div>

          <BannerEdge color="#FBF1E4" />
        </section>

        {/* Our Masterpiece Collections */}
        <FadeInWhenVisible>
          <section
            id="masterpiece-collections"
            className="relative isolate scroll-mt-24 overflow-hidden bg-[#FBF1E4] py-16 lg:py-24"
          >
            <LeafAccent corner="top-right" />
            <LeafAccent corner="bottom-left" />
            <div className="mx-auto max-w-[1338px] px-6 lg:px-12">
              <div className="grid gap-6 lg:grid-cols-[auto_1px_minmax(0,1fr)] lg:items-center lg:gap-10">
                <h2
                  className={`${playfair.className} max-w-[560px] text-4xl font-bold leading-[1.1] tracking-tight text-[#2F1200] lg:text-[3rem]`}
                >
                  <GoldHeading text={introHeading} accent={introAccent} />
                </h2>
                <span aria-hidden className="hidden h-full min-h-[5rem] w-px bg-[#D68921]/50 lg:block" />
                <p className="max-w-[480px] text-[15px] leading-[1.75] text-[#432115]">
                  {introDescription}
                </p>
              </div>

              {/* 3 cards on the first row, 2 wider cards on the second (6-column grid) */}
              <div className="mt-16 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:mt-20 lg:grid-cols-6">
                {collections.map((c, i) => (
                  <div
                    key={c._id}
                    className={`min-w-0 ${i < 3 ? "lg:col-span-2" : "lg:col-span-3"} ${
                      collections.length % 2 === 1 && i === collections.length - 1
                        ? "sm:col-span-2 sm:mx-auto sm:w-full sm:max-w-[calc(50%-0.75rem)] lg:max-w-none"
                        : ""
                    }`}
                  >
                    <CollectionCard collection={c} priority={i === 0} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </FadeInWhenVisible>

        {/* Featured collection banner */}
        <FadeInWhenVisible>
          <section className="bg-[#FBF1E4] pb-16 lg:pb-24">
            <div className="mx-auto max-w-[1338px] px-6 lg:px-12">
              <div className="grid overflow-hidden rounded-3xl bg-gradient-to-br from-[#301200] to-[#280F01] shadow-[0_30px_70px_-34px_rgba(40,15,1,0.7)] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
                <div className="flex flex-col items-start justify-center p-8 sm:p-12 lg:p-16">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#E3A035]">
                    {page.featuredEyebrow || "Featured Collection"}
                  </p>
                  <h2
                    className={`${playfair.className} mt-4 text-3xl font-bold leading-[1.12] tracking-tight text-[#F4ECDD] sm:text-4xl lg:text-[2.9rem]`}
                  >
                    <GoldHeading text={featuredHeading} accent={featuredAccent} />
                  </h2>
                  <p className="mt-5 max-w-[520px] text-[15px] leading-[1.75] text-[#F4ECDD]/80">
                    {page.featuredDescription ||
                      "A curated selection of doors, wardrobes, designer beds, and traditional unjals—each categorized so you can browse by space and style with ease."}
                  </p>
                  <SmartLink
                    href={page.featuredCtaLink?.trim() || "#masterpiece-collections"}
                    className="group/cta mt-8 inline-flex items-center gap-2.5 rounded-full bg-[#D68921] px-7 py-3.5 text-[15px] font-semibold text-[#280F01] transition-colors duration-300 hover:bg-[#E3A035] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E3A035]"
                  >
                    {page.featuredCtaLabel || "View all collections"}
                    <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-1" />
                  </SmartLink>
                </div>

                <div className="relative min-h-[240px] bg-gradient-to-br from-[#5a2d14] via-[#3b1a08] to-[#280F01] sm:min-h-[320px] lg:min-h-[420px]">
                  {featuredImage && (
                    <Image
                      src={featuredImage}
                      alt={page.featuredImageAlt || ""}
                      fill
                      sizes="(min-width: 1024px) 45vw, 100vw"
                      style={hotspotStyle(page.featuredHotspot)}
                      className="object-cover"
                    />
                  )}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#301200]/70 via-transparent to-transparent lg:from-[#301200]/60" />
                </div>
              </div>
            </div>
          </section>
        </FadeInWhenVisible>
      </main>
    </>
  );
}
