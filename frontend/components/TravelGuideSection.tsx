import Link from "next/link";
import { manrope } from "@/app/fonts";
import { GuideCard, type GuidePost } from "@/components/GuideCard";
import LeafAccent from "@/components/LeafAccent";

type Props = {
  // Already the 3 newest posts (see guideHomeQuery in queries.ts), so the cards
  // are always the latest "Design Guide posts" published in Sanity.
  posts?: GuidePost[] | null;
  eyebrow?: string | null;
  heading?: string | null;
  subtitle?: string | null;
};

const DEFAULTS = {
  eyebrow: "Our Collections",
  heading: "Your Weekly Design Guide.",
  subtitle:
    "For the latest destination guides, travel tips and holiday ideas from Royal Grain.",
};

// "Your Weekly Design Guide." -> ["Your Weekly Design", "Guide."] (last word is set in gold)
function splitLastWord(text: string): [string, string] {
  const t = text.trim();
  const i = t.lastIndexOf(" ");
  return i === -1 ? ["", t] : [t.slice(0, i + 1), t.slice(i + 1)];
}

export default function TravelGuideSection({
  posts,
  eyebrow,
  heading,
  subtitle,
}: Props) {
  const cards = (posts ?? []).filter((p) => p?.slug && p?.title);
  if (cards.length === 0) return null;

  const [headStart, headEnd] = splitLastWord(heading || DEFAULTS.heading);

  return (
    <section
      aria-labelledby="design-guide-heading"
      className="relative isolate bg-[#FEF8F0] py-16 lg:py-24"
    >
      <LeafAccent corner="top-right" />
      <div className="mx-auto max-w-[1338px] px-6 lg:px-12">
        {/* Header: tag + title + subtitle, "View all" button on the right */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.3em] text-[#301200]">
              <span aria-hidden className="h-px w-5 bg-[#D68921]" />
              {eyebrow || DEFAULTS.eyebrow}
            </p>
            <h2
              id="design-guide-heading"
              className={`${manrope.className} mt-4 max-w-[560px] text-4xl font-bold leading-[1.05] tracking-[-0.01em] text-[#301200] lg:text-[3.3rem]`}
            >
              {headStart}
              <span className="text-[#D68921]">{headEnd}</span>
            </h2>
            <p className="mt-4 max-w-[560px] text-[15px] leading-[1.7] text-[#2F1C09]/75">
              {subtitle || DEFAULTS.subtitle}
            </p>
          </div>

          <Link
            href="/design-guide"
            className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-[#301200] px-6 py-3 text-sm font-semibold text-[#f2e9dd] shadow-sm transition-colors duration-200 hover:bg-[#432115] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D68921] sm:self-auto"
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
