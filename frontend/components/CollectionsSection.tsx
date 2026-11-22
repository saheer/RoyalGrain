import { playfair } from "@/app/fonts";
import { loadSvg } from "@/sanity/lib/inlineSvg";
import { splitHeading } from "@/lib/splitHeading";
import { ArrowIcon, SmartLink } from "./FeaturedParts";
import { LINE_ICONS, LineIcon } from "./LineIcon";
import LeafAccent from "@/components/LeafAccent";

type Collection = {
  _key: string;
  title: string;
  link?: string | null;
  icon?: string | null; // uploaded file (overrides the built-in icon)
  iconType?: string | null;
  iconPreset?: string | null; // built-in line icon chosen in Studio
};

type Props = {
  eyebrow?: string | null;
  heading?: string | null;
  headingAccent?: string | null;
  description?: string | null;
  items?: Collection[] | null;
  buttonLabel?: string | null;
  collectionsButtonLink?: string | null;
};

// Built-in icon used when a card has no upload and no choice: card 1, 2, 3 ...
const DEFAULT_PRESETS = ["table", "swing", "bed", "door"];

const iconBox = "block h-14 w-14 shrink-0 text-[#2F1200] lg:h-16 lg:w-16";

// Uploaded icon (SVG inline, PNG/JPG as image) or, without an upload, the built-in line icon
async function CardIcon({ item, index }: { item: Collection; index: number }) {
  if (item.icon) {
    const isRaster = !!item.iconType && !item.iconType.includes("svg");
    if (isRaster) {
      // eslint-disable-next-line @next/next/no-img-element
      return <img src={item.icon} alt="" width={64} height={64} className={iconBox} />;
    }
    const svg = await loadSvg(item.icon, undefined);
    if (svg) {
      return (
        <span
          aria-hidden
          className={`${iconBox} [&>svg]:h-full [&>svg]:w-full`}
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      );
    }
  }
  const preset =
    item.iconPreset && LINE_ICONS[item.iconPreset]
      ? item.iconPreset
      : DEFAULT_PRESETS[index % DEFAULT_PRESETS.length];
  return (
    <span aria-hidden className={iconBox}>
      <LineIcon name={preset} />
    </span>
  );
}

const cardClass =
  "group flex min-h-[200px] flex-col items-center justify-center gap-5 rounded-2xl border border-[#D68921]/25 bg-white/60 px-6 py-9 text-center shadow-[0_14px_30px_-24px_rgba(47,18,0,0.35)] transition duration-300 lg:min-h-[220px]";
const cardHover =
  "hover:-translate-y-1 hover:border-[#D68921]/70 hover:bg-[#FFFBF5] hover:shadow-[0_22px_40px_-24px_rgba(47,18,0,0.4)] motion-reduce:hover:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D68921]";

// Managed in Sanity: Home Page > "Explore Collections"
export default async function CollectionsSection({
  eyebrow,
  heading,
  headingAccent,
  description,
  items,
  buttonLabel,
  collectionsButtonLink,
}: Props) {
  const cards = (items ?? []).filter((s) => s?.title);
  if (cards.length === 0) return null;

  // Fields saved in Sanity win; the defaults keep the button visible when they are empty
  // (a strip of any typed trailing arrow keeps it to exactly one "→")
  const buttonText = (buttonLabel || "Explore Collections")
    .replace(/\s*[→➔➜]+\s*$/u, "")
    .trim();

  const [lead, gold] = splitHeading(heading || "", headingAccent, 3);

  return (
    <section
      aria-labelledby="collections-heading"
      className="relative isolate bg-[#FBF1E4] py-14 lg:py-20"
    >
      <LeafAccent corner="top-right" variant={3} />
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
        <div className="relative overflow-hidden rounded-3xl border border-[#D68921]/40 bg-gradient-to-b from-[#FEF8F0] to-[#FBF1E2] px-6 py-12 shadow-[0_30px_70px_-45px_rgba(47,18,0,0.35)] lg:px-12 lg:py-16">
          {/* Heading row */}
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
            <div>
              {eyebrow && (
                <p className="flex items-center gap-4 text-xs font-bold uppercase tracking-[0.28em] text-[#D68921]">
                  {eyebrow}
                  <span aria-hidden className="h-px w-16 bg-[#D68921]/70" />
                </p>
              )}
              {heading && (
                <h2
                  id="collections-heading"
                  className={`${playfair.className} mt-5 max-w-2xl text-4xl font-bold leading-[1.12] tracking-tight text-[#2F1200] lg:text-[3.2rem]`}
                >
                  {lead}
                  {gold && (
                    <>
                      {" "}
                      <span className="text-[#D68921]">{gold}</span>
                    </>
                  )}
                </h2>
              )}
            </div>
            {description && (
              <p className="max-w-sm text-[15px] leading-relaxed text-[#432115] lg:mt-9">
                {description}
              </p>
            )}
          </div>

          {/* Cards */}
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4 lg:gap-6">
            {cards.map((item, i) => {
              const inner = (
                <>
                  <CardIcon item={item} index={i} />
                  <span aria-hidden className="h-0.5 w-8 rounded-full bg-[#D68921]" />
                  <h3
                    className={`${playfair.className} max-w-[12rem] text-balance text-base font-semibold leading-snug text-[#2F1200] lg:text-[17px]`}
                  >
                    {item.title}
                  </h3>
                </>
              );

              if (!item.link) {
                return (
                  <div key={item._key} className={cardClass}>
                    {inner}
                  </div>
                );
              }
              return (
                <SmartLink
                  key={item._key}
                  href={item.link}
                  className={`${cardClass} ${cardHover}`}
                >
                  {inner}
                </SmartLink>
              );
            })}
          </div>

          {/* CTA button: buttonLabel / collectionsButtonLink from Sanity, with defaults */}
          {buttonText && (
            <SmartLink
              href={collectionsButtonLink || "/explore-collections"}
              className="group/cta mt-9 inline-flex items-center gap-2.5 rounded-full bg-[#2F1200] px-7 py-3.5 text-sm font-semibold text-[#f2e9dd] transition-colors duration-300 hover:bg-[#432115] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D68921] lg:mt-10"
            >
              {buttonText}
              <ArrowIcon className="h-4 w-4 text-[#D68921] transition-transform duration-300 group-hover/cta:translate-x-1 motion-reduce:transition-none" />
            </SmartLink>
          )}
        </div>
      </div>
    </section>
  );
}
