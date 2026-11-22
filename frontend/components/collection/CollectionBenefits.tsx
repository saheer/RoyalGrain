import { playfair } from "@/app/fonts";
import CollectionIcon from "@/components/collection/CollectionIcon";

type Item = {
  _key: string;
  title?: string | null;
  description?: string | null;
  icon?: string | null;
};

export default function CollectionBenefits({
  heading,
  items,
}: {
  heading: string;
  items?: Item[] | null;
}) {
  const cards = (items ?? []).filter((i) => i?.title?.trim());
  if (cards.length === 0) return null;

  return (
    <section
      aria-labelledby="collection-benefits-heading"
      className="bg-[linear-gradient(180deg,#2F1200_0%,#1D0B00_100%)] py-16 lg:py-24"
    >
      <div className="mx-auto max-w-[1338px] px-6 lg:px-12">
        <h2
          id="collection-benefits-heading"
          className={`${playfair.className} max-w-[640px] text-3xl font-bold leading-[1.15] tracking-tight text-[#f2e9dd] lg:text-[2.25rem]`}
        >
          {heading}
        </h2>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c) => (
            <li
              key={c._key}
              className="flex flex-col items-center rounded-xl border border-white/10 bg-white/[0.04] px-7 py-9 text-center transition-colors duration-300 hover:border-brand-gold/40 hover:bg-white/[0.07]"
            >
              <CollectionIcon src={c.icon} className="h-12 w-12" />
              <h3
                className={`${playfair.className} mt-5 text-xl font-bold leading-tight text-[#f2e9dd]`}
              >
                {c.title}
              </h3>
              {c.description && (
                <p className="mt-3 text-[13px] leading-[1.65] text-[#f2e9dd]/70">
                  {c.description}
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
