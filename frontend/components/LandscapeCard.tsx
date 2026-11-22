import Image from "next/image";
import { playfair } from "@/app/fonts";
import { ArrowIcon, SmartLink } from "./FeaturedParts";

export type LandscapeCardData = {
  _key: string;
  title: string;
  description: string;
  image: string;
  hotspot?: { x: number; y: number } | null;
  link?: string | null;
};

type Props = {
  card: LandscapeCardData;
  className?: string; // extra classes (the slider uses it for the slide width)
  eager?: boolean;
  sizes?: string;
};

const DEFAULT_LINK = "/explore-collections";

// One portrait card: photo, dark brown gradient, white title + description and a round
// gold arrow at the bottom right. The whole card is a link. Shared by the grid and the
// slider so both always look identical.
export default function LandscapeCard({
  card,
  className = "",
  eager = true,
  sizes = "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw",
}: Props) {
  return (
    <SmartLink
      href={card.link?.trim() || DEFAULT_LINK}
      className={`group relative isolate block aspect-[3/4] overflow-hidden rounded-2xl bg-[#280F01] shadow-[0_24px_48px_-28px_rgba(47,18,0,0.55)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D68921] ${className}`}
    >
      <Image
        src={card.image}
        alt=""
        fill
        loading={eager ? "eager" : "lazy"}
        sizes={sizes}
        style={
          card.hotspot
            ? {
                objectPosition: `${card.hotspot.x * 100}% ${card.hotspot.y * 100}%`,
              }
            : undefined
        }
        className="-z-10 object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none"
      />

      {/* dark brown gradient at the bottom for text legibility */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#280F01] via-[#280F01]/70 via-40% to-transparent" />

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 text-[#f2e9dd] lg:p-7">
        <div className="min-w-0">
          <h3
            className={`${playfair.className} text-xl font-semibold leading-snug text-white lg:text-2xl`}
          >
            {card.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-[#f2e9dd]/75 lg:text-[15px]">
            {card.description}
          </p>
        </div>
        <span
          aria-hidden
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#D68921] text-[#D68921] transition-[background-color,color] duration-300 group-hover:bg-[#D68921] group-hover:text-[#2F1200] motion-reduce:transition-none"
        >
          <ArrowIcon />
        </span>
      </div>
    </SmartLink>
  );
}
