import type { ReactNode } from "react";
import { isExpertiseIcon } from "@/lib/expertiseIcons";

// Line icons, 24x24, drawn in the current text colour. Keys = lib/expertiseIcons.ts and the
// "Icon" dropdowns in Sanity.
const ICONS: Record<string, ReactNode> = {
  table: (<><rect x="3" y="6" width="18" height="3.5" rx="1" /><path d="M6 9.5V19M18 9.5V19M6 14h12" /></>),
  chair: (<><path d="M6 11V8a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v3" /><path d="M4 12a2 2 0 0 1 4 0v3h8v-3a2 2 0 0 1 4 0v5H4z" /><path d="M6 17v3M18 17v3" /></>),
  sofa: (<><path d="M5 11V8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3" /><path d="M3 13a2 2 0 0 1 4 0v2h10v-2a2 2 0 0 1 4 0v4H3z" /><path d="M6 17v2M18 17v2" /></>),
  bed: (<><path d="M3 18V7M3 14h18v4M21 14v-2a3 3 0 0 0-3-3h-7v5" /><circle cx="7" cy="11" r="1.8" /></>),
  shelf: (<><rect x="4" y="3" width="16" height="18" rx="1.5" /><path d="M4 9h16M4 15h16M8 5.5V7M12 11.5V13M9 17v2" /></>),
  wardrobe: (<><rect x="4" y="2.5" width="16" height="18" rx="1.5" /><path d="M12 2.5v18M6 20.5V22M18 20.5V22" /><circle cx="10" cy="12" r="0.7" /><circle cx="14" cy="12" r="0.7" /></>),
  kitchen: (<><rect x="3" y="3" width="18" height="18" rx="1.5" /><path d="M3 12h18M12 3v18M9 8v1M15 8v1M9 15v1M15 15v1" /></>),
  lamp: (<><path d="M12 3c2 3 3 4.5 3 6.5a3 3 0 0 1-6 0C9 7.5 10 6 12 3z" /><path d="M5 14h14l-1.5 5a2 2 0 0 1-2 1.5h-7a2 2 0 0 1-2-1.5z" /></>),
  door: (<><rect x="5" y="2.5" width="14" height="19" rx="1.5" /><path d="M9 7h6M9 17h6" /><circle cx="15.5" cy="12" r="0.9" /></>),
  swing: (<><path d="M5 3v18M19 3v18M5 4h14" /><path d="M7 14h10v2.5H7z" /><path d="M8 4.5V14M16 4.5V14" /></>),
  panel: (<><rect x="3" y="4" width="18" height="16" rx="1.5" /><path d="M8 4v16M12 4v16M16 4v16" /></>),
  beams: (<><rect x="3" y="5" width="18" height="4" rx="1" /><path d="M7 9v10M17 9v10M5 19h4M15 19h4" /></>),
  niche: (<><rect x="4" y="3" width="16" height="18" rx="1.5" /><path d="M8 17v-6a4 4 0 0 1 8 0v6z" /></>),
  ruler: (<><path d="M3 17 17 3l4 4L7 21z" /><path d="m7 13 2 2M10 10l2 2M13 7l2 2" /></>),
  compass: (<><circle cx="12" cy="12" r="9" /><path d="m16 8-2 6-6 2 2-6z" /></>),
  palette: (<><path d="M12 3a9 9 0 1 0 0 18c1.2 0 2-.8 2-1.8 0-.5-.2-.9-.5-1.3-.3-.4-.5-.8-.5-1.3 0-1 .8-1.6 1.8-1.6H17a4 4 0 0 0 4-4c0-4.4-4-8-9-8z" /><circle cx="7.5" cy="11" r="0.8" /><circle cx="10" cy="7" r="0.8" /><circle cx="15" cy="7" r="0.8" /></>),
  sparkle: (<><path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" /><path d="m19 16 .8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z" /></>),
  office: (<><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18" /></>),
  reception: (<><path d="M3 20h18M5 20V10h14v10M3 10h18" /><path d="M9 6h6" /></>),
  shop: (<><path d="m4 9 1.5-5h13L20 9" /><path d="M4 9a2.7 2.7 0 0 0 5.3 0 2.7 2.7 0 0 0 5.4 0A2.7 2.7 0 0 0 20 9" /><path d="M5 12v8h14v-8M10 20v-5h4v5" /></>),
  building: (<><rect x="5" y="3" width="14" height="18" rx="1" /><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2M11 21v-3h2v3" /></>),
  home: (<><path d="m3 11 9-8 9 8" /><path d="M5 10v10h5v-6h4v6h5V10" /></>),
  leaf: (<><path d="M5 21c0-9 5-15 15-16 0 10-6 15-14 15" /><path d="M5 21c3-6 6-9 11-11" /></>),
  award: (<><circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" /></>),
  star: (<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z" />),
  check: (<path d="m5 12 4.5 4.5L19 7" />),
};

export default function ExpertiseIcon({
  name,
  className = "h-7 w-7",
}: {
  name?: string | null;
  className?: string;
}) {
  const key = isExpertiseIcon(name) ? name : "leaf";
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      {ICONS[key]}
    </svg>
  );
}
