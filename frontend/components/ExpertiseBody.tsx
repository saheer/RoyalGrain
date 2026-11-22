import Link from "next/link";
import FadeInWhenVisible from "@/components/FadeInWhenVisible";
import ExpertiseIcon from "@/components/ExpertiseIcon";
import LeafAccent from "@/components/LeafAccent";
import { ArrowIcon, SmartLink } from "@/components/FeaturedParts";
import { playfair } from "@/app/fonts";
import type { ExpertiseCard } from "@/lib/expertisePages";

type Props = {
  overview: string;
  listHeading: string;
  cards: ExpertiseCard[];
  focusHeading: string;
  focusText: string;
  ctaLabel: string;
  ctaLink: string;
  related: { title: string; href: string; icon: string }[];
};

const serif = playfair.className;

// Sections under the banner of an /our-expertise/<slug> page (design: "Our Expertise-sub pages"):
// overview, "what we cover" cards, craft & finish box, and the other expertise pages.
// Sections with no content are left out.
export default function ExpertiseBody({
  overview,
  listHeading,
  cards,
  focusHeading,
  focusText,
  ctaLabel,
  ctaLink,
  related,
}: Props) {
  return (
    <>
      {overview && (
        <FadeInWhenVisible>
          <section
            aria-labelledby="expertise-overview"
            className="relative isolate overflow-hidden bg-[#FEF8F0] py-14 lg:py-20"
          >
            <LeafAccent corner="top-right" variant={1} />
            <div className="mx-auto flex max-w-[1338px] flex-col gap-8 px-6 lg:flex-row lg:items-center lg:gap-0 lg:px-12">
              <div className="flex shrink-0 items-center gap-5 lg:w-[400px] lg:pr-10">
                <span
                  aria-hidden
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#2F1200] text-[#D68921] shadow-[0_10px_20px_-8px_rgba(47,18,0,0.55)]"
                >
                  <ExpertiseIcon name="leaf" className="h-5 w-5" />
                </span>
                <div>
                  <span aria-hidden className="mb-3 block h-0.5 w-10 bg-[#D68921]" />
                  <h2
                    id="expertise-overview"
                    className={`${serif} text-3xl font-bold leading-tight text-[#2F1200] lg:text-[2.5rem]`}
                  >
                    Overview
                  </h2>
                  <span aria-hidden className="mt-3 block h-0.5 w-10 bg-[#D68921]/50" />
                </div>
              </div>
              {/* thin vertical divider (desktop) / horizontal (mobile) */}
              <span
                aria-hidden
                className="h-px w-full bg-[#D68921]/30 lg:h-24 lg:w-px"
              />
              <p className="min-w-0 max-w-[820px] break-words text-[15px] leading-[1.85] text-[#432115] lg:pl-12 lg:text-base">
                {overview}
              </p>
            </div>
          </section>
        </FadeInWhenVisible>
      )}

      {cards.length > 0 && (
        <FadeInWhenVisible>
          <section
            aria-labelledby="expertise-list"
            className="relative isolate overflow-hidden bg-[#FCF1E2] py-14 lg:py-20"
          >
            <LeafAccent corner="bottom-left" variant={2} />
            <div className="mx-auto max-w-[1338px] px-6 lg:px-12">
              <h2
                id="expertise-list"
                className={`${serif} max-w-[640px] text-3xl font-bold leading-tight text-[#2F1200] lg:text-[2.5rem]`}
              >
                {listHeading}
              </h2>
              <span aria-hidden className="mt-4 block h-0.5 w-12 bg-[#D68921]" />

              <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
                {cards.map((card, i) => (
                  <li
                    key={`${card.text}-${i}`}
                    className="flex min-w-0 flex-col items-center rounded-[22px] border border-[#E7CFA6] bg-[#FEF3E6] px-5 pb-7 pt-7 text-center shadow-[0_18px_40px_-28px_rgba(47,18,0,0.4)] transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_24px_46px_-26px_rgba(47,18,0,0.45)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                  >
                    <span
                      aria-hidden
                      className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F6DDB5] text-[#B97A1C]"
                    >
                      <ExpertiseIcon name={card.icon} className="h-8 w-8" />
                    </span>
                    <p
                      className={`${serif} mt-5 break-words text-[1.05rem] font-medium leading-snug text-[#2F1200]`}
                    >
                      {card.text}
                    </p>
                    <span
                      aria-hidden
                      className="mt-5 block h-0.5 w-10 rounded-full bg-[#D68921]"
                    />
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </FadeInWhenVisible>
      )}

      {focusText && (
        <FadeInWhenVisible>
          <section
            aria-labelledby="expertise-focus"
            className="bg-[#FEF8F0] py-14 lg:py-20"
          >
            <div className="mx-auto max-w-[1338px] px-6 lg:px-12">
              <div className="flex flex-col gap-8 rounded-3xl bg-[#301200] p-8 shadow-[0_30px_60px_-34px_rgba(40,15,1,0.75)] sm:p-10 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:px-14 lg:py-12">
                <div className="min-w-0">
                  <span aria-hidden className="mb-4 block h-0.5 w-12 bg-[#D68921]" />
                  <h2
                    id="expertise-focus"
                    className={`${serif} text-3xl font-bold leading-tight text-[#E3A035] lg:text-[2.25rem]`}
                  >
                    {focusHeading}
                  </h2>
                  <p className="mt-4 max-w-[640px] break-words text-[15px] leading-[1.8] text-[#f2e9dd]/90">
                    {focusText}
                  </p>
                </div>
                <div className="lg:shrink-0">
                  <SmartLink
                    href={ctaLink}
                    className="group/cta inline-flex max-w-full items-center gap-2.5 rounded-full bg-[#E3A035] px-7 py-3.5 text-sm font-semibold text-[#2F1200] transition-colors duration-300 hover:bg-[#EDB352] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F9DFBC]"
                  >
                    {ctaLabel}
                    <ArrowIcon className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover/cta:translate-x-1 motion-reduce:transition-none" />
                  </SmartLink>
                </div>
              </div>
            </div>
          </section>
        </FadeInWhenVisible>
      )}

      {related.length > 0 && (
        <FadeInWhenVisible>
          <section
            aria-labelledby="expertise-related"
            className="bg-[#FEF8F0] pb-16 lg:pb-24"
          >
            <div className="mx-auto max-w-[1338px] px-6 lg:px-12">
              <h2
                id="expertise-related"
                className={`${serif} text-2xl font-bold leading-tight text-[#2F1200] lg:text-[2rem]`}
              >
                More from Our Expertise
              </h2>
              <ul className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {related.map((r) => (
                  <li key={r.href} className="min-w-0">
                    <Link
                      href={r.href}
                      className="group flex h-full items-center gap-3 rounded-2xl border border-[#E7CFA6] bg-[#FFFBF5] px-4 py-3.5 text-[15px] font-semibold text-[#2F1200] transition-[transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-[#D68921]/70 motion-reduce:hover:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D68921]"
                    >
                      <span
                        aria-hidden
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F6DDB5] text-[#B97A1C]"
                      >
                        <ExpertiseIcon name={r.icon} className="h-5 w-5" />
                      </span>
                      <span className="min-w-0 flex-1 break-words">{r.title}</span>
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        aria-hidden
                        className="h-4 w-4 shrink-0 text-[#D68921] transition-transform duration-300 group-hover:rotate-90 motion-reduce:transition-none"
                      >
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </FadeInWhenVisible>
      )}
    </>
  );
}
