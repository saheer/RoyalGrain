import Link from "next/link";
import Header from "@/components/Header";
import FadeInWhenVisible from "@/components/FadeInWhenVisible";
import InstagramHero from "@/components/InstagramHero";
import LeafAccent from "@/components/LeafAccent";
import { ArrowIcon, SmartLink } from "@/components/FeaturedParts";
import { playfair } from "@/app/fonts";

type RelatedLink = { title: string; href: string };

type Props = {
  eyebrow: string;
  headingWhite: string;
  headingBlue?: string;
  description: string;
  /** Title and text of the card under the banner */
  cardHeading: string;
  cardText: string;
  /** Optional row of sibling pages shown below the card */
  relatedHeading?: string;
  related?: RelatedLink[];
};

// Simple page shell used by the Our Expertise and legal pages until their real content
// is built. Same pattern as About Us: dark teakwood banner, cream sections, gold accents,
// soft leaf corner.
export default function PlaceholderPage({
  eyebrow,
  headingWhite,
  headingBlue,
  description,
  cardHeading,
  cardText,
  relatedHeading,
  related,
}: Props) {
  return (
    <>
      <Header />
      <main>
        <InstagramHero
          eyebrow={eyebrow}
          headingWhite={headingWhite}
          headingBlue={headingBlue}
          description={description}
        />

        <FadeInWhenVisible>
          <section
            aria-labelledby="placeholder-heading"
            className="relative isolate bg-[#FEF8F0] py-16 lg:py-24"
          >
            <LeafAccent corner="top-right" />
            <div className="mx-auto max-w-[1338px] px-6 lg:px-12">
              <div className="max-w-[760px] rounded-3xl border border-[#EBD3AE] bg-[#FFFBF5] p-8 shadow-[0_30px_60px_-40px_rgba(47,18,0,0.35)] sm:p-10 lg:p-12">
                <span
                  aria-hidden
                  className="mb-6 block h-0.5 w-12 bg-[#D68921]"
                />
                <h2
                  id="placeholder-heading"
                  className={`${playfair.className} text-3xl font-bold leading-[1.15] tracking-tight text-[#2F1200] lg:text-[2.5rem]`}
                >
                  {cardHeading}
                </h2>
                <p className="mt-5 text-[15px] leading-[1.75] text-[#432115]">
                  {cardText}
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <SmartLink
                    href="/contact-us"
                    className="group/cta inline-flex items-center gap-2.5 rounded-full bg-[#2F1200] px-7 py-3.5 text-sm font-semibold text-[#f2e9dd] transition-colors duration-300 hover:bg-[#432115] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D68921]"
                  >
                    Contact Us
                    <ArrowIcon className="h-4 w-4 text-[#D68921] transition-transform duration-300 group-hover/cta:translate-x-1 motion-reduce:transition-none" />
                  </SmartLink>
                  <SmartLink
                    href="/explore-collections"
                    className="inline-flex items-center rounded-full border border-[#2F1200]/30 px-7 py-3.5 text-sm font-semibold text-[#2F1200] transition-colors duration-300 hover:border-[#D68921] hover:bg-[#FCF1E2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D68921]"
                  >
                    Explore Collections
                  </SmartLink>
                </div>
              </div>
            </div>
          </section>
        </FadeInWhenVisible>

        {related && related.length > 0 && (
          <FadeInWhenVisible>
            <section
              aria-labelledby="related-heading"
              className="bg-[#FBF1E4] py-14 lg:py-20"
            >
              <div className="mx-auto max-w-[1338px] px-6 lg:px-12">
                <h2
                  id="related-heading"
                  className={`${playfair.className} text-2xl font-bold tracking-tight text-[#2F1200] lg:text-[2rem]`}
                >
                  {relatedHeading}
                </h2>
                <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {related.map((r) => (
                    <li key={r.href}>
                      <Link
                        href={r.href}
                        className="group flex h-full items-center justify-between gap-3 rounded-2xl border border-[#EBD3AE] bg-[#FFFBF5] px-6 py-5 text-[15px] font-semibold text-[#2F1200] transition-[transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-[#D68921]/70 motion-reduce:hover:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D68921]"
                      >
                        <span className="min-w-0">{r.title}</span>
                        <ArrowIcon className="h-4 w-4 shrink-0 text-[#D68921] transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </FadeInWhenVisible>
        )}
      </main>
    </>
  );
}
