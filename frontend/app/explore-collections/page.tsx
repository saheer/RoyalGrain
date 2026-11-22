import LeafAccent from "@/components/LeafAccent";
import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import FadeInWhenVisible from "@/components/FadeInWhenVisible";
import HolidayListItem from "@/components/HolidayListItem";
import { manrope } from "@/app/fonts";
import {
  getHolidaysList,
  getExploreHolidaysPage,
} from "@/sanity/lib/getHolidays";
import { hotspotStyle } from "@/lib/holidays";
import { buildMetadata } from "@/sanity/lib/seo";
import { getPageSeo } from "@/sanity/lib/getPageSeo";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageSeo("exploreHolidaysPage");
  return buildMetadata({
    seo: page?.seo,
    path: "/explore-collections",
    fallback: {
      title: "Holidays | Royal Grain",
      description:
        "Kerala backwater cruises, hill-station escapes, beach getaways and wildlife tours, planned by Royal Grain.",
    },
  });
}

export default async function ExploreHolidaysPage() {
  const [pageData, list] = await Promise.all([
    getExploreHolidaysPage(),
    getHolidaysList(),
  ]);
  // Works even before the "Explore Collections Page" document is published
  const page = pageData ?? {};
  const holidays = Array.isArray(list) ? list : [];

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative isolate overflow-hidden bg-[#2F1200]">
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
          <div className="absolute inset-0 bg-gradient-to-r from-[#2F1200]/90 via-[#2F1200]/75 to-[#2F1200]/50" />

          <div className="relative z-10 mx-auto max-w-[1338px] px-6 pb-20 pt-40 lg:px-12 lg:pb-28 lg:pt-[11rem]">
            <h1
              className={`${manrope.className} max-w-[860px] animate-fade-up text-5xl font-bold leading-[1.05] tracking-[-0.015em] text-[#f2e9dd] motion-reduce:animate-none sm:text-6xl lg:text-[4.5rem]`}
            >
              {page.heroTitle || "Holidays crafted around the way you travel."}
            </h1>
            <p
              style={{ animationDelay: "150ms" }}
              className="mt-8 max-w-[640px] animate-fade-up text-base leading-[1.75] text-[#f2e9dd]/80 motion-reduce:animate-none"
            >
              {page.heroSubtitle ||
                "From Kerala’s backwaters and hill stations to beaches and beyond, we plan holidays for every kind of traveller."}
            </p>
          </div>
        </section>

        {/* Intro + the four holidays */}
        <FadeInWhenVisible>
          <section className="relative isolate bg-[#FBF1E4] py-16 lg:py-24">
            <LeafAccent corner="top-right" />
            <div className="mx-auto max-w-[1338px] px-6 lg:px-12">
              <div className="grid gap-5 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-end">
                <h2
                  className={`${manrope.className} max-w-[640px] text-4xl font-bold leading-[1.1] tracking-tight text-[#2F1200] lg:text-[3rem]`}
                >
                  {page.introHeading || "Find Your Perfect Holiday"}
                </h2>
                {page.introDescription && (
                  <p className="max-w-[400px] text-[15px] leading-[1.6] text-[#432115] lg:pb-2">
                    {page.introDescription}
                  </p>
                )}
              </div>

              {holidays.length === 0 ? (
                <p className="mt-12 text-[#432115]">
                  Holidays will appear here once they are published in Sanity
                  Studio.
                </p>
              ) : (
                <div className="mt-10 space-y-6 lg:mt-12">
                  {holidays.map((s, i) => (
                    <HolidayListItem
                      key={s._id}
                      holiday={s}
                      reversed={i % 2 === 1}
                      exploreLabel={page.exploreLabel}
                      priority={i === 0}
                    />
                  ))}
                </div>
              )}
            </div>
          </section>
        </FadeInWhenVisible>
      </main>
    </>
  );
}
