import type { ReactNode } from "react";
import { manrope } from "@/app/fonts";
import {
  DEFAULT_ADDRESS,
  DEFAULT_BOOKING_EMAIL,
  DEFAULT_GENERAL_EMAIL,
  DEFAULT_PHONE,
  DEFAULT_WHATSAPP,
} from "@/lib/enquiry";

type Props = {
  generalEmail?: string | null;
  bookingEmail?: string | null;
  phone?: string | null;
  whatsapp?: string | null;
  address?: string | null; // multi-line, one line per row
};

const textCls = `${manrope.className} text-[17px] font-medium text-brand-bronze`;
const linkCls = `${textCls} transition-colors hover:text-[#78280C] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-bronze`;
const labelCls = "text-xs uppercase tracking-[0.18em] text-[#432115]";

// Minimal line icons (24x24, drawn in the current text colour)
const ICONS = {
  pin: (
    <>
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  phone: (
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  ),
  whatsapp: (
    <>
      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
      <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
    </>
  ),
  mail: (
    <>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </>
  ),
};

// One row: icon badge on the left, label + details on the right
function Row({
  icon,
  label,
  children,
}: {
  icon: keyof typeof ICONS;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-start gap-4">
      <span
        aria-hidden
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#D68921]/40 bg-[#FCF1E2] text-[#432115]"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
        >
          {ICONS[icon]}
        </svg>
      </span>
      <div className="min-w-0 pt-0.5">
        <dt className={labelCls}>{label}</dt>
        <dd className="mt-1.5">{children}</dd>
      </div>
    </div>
  );
}

// "+91 98765 43210" / "98765 43210" -> "919876543210" (country code, digits only).
// Returns null while the value is still a placeholder ("+91 XXXXX XXXXX") or too short,
// so no broken tel: / WhatsApp link is ever created.
function dialDigits(value: string): string | null {
  let digits = value.replace(/\D/g, "");
  if (digits.startsWith("00")) digits = digits.slice(2); // 00 91 ... international prefix
  else if (digits.startsWith("0")) digits = digits.slice(1); // trunk 0, e.g. 0484 ...
  if (digits.length === 10) digits = `91${digits}`; // number without the country code
  return digits.length >= 11 ? digits : null;
}

export default function ContactInfo({
  generalEmail,
  bookingEmail,
  phone,
  whatsapp,
  address,
}: Props) {
  const phoneText = phone?.trim() || DEFAULT_PHONE;
  const whatsappText = whatsapp?.trim() || DEFAULT_WHATSAPP;
  const phoneDigits = dialDigits(phoneText);
  const whatsappDigits = dialDigits(whatsappText);
  const addressLines = (address?.trim() || DEFAULT_ADDRESS)
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  const emails = [
    {
      caption: "General enquiries",
      email: generalEmail || DEFAULT_GENERAL_EMAIL,
    },
    { caption: "Projects", email: bookingEmail || DEFAULT_BOOKING_EMAIL },
  ];

  return (
    <dl className="space-y-7">
      {/* 1. Address */}
      <Row icon="pin" label="Visit Us">
        <address className={`${textCls} not-italic leading-[1.55]`}>
          {addressLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </address>
      </Row>

      {/* 2. Phone */}
      <Row icon="phone" label="Call Us">
        {phoneDigits ? (
          <a href={`tel:+${phoneDigits}`} className={linkCls}>
            {phoneText}
          </a>
        ) : (
          // placeholder number: same look, no link
          <span className={textCls}>{phoneText}</span>
        )}
      </Row>

      {/* 3. WhatsApp */}
      <Row icon="whatsapp" label="WhatsApp">
        {whatsappDigits ? (
          <a
            href={`https://wa.me/${whatsappDigits}`}
            target="_blank"
            rel="noopener noreferrer"
            className={linkCls}
          >
            {whatsappText}
          </a>
        ) : (
          <span className={textCls}>{whatsappText}</span>
        )}
      </Row>

      {/* 4. Email */}
      <Row icon="mail" label="Email Us">
        <ul className="space-y-3">
          {emails.map((item) => (
            <li key={item.email}>
              <a href={`mailto:${item.email}`} className={linkCls}>
                {item.email}
              </a>
              <span className="mt-0.5 block text-[13px] text-[#432115]/70">
                {item.caption}
              </span>
            </li>
          ))}
        </ul>
      </Row>
    </dl>
  );
}
