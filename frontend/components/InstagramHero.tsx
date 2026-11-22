import Image from "next/image";
import { playfair } from "@/app/fonts";

type Props = {
  eyebrow?: string | null;
  headingWhite?: string | null;
  headingBlue?: string | null;
  description?: string | null;
  image?: string | null;
  imageAlt?: string | null;
  hotspot?: { x: number; y: number } | null;
};

export default function InstagramHero({
  eyebrow,
  headingWhite,
  headingBlue,
  description,
  image,
  imageAlt,
  hotspot,
}: Props) {
  const objectPosition = hotspot
    ? `${hotspot.x * 100}% ${hotspot.y * 100}%`
    : undefined;

  return (
    <section className="relative isolate flex min-h-[560px] items-center overflow-hidden bg-[#2F1200] lg:min-h-[640px]">
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
      {/* deep wood-brown tint so the light text always stays readable */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#2F1200]/95 via-[#2F1200]/85 to-[#2F1200]/60" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-t from-[#2F1200]/70 to-transparent" />
      {/* no photo set: a soft warm glow keeps the banner from looking flat */}
      {!image && (
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(70%_90%_at_85%_20%,rgba(214,137,33,0.22)_0%,transparent_65%)]"
        />
      )}

      <div className="mx-auto w-full max-w-[1338px] px-6 pb-20 pt-40 lg:px-12">
        {eyebrow && (
          <p className="animate-fade-up text-xs font-semibold uppercase tracking-[0.25em] text-brand-gold motion-reduce:animate-none">
            {eyebrow}
          </p>
        )}

        <h1
          style={{ animationDelay: "100ms" }}
          className={`${playfair.className} mt-8 max-w-[11em] animate-fade-up text-5xl font-bold leading-[1.08] tracking-[-0.01em] text-[#f2e9dd] motion-reduce:animate-none sm:text-6xl lg:text-[4.5rem]`}
        >
          {headingWhite}
          {headingBlue && (
            <span className="block text-brand-gold">{headingBlue}</span>
          )}
        </h1>

        {description && (
          <p
            style={{ animationDelay: "250ms" }}
            className="mt-8 max-w-[640px] animate-fade-up text-base leading-[1.75] text-[#f2e9dd]/85 motion-reduce:animate-none"
          >
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
