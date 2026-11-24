import Image from "next/image";
import Link from "next/link";
import { playfair } from "@/app/fonts";
import ExpertiseIcon from "@/components/ExpertiseIcon";
import { guessExpertiseIcon, isExpertiseIcon } from "@/lib/expertiseIcons";
import { hotspotStyle, type CollectionCardData } from "@/lib/collections";

// One card of the "Our Masterpiece Collections" grid: photo, overlapping round gold-bordered
// icon badge, serif title, short text and a small gold arrow.
export default function CollectionCard({
  collection,
  priority = false,
}: {
  collection: CollectionCardData;
  priority?: boolean;
}) {
  const icon = isExpertiseIcon(collection.cardIcon)
    ? collection.cardIcon
    : guessExpertiseIcon(collection.title);

  return (
    <Link
      href={`/explore-collections/${collection.slug}`}
      className="group/card flex h-full flex-col overflow-hidden rounded-2xl border border-[#EBD3AE] bg-[#FFFBF5] shadow-[0_18px_40px_-28px_rgba(47,18,0,0.4)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_26px_54px_-28px_rgba(47,18,0,0.5)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D68921] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-[#4a2410] via-[#301200] to-[#280F01]">
        {collection.image && (
          <Image
            src={collection.image}
            alt={collection.imageAlt || ""}
            fill
            loading={priority ? "eager" : "lazy"}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            style={hotspotStyle(collection.hotspot)}
            className="object-cover transition-transform duration-700 group-hover/card:scale-105 motion-reduce:transition-none"
          />
        )}
      </div>

      <div className="relative flex flex-1 flex-col items-center px-6 pb-7 pt-12 text-center">
        <span className="absolute left-1/2 top-0 flex h-[4.25rem] w-[4.25rem] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#D68921] bg-[#280F01] text-[#E3A035] shadow-[0_10px_24px_-10px_rgba(47,18,0,0.6)]">
          <ExpertiseIcon name={icon} className="h-8 w-8" />
        </span>

        <h3
          className={`${playfair.className} text-[1.4rem] font-bold leading-snug tracking-[-0.01em] text-[#2F1200]`}
        >
          {collection.title}
        </h3>
        {collection.shortDescription && (
          <p className="mt-3 text-[15px] leading-[1.7] text-[#432115]">
            {collection.shortDescription}
          </p>
        )}
        <span
          aria-hidden
          className="mt-auto pt-5 text-[#D68921] transition-transform duration-300 group-hover/card:translate-x-1 motion-reduce:transition-none"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 12h16M14 6l6 6-6 6" />
          </svg>
        </span>
        <span className="sr-only">View {collection.title}</span>
      </div>
    </Link>
  );
}
