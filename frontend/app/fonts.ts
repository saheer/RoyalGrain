import { Manrope, Playfair_Display } from "next/font/google";

// Now only used for the contact details and the Client Speak text. Headings use Playfair below.
// Defined once here so the font files are loaded a single time.
export const manrope = Manrope({ subsets: ["latin"], display: "swap" });

// The site-wide heading font (hero titles, section and card headings, pull quotes).
// Body text stays in Inter (see app/layout.tsx / globals.css).
export const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});
