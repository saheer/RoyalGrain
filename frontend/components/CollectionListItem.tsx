import Image from "next/image";
import Link from "next/link";
import { playfair } from "@/app/fonts";
import { hotspotStyle, type CollectionCardData } from "@/lib/collections";

type Props = {
  collection: CollectionCardData;
  reversed?: boolean; // image on the right (every second card)
  exploreLabel?: string | null;
  priority?: boolean;
};

export default function CollectionListItem({
  collection,
  reversed = false,
  exploreLabel,
  priority = false,
}: Props) {
  const features = (collection.features ?? []).filter((f) => f?.trim());

  return (
    <article
      className={`group/card grid overflow-hidden rounded-2xl border border-[#EBD3AE] bg-[#FFFBF5] transition-shadow duration-300 hover:shadow-[0_24px_60px_-30px_rgba(47,18,0,0.35)] ${
        reversed
          ? "lg:grid-cols-[minmax(0,1.38fr)_minmax(0,1fr)]"
          : "lg:grid-cols-[minmax(0,1fr)_minmax(0,1.38fr)]"
      }`}
    >
      <div
        className={`relative min-h-[240px] overflow-hidden bg-[#2F1200] ${
          reversed ? "lg:order-2" : ""
        }`}
      >
        {collection.image && (
          <Image
            src={collection.image}
            alt={collection.imageAlt || ""}
            fill
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "auto"}
            sizes="(min-width: 1024px) 42vw, 100vw"
            style={hotspotStyle(collection.hotspot)}
            className="object-cover transition-transform duration-700 group-hover/card:scale-105 motion-reduce:transition-none"
          />
        )}
      </div>

      <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-[3.25rem]">
        <h3
          className={`${playfair.className} text-[1.65rem] font-bold leading-tight tracking-[-0.01em] text-[#2F1200] lg:text-[2rem]`}
        >
          {collection.title}
        </h3>
        {collection.shortDescription && (
          <p className="mt-5 max-w-[560px] text-[15px] leading-[1.75] text-[#432115]">
            {collection.shortDescription}
          </p>
        )}

        {features.length > 0 && (
          <ul className="mt-7 flex max-w-[620px] flex-wrap gap-x-6 gap-y-2.5">
            {features.map((f) => (
              <li
                key={f}
                className="flex items-center gap-2 text-[13.5px] font-medium text-[#2F1200]"
              >
                <span
                  aria-hidden
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-gold"
                />
                {f}
              </li>
            ))}
          </ul>
        )}

        <Link
          href={`/explore-collections/${collection.slug}`}
          className="group/link mt-8 inline-flex w-fit items-center gap-2 text-sm font-semibold text-brand-bronze transition-colors hover:text-[#2F1200] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-bronze"
        >
          {exploreLabel || "Explore Collection"}
          <span
            aria-hidden
            className="transition-transform duration-300 group-hover/link:translate-x-1 motion-reduce:transition-none"
          >
            →
          </span>
          <span className="sr-only"> – {collection.title}</span>
        </Link>
      </div>
    </article>
  );
}
