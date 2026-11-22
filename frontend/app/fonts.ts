import { Manrope, Playfair_Display } from "next/font/google";

// Used for the headings/quotes of the Client Speak and Our Craft
// sections. Defined once here so the font files are loaded a single time.
export const manrope = Manrope({ subsets: ["latin"], display: "swap" });

// Refined serif for the headings of the Our Expertise sub-pages (/our-expertise/<slug>)
export const playfair = Playfair_Display({ subsets: ["latin"], display: "swap" });
