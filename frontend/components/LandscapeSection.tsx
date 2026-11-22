import { manrope } from "@/app/fonts";
import LandscapeCard, { type LandscapeCardData } from "./LandscapeCard";
import LandscapeSlider from "./LandscapeSlider";

// Up to this many cards: plain grid. More than this: slider.
const SLIDER_THRESHOLD = 3;

type Props = {
  heading?: string | null;
  description?: string | null;
  cards?: LandscapeCardData[] | null;
};

export default function LandscapeSection({
  heading,
  description,
  cards,
}: Props) {
  const items = (cards ?? []).filter((c) => c?.image && c?.title);
  if (items.length === 0) return null;

  return (
    <section
      aria-labelledby="landscape-heading"
      className="bg-[#FEF8F0] pb-20 pt-6 lg:pb-28 lg:pt-10"
    >
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
        {/* Heading row: heading (with a short gold line) left, subtitle (gold bar) right */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
          {heading && (
            <div className="flex items-center gap-5">
              <span
                aria-hidden
                className="hidden h-0.5 w-14 shrink-0 bg-[#D68921] lg:block"
              />
              <h2
                id="landscape-heading"
                className={`${manrope.className} max-w-xl text-4xl font-bold leading-[1.1] tracking-tight text-[#2F1200] lg:text-5xl`}
              >
                {heading}
              </h2>
            </div>
          )}
          {description && (
            <p className="max-w-md border-l-2 border-[#D68921] pl-6 text-base leading-relaxed text-[#2F1200] lg:text-lg">
              {description}
            </p>
          )}
        </div>

        {/* Cards: grid for 3 or fewer, slider for more */}
        <div className="mt-10 lg:mt-14">
          {items.length > SLIDER_THRESHOLD ? (
            <LandscapeSlider cards={items} label={heading || "Collections"} />
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {items.map((card) => (
                <LandscapeCard key={card._key} card={card} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
