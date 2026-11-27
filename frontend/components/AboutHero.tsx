import Image from "next/image";
import Link from "next/link";
import { playfair } from "@/app/fonts";
import BannerEdge, { BANNER_MIN_H } from "@/components/BannerEdge";

type Props = {
  headingWhite?: string | null;
  headingBlue?: string | null;
  description?: string | null;
  buttonText?: string | null;
  buttonLink?: string | null;
  image?: string | null;
  imageAlt?: string | null;
  hotspot?: { x: number; y: number } | null;
  edgeColor?: string; // background of the section below the banner
  crumb?: string; // last item of the mobile breadcrumb: Home > crumb
};

export default function AboutHero({
  headingWhite,
  headingBlue,
  description,
  buttonText,
  buttonLink,
  image,
  imageAlt,
  hotspot,
  edgeColor = "#FEF8F0",
  crumb = "About Us",
}: Props) {
  // Strip any trailing arrow typed in the CMS so only one "→" ever shows
  const label = buttonText?.replace(/\s*[→➔➜]+\s*$/u, "").trim();
  const objectPosition = hotspot
    ? `${hotspot.x * 100}% ${hotspot.y * 100}%`
    : undefined;

  return (
    <section className={`relative isolate flex ${BANNER_MIN_H} items-center overflow-hidden bg-[#2F1200]`}>
      {image && (
        <Image
          src={image}
          alt={imageAlt || ""}
          fill
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
          style={{ objectPosition }}
          className="object-cover"
        />
      )}
      {/* deep wood-brown tint */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#2F1200]/95 via-[#2F1200]/65 to-[#2F1200]/20" />

      <div className="relative z-10 mx-auto w-full max-w-[1338px] px-6 pb-24 pt-[7.4rem] md:pt-40 lg:px-12">
        {/* Phones: breadcrumb with the accent bar below it. Tablet and up: the bar alone, as before. */}
        <div className="md:hidden">
          <nav aria-label="Breadcrumb" className="flex items-center gap-3 text-base text-[#f2e9dd]">
            <Link
              href="/"
              className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-400"
            >
              Home
            </Link>
            <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4 text-[#D68921]" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 6l6 6-6 6" />
            </svg>
            <span aria-current="page">{crumb}</span>
          </nav>
          <span aria-hidden className="mb-7 mt-4 block h-[3px] w-14 rounded-full bg-[#D68921]" />
        </div>
        <span aria-hidden className="mb-7 hidden h-[3px] w-14 rounded-full bg-[#D68921] md:block" />
        <h1
          className={`${playfair.className} animate-fade-up text-5xl font-bold leading-[1.1] tracking-[-0.01em] text-[#f2e9dd] motion-reduce:animate-none sm:text-6xl lg:text-[4.25rem]`}
        >
          {/* the white part wraps like the design ("Intelligence That / Protects") */}
          <span className="block max-w-[10.5em]">{headingWhite}</span>
          <span className="block text-brand-gold">{headingBlue}</span>
        </h1>

        {description && (
          <p
            style={{ animationDelay: "150ms" }}
            className="mt-8 max-w-[640px] animate-fade-up text-base leading-[1.75] text-[#f2e9dd]/85 motion-reduce:animate-none"
          >
            {description}
          </p>
        )}

        {label && (
          <Link
            href={buttonLink || "#our-journey"}
            style={{ animationDelay: "300ms" }}
            className="relative isolate mt-10 inline-flex animate-fade-up items-center overflow-hidden rounded-full border border-white/70 px-7 py-3.5 text-sm font-semibold text-[#f2e9dd] transition-[border-color] duration-300 ease-out before:absolute before:inset-0 before:-z-10 before:origin-left before:scale-x-0 before:bg-brand-bronze before:transition-transform before:duration-300 before:ease-out hover:border-transparent hover:before:scale-x-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-400 motion-reduce:animate-none"
          >
            {label} →
          </Link>
        )}
      </div>

      <BannerEdge color={edgeColor} />
    </section>
  );
}
