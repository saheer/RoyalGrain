import Link from "next/link";
import LeafAccent from "@/components/LeafAccent";
import { ArrowIcon } from "@/components/FeaturedParts";
import { manrope } from "@/app/fonts";

type Entry = { slug: string; label: string; description: string };

// "Explore our expertise areas" on /our-expertise: one card per expertise page. The list comes
// from Sanity (Expertise Pages), so a new or renamed page shows up here automatically.
export default function ExpertiseLinksSection({ pages }: { pages: Entry[] }) {
  if (pages.length === 0) return null;

  return (
    <section
      aria-labelledby="expertise-areas"
      className="relative isolate overflow-hidden bg-[#FEF8F0] py-16 lg:py-24"
    >
      <LeafAccent corner="bottom-left" variant={2} />
      <div className="mx-auto max-w-[1338px] px-6 lg:px-12">
        <span aria-hidden className="mb-5 block h-0.5 w-12 bg-[#D68921]" />
        <h2
          id="expertise-areas"
          className={`${manrope.className} max-w-[640px] text-3xl font-bold leading-[1.15] tracking-tight text-[#2F1200] lg:text-[2.5rem]`}
        >
          Explore Our Expertise Areas
        </h2>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pages.map((p) => (
            <li key={p.slug} className="min-w-0">
              <Link
                href={`/our-expertise/${p.slug}`}
                className="group flex h-full flex-col rounded-[22px] border-t-[3px] border-t-[#D68921] bg-[#FEF3E6] p-6 shadow-[0_22px_44px_-26px_rgba(47,18,0,0.35)] transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_28px_50px_-24px_rgba(47,18,0,0.4)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 lg:p-7 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D68921]"
              >
                <h3
                  className={`${manrope.className} break-words text-xl font-bold leading-snug text-[#2F1200]`}
                >
                  {p.label}
                </h3>
                {p.description && (
                  <p className="mt-3 line-clamp-3 break-words text-[15px] leading-[1.7] text-[#432115]">
                    {p.description}
                  </p>
                )}
                <span className="mt-auto flex items-center gap-2 pt-5 text-sm font-semibold text-[#2F1200]">
                  Learn more
                  <ArrowIcon className="h-4 w-4 text-[#D68921] transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
