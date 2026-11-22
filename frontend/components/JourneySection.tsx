import { playfair } from "@/app/fonts";
import { LINE_ICONS, LineIcon } from "./LineIcon";

type Milestone = {
  _key: string;
  icon?: string | null;
  year?: string | null; // optional: shown as a small gold label above the title
  title?: string | null;
  description?: string | null;
};

type Props = {
  heading?: string | null;
  items?: Milestone[] | null;
};

// Shown until items are added in Studio (About Us > "Our Core Values")
const DEFAULT_ITEMS: Milestone[] = [
  {
    _key: "default-1",
    icon: "leaf",
    title: "Solid Teakwood",
    description:
      "We source only premium-grade teakwood, ensuring lasting durability and natural beauty.",
  },
  {
    _key: "default-2",
    icon: "star",
    title: "Master Artisans",
    description:
      "Every creation is crafted by skilled artisans with generations of expertise.",
  },
  {
    _key: "default-3",
    icon: "shield",
    title: "Bespoke Perfection",
    description:
      "From concept to creation, we deliver tailor-made solutions for your unique space.",
  },
  {
    _key: "default-4",
    icon: "diamond",
    title: "Timeless Quality",
    description:
      "Our commitment to quality ensures your interiors remain elegant for years.",
  },
];

// Icon used when an item has none chosen: item 1, 2, 3 ...
const FALLBACK_ICONS = ["leaf", "star", "shield", "diamond"];

// Dark brown strip of values (the "Our Journey" content, restyled). Same Sanity data:
// About Us > "Our Core Values" tab.
export default function JourneySection({ heading, items }: Props) {
  const clean = (items ?? []).filter((m) => m?.title?.trim());
  const steps = clean.length > 0 ? clean : DEFAULT_ITEMS;

  return (
    <section
      id="our-journey"
      aria-labelledby="journey-heading"
      className="scroll-mt-24 bg-[#FBF1E4] py-14 lg:py-20"
    >
      <div className="mx-auto max-w-[1338px] px-6 lg:px-12">
        <h2
          id="journey-heading"
          className={`${playfair.className} text-4xl font-bold leading-[1.1] tracking-tight text-[#2F1200] lg:text-[3rem]`}
        >
          {heading || "Our Core Values"}
        </h2>

        <ol className="relative mt-8 grid grid-cols-1 overflow-hidden rounded-3xl border-t border-[#D68921]/60 bg-gradient-to-b from-[#2F1200] to-[#1D0B00] shadow-[0_30px_60px_-36px_rgba(47,18,0,0.7)] sm:grid-cols-2 lg:mt-10 lg:grid-cols-4">
          {steps.map((m, i) => {
            const icon =
              m.icon && LINE_ICONS[m.icon]
                ? m.icon
                : FALLBACK_ICONS[i % FALLBACK_ICONS.length];
            return (
              <li
                key={m._key}
                className="flex flex-col items-center px-6 py-9 text-center lg:px-8 lg:py-10 [&:not(:first-child)]:border-t [&:not(:first-child)]:border-[#D68921]/20 sm:[&:nth-child(2)]:border-t-0 sm:[&:nth-child(even)]:border-l sm:[&:nth-child(even)]:border-[#D68921]/20 lg:[&:not(:first-child)]:border-l lg:[&:not(:first-child)]:border-t-0 lg:[&:not(:first-child)]:border-[#D68921]/20"
              >
                <span
                  aria-hidden
                  className="flex h-14 w-14 items-center justify-center rounded-full border border-[#D68921]/70 text-[#D68921]"
                >
                  <span className="block h-6 w-6">
                    <LineIcon name={icon} strokeWidth={1.5} />
                  </span>
                </span>
                {m.year && (
                  <span className="mt-5 text-[11px] font-semibold tracking-[0.25em] text-[#D68921]">
                    {m.year}
                  </span>
                )}
                <h3
                  className={`${playfair.className} ${m.year ? "mt-2" : "mt-5"} text-xl font-bold leading-tight text-[#f2e9dd]`}
                >
                  {m.title}
                </h3>
                {m.description && (
                  <p className="mt-3 max-w-[260px] text-[14px] leading-[1.65] text-[#f2e9dd]/75">
                    {m.description}
                  </p>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
