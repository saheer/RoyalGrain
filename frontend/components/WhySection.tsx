import Image from "next/image";
import { manrope } from "@/app/fonts";
import { loadSvg } from "@/sanity/lib/inlineSvg";
import { LINE_ICONS, LineIcon } from "./LineIcon";

type Feature = {
  _key: string;
  title: string;
  highlight?: string | null;
  description?: string | null;
  icon?: string | null; // uploaded file (overrides the built-in icon)
  iconType?: string | null;
  iconPreset?: string | null; // built-in line icon chosen in Studio
};

type Props = {
  mediaType?: "image" | "video" | null;
  videoUrl?: string | null;
  image?: string | null;
  imageAlt?: string | null;
  hotspot?: { x: number; y: number } | null;
  features?: Feature[] | null;
};

// Built-in icon used when a row has no upload and no choice: row 1, 2, 3 ...
const DEFAULT_PRESETS = ["door", "award", "bed", "ruler", "leaf"];

const iconInner = "block h-9 w-9 text-[#2F1200] lg:h-11 lg:w-11";

async function FeatureIcon({
  feature,
  index,
}: {
  feature: Feature;
  index: number;
}) {
  if (feature.icon) {
    const isRaster = !!feature.iconType && !feature.iconType.includes("svg");
    if (isRaster) {
      // eslint-disable-next-line @next/next/no-img-element
      return <img src={feature.icon} alt="" width={44} height={44} className={iconInner} />;
    }
    const svg = await loadSvg(feature.icon, undefined);
    if (svg) {
      return (
        <span
          aria-hidden
          className={`${iconInner} [&>svg]:h-full [&>svg]:w-full`}
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      );
    }
  }
  const preset =
    feature.iconPreset && LINE_ICONS[feature.iconPreset]
      ? feature.iconPreset
      : DEFAULT_PRESETS[index % DEFAULT_PRESETS.length];
  return (
    <span aria-hidden className={iconInner}>
      <LineIcon name={preset} />
    </span>
  );
}

// Managed in Sanity: Home Page > "Why Royal Grain"
export default function WhySection({
  mediaType,
  videoUrl,
  image,
  imageAlt,
  hotspot,
  features,
}: Props) {
  const items = (features ?? []).filter((f) => f?.title);
  if (items.length === 0 && !image && !videoUrl) return null;

  const objectPosition = hotspot
    ? `${hotspot.x * 100}% ${hotspot.y * 100}%`
    : undefined;
  // A video is only used when "Video" is selected AND a file / URL exists
  const showVideo = mediaType === "video" && !!videoUrl;

  return (
    <section
      aria-label="Why Royal Grain"
      className="grid w-full grid-cols-1 bg-[#FEF8F0] lg:grid-cols-2"
    >
      {/* Left: image or video, edge to edge, with a rounded top-right corner on desktop */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#2F1200]/10 lg:aspect-auto lg:min-h-[600px] lg:rounded-tr-[3.5rem]">
        {showVideo ? (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition }}
            src={videoUrl!}
            poster={image ?? undefined}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-hidden
          />
        ) : image ? (
          <Image
            src={image}
            alt={imageAlt || ""}
            fill
            loading="eager"
            sizes="(min-width: 1024px) 50vw, 100vw"
            style={{ objectPosition }}
            className="object-cover"
          />
        ) : null}
      </div>

      {/* Right: feature rows (icon badge, gold bar, title, description) */}
      <div className="flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-16 lg:py-16 xl:px-20">
        <ul className="space-y-10 lg:space-y-12">
          {items.map((feature, i) => (
            <li key={feature._key} className="flex items-center gap-5 lg:gap-7">
              <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[#F6E8D4] lg:h-24 lg:w-24">
                <FeatureIcon feature={feature} index={i} />
              </span>
              <div className="flex items-stretch gap-5">
                <span aria-hidden className="w-0.5 shrink-0 bg-[#D68921]/80" />
                <div>
                  <h3
                    className={`${manrope.className} text-2xl font-bold leading-[1.15] tracking-tight text-[#2F1200] lg:text-[1.9rem]`}
                  >
                    {feature.title}
                    {feature.highlight && (
                      <span className="block text-[#D68921]">
                        {feature.highlight}
                      </span>
                    )}
                  </h3>
                  {feature.description && (
                    <p className="mt-3 max-w-md text-[15px] leading-relaxed text-[#432115]">
                      {feature.description}
                    </p>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
