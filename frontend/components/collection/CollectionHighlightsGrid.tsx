import Image from "next/image";
import { playfair } from "@/app/fonts";

type Item = {
  _key: string;
  title?: string | null;
  description?: string | null;
  image?: string | null;
  imageAlt?: string | null;
};

export default function CollectionHighlightsGrid({
  heading,
  items,
}: {
  heading?: string | null;
  items?: Item[] | null;
}) {
  const cards = (items ?? []).filter((i) => i?.title?.trim());
  if (cards.length === 0) return null;

  return (
    <section
      aria-labelledby="collection-highlights-heading"
      className="bg-[#FEF8F0] py-16 lg:py-24"
    >
      <div className="mx-auto max-w-[1338px] px-6 lg:px-12">
        <h2
          id="collection-highlights-heading"
          className={`${playfair.className} text-3xl font-bold leading-[1.1] tracking-tight text-[#2F1200] lg:text-[2.5rem]`}
        >
          {heading || "Highlights"}
        </h2>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c) => (
            <li
              key={c._key}
              className="group overflow-hidden rounded-xl border border-[#EBD3AE] bg-[#FFFBF5] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_20px_44px_-24px_rgba(47,18,0,0.3)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#2F1200]">
                {c.image && (
                  <Image
                    src={c.image}
                    alt={c.imageAlt || ""}
                    fill
                    sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none"
                  />
                )}
              </div>
              <div className="p-5">
                <h3
                  className={`${playfair.className} text-[15px] font-bold text-[#2F1200]`}
                >
                  {c.title}
                </h3>
                {c.description && (
                  <p className="mt-2.5 text-[13px] leading-[1.65] text-[#432115]">
                    {c.description}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
