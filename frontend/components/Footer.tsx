import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { getFooter } from "@/sanity/lib/getFooter";

type LinkItem = { label?: string | null; url?: string | null };
type SocialItem = LinkItem & { platform?: string | null };
type Item = { label: string; url: string };

// Shown until the "Footer" document is published in Sanity (each list falls back separately)
const DEFAULTS = {
  description:
    "Royal Grain Woodcraft & Interiors, Puthentheru, Kerala — Thoughtfully planned journeys. Memorable holidays.",
  social: [
    {
      platform: "linkedin",
      label: "LinkedIn",
      url: "https://www.linkedin.com/company/royal-grain/",
    },
    {
      platform: "instagram",
      label: "Instagram",
      url: "https://www.instagram.com/royalgrain/",
    },
  ] as SocialItem[],
  indexTitle: "Index",
  index: [
    { label: "About Us", url: "/about-us" },
    { label: "Holidays", url: "/explore-collections" },
    { label: "Instagram Feed", url: "/instagram-feed" },
    { label: "Design Guide", url: "/design-guide" },
    { label: "Contact Us", url: "/contact-us" },
  ] as Item[],
  holidaysTitle: "Holidays",
  holidays: [
    { label: "Backwater Cruises", url: "/explore-collections" },
    { label: "Hill Stations", url: "/explore-collections" },
    { label: "Beach Getaways", url: "/explore-collections" },
    { label: "Wildlife & Nature", url: "/explore-collections" },
  ] as Item[],
  copyright: "© 2026 Royal Grain Woodcraft & Interiors. All rights reserved.",
  legal: [
    { label: "Privacy Policy", url: "/privacy-policy" },
    { label: "Terms & Conditions", url: "/terms-and-conditions" },
  ] as Item[],
};

// Small text badge shown in the white square of the social button (like the "in" of LinkedIn)
const BADGE: Record<string, string> = {
  linkedin: "in",
  x: "X",
  facebook: "f",
  instagram: "ig",
  youtube: "yt",
};

// Drops half-filled items; uses the default list when nothing usable is left
function items<T extends LinkItem>(
  list: T[] | null | undefined,
  fallback: T[],
) {
  const clean = (list ?? []).filter((i) => i?.label?.trim() && i?.url?.trim());
  return (clean.length > 0 ? clean : fallback) as (T & Item)[];
}

// Internal paths use next/link; http(s) links open in a new tab
function FooterLink({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: ReactNode;
}) {
  if (/^https?:/i.test(href)) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {children}
      </a>
    );
  }
  if (/^(mailto:|tel:)/i.test(href)) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

const linkCls =
  "text-[16px] leading-6 text-[#f2e9dd] transition-colors hover:text-[#f2e9dd] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-400";
const headingCls =
  "text-sm font-semibold uppercase tracking-[0.2em] text-[#D68921]";

export default async function Footer() {
  const data = (await getFooter()) ?? {};

  const social = items<SocialItem>(data.socialLinks, DEFAULTS.social);
  const indexLinks = items<LinkItem>(data.indexLinks, DEFAULTS.index);
  const holidayLinks = items<LinkItem>(data.holidayLinks, DEFAULTS.holidays);
  const legalLinks = items<LinkItem>(data.legalLinks, DEFAULTS.legal);

  return (
    <footer className="mt-auto bg-[#2F1200] text-[#f2e9dd]">
      <div className="mx-auto max-w-[1338px] px-6 pb-10 pt-14 lg:px-12">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.53fr)_minmax(0,1fr)_minmax(0,1.9fr)] lg:gap-0">
          {/* Brand: logo, description, social */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" aria-label="Royal Grain – Home">
              <Image
                src={data.logo || "/RoyalGrain_logo_1.png"}
                alt={data.logoAlt || "Royal Grain"}
                width={300}
                height={300}
                className="h-auto w-[90px]"
              />
            </Link>
            <p className="mt-6 max-w-[340px] text-[15px] leading-[1.5] text-[#f2e9dd]">
              {data.description || DEFAULTS.description}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              {social.map((s) => (
                <FooterLink
                  key={`${s.platform}-${s.url}`}
                  href={s.url}
                  className="inline-flex h-[38px] items-center gap-2.5 rounded-full border border-white/20 pl-[1.05rem] pr-5 text-[15px] font-medium text-[#D68921] transition-colors hover:border-white/50 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-400"
                >
                  <span
                    aria-hidden
                    className="flex h-5 min-w-5 items-center justify-center rounded-[5px] bg-[#F9DFBC] px-1 text-[11px] font-extrabold leading-none text-[#2F1200]"
                  >
                    {BADGE[s.platform ?? ""] ?? s.label.charAt(0)}
                  </span>
                  {s.label}
                </FooterLink>
              ))}
            </div>
          </div>

          {/* Index */}
          <nav aria-labelledby="footer-index-heading">
            <h2 id="footer-index-heading" className={headingCls}>
              {data.indexTitle || DEFAULTS.indexTitle}
            </h2>
            <ul className="mt-[1.65rem] space-y-3">
              {indexLinks.map((l) => (
                <li key={`${l.label}-${l.url}`}>
                  <FooterLink href={l.url} className={linkCls}>
                    {l.label}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Holidays */}
          <nav aria-labelledby="footer-holidays-heading">
            <h2 id="footer-holidays-heading" className={headingCls}>
              {data.holidaysTitle || DEFAULTS.holidaysTitle}
            </h2>
            <ul className="mt-[1.65rem] space-y-3">
              {holidayLinks.map((l) => (
                <li key={`${l.label}-${l.url}`}>
                  <FooterLink href={l.url} className={linkCls}>
                    {l.label}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-10 sm:flex-row sm:items-center sm:justify-between lg:mt-16">
          <p className="text-[15px] text-[#f2e9dd]">
            {data.copyright || DEFAULTS.copyright}
          </p>
          <ul className="flex flex-wrap gap-x-7 gap-y-2">
            {legalLinks.map((l) => (
              <li key={`${l.label}-${l.url}`}>
                <FooterLink
                  href={l.url}
                  className="text-[15px] text-[#f2e9dd] transition-colors hover:text-[#f2e9dd] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-400"
                >
                  {l.label}
                </FooterLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
