import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { manrope } from "@/app/fonts";

// Small building blocks shared by FeaturedCollectionSection (server) and
// FeaturedCollectionSlider (client). No hooks in here, so both can import it.

export type FeaturedCardData = {
  _key?: string | null;
  title?: string | null;
  subtitle?: string | null;
  link?: string | null;
  image?: string | null;
  hotspot?: { x: number; y: number } | null;
};

export const DEFAULT_LINK = "/explore-collections";

// Site pages use next/link; full https:// addresses open in a new tab
export function SmartLink({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: ReactNode;
}) {
  if (/^https?:/i.test(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export const ArrowIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg
    aria-hidden
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
  </svg>
);

// One card: square image, title + subtitle, round arrow badge. The whole card is a link.
export function FeaturedCard({
  card,
  eager = false,
}: {
  card: FeaturedCardData;
  eager?: boolean;
}) {
  return (
    <SmartLink
      href={card.link?.trim() || DEFAULT_LINK}
      className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D68921]"
    >
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-[#2F1200]/10 shadow-[0_18px_36px_-22px_rgba(47,18,0,0.4)]">
        <Image
          src={card.image as string}
          alt=""
          fill
          loading={eager ? "eager" : "lazy"}
          sizes="(min-width: 1024px) 28vw, (min-width: 768px) 45vw, 90vw"
          style={
            card.hotspot
              ? { objectPosition: `${card.hotspot.x * 100}% ${card.hotspot.y * 100}%` }
              : undefined
          }
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none"
        />
      </div>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3
            className={`${manrope.className} text-[17px] font-semibold leading-snug text-[#2F1200]`}
          >
            {card.title}
          </h3>
          {card.subtitle && (
            <p className="mt-1 text-sm leading-snug text-[#432115]/70">{card.subtitle}</p>
          )}
        </div>
        <span
          aria-hidden
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#D68921]/70 text-[#D68921] transition-[background-color,border-color,color] duration-300 group-hover:border-[#2F1200] group-hover:bg-[#2F1200] group-hover:text-[#f2e9dd] motion-reduce:transition-none"
        >
          <ArrowIcon />
        </span>
      </div>
    </SmartLink>
  );
}
