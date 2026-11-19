// Splits a heading into a brown part and a gold part.
// - If `accent` (the optional "gold part" field in Studio) is filled, it is the gold part.
// - Otherwise the last `tailWords` words are gold (needs at least tailWords + 1 words).
export function splitHeading(
  heading: string,
  accent?: string | null,
  tailWords = 2,
): [string, string] {
  const text = heading.trim();
  if (accent?.trim()) return [text, accent.trim()];
  const words = text.split(/\s+/);
  if (words.length <= tailWords) return [text, ""];
  return [words.slice(0, -tailWords).join(" "), words.slice(-tailWords).join(" ")];
}
