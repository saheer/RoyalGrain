// The five "Our Expertise" detail pages listed in the footer: /our-expertise/<slug>.
//
// Everything below is the FALLBACK content. Each page is editable in Sanity Studio
// (Expertise Pages > <page>); any field left empty there falls back to the value here, so the
// pages work before anything is published. See sanity/lib/getExpertisePage.ts.

import { guessExpertiseIcon, isExpertiseIcon } from "@/lib/expertiseIcons";

export type ExpertisePage = {
  slug: string;
  /** Exact label used in the footer (also matched against the Footer document in Sanity) */
  label: string;
  /** Small gold line above the title */
  eyebrow: string;
  title: string;
  /** Part of the banner heading shown in gold (inside the heading, or added after it) */
  titleAccent: string;
  /** Small icon beside this page in the "More from Our Expertise" row and listings */
  menuIcon: string;
  bannerCopy: string;
  ctaLabel: string;
  ctaLink: string;
  overview: string;
  listHeading: string;
  /** The cards under the list heading: an icon (see lib/expertiseIcons.ts) and a short text */
  cards: ExpertiseCard[];
  focusHeading: string;
  focusText: string;
};

export type ExpertiseCard = { icon: string; text: string };

export const EXPERTISE_PAGES: ExpertisePage[] = [
  {
    slug: "custom-furniture",
    label: "Custom Furniture",
    menuIcon: "chair",
    eyebrow: "OUR EXPERTISE · CUSTOM FURNITURE",
    title: "Custom Furniture Crafted to Your Space",
    titleAccent: "Crafted to Your Space",
    bannerCopy:
      "Handcrafted tables, seating, storage, and statement pieces proportioned to your room dimensions, daily habits, and natural wood grain.",
    ctaLabel: "Plan a Custom Piece",
    ctaLink: "/contact-us",
    overview:
      "Ready-made pieces rarely fit real rooms without compromise. At Royal Grain Woodcraft & Interiors, every furniture piece is built around your exact measurements, comfort needs, and interior tone—combining sturdy joinery with rich natural finishes.",
    listHeading: "What We Craft",
    cards: [
      { icon: "table", text: "Solid wood dining tables, benches, and sideboards" },
      { icon: "chair", text: "Lounge chairs, coffee tables, and console units" },
      { icon: "bed", text: "Custom beds, nightstands, and bedroom storage" },
      { icon: "shelf", text: "Study desks, bookshelves, and compact multi-use pieces" },
    ],
    focusHeading: "Craft & Finish Focus",
    focusText:
      "Thoughtful grain matching, smooth edge profiling, and durable finishes designed for everyday family living.",
  },
  {
    slug: "interior-woodwork",
    label: "Interior Woodwork",
    menuIcon: "door",
    eyebrow: "OUR EXPERTISE · INTERIOR WOODWORK",
    title: "Architectural & Interior Woodwork",
    titleAccent: "Interior Woodwork",
    bannerCopy:
      "Teakwood doors, wall paneling, ceiling details, and built-in joinery that bring warmth and structure across interiors.",
    ctaLabel: "Discuss Woodwork Scope",
    ctaLink: "/contact-us",
    overview:
      "Fine woodwork gives an interior its character and permanence. From main entrance doors to subtle wall accents and fluted or paneled surfaces, we focus on clean alignment, proportion, and lasting timber strength.",
    listHeading: "Core Woodwork Elements",
    cards: [
      { icon: "door", text: "Main entrance doors, frames, and interior doors" },
      { icon: "panel", text: "Wall paneling, acoustic/decorative slats, and wainscoting" },
      { icon: "beams", text: "Ceiling accents, beams, and architraves" },
      { icon: "niche", text: "Built-in niches, partitions, and custom millwork" },
    ],
    focusHeading: "Craft & Finish Focus",
    focusText:
      "Seasoned timber selection, precision fitting on site, and finishes that highlight natural grain depth.",
  },
  {
    slug: "bespoke-interiors",
    label: "Bespoke Interiors",
    menuIcon: "compass",
    eyebrow: "OUR EXPERTISE · BESPOKE INTERIORS",
    title: "Bespoke Interiors Tailored to You",
    titleAccent: "Tailored to You",
    bannerCopy:
      "One-of-a-kind interior spaces designed from scratch around your lifestyle, aesthetic preferences, and functional flow.",
    ctaLabel: "Start a Bespoke Consultation",
    ctaLink: "/contact-us",
    overview:
      "Bespoke design starts with listening—how you host, unwind, work, and move through a space. We shape cohesive layouts, custom joinery, and warm material palettes so every corner feels intentional rather than templated.",
    listHeading: "Bespoke Highlights",
    cards: [
      { icon: "compass", text: "Concept-led spatial planning and custom design direction" },
      { icon: "ruler", text: "One-off statement joinery and tailored storage solutions" },
      { icon: "palette", text: "Harmonized palettes of warm woods, stone, fabric, and soft lighting" },
      { icon: "sparkle", text: "Personalized detailing with zero cookie-cutter templates" },
    ],
    focusHeading: "Craft & Finish Focus",
    focusText:
      "Close collaboration from initial concept to final installation, keeping every detail cohesive.",
  },
  {
    slug: "residential-interiors",
    label: "Residential Interiors",
    menuIcon: "home",
    eyebrow: "OUR EXPERTISE · RESIDENTIAL INTERIORS",
    title: "Warm, Livable Residential Interiors",
    titleAccent: "Residential Interiors",
    bannerCopy:
      "Homes, villas, and apartments crafted for calm daily routines, generous storage, and welcoming family spaces.",
    ctaLabel: "Book a Home Interior Chat",
    ctaLink: "/contact-us",
    overview:
      "A home should feel grounding the moment you walk in. We design and execute residential interiors that balance warm teakwood tones and practical everyday storage with spaces made for gathering and rest.",
    listHeading: "Home Spaces We Cover",
    cards: [
      { icon: "sofa", text: "Living rooms, dining areas, and family lounges" },
      { icon: "kitchen", text: "Modular & custom kitchens, pantries, and crockery units" },
      { icon: "wardrobe", text: "Bedrooms, walk-in wardrobes, and dressing zones" },
      { icon: "lamp", text: "Pooja units, foyers, and utility/storage spaces" },
    ],
    focusHeading: "Craft & Finish Focus",
    focusText:
      "Easy-to-maintain surfaces, smart storage zoning, and durable craftsmanship suited for years of daily use.",
  },
  {
    slug: "commercial-interiors",
    label: "Commercial Interiors",
    menuIcon: "building",
    eyebrow: "OUR EXPERTISE · COMMERCIAL INTERIORS",
    title: "Refined Commercial Interiors",
    titleAccent: "Commercial Interiors",
    bannerCopy:
      "Workspaces, studios, retail spaces, and client-facing environments built for durability, clarity, and brand presence.",
    ctaLabel: "Request a Commercial Quote",
    ctaLink: "/contact-us",
    overview:
      "Commercial spaces need to leave a lasting impression on visitors while supporting smooth daily operations. We create structured, welcoming interiors with sturdy finishes that hold up to high footfall and regular use.",
    listHeading: "Commercial Spaces We Build",
    cards: [
      { icon: "office", text: "Executive cabins, meeting rooms, and collaborative offices" },
      { icon: "reception", text: "Reception desks, waiting lounges, and display walls" },
      { icon: "shop", text: "Retail showrooms, boutiques, and product showcases" },
      { icon: "building", text: "Studios, clinics, and hospitality touchpoints" },
    ],
    focusHeading: "Craft & Finish Focus",
    focusText:
      "High-wear materials, clean cable/utility integration, and dependable timelines aligned with your opening schedule.",
  },
];

