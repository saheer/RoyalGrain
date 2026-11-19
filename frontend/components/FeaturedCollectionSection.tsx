import { manrope } from "@/app/fonts";
import FeaturedCollectionSlider from "./FeaturedCollectionSlider";
import {
  ArrowIcon,
  DEFAULT_LINK,
  SmartLink,
  type FeaturedCardData,
} from "./FeaturedParts";

type Props = {
  eyebrow?: string | null;
  heading?: string | null;
  headingAccent?: string | null; // gold part of the heading (optional)
  description?: string | null;
  linkText?: string | null;
  linkUrl?: string | null;
  cards?: FeaturedCardData[] | null;
};

// Splits the heading into a brown part and a gold part. The gold part is the optional
// "Heading (gold part)" field; without it the last two words are gold.
function splitHeading(heading: string, accent?: string | null): [string, string] {
  if (accent?.trim()) return [heading.trim(), accent.trim()];
  const words = heading.trim().split(/\s+/);
  if (words.length < 3) return [heading.trim(), ""];
  return [words.slice(0, -2).join(" "), words.slice(-2).join(" ")];
}

// Managed in Sanity: Home Page > "Featured Collection". Hidden until at least one card
// has an image.
export default function FeaturedCollectionSection({
  eyebrow,
  heading,
  headingAccent,
  description,
  linkText,
  linkUrl,
  cards,
}: Props) {
  // Any number of cards: the slider decides whether it needs arrows
  const items = (cards ?? []).filter((c) => c?.image && c?.title?.trim());
  if (items.length === 0) return null;

  const link = linkUrl?.trim() || DEFAULT_LINK;

  return (
    <section
      aria-labelledby="featured-heading"
      className="bg-[#FEF8F0] py-16 lg:py-24"
    >
      <div className="mx-auto grid max-w-[1338px] items-center gap-12 px-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,2.1fr)] lg:gap-14 lg:px-12">
        {/* Text side */}
        <div>
          {eyebrow && (
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#D68921]">
              {eyebrow}
            </p>
          )}
          <h2
            id="featured-heading"
            className={`${manrope.className} mt-5 text-4xl font-bold leading-[1.08] tracking-tight text-[#2F1200] lg:text-[3.1rem]`}
          >
            {(() => {
              const [lead, gold] = splitHeading(
                heading || "Masterpieces in Solid Teakwood.",
                headingAccent,
              );
              return (
                <>
                  {lead}
                  {gold && <> <span className="text-[#D68921]">{gold}</span></>}
                </>
              );
            })()}
          </h2>
          {description && (
            <p className="mt-6 max-w-[380px] text-[16px] leading-[1.65] text-[#432115]">
              {description}
            </p>
          )}
          {linkText?.trim() && (
            <SmartLink
              href={link}
              className="group/cta mt-9 inline-flex items-center gap-2.5 border-b-2 border-[#D68921]/70 pb-1 text-[16px] font-semibold text-[#2F1200] transition-colors hover:border-[#D68921] hover:text-[#D68921] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D68921]"
            >
              {linkText}
              <ArrowIcon className="h-4 w-4 text-[#D68921] transition-transform duration-300 group-hover/cta:translate-x-1 motion-reduce:transition-none" />
            </SmartLink>
          )}
        </div>

        {/* Cards: slider (3 per view on desktop, 2 on tablet, 1 on mobile). min-w-0 lets the
            track scroll inside the grid cell instead of stretching the page. */}
        <div className="min-w-0">
          <FeaturedCollectionSlider cards={items} />
        </div>
      </div>
    </section>
  );
}
