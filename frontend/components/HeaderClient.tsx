"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const NAV = [
  { label: "About Us", href: "/about-us" },
  { label: "Explore Collections", href: "/explore-collections" },
  { label: "Instagram Feed", href: "/instagram-feed" },
  { label: "Design Guide", href: "/design-guide" },
  { label: "Our Expertise", href: "/our-expertise" },
  { label: "Contact Us", href: "/contact-us" },
];

// Desktop / laptop (lg and up): logo in the centre, three links on each side.
// Mobile and tablet keep using the full NAV list in the hamburger menu.
const LEFT_NAV = NAV.slice(0, 3);
const RIGHT_NAV = NAV.slice(3);

const LOGO_WHITE = "/RoyalGrain_logo_1.webp";
const LOGO_BLUE = "/RoyalGrain_logo_1.webp";

// The sticky bar appears after SHOW_AT and hides again at HIDE_AT (hysteresis).
const SHOW_AT = 80;
const HIDE_AT = 80;

type Variant = "top" | "sticky";

const linkCls =
  "flex items-center gap-1.5 whitespace-nowrap transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current";

// One side of the desktop nav. At the top of the page (variant "top") the links sit in a
// translucent dark panel with thin gold dividers; in the sticky bar they are plain links.
function NavGroup({
  items,
  variant,
  side,
}: {
  items: typeof NAV;
  variant: Variant;
  side: "left" | "right";
}) {
  const top = variant === "top";
  return (
    <nav
      aria-label={side === "left" ? "Main left" : "Main right"}
      className={[
        "hidden items-center text-[15px] lg:flex xl:text-[17px]",
        side === "left" ? "justify-self-start" : "justify-self-end",
        top ? "h-14 gap-5 xl:gap-8" : "gap-6 xl:gap-10",
      ].join(" ")}
    >
      {items.map((item, i) => (
        <span key={item.label} className="contents">
          {top && i > 0 && (
            <span aria-hidden className="h-4 w-px shrink-0 bg-brand-gold/50" />
          )}
          <Link href={item.href} className={linkCls}>
            {item.label}
          </Link>
        </span>
      ))}
    </nav>
  );
}

type BarProps = {
  variant: Variant;
  open: boolean; // mobile menu
  onToggle: () => void;
  onNavigate: () => void;
};

// One bar (logo + nav + mobile menu), rendered once per layer
function HeaderBar({ variant, open, onToggle, onNavigate }: BarProps) {
  const sticky = variant === "sticky";
  const menuId = `mobile-menu-${variant}`;

  return (
    <>
      {/* < lg: logo left + hamburger right (unchanged).
          >= lg: 3-column grid, [left links] [centred logo] [right links]. */}
      <div
        className={[
          "mx-auto flex max-w-[1280px] items-center justify-between gap-6 px-3 py-3",
          "lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-0 lg:px-8 lg:py-0",
          sticky ? "lg:h-[82px]" : "lg:h-[82px]",
        ].join(" ")}
      >
        <NavGroup items={LEFT_NAV} variant={variant} side="left" />

        {/* Logo cell: its width reserves the space in the middle of the bar. */}
        <div
          className={[
            "shrink-0 lg:relative lg:h-[80px]",
            sticky ? "lg:w-[80px]" : "lg:w-[80px]",
          ].join(" ")}
        >
          <Link
            href="/"
            aria-label="Royal Grain – Home"
            className="block shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current lg:absolute lg:left-0 lg:top-[5px]"
          >
            {/* Eager (not `priority`): no <link rel="preload">, so the hidden sticky logo
                isn't preloaded on every page. */}
            {/* Top of the page: logo sits inside the bar (80px). Scrolled: the logo grows
                to 128px and hangs ~50px below the bottom edge of the 82px bar. */}
            <Image
              src={sticky ? LOGO_BLUE : LOGO_WHITE}
              alt="Royal Grain"
              width={300}
              height={300}
              loading="eager"
              className={[
                "h-auto w-[80px]",
                sticky
                  ? "lg:w-[80px] lg:drop-shadow-[0_8px_10px_rgba(0,0,0,0.35)]"
                  : "lg:w-[80px]",
              ].join(" ")}
            />
          </Link>
        </div>

        <NavGroup items={RIGHT_NAV} variant={variant} side="right" />

        <button
          type="button"
          className="-m-2 p-2 lg:hidden"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={menuId}
          aria-label="Toggle menu"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden
          >
            {open ? (
              <path d="M6 6l12 12M18 6 6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <nav
          id={menuId}
          aria-label="Mobile"
          className={`mx-6 mb-4 flex flex-col gap-4 rounded-xl p-6 text-lg lg:hidden ${
            sticky
              ? "border border-[#EBD3AE] bg-[#FEF8F0] text-[#2F1200] shadow-lg"
              : "bg-[#2F1200]/95 text-[#f2e9dd]"
          }`}
        >
          {NAV.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={onNavigate}
              className="transition-opacity hover:opacity-70"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </>
  );
}

export default function HeaderClient() {
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  const stuckRef = useRef(false);

  // Sticky bar: appears after SHOW_AT, hides at HIDE_AT
  useEffect(() => {
    let ticking = false;

    const update = () => {
      ticking = false;
      const y = window.scrollY;
      const next = stuckRef.current ? y > HIDE_AT : y > SHOW_AT;
      if (next !== stuckRef.current) {
        stuckRef.current = next;
        setStuck(next);
        setOpen(false); // never leave a menu open on the layer that just left
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggle = () => setOpen((v) => !v);
  const close = () => setOpen(false);

  const shared = { onToggle: toggle, onNavigate: close };

  return (
    <>
      {/* Layer 1: top of the page, transparent with white text + white logo */}
      <header
        data-header
        inert={stuck}
        className="absolute inset-x-0 top-0 z-40 bg-transparent text-[#f2e9dd]"
      >
        <HeaderBar variant="top" open={open && !stuck} {...shared} />
      </header>

      {/* Layer 2: sticky white bar + blue logo (hidden = slid up, transparent, no shadow) */}
      <header
        data-header
        inert={!stuck}
        aria-hidden={!stuck}
        className={[
          "fixed inset-x-0 top-0 z-50  bg-[#2F1200] text-[#f2e9dd]",
          "transition-[transform,opacity,visibility,box-shadow] duration-300 ease-out will-change-transform motion-reduce:transition-none",
          stuck
            ? "visible translate-y-0  opacity-100 shadow-[0_4px_20px_rgba(47,18,0,0.08)]"
            : "invisible -translate-y-full border-transparent opacity-0 shadow-none",
        ].join(" ")}
      >
        <HeaderBar variant="sticky" open={open && stuck} {...shared} />
      </header>
    </>
  );
}
