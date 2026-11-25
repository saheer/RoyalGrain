// Same banner height on every page except Home (Explore Collections is the reference).
export const BANNER_MIN_H = "min-h-[600px] lg:min-h-[670px]";

// Soft wave at the bottom of every page banner (same shape as the Explore Collections banner).
// `color` must be the background of the section that follows the banner, so the wave blends in.
export default function BannerEdge({ color = "#FEF8F0" }: { color?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 60"
      preserveAspectRatio="none"
      style={{ color }}
      className="pointer-events-none absolute inset-x-0 -bottom-px z-10 block h-8 w-full lg:h-14"
    >
      <path
        fill="currentColor"
        d="M0 60V32C240 4 480 0 720 18s480 30 720 4v38z"
      />
    </svg>
  );
}
