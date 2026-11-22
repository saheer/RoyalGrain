import type { ReactNode } from "react";
import { manrope } from "@/app/fonts";
import LeafAccent from "@/components/LeafAccent";

type Card = {
  _key?: string | null;
  icon?: string | null;
  title?: string | null;
  description?: string | null;
};

type Props = {
  heading?: string | null;
  subtitle?: string | null;
  cards?: Card[] | null;
};

// Shown until the cards are filled in the "Our Craft" tab of the About Us document in Sanity
const DEFAULTS = {
  heading: "Handcrafted Teakwood Collections & Interiors",
  subtitle:
    "Premium solid teakwood furniture and custom interior solutions crafted to elevate your living spaces.",
  cards: [
    {
      _key: "default-1",
      icon: "users",
      title: "Designed around your home",
      description:
        "Every piece begins with how you live. We listen, learn and shape furniture and interiors around your family, your space and your routine.",
    },
    {
      _key: "default-2",
      icon: "shield",
      title: "Craftsmanship that lasts",
      description:
        "Solid teakwood, careful joinery and a fine finish turn raw timber into pieces made to be used, loved and handed down.",
    },
    {
      _key: "default-3",
      icon: "ruler",
      title: "Honest materials, honest work",
      description:
        "Quality timber, clear communication and dependable delivery, so every project is as reliable as the wood it is made from.",
    },
  ] as Card[],
};

// Line icons (24x24, drawn with the current text colour). The keys are the values of the
// "Icon" dropdown in studio/schemaTypes/about.ts (CRAFT_ICONS).
const ICONS: Record<string, ReactNode> = {
  users: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
  award: (
    <>
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </>
  ),
  zap: <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />,
  shield: (
    <>
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  heart: (
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
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
      <path d="m14.5 12.5 2-2" />
      <path d="m11.5 9.5 2-2" />
      <path d="m8.5 6.5 2-2" />
      <path d="m17.5 15.5 2-2" />
    </>
  ),
  home: (
    <>
      <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
      <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </>
  ),
};

// Used when a card has no icon chosen in Studio: card 1, 2, 3 ...
const FALLBACK_ICON_ORDER = ["users", "shield", "ruler"];

export default function AboutCraftSection({ heading, subtitle, cards }: Props) {
  const clean = (cards ?? []).filter(
    (c) => c?.title?.trim() && c?.description?.trim(),
  );
  const items = clean.length > 0 ? clean : DEFAULTS.cards;

  return (
    <section
      aria-labelledby="craft-heading"
      className="relative isolate pb-16 pt-16 lg:pb-24 lg:pt-24"
    >
      <LeafAccent corner="top-right" variant={3} />
      <div className="mx-auto max-w-[1338px] px-6 lg:px-12">
        {/* Heading row: heading left, subtitle right (stacked on mobile) */}
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.48fr)_minmax(0,1fr)] lg:items-end">
          <h2
            id="craft-heading"
            className={`${manrope.className} max-w-[560px] text-4xl font-bold leading-[1.1] tracking-tight text-[#2F1200] lg:text-[3rem]`}
          >
            {heading || DEFAULTS.heading}
          </h2>
          <p className="max-w-[400px] text-[15px] leading-[1.6] text-[#432115] lg:pb-2">
            {subtitle || DEFAULTS.subtitle}
          </p>
        </div>

        {/* Cards: the icon badge straddles the top edge, hence the extra top margin */}
        <ul className="mt-16 grid gap-x-6 gap-y-14 md:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-x-8">
          {items.map((card, i) => {
            const dark = i % 2 === 1; // the middle card uses the dark badge
            const key = card.icon && ICONS[card.icon]
              ? card.icon
              : FALLBACK_ICON_ORDER[i % FALLBACK_ICON_ORDER.length];

            return (
              <li
                key={card._key ?? `${card.title}-${i}`}
                className={`relative rounded-[22px] border-t-[3px] bg-[#FEF3E6] px-7 pb-10 pt-14 text-center shadow-[0_22px_44px_-26px_rgba(47,18,0,0.35)] transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_28px_50px_-24px_rgba(47,18,0,0.4)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 lg:px-9 ${
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
                  className={`${manrope.className} text-xl font-bold leading-snug text-[#2F1200] lg:text-[1.4rem]`}
                >
                  {card.title}
                </h3>
                <span
                  aria-hidden
                  className="mx-auto mt-4 block h-0.5 w-10 rounded-full bg-[#D68921]"
                />
                <p className="mt-5 text-[15px] leading-[1.7] text-[#432115]">
                  {card.description}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