export function getExpertisePage(slug: string) {
  return EXPERTISE_PAGES.find((p) => p.slug === slug) ?? null;
}

/** Fields of an "Expertise Page" document in Sanity (all optional: empty = fallback above) */
export type ExpertiseDoc = {
  menuName?: string | null;
  slug?: string | null;
  bannerEyebrow?: string | null;
  title?: string | null;
  titleAccent?: string | null;
  bannerCopy?: string | null;
  ctaLabel?: string | null;
  ctaLink?: string | null;
  bannerImage?: string | null;
  bannerImageAlt?: string | null;
  bannerHotspot?: { x: number; y: number } | null;
  overview?: string | null;
  menuIcon?: string | null;
  listHeading?: string | null;
  listCards?: ({ icon?: string | null; text?: string | null } | null)[] | null;
  /** Older content: plain-text list (icons are guessed from the words) */
  listItems?: (string | null)[] | null;
  focusHeading?: string | null;
  focusText?: string | null;
  seo?: import("@/sanity/lib/seo").SeoData;
} | null;

const pick = (value: string | null | undefined, fallback: string) =>
  value?.trim() ? value.trim() : fallback;

/** Sanity values win; every empty field falls back to the built-in content. */
export function mergeExpertise(page: ExpertisePage, doc: ExpertiseDoc) {
  const fromCards: ExpertiseCard[] = (doc?.listCards ?? [])
    .filter((c): c is NonNullable<typeof c> => !!c?.text?.trim())
    .map((c) => ({
      icon: isExpertiseIcon(c.icon) ? c.icon : guessExpertiseIcon(c.text!),
      text: c.text!.trim(),
    }));
  const fromText: ExpertiseCard[] = (doc?.listItems ?? [])
    .map((i) => i?.trim() ?? "")
    .filter(Boolean)
    .map((text) => ({ icon: guessExpertiseIcon(text), text }));
  const cards = fromCards.length > 0 ? fromCards : fromText;

  const title = pick(doc?.title, page.title);
  // A gold part typed in Sanity always wins. When the heading was edited there but no gold part
  // given, don't reuse the stale built-in one.
  const titleAccent =
    doc?.titleAccent?.trim() ||
    (doc?.title?.trim() ? "" : page.titleAccent);

  return {
    label: pick(doc?.menuName, page.label),
    eyebrow: pick(doc?.bannerEyebrow, page.eyebrow),
    title,
    titleAccent,
    bannerCopy: pick(doc?.bannerCopy, page.bannerCopy),
    ctaLabel: pick(doc?.ctaLabel, page.ctaLabel),
    ctaLink: pick(doc?.ctaLink, page.ctaLink),
    image: doc?.bannerImage ?? null,
    imageAlt: doc?.bannerImageAlt ?? null,
    hotspot: doc?.bannerHotspot ?? null,
    overview: pick(doc?.overview, page.overview),
    listHeading: pick(doc?.listHeading, page.listHeading),
    cards: cards.length > 0 ? cards : page.cards,
    menuIcon: isExpertiseIcon(doc?.menuIcon) ? doc!.menuIcon! : page.menuIcon,
    focusHeading: pick(doc?.focusHeading, page.focusHeading),
    focusText: pick(doc?.focusText, page.focusText),
    seo: doc?.seo ?? null,
  };
}

