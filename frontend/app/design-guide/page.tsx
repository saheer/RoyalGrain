import LeafAccent from "@/components/LeafAccent";
import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import FadeInWhenVisible from "@/components/FadeInWhenVisible";
import AboutHero from "@/components/AboutHero";
import { GuideCard, GuideFeaturedCard } from "@/components/GuideCard";
import GuidePagination from "@/components/GuidePagination";
import {
  GUIDE_PAGE_SIZE,
  getGuideFeatured,
  getGuideGrid,
  getGuideHero,
} from "@/sanity/lib/getTravelGuide";
import { buildMetadata } from "@/sanity/lib/seo";
import { getPageSeo } from "@/sanity/lib/getPageSeo";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageSeo("travelGuidePage");
  return buildMetadata({
    seo: page?.seo,
    path: "/design-guide",
    fallback: {
      title: "Design Guide | Royal Grain",
      description:
        "The latest destination guides, travel tips and holiday ideas from Royal Grain.",
    },
  });
}

type SearchParams = Promise<{ page?: string | string[] }>;

// "?page=3" -> 3. Anything missing or invalid means page 1.
function parsePage(value?: string | string[]) {
  const n = Number.parseInt(
    Array.isArray(value) ? value[0] : (value ?? ""),
    10,
  );
  return Number.isFinite(n) && n >= 1 ? n : 1;
}

export default function TravelGuidePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <>
      <Header />
      <main>
        {/* Banner: same hero as About Us (height, tint, type), content from Sanity */}
        <GuideHero />

        {/* Posts: depends on ?page=, so it streams in behind a skeleton */}
        <FadeInWhenVisible>
          <section id="design-guide-posts" className="relative isolate scroll-mt-24 bg-[#FBF1E4] py-16 lg:py-20">
            <LeafAccent corner="top-right" />
            <div className="mx-auto max-w-[1338px] px-6 lg:px-12">
              <Suspense fallback={<ListSkeleton />}>
                <GuideList searchParams={searchParams} />
              </Suspense>
            </div>
          </section>
        </FadeInWhenVisible>
      </main>
    </>
  );
}

// Every field falls back to a default, so the banner also works before the
// "Design Guide Page" document is published.
async function GuideHero() {
  const hero = await getGuideHero();
  return (
    <AboutHero
      headingWhite={hero?.heroHeadingWhite ?? "Your Weekly"}
      headingBlue={hero?.heroHeadingBlue ?? "Design Guide."}
      description={
        hero?.heroDescription ??
        "For the latest design ideas, craftsmanship insights and interior inspiration from Royal Grain."
      }
      image={hero?.heroBackground}
      imageAlt={hero?.heroBackgroundAlt}
      hotspot={hero?.heroHotspot}
      scrollTo="#design-guide-posts"
    />
  );
}

async function GuideList({ searchParams }: { searchParams: SearchParams }) {
  const page = parsePage((await searchParams).page);
  const { featured, total } = await getGuideFeatured();

  if (!featured) {
    return (
      <p className="text-[#432115]">New insights will appear here soon.</p>
    );
  }

  // The featured post is not part of the grid
  const totalPages = Math.max(1, Math.ceil((total - 1) / GUIDE_PAGE_SIZE));
  if (page > totalPages) notFound();

  const posts = await getGuideGrid(featured._id, page);

  return (
    <>
      {/* Featured post: first page only */}
      {page === 1 && <GuideFeaturedCard post={featured} />}

      {posts.length > 0 && (
        <div
          className={`grid gap-6 md:grid-cols-2 lg:grid-cols-3 ${
            page === 1 ? "mt-8 lg:mt-16" : ""
          }`}
        >
          {posts.map((post: Parameters<typeof GuideCard>[0]["post"]) => (
            <GuideCard key={post._id} post={post} />
          ))}
        </div>
      )}

      <GuidePagination page={page} totalPages={totalPages} />
    </>
  );
}

function ListSkeleton() {
  return (
    <div aria-hidden className="animate-pulse space-y-8">
      <div className="h-[428px] rounded-3xl bg-[#F3E3CC]" />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-[380px] rounded-2xl bg-[#F3E3CC]" />
        ))}
      </div>
    </div>
  );
}
