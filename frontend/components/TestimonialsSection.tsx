"use client";

import {
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type TouchEvent,
} from "react";
import { manrope } from "@/app/fonts";
import { splitHeading } from "@/lib/splitHeading";

type Testimonial = {
  _key: string;
  author?: string | null;
  quote?: string | null;
  position?: string | null;
  company?: string | null;
};

type Props = {
  heading?: string | null;
  subtitle?: string | null;
  items?: Testimonial[] | null;
  // "split": heading left, card right (home page). "stacked": heading above a full-width card.
  layout?: "split" | "stacked";
};

// Editors may type their own quotation marks; strip them so only one pair shows
const stripQuotes = (s: string) => s.replace(/^[\s"“”„«»]+|[\s"“”„«»]+$/gu, "");

const SWIPE_MIN_PX = 50;

function ArrowButton({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={
        direction === "prev" ? "Previous testimonial" : "Next testimonial"
      }
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#D68921] text-[#D68921] transition-[background-color,color,transform] duration-300 hover:bg-[#D68921] hover:text-[#2F1200] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D68921] active:scale-95"
    >
      <svg
        aria-hidden
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`h-4 w-4 ${direction === "prev" ? "rotate-180" : ""}`}
      >
        <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
      </svg>
    </button>
  );
}

export default function TestimonialsSection({
  heading,
  subtitle,
  items,
  layout = "split",
}: Props) {
  const slides = (items ?? []).filter((t) => t?.quote?.trim());
  const count = slides.length;

  // index = visible slide, prev = slide that is fading out, dir = 1 forward / -1 back
  const [view, setView] = useState({
    index: 0,
    prev: -1,
    dir: 1 as 1 | -1,
    moved: false, // no entrance animation on first paint
  });
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  if (count === 0) return null;

  // Guards against the CMS returning fewer items than before
  const active = view.index < count ? view.index : 0;

  const go = (step: 1 | -1) => {
    if (count < 2) return;
    setView((v) => {
      const current = v.index < count ? v.index : 0;
      return {
        index: (current + step + count) % count,
        prev: current,
        dir: step,
        moved: true,
      };
    });
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") go(-1);
    else if (e.key === "ArrowRight") go(1);
  };

  const onTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  };

  const onTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    // horizontal swipes only, so vertical page scrolling is never hijacked
    if (Math.abs(dx) >= SWIPE_MIN_PX && Math.abs(dx) > Math.abs(dy)) {
      go(dx < 0 ? 1 : -1);
    }
  };

  return (
    <section
      aria-labelledby="testimonials-heading"
      className={`${manrope.className} bg-white ${
        layout === "stacked"
          ? "pb-16 pt-12 lg:pb-24"
          : "bg-white py-16 lg:py-24"
      }`}
    >
      <div className="mx-auto max-w-[1350px] px-6 lg:px-12">
        <div
          className={`grid items-center gap-10 ${
            layout === "stacked"
              ? ""
              : "lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12"
          }`}
        >
          {/* Left: short gold line, heading (last word in gold) + subtitle */}
          <div>
            <span aria-hidden className="mb-8 block h-0.5 w-14 bg-[#D68921]" />
            <h2
              id="testimonials-heading"
              className="text-4xl font-bold leading-[1.1] tracking-tight text-[#2F1200] lg:text-[3.5rem]"
            >
              {(() => {
                const [lead, gold] = splitHeading(heading || "Client Speak", null, 1);
                return (
                  <>
                    {lead}
                    {gold && (
                      <>
                        {" "}
                        <span className="text-[#D68921]">{gold}</span>
                      </>
                    )}
                  </>
                );
              })()}
            </h2>
            <p className="mt-4 max-w-sm text-base leading-relaxed text-[#432115]">
              {subtitle || "What our homeowners say about our teakwood craftsmanship and interior works."}
            </p>
          </div>

          {/* Right: dark card with quote, location tag and arrows */}
          <div
            role="group"
            aria-roledescription="carousel"
            aria-label="Client testimonials"
            style={{ "--tm-dir": view.dir } as CSSProperties}
            onKeyDown={onKeyDown}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <div className="relative overflow-hidden rounded-[22px] bg-[#280F01] shadow-[0_30px_80px_-30px_rgba(40,15,1,0.55)]">
              <div className="px-7 pb-8 pt-9 sm:px-10 lg:px-12 lg:pb-10 lg:pt-11">
                {/* Quote mark: stays put while the text changes */}
                <svg
                  aria-hidden
                  viewBox="4 6 16 12"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                  className="h-7 w-9 rotate-180 text-[#D68921]"
                >
                  <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                </svg>

                {/* All slides share one grid cell, so the card never changes height */}
                <div aria-live="polite" className="mt-8 grid lg:mt-10">
                  {slides.map((t, i) => {
                    const isActive = i === active;
                    const state = isActive
                      ? "active"
                      : i === view.prev
                        ? "exit"
                        : "idle";

                    return (
                      <figure
                        key={t._key}
                        data-state={state}
                        data-moved={view.moved}
                        aria-hidden={!isActive}
                        inert={!isActive}
                        className="testimonial-slide col-start-1 row-start-1"
                      >
                        <blockquote className="max-w-[840px] text-lg font-semibold italic leading-[1.65] text-[#FFF5E8] lg:text-[1.5rem]">
                          “{stripQuotes(t.quote as string)}”
                        </blockquote>
                      </figure>
                    );
                  })}
                </div>

                {/* Footer: gold line, location tag (left), arrows (right) */}
                <div className="mt-9 flex items-center justify-between gap-4 border-t border-[#D68921]/60 pt-6">
                  <div aria-label={`Testimonial ${active + 1} of ${count}`} className="min-w-0">
                    {slides[active].author && (
                      <p className="mb-1 text-[15px] font-semibold text-[#f2e9dd]">
                        {slides[active].author}
                      </p>
                    )}
                    {slides[active].company && (
                      <p className="text-[13px] font-bold uppercase tracking-[0.2em] text-[#D68921]">
                        {slides[active].company}
                      </p>
                    )}
                  </div>
                  {count > 1 && (
                    <div className="flex items-center gap-2.5">
                      <ArrowButton direction="prev" onClick={() => go(-1)} />
                      <ArrowButton direction="next" onClick={() => go(1)} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
