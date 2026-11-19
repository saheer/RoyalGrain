import Image from "next/image";
import { manrope } from "@/app/fonts";
import type { InstagramTile } from "@/lib/instagram";

type Props = {
  eyebrow?: string | null;
  heading?: string | null;
  description?: string | null;
  tiles: (InstagramTile & { hotspot?: { x: number; y: number } | null })[];
  profileUrl?: string | null;
  handle?: string | null;
  followLabel?: string | null;
};

// Corner badge of a reel: the Instagram "reel" glyph (a rounded square with a play
// triangle) on a soft dark pill, like on Instagram itself.
function ReelBadge() {
  return (
    <span
      aria-hidden="true"
      className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#301200]/60 text-[#f2e9dd] backdrop-blur-sm"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-[18px] w-[18px]"
      >
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <path d="M3.5 8.5h17M8.5 3.2l3 5.3M14.5 3.2l3 5.3" />
        <path d="m10.5 12.6 4 2.4-4 2.4z" fill="currentColor" stroke="none" />
      </svg>
    </span>
  );
}

// Big play button in the middle of a reel: appears on hover / keyboard focus
function PlayCircle() {
  return (
    <span
      aria-hidden="true"
      className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 scale-75 items-center justify-center rounded-full bg-[#301200]/55 text-[#f2e9dd] opacity-0 backdrop-blur-sm transition duration-300 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100 motion-reduce:transition-none"
    >
      <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7 fill-current">
        <path d="M8 5v14l11-7z" />
      </svg>
    </span>
  );
}

function InstagramIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5 fill-none stroke-current"
      strokeWidth="1.8"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.9" className="fill-current stroke-none" />
    </svg>
  );
}

export default function InstagramGrid({
  eyebrow,
  heading,
  description,
  tiles,
  profileUrl,
  handle,
  followLabel,
}: Props) {
  const items = tiles.filter((t) => t?.imageUrl);

  return (
    <section
      aria-labelledby="instagram-feed-heading"
      className="bg-white py-16 lg:py-24"
    >
      <div className="mx-auto max-w-[1338px] px-6 lg:px-12">
        {/* Section header */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div>
            {eyebrow && (
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-gold">
                {eyebrow}
              </p>
            )}
            {heading && (
              <h2
                id="instagram-feed-heading"
                className={`${manrope.className} mt-4 whitespace-pre-line text-4xl font-bold leading-[1.1] tracking-tight text-[#2F1200] lg:text-[3.25rem]`}
              >
                {heading}
              </h2>
            )}
          </div>
          {description && (
            <p className="max-w-sm text-sm leading-relaxed text-[#432115] lg:pb-2">
              {description}
            </p>
          )}
        </div>

        {/* Posts: a real grid (not CSS columns, which left the 4th column empty), so the
            cards fill each row left to right, newest first: 4 per row on laptop and
            desktop, 2 on tablet and mobile. Reels keep 9:16, photos 4:5. */}
        {items.length > 0 ? (
          <ul className="mt-12 grid grid-cols-2 items-start gap-4 lg:mt-16 lg:grid-cols-4 lg:gap-6">
            {items.map((tile, index) => {
              const href = tile.permalink || profileUrl || undefined;
              const isReel = !!tile.isVideo;
              const label = tile.caption
                ? tile.caption.slice(0, 120)
                : isReel
                  ? "Watch this reel on Instagram"
                  : "View this photo on Instagram";
              const isSanity = tile.imageUrl.startsWith(
                "https://cdn.sanity.io/",
              );
              const objectPosition = tile.hotspot
                ? `${tile.hotspot.x * 100}% ${tile.hotspot.y * 100}%`
                : undefined;
              const imgCls =
                "object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05] motion-reduce:transition-none";
              return (
                <li key={tile.id}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={isReel ? `${label} (reel)` : label}
                    className={`group relative block overflow-hidden rounded-2xl bg-[#301200]/10 shadow-[0_18px_36px_-24px_rgba(48,18,0,0.45)] ring-1 ring-[#301200]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-gold ${
                      isReel ? "aspect-[9/16]" : "aspect-[4/5]"
                    }`}
                  >
                    {isSanity ? (
                      <Image
                        src={tile.imageUrl}
                        alt={tile.alt || ""}
                        fill
                        loading={index < 4 ? "eager" : "lazy"}
                        sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                        style={{ objectPosition }}
                        className={imgCls}
                      />
                    ) : (
                      // Instagram CDN images are signed URLs: shown as-is (not
                      // routed through the Sanity image loader).
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={tile.imageUrl}
                        alt={tile.alt || tile.caption?.slice(0, 100) || ""}
                        loading={index < 4 ? "eager" : "lazy"}
                        referrerPolicy="no-referrer"
                        style={{ objectPosition }}
                        className={`absolute inset-0 h-full w-full ${imgCls}`}
                      />
                    )}

                    {isReel && <ReelBadge />}

                    {/* Hover / focus overlay: soft dark gradient, caption, "View on Instagram" */}
                    <span className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-[#301200]/90 via-[#301200]/25 to-transparent p-4 pt-16 text-[#f2e9dd] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none">
                      {tile.caption && (
                        <span className="line-clamp-3 text-xs leading-relaxed">
                          {tile.caption}
                        </span>
                      )}
                      <span className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-gold">
                        <span className="[&>svg]:h-4 [&>svg]:w-4">
                          <InstagramIcon />
                        </span>
                        {isReel ? "Watch reel" : "View on Instagram"}
                      </span>
                    </span>

                    {isReel && <PlayCircle />}
                  </a>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="mt-12 text-[15px] leading-[1.7] text-[#432115] lg:mt-16">
            Our latest photos and reels will appear here soon.
          </p>
        )}

        {/* Link back to the Instagram profile */}
        {profileUrl && (
          <div className="mt-12 flex flex-col items-center gap-3 lg:mt-16">
            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#301200] px-7 py-3.5 text-sm font-semibold text-[#f2e9dd] transition-colors hover:bg-[#432115] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
            >
              <InstagramIcon />
              {followLabel || "Follow us on Instagram"}
            </a>
            {handle && <p className="text-sm text-[#432115]">{handle}</p>}
          </div>
        )}
      </div>
    </section>
  );
}
