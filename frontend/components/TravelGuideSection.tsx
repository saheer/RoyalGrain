import Link from "next/link";
import { manrope } from "@/app/fonts";
import { GuideCard, type GuidePost } from "@/components/GuideCard";

type Props = {
  // Already the 3 newest posts (see guideHomeQuery in queries.ts)
  posts?: GuidePost[] | null;
};

export default function TravelGuideSection({ posts }: Props) {
  const cards = (posts ?? []).filter((p) => p?.slug && p?.title);
  if (cards.length === 0) return null;

  return (
    <section
      aria-labelledby="design-guide-heading"
      className="bg-white py-16 lg:py-24"
    >
      <div className="mx-auto max-w-[1338px] px-6 lg:px-12">
        {/* Header: title + subtitle, "View all" button on the right */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2
              id="design-guide-heading"
              className={`${manrope.className} max-w-[560px] text-4xl font-bold leading-[1.05] tracking-[-0.01em] text-[#2F1200] lg:text-[3.3rem]`}
            >
              Your Weekly Design Guide.
            </h2>
            <p className="mt-4 max-w-[560px] text-[15px] leading-[1.7] text-[#432115]">
              For the latest destination guides, travel tips and holiday ideas
              from Royal Grain.
            </p>
          </div>

          <Link
            href="/design-guide"
            className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-[#2F63B5] bg-brand-bronze px-6 py-2.5 text-sm font-semibold text-[#f2e9dd] shadow-sm transition-colors duration-200 hover:bg-[#78280C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-bronze sm:self-auto"
          >
            View all insights
            <span aria-hidden>→</span>
          </Link>
        </div>

        {/* 3 newest posts */}
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:mt-12 lg:grid-cols-3">
          {cards.map((post) => (
            <GuideCard key={post._id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