/**
 * Base content for a page that exists only in Sanity (a brand-new expertise page): just the
 * name, a matching eyebrow and the contact button. Sections the editor leaves empty are hidden.
 */
export function genericExpertisePage(slug: string, label: string): ExpertisePage {
  return {
    slug,
    label,
    eyebrow: `OUR EXPERTISE · ${label.toUpperCase()}`,
    title: label,
    titleAccent: "",
    menuIcon: "leaf",
    bannerCopy: "",
    ctaLabel: "Contact Us",
    ctaLink: "/contact-us",
    overview: "",
    listHeading: "What We Cover",
    cards: [],
    focusHeading: "Craft & Finish Focus",
    focusText: "",
  };
}

/** One entry of the expertise menu / listing */
export type ExpertiseListItem = {
  slug: string;
  label: string;
  description: string;
  icon: string;
};

type ExpertiseListDoc = {
  slug?: string | null;
  menuName?: string | null;
  title?: string | null;
  bannerCopy?: string | null;
  menuIcon?: string | null;
};

/**
 * All expertise pages for menus and listings: the built-in five first (in their order, renamed
 * if the editor changed the menu name in Sanity), then any new page from Sanity (oldest first).
 */
export function buildExpertiseIndex(
  docs: ExpertiseListDoc[] | null | undefined,
): ExpertiseListItem[] {
  const bySlug = new Map<string, ExpertiseListDoc>();
  for (const d of docs ?? []) if (d?.slug?.trim()) bySlug.set(d.slug.trim(), d);

  const list: ExpertiseListItem[] = EXPERTISE_PAGES.map((p) => {
    const d = bySlug.get(p.slug);
    return {
      slug: p.slug,
      label: d?.menuName?.trim() || p.label,
      description: d?.bannerCopy?.trim() || p.bannerCopy,
      icon: isExpertiseIcon(d?.menuIcon) ? d!.menuIcon! : p.menuIcon,
    };
  });

  const known = new Set(EXPERTISE_PAGES.map((p) => p.slug));
  for (const [slug, d] of bySlug) {
    if (known.has(slug)) continue;
    const label = d.menuName?.trim() || d.title?.trim();
    if (!label) continue;
    list.push({
      slug,
      label,
      description: d.bannerCopy?.trim() ?? "",
      icon: isExpertiseIcon(d.menuIcon) ? d.menuIcon : "leaf",
    });
  }
  return list;
}

