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
};


// Sanity hotspot -> CSS object-position, so the chosen focal point survives cropping
export function hotspotStyle(h: Hotspot) {
  return h ? { objectPosition: `${h.x * 100}% ${h.y * 100}%` } : undefined;
}