// The five "Our Expertise" items listed in the footer. Each one has its own simple
// page at /our-expertise/<slug> (placeholder shell for now; detailed content comes later).

export type ExpertisePage = {
  slug: string;
  /** Exact label used in the footer (also matched against the Footer document in Sanity) */
  label: string;
  headingWhite: string;
  headingBlue: string;
  description: string;
};

export const EXPERTISE_PAGES: ExpertisePage[] = [
  {
    slug: "custom-furniture",
    label: "Custom Furniture",
    headingWhite: "Custom",
    headingBlue: "Furniture",
    description:
      "Made-to-measure solid teakwood furniture, designed around your space and finished with traditional craftsmanship.",
  },
  {
    slug: "interior-woodwork",
    label: "Interior Woodwork",
    headingWhite: "Interior",
    headingBlue: "Woodwork",
    description:
      "Doors, panelling, wardrobes and fitted woodwork in solid teakwood, built to last and made to blend into your interiors.",
  },
  {
    slug: "bespoke-interiors",
    label: "Bespoke Interiors",
    headingWhite: "Bespoke",
    headingBlue: "Interiors",
    description:
      "Tailor-made interior solutions, planned from the first sketch to the final finish around the way you live.",
  },
  {
    slug: "residential-interiors",
    label: "Residential Interiors",
    headingWhite: "Residential",
    headingBlue: "Interiors",
    description:
      "Warm, lasting teakwood interiors for homes: living rooms, bedrooms, dining spaces and entrances.",
  },
  {
    slug: "commercial-interiors",
    label: "Commercial Interiors",
    headingWhite: "Commercial",
    headingBlue: "Interiors",
    description:
      "Refined woodwork and interior fit-outs for offices, showrooms and other commercial spaces.",
  },
];

export function getExpertisePage(slug: string) {
  return EXPERTISE_PAGES.find((p) => p.slug === slug) ?? null;
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
