"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { ArrowIcon, FeaturedCard, type FeaturedCardData } from "./FeaturedParts";

// Cards per view: 1 on mobile (< 768px), 2 on tablet (768-1023px), 3 on desktop (>= 1024px).
// Gaps are gap-6 (1.5rem), so a card is (100% - gaps) / cards-per-view wide.
const SLIDE =
  "shrink-0 snap-start basis-full md:basis-[calc((100%_-_1.5rem)/2)] lg:basis-[calc((100%_-_3rem)/3)]";

const pad = (n: number) => String(n).padStart(2, "0");

function ArrowButton({
  direction,
  onClick,
  disabled,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? "Previous collections" : "Next collections"}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#D68921]/70 text-[#D68921] transition-[background-color,border-color,color,transform,opacity] duration-300 hover:border-[#2F1200] hover:bg-[#2F1200] hover:text-[#f2e9dd] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D68921] active:scale-95 disabled:pointer-events-none disabled:opacity-30"
    >
      <ArrowIcon className={`h-4 w-4 ${direction === "prev" ? "rotate-180" : ""}`} />
    </button>
  );
}

export default function FeaturedCollectionSlider({
  cards,
}: {
  cards: FeaturedCardData[];
}) {
  const trackRef = useRef<HTMLUListElement>(null);
  // Controls only exist when the cards do not all fit (decided by measuring, so it follows
  // the breakpoint: 3 cards hide them on desktop but show them on tablet and mobile)
  const [m, setM] = useState({
    scrollable: false,
    index: 0, // current position, 0-based
    total: 1, // number of positions (cards - cards per view + 1)
    canPrev: false,
    canNext: false,
  });

  const measure = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const first = el.children[0] as HTMLElement | undefined;
    const second = el.children[1] as HTMLElement | undefined;
    const step = first && second ? second.offsetLeft - first.offsetLeft : clientWidth;
    const max = scrollWidth - clientWidth;
    const scrollable = max > 2 && step > 0;
    const next = {
      scrollable,
      total: scrollable ? Math.round(max / step) + 1 : 1,
      index: scrollable ? Math.min(Math.round(max / step), Math.round(scrollLeft / step)) : 0,
      canPrev: scrollLeft > 4,
      canNext: scrollLeft < max - 4,
    };
    setM((p) =>
      p.scrollable === next.scrollable &&
      p.total === next.total &&
      p.index === next.index &&
      p.canPrev === next.canPrev &&
      p.canNext === next.canNext
        ? p
        : next,
    );
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    measure();
    el.addEventListener("scroll", onScroll, { passive: true });
    const ro = new ResizeObserver(measure); // breakpoint changes alter the card width
    ro.observe(el);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  }, [measure, cards.length]);

  // Moves exactly one card (card width + gap) left or right
  const go = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const first = el.children[0] as HTMLElement | undefined;
    const second = el.children[1] as HTMLElement | undefined;
    const step = first && second ? second.offsetLeft - first.offsetLeft : el.clientWidth;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * step, behavior: reduce ? "auto" : "smooth" });
  };

  const onKeyDown = (e: KeyboardEvent<HTMLUListElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    }
  };

  return (
    <div role="group" aria-roledescription="carousel" aria-label="Featured collection">
      {/* Track: native scrolling + scroll-snap (swipe, trackpad, arrows and keys all work) */}
      <ul
        ref={trackRef}
        tabIndex={m.scrollable ? 0 : -1}
        onKeyDown={onKeyDown}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto overscroll-x-contain [scrollbar-width:none] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D68921] [&::-webkit-scrollbar]:hidden"
      >
        {cards.map((card, i) => (
          <li
            key={card._key ?? `${card.title}-${i}`}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${cards.length}`}
            className={SLIDE}
          >
            <FeaturedCard card={card} eager={i < 3} />
          </li>
        ))}
      </ul>

      {/* Controls: counter, position line, arrows. Only when the cards do not all fit. */}
      {m.scrollable && (
        <div className="mt-9 flex items-center gap-6">
          <p
            aria-live="polite"
            className="min-w-[4.5rem] text-xs font-medium tabular-nums tracking-[0.2em] text-[#D68921]"
          >
            {pad(m.index + 1)} / {pad(m.total)}
          </p>
          <div
            aria-hidden
            className="relative h-0.5 flex-1 overflow-hidden rounded-full bg-[#2F1200]/10"
          >
            <span
              className="absolute inset-y-0 rounded-full bg-[#D68921] transition-[left,width] duration-300 ease-out motion-reduce:transition-none"
              style={{
                left: `${(m.index / m.total) * 100}%`,
                width: `${100 / m.total}%`,
              }}
            />
          </div>
          <div className="flex items-center gap-2">
            <ArrowButton direction="prev" onClick={() => go(-1)} disabled={!m.canPrev} />
            <ArrowButton direction="next" onClick={() => go(1)} disabled={!m.canNext} />
          </div>
        </div>
      )}
    </div>
  );
}