export type TitlePart = { text: string; gold: boolean };

/**
 * Banner heading as cream / gold pieces, so neither the heading nor the gold part is ever lost:
 * - gold part found inside the heading: that part is highlighted in place;
 * - gold part not in the heading: it is added after the heading, in gold;
 * - no gold part: the last two words are gold (the last word when the heading has two).
 */
export function titleParts(title: string, accent?: string | null): TitlePart[] {
  const t = title.trim();
  const a = accent?.trim();
  const keep = (parts: TitlePart[]) => parts.filter((p) => p.text.length > 0);

  if (a) {
    const i = t.toLowerCase().indexOf(a.toLowerCase());
    if (i >= 0) {
      return keep([
        { text: t.slice(0, i), gold: false },
        { text: t.slice(i, i + a.length), gold: true },
        { text: t.slice(i + a.length), gold: false },
      ]);
    }
    return keep([
      { text: t, gold: false },
      { text: t ? ` ${a}` : a, gold: true },
    ]);
  }

  const words = t.split(/\s+/).filter(Boolean);
  if (words.length < 2) return keep([{ text: t, gold: false }]);
  const tail = words.length > 2 ? 2 : 1;
  return keep([
    { text: words.slice(0, -tail).join(" ") + " ", gold: false },
    { text: words.slice(-tail).join(" "), gold: true },
  ]);
}

/**
 * The Footer document in Sanity may still hold the old link "/our-expertise" for every
 * item. When that happens, send each item to its own page (matched by label). Any other
 * link set in Sanity is left exactly as the editor typed it.
 */
export function resolveExpertiseHref(
  label?: string | null,
  url?: string | null,
) {
  const href = (url ?? "").trim();
  if (href !== "/our-expertise" && href !== "/our-expertise/") return href;
  const key = (label ?? "").trim().toLowerCase();
  const page = EXPERTISE_PAGES.find((p) => p.label.toLowerCase() === key);
  return page ? `/our-expertise/${page.slug}` : href;
}
