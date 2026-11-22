// Icon names for the Our Expertise sub-pages. The drawings live in
// components/ExpertiseIcon.tsx; the same names are the options of the "Icon" dropdowns in
// Sanity (studio/schemaTypes/expertisePage.ts). To add one: draw it in ExpertiseIcon.tsx, then
// add it to the dropdown list in both schemaTypes folders.

export const EXPERTISE_ICON_KEYS = [
  "table", "chair", "sofa", "bed", "shelf", "wardrobe", "kitchen", "lamp",
  "door", "panel", "beams", "niche", "ruler", "compass", "palette", "sparkle",
  "office", "reception", "shop", "building", "home", "leaf", "award", "star", "check",
] as const;

export type ExpertiseIconKey = (typeof EXPERTISE_ICON_KEYS)[number];

export const isExpertiseIcon = (v?: string | null): v is ExpertiseIconKey =>
  !!v && (EXPERTISE_ICON_KEYS as readonly string[]).includes(v);

// Used only for older content that is plain text (no icon chosen): pick a fitting icon from the
// words of the item. First match wins, so the order matters.
const GUESSES: [RegExp, ExpertiseIconKey][] = [
  [/kitchen|pantry|crockery/i, "kitchen"],
  [/wardrobe|dressing/i, "wardrobe"],
  [/reception|waiting|display wall/i, "reception"],
  [/bed|nightstand/i, "bed"],
  [/chair|lounge chair|seating/i, "chair"],
  [/living|family|sofa/i, "sofa"],
  [/dining|table|bench|sideboard/i, "table"],
  [/desk|bookshel|study/i, "shelf"],
  [/pooja|foyer|utility/i, "lamp"],
  [/door|frame/i, "door"],
  [/panel|slat|wainscot/i, "panel"],
  [/ceiling|beam|architrave/i, "beams"],
  [/niche|partition|millwork|built-in/i, "niche"],
  [/plan|concept|spatial|direction/i, "compass"],
  [/palette|material|stone|fabric|lighting/i, "palette"],
  [/statement|one-off|personal|detailing/i, "sparkle"],
  [/retail|showroom|boutique|showcase/i, "shop"],
  [/executive|cabin|meeting|office/i, "office"],
  [/studio|clinic|hospitality/i, "building"],
  [/joinery|storage/i, "ruler"],
];

export function guessExpertiseIcon(text: string): ExpertiseIconKey {
  return GUESSES.find(([re]) => re.test(text))?.[1] ?? "leaf";
}
