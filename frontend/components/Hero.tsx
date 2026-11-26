import Link from "next/link";
import { playfair } from "@/app/fonts";
import BannerEdge from "@/components/BannerEdge";

type Hotspot = { x: number; y: number } | null | undefined;

type HeroProps = {
  heroHeadingWhite: string;
  heroHeadingBlue: string;
  heroDescription?: string[] | null;
  heroButtonText?: string | null;
  heroButtonLink?: string | null;
  heroBackground?: string | null;
  heroBackgroundAlt?: string | null;
  heroHotspot?: Hotspot;
  /** Optional portrait photo for phones (Sanity: Home Page > Hero Banner > Mobile background image) */
  heroMobileBackground?: string | null;
  heroMobileHotspot?: Hotspot;
  edgeColor?: string;
};

const DESKTOP_WIDTHS = [1080, 1440, 1920, 2560];
const MOBILE_WIDTHS = [480, 640, 828, 1080];
const isSanity = (u: string) => u.startsWith("https://cdn.sanity.io/");

// Sanity's image CDN resizes, compresses (WebP/AVIF) and can crop around a focal point,
// so the browser only downloads what the screen needs.
function srcSet(
  url: string,
  widths: number[],
  opts: { ratio?: number; hotspot?: Hotspot } = {},
) {
  if (!isSanity(url) || /\.svg(\?|$)/i.test(url)) return undefined;
  return widths
    .map((w) => {
      const u = new URL(url);
      u.searchParams.set("w", String(w));
      u.searchParams.set("q", "60");
      u.searchParams.set("auto", "format");
      if (opts.ratio) {
        u.searchParams.set("h", String(Math.round(w * opts.ratio)));
        u.searchParams.set("fit", "crop");
        u.searchParams.set("crop", "focalpoint");
        u.searchParams.set("fp-x", String(opts.hotspot?.x ?? 0.5));
        u.searchParams.set("fp-y", String(opts.hotspot?.y ?? 0.5));
      }
      return `${u.toString()} ${w}w`;
    })
    .join(", ");
}

const pos = (h: Hotspot) =>
  h ? { objectPosition: `${h.x * 100}% ${h.y * 100}%` } : undefined;

export default function Hero({
  heroHeadingWhite,
  heroHeadingBlue,
  heroDescription,
  heroButtonText,
  heroButtonLink,
  heroBackground,
  heroBackgroundAlt,
  heroHotspot,
  heroMobileBackground,
  heroMobileHotspot,
  edgeColor = "#FEF8F0",
}: HeroProps) {
  // Strip any trailing arrow typed in the CMS so only one "→" ever shows
  const buttonLabel = heroButtonText?.replace(/\s*[→➔➜]+\s*$/u, "").trim();

  // Art direction: phones get a portrait picture (the uploaded mobile image, or the desktop one
  // cropped around its hotspot); tablets and up get the wide picture. Only one is downloaded.
  const mobileUrl = heroMobileBackground || heroBackground;
  const mobileSet = mobileUrl
    ? srcSet(
        mobileUrl,
        MOBILE_WIDTHS,
        heroMobileBackground
          ? {}
          : { ratio: 2, hotspot: heroHotspot },
      )
    : undefined;
  const desktopSet = heroBackground
    ? srcSet(heroBackground, DESKTOP_WIDTHS)
    : undefined;
  const mobilePos = heroMobileBackground ? heroMobileHotspot : heroHotspot;

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-[#2F1200]">
      {mobileUrl && (
        <picture>
          {desktopSet && (
            <source media="(min-width: 768px)" srcSet={desktopSet} sizes="100vw" />
          )}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={mobileUrl}
            srcSet={mobileSet}
            sizes="100vw"
            alt={heroBackgroundAlt || ""}
            fetchPriority="high"
            decoding="async"
            style={pos(mobilePos)}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </picture>
      )}
      {/* deep wood-brown tint: even on phones (the text sits over the whole photo), left-to-right from tablet up */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2F1200]/55 via-[#2F1200]/65 to-[#2F1200]/80 md:bg-gradient-to-r md:from-[#2F1200]/95 md:via-[#2F1200]/65 md:to-[#2F1200]/20" />
      <div className="absolute inset-x-0 bottom-0 hidden h-1/3 bg-gradient-to-t from-[#2F1200]/70 to-transparent md:block" />
      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 pb-24 pt-36 md:pb-16 md:pt-40 lg:px-12">
        <span aria-hidden className="mb-7 block h-[3px] w-14 rounded-full bg-[#D68921]" />
        <h1
          style={{ animationDelay: "0ms" }}
          className={`${playfair.className} animate-fade-up motion-reduce:animate-none max-w-4xl text-4xl font-bold leading-[1.05] tracking-tight text-[#f2e9dd] sm:text-6xl lg:text-[4.6rem]`}
        >
          {heroHeadingWhite}
          <span className="block text-brand-gold">{heroHeadingBlue}</span>
        </h1>

        <div
          style={{ animationDelay: "200ms" }}
          className="w-full max-w-[640px] animate-fade-up motion-reduce:animate-none mt-6 max-w-5xl space-y-3 md:mt-10 md:space-y-4 text-base leading-relaxed lg:text-xl lg:leading-[1.5]"
        >
          {(heroDescription ?? []).map((p, i) => (
            <p
              key={i}
              className={i === 0 ? "text-[#f2e9dd]" : "text-[#f2e9dd]"}
            >
              {p}
            </p>
          ))}
        </div>

        {buttonLabel && (
          <Link
            href={heroButtonLink || "/about-us"}
            style={{ animationDelay: "400ms" }}
            className="animate-fade-up motion-reduce:animate-none text-[#f2e9dd] relative isolate mt-9 inline-flex md:mt-12 items-center overflow-hidden rounded-full border border-white/70 px-9 py-4 text-base font-semibold  transition-[border-color] duration-300 ease-out before:absolute before:inset-0 before:-z-10 before:origin-left before:scale-x-0 before:bg-[#D68921] before:transition-transform before:duration-300 before:ease-out hover:border-transparent hover:before:scale-x-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-400"
          >
            {buttonLabel} →
          </Link>
        )}
      </div>
      <BannerEdge color={edgeColor} />
    </section>
  );
}
