"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import LandscapeCard, { type LandscapeCardData } from "./LandscapeCard";

type Props = {
  cards: LandscapeCardData[];
  label?: string;
};

// Slide widths: 1 card on mobile, 2 on tablet, 3 on desktop (same as the grid).
// Gaps are gap-6 (1.5rem) and lg:gap-8 (2rem).
const SLIDE =
  "shrink-0 snap-start basis-full md:basis-[calc((100%_-_1.5rem)/2)] lg:basis-[calc((100%_-_4rem)/3)]";

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
      aria-label={
        direction === "prev" ? "Previous collections" : "Next collections"
      }
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#2F1200]/25 text-[#2F1200] transition-[background-color,border-color,color,transform,opacity] duration-300 hover:border-[#2F1200] hover:bg-[#2F1200] hover:text-[#f2e9dd] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D68921] active:scale-95 disabled:pointer-events-none disabled:opacity-30"
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

export default function LandscapeSlider({
  cards,
  label = "Collections",
}: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({
    canPrev: false,
    canNext: true,
    left: 0, // progress thumb, % of the line
    width: 100,
  });

  // Reads the scroll position of the track and updates arrows + progress line
  const measure = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const next = {
      canPrev: scrollLeft > 4,
      canNext: scrollLeft < scrollWidth - clientWidth - 4,
      left: Math.round((scrollLeft / scrollWidth) * 1000) / 10,
      width: Math.round((clientWidth / scrollWidth) * 1000) / 10,
    };
    setPos((p) =>
      p.canPrev === next.canPrev &&
      p.canNext === next.canNext &&
      p.left === next.left &&
      p.width === next.width
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
    const ro = new ResizeObserver(measure); // breakpoint changes alter the slide width
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
    const step =
      first && second ? second.offsetLeft - first.offsetLeft : el.clientWidth;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    el.scrollBy({ left: dir * step, behavior: reduce ? "auto" : "smooth" });
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    }
  };

  return (
    <div role="group" aria-roledescription="carousel" aria-label={label}>
      {/* Track: native scrolling + scroll-snap, so swipe, trackpad, arrows and keys all work */}
      <div
        ref={trackRef}
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto overscroll-x-contain [scrollbar-width:none] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D68921] lg:gap-8 [&::-webkit-scrollbar]:hidden"
      >
        {cards.map((card, i) => (
          <div
            key={card._key}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${cards.length}`}
            className={SLIDE}
          >
            <LandscapeCard card={card} eager={i < 3} />
          </div>
        ))}
      </div>

      {/* Controls: progress line + arrows */}
      <div className="mt-8 flex items-center gap-6 lg:mt-10">
        <div
          aria-hidden
          className="relative h-0.5 flex-1 overflow-hidden rounded-full bg-[#2F1200]/15"
        >
          <span
            className="absolute inset-y-0 rounded-full bg-[#2F1200] transition-[left,width] duration-300 ease-out motion-reduce:transition-none"
            style={{ left: `${pos.left}%`, width: `${pos.width}%` }}
          />
        </div>
        <div className="flex items-center gap-2">
          <ArrowButton
            direction="prev"
            onClick={() => go(-1)}
            disabled={!pos.canPrev}
          />
          <ArrowButton
            direction="next"
            onClick={() => go(1)}
            disabled={!pos.canNext}
          />
        </div>
      </div>
    </div>
  );
}
