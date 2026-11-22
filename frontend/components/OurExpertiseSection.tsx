import LeafAccent from "@/components/LeafAccent";
import type { ReactNode } from "react";
import { manrope } from "@/app/fonts";

type Item = {
  _key?: string | null;
  icon?: string | null;
  title?: string | null;
  description?: string | null;
};

type Props = {
  heading?: string | null;
  subtitle?: string | null;
  items?: Item[] | null;
};

// Managed in Sanity ("Our Expertise Page" > "Our Expertise"). These values are the
// fallback shown until that document is published.
const DEFAULTS = {
  heading: "Our Expertise in Solid Woodcraft",
  subtitle:
    "From magnificent architectural elements to bespoke interior living spaces, discover what we specialize in crafting.",
  items: [
    {
      icon: "door",
      title: "Main Doors & Entrance",
      description:
        "Custom-built heavy teakwood main doors, intricate frames, and grand entrances designed for everlasting first impressions.",
    },
    {
      icon: "bed",
      title: "Custom Teakwood Beds & Wardrobes",
      description:
        "Premium box-type beds, sleek wall-mounted wardrobes, and smart bedroom storage tailored to your space.",
    },
    {
      icon: "swing",
      title: "Traditional Wooden Swings (Unjals)",
      description:
        "Authentically crafted Malabar-style hanging swings featuring fine artistic carvings and robust joinery.",
    },
    {
      icon: "living",
      title: "Living & Dining Collections",
      description:
        "Bespoke solid wood center tables, teepoys, dining sets, and complete custom interior furniture solutions.",
    },
  ] as Item[],
};

// Line icons, 24x24, drawn in the current text colour
// The keys are the values of the "Icon" dropdown in studio/schemaTypes/ourExpertisePage.ts.
const ICONS: Record<string, ReactNode> = {
  door: (
    <>
      <rect x="5" y="2.5" width="14" height="19" rx="1.5" />
      <path d="M9 7h6M9 17h6" />
      <circle cx="15.5" cy="12" r="0.9" />
    </>
  ),
  bed: (
    <>
      <path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8" />
      <path d="M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4" />
      <path d="M12 4v6" />
      <path d="M2 18h20" />
    </>
  ),
  swing: (
    <>
      <path d="M3 3h18" />
      <path d="M7 3v12M17 3v12" />
      <rect x="4" y="15" width="16" height="3.5" rx="1" />
    </>
  ),
  living: (
    <>
      <path d="M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3" />
      <path d="M2 11v5a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H6v-2a2 2 0 0 0-4 0Z" />
      <path d="M4 18v2M20 18v2" />
    </>
  ),
  leaf: (
    <>
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </>
  ),
  ruler: (
    <>
      <path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z" />
      <path d="m14.5 12.5 2-2M11.5 9.5l2-2M8.5 6.5l2-2M17.5 15.5l2-2" />
    </>
  ),
  home: (
    <>
      <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
      <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </>
  ),
  award: (
    <>
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </>
  ),
};

const FALLBACK_ICON_ORDER = ["door", "bed", "swing", "living"];

export default function OurExpertiseSection({
  heading,
  subtitle,
  items,
}: Props) {
  const list = (items ?? []).filter(
    (i) => i?.title?.trim() && i?.description?.trim(),
  );
  const cards = list.length > 0 ? list : DEFAULTS.items;

  return (
    <section
      id="expertise"
      aria-labelledby="expertise-heading"
      className="relative isolate scroll-mt-24 bg-[#FCF1E2] py-16 lg:py-24"
    >
      <LeafAccent corner="top-right" variant={3} />
      <div className="mx-auto max-w-[1338px] px-6 lg:px-12">
        {/* Heading left, subtitle right (stacked on mobile) */}
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.48fr)_minmax(0,1fr)] lg:items-end">
          <h2
            id="expertise-heading"
            className={`${manrope.className} max-w-[560px] text-4xl font-bold leading-[1.1] tracking-tight text-[#2F1200] lg:text-[3rem]`}
          >
            {heading || DEFAULTS.heading}
          </h2>
          <p className="max-w-[420px] text-[15px] leading-[1.6] text-[#432115] lg:pb-2">
            {subtitle || DEFAULTS.subtitle}
          </p>
        </div>

        {/* Same card treatment as "Our Craft" on About Us: the icon badge straddles the top
            edge, hence the extra top margin. 1 column on mobile, 2 on tablet, 4 on desktop. */}
        <ul className="mt-16 grid gap-x-6 gap-y-14 md:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {cards.map((item, i) => {
            const dark = i % 2 === 1; // every second card uses the dark badge
            const key =
              item.icon && ICONS[item.icon]
                ? item.icon
                : FALLBACK_ICON_ORDER[i % FALLBACK_ICON_ORDER.length];

            return (
              <li
                key={item._key ?? `${item.title}-${i}`}
                className={`relative rounded-[22px] border-t-[3px] bg-[#FEF3E6] px-6 pb-10 pt-14 text-center shadow-[0_22px_44px_-26px_rgba(47,18,0,0.35)] transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_28px_50px_-24px_rgba(47,18,0,0.4)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 lg:px-7 ${
                  dark ? "border-t-[#2F1200]" : "border-t-[#D68921]"
                }`}
              >
                <span
                  aria-hidden
                  className={`absolute left-1/2 top-0 flex h-[54px] w-[54px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl text-white shadow-[0_10px_20px_-8px_rgba(47,18,0,0.55)] ${
                    dark
                      ? "bg-gradient-to-b from-[#5B2A0B] to-[#2F1200]"
                      : "bg-gradient-to-b from-[#EDA83F] to-[#D68921]"
                  }`}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-7 w-7"
                  >
                    {ICONS[key]}
                  </svg>
                </span>

                <h3
                  className={`${manrope.className} text-xl font-bold leading-snug text-[#2F1200] lg:text-[1.3rem]`}
                >
                  {item.title}
                </h3>
                <span
                  aria-hidden
                  className="mx-auto mt-4 block h-0.5 w-10 rounded-full bg-[#D68921]"
                />
                <p className="mt-5 text-[15px] leading-[1.7] text-[#432115]">
                  {item.description}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
