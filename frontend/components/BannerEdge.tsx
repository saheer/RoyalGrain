// Soft wave at the bottom of every page banner (same shape as the Explore Collections banner).
// `color` must be the background of the section that follows the banner, so the wave blends in.
export default function BannerEdge({ color = "#FEF8F0" }: { color?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 48"
      preserveAspectRatio="none"
      style={{ color }}
      className="pointer-events-none absolute inset-x-0 -bottom-px z-10 block h-8 w-full sm:h-10 lg:h-12"
    >
      <path
        fill="currentColor"
        d="M0 48V27C260 10 520 2 790 2c280 0 450 17 650 29v17z"
      />
    </svg>
  );
}
