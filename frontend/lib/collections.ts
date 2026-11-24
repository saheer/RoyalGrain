// Shared by the /explore-collections page and the detail pages.

export type Hotspot = { x: number; y: number } | null | undefined;

export type CollectionMenuItem = {
  _id: string;
  title: string;
  slug: string;
  image?: string | null;
  imageAlt?: string | null;
};

export type CollectionCardData = CollectionMenuItem & {
  shortDescription?: string | null;
  features?: string[] | null;
  hotspot?: Hotspot;
  cardIcon?: string | null;
};

// Shown until collections are published in Sanity (cards link to a built-in detail page).
// Once at least one collection exists in Sanity, only the Sanity collections are shown.
export const FALLBACK_COLLECTIONS: CollectionCardData[] = [
  {
    _id: "fallback-main-doors",
    slug: "main-doors-entrance",
    title: "Main Doors & Entrance",
    shortDescription:
      "Solid teakwood main doors, frames, and architectural entryways crafted for strength, security, and first impressions.",
    cardIcon: "door",
  },
  {
    _id: "fallback-wardrobes",
    slug: "teakwood-wardrobes-storage",
    title: "Teakwood Wardrobes & Storage",
    shortDescription:
      "Custom-built wardrobes, loft units, and integrated dressing spaces planned for clean, clutter-free rooms.",
    cardIcon: "wardrobe",
  },
  {
    _id: "fallback-beds",
    slug: "teakwood-designer-beds",
    title: "Teakwood Designer Beds",
    shortDescription:
      "Sturdy solid wood beds with upholstered or paneled headboards for everyday comfort and lasting support.",
    cardIcon: "bed",
  },
  {
    _id: "fallback-unjals",
    slug: "traditional-unjals-decor",
    title: "Traditional Unjals & Decor",
    shortDescription:
      "Classic wooden swings and handcrafted accents inspired by timeless Malabar aesthetics and warm hospitality.",
    cardIcon: "swing",
  },
  {
    _id: "fallback-center-tables",
    slug: "center-tables-living-accents",
    title: "Center Tables & Living Accents",
    shortDescription:
      "Sculpted solid teakwood coffee and center tables that anchor living spaces with natural grain character.",
    cardIcon: "table",
  },
];

export const fallbackCollection = (slug: string) =>
  FALLBACK_COLLECTIONS.find((c) => c.slug === slug) ?? null;


// Sanity hotspot -> CSS object-position, so the chosen focal point survives cropping
export function hotspotStyle(h: Hotspot) {
  return h ? { objectPosition: `${h.x * 100}% ${h.y * 100}%` } : undefined;
}