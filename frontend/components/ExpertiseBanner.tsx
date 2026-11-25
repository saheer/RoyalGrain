import Image from "next/image";
import { playfair } from "@/app/fonts";
import BannerEdge, { BANNER_MIN_H } from "@/components/BannerEdge";
import { ArrowIcon, SmartLink } from "@/components/FeaturedParts";
import { titleParts } from "@/lib/expertisePages";

type Props = {
  eyebrow: string;
  title: string;
  titleAccent?: string | null;
  copy: string;
  ctaLabel: string;
  ctaLink: string;
  image?: string | null;
  imageAlt?: string | null;
  hotspot?: { x: number; y: number } | null;
  edgeColor?: string;
};

// Banner of the /our-expertise/<slug> pages: photo on the right, text on the left over a dark
// teakwood fade, gold eyebrow, serif two-tone heading, short copy and an outlined pill button.
// Photo = Sanity > Expertise Pages > Banner image (optional: without it a warm glow is shown).
export default function ExpertiseBanner({
  eyebrow,
  title,
  titleAccent,
  copy,
  ctaLabel,
  ctaLink,
  image,
  imageAlt,
  hotspot,
  edgeColor = "#FEF8F0",
}: Props) {
  const parts = titleParts(title, titleAccent);
  const objectPosition = hotspot
    ? `${hotspot.x * 100}% ${hotspot.y * 100}%`
    : undefined;

  return (
    <section className={`relative isolate flex ${BANNER_MIN_H} items-center overflow-hidden bg-[#280F01]`}>
      {image && (
        <Image
          src={image}
          alt={imageAlt || ""}
          fill
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
          style={{ objectPosition }}
          className="-z-10 object-cover"
        />
      )}
      {/* dark teakwood fade: strong behind the text, light over the photo on the right */}
      <div className="absolute inset-0 -z-10 bg-[#280F01]/55 lg:bg-transparent" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#280F01]/90 via-[#280F01]/55 to-[#280F01]/5" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-1/4 bg-gradient-to-t from-[#280F01]/70 to-transparent" />
      {!image && (
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(70%_90%_at_85%_20%,rgba(214,137,33,0.22)_0%,transparent_65%)]"
        />
      )}

      <div className="mx-auto w-full max-w-[1338px] px-6 pb-14 pt-36 lg:px-12 lg:pb-20 lg:pt-44">
        <p className="animate-fade-up break-words text-xs font-semibold uppercase tracking-[0.25em] text-brand-gold motion-reduce:animate-none">
          {eyebrow}
        </p>
        <span aria-hidden className="mt-4 block h-0.5 w-14 bg-[#D68921]" />

        <h1
          style={{ animationDelay: "100ms" }}
          className={`${playfair.className} mt-6 max-w-[15em] animate-fade-up break-words text-4xl font-bold leading-[1.1] tracking-[-0.01em] text-[#F4ECDD] motion-reduce:animate-none sm:text-5xl lg:text-[4.25rem]`}
        >
          {parts.map((p, i) =>
            p.gold ? (
              <span key={i} className="text-brand-gold">
                {p.text}
              </span>
            ) : (
              <span key={i}>{p.text}</span>
            ),
          )}
        </h1>

        {copy && (
          <p
            style={{ animationDelay: "250ms" }}
            className="mt-6 max-w-[560px] animate-fade-up text-base leading-[1.75] text-[#f2e9dd]/90 motion-reduce:animate-none"
          >
            {copy}
          </p>
        )}

        <div
          style={{ animationDelay: "350ms" }}
          className="mt-9 animate-fade-up motion-reduce:animate-none"
        >
          <SmartLink
            href={ctaLink}
            className="group/cta inline-flex max-w-full items-center gap-2.5 rounded-full border border-[#F4ECDD]/60 bg-[#280F01]/40 px-7 py-3 text-sm font-semibold text-[#F4ECDD] backdrop-blur-[2px] transition-colors duration-300 hover:border-[#D68921] hover:bg-[#D68921] hover:text-[#2F1200] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D68921]"
          >
            {ctaLabel}
            <ArrowIcon className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover/cta:translate-x-1 motion-reduce:transition-none" />
          </SmartLink>
        </div>
      </div>
      <BannerEdge color={edgeColor} />
    </section>
  );
}
