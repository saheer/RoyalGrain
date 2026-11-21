"use client";

import { useActionState } from "react";
import { subscribe, type SubscribeState } from "@/app/actions/subscribe";

const INITIAL: SubscribeState = { status: "idle", message: "", email: "" };

export default function NewsletterForm() {
  const [state, formAction, pending] = useActionState(subscribe, INITIAL);

  return (
    <form action={formAction} className="w-full">
      {/* One pill: mail icon + input on the left, gold button attached on the right */}
      <div className="flex items-center gap-2 rounded-full border border-white/15 bg-[#f2e9dd]/10 p-1.5 pl-5 backdrop-blur-sm transition-colors focus-within:border-[#D68921] focus-within:ring-2 focus-within:ring-[#D68921]/40">
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5 shrink-0 text-[#f2e9dd]/80"
        >
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>

        <label htmlFor="newsletter-email" className="sr-only">
          E-mail Address
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          placeholder="E-mail Address"
          defaultValue={state.email}
          aria-invalid={state.status === "error"}
          aria-describedby="newsletter-feedback"
          className="h-11 min-w-0 flex-1 bg-transparent px-1 text-[15px] text-[#f2e9dd] placeholder:text-[#f2e9dd]/55 focus:outline-none"
        />

        {/* Honeypot: hidden from people and screen readers, bots tend to fill it */}
        <div
          aria-hidden
          className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
        >
          <label htmlFor="newsletter-website">Website</label>
          <input
            id="newsletter-website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-11 shrink-0 items-center gap-2 rounded-full bg-[#E3A035] px-5 text-[15px] font-semibold text-[#301200] transition-colors duration-200 hover:bg-[#D68921] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E3A035] disabled:cursor-not-allowed disabled:opacity-70 sm:px-7"
        >
          {pending ? "Subscribing…" : "Subscribe"}
          {!pending && <span aria-hidden>→</span>}
        </button>
      </div>

      {/* Always rendered (fixed height) so the layout doesn't jump when a message appears */}
      <p
        id="newsletter-feedback"
        role="status"
        aria-live="polite"
        className={`mt-4 min-h-[1.5rem] text-sm ${
          state.status === "success"
            ? "text-emerald-300"
            : state.status === "error"
              ? "text-red-300"
              : "text-transparent"
        }`}
      >
        {state.message}
      </p>
    </form>
  );
}
