import Image from "next/image";
import { playfair } from "@/app/fonts";
import NewsletterForm from "@/components/NewsletterForm";

type Props = {
  heading?: string | null;
  subtitle?: string | null;
  backgroundType?: "image" | "video" | null;
  image?: string | null;
  imageAlt?: string | null;
  hotspot?: { x: number; y: number } | null;
  videoUrl?: string | null;
};

// Shown until the fields are filled in Sanity
const DEFAULT_HEADING = "Newsletter Section";
const DEFAULT_SUBTITLE =
  "Join our mailing list for the latest arrivals in custom woodwork, interior inspirations, and exclusive offers straight from our workshop.";

// "Newsletter Section" -> ["Newsletter ", "Section"] (last word is set in gold)
function splitLastWord(text: string): [string, string] {
  const t = text.trim();
  const i = t.lastIndexOf(" ");
  return i === -1 ? ["", t] : [t.slice(0, i + 1), t.slice(i + 1)];
}

export default function NewsletterSection({
  heading,
  subtitle,
  backgroundType,
  image,
  imageAlt,
  hotspot,
  videoUrl,
}: Props) {
  const objectPosition = hotspot
    ? `${hotspot.x * 100}% ${hotspot.y * 100}%`
    : undefined;
  // The video is only used when "Video" is selected AND a file / URL exists
  const showVideo = backgroundType === "video" && !!videoUrl;
  const [headStart, headEnd] = splitLastWord(heading || DEFAULT_HEADING);

  return (
    <section
      aria-labelledby="newsletter-heading"
      className="relative isolate overflow-hidden bg-[#301200]"
    >
      {/* Image: the background itself, or the poster/fallback behind the video */}
      {image && (
        <Image
          src={image}
          alt={showVideo ? "" : imageAlt || ""}
          fill
          sizes="100vw"
          style={{ objectPosition }}
          className="object-cover"
        />
      )}

      {/* Video: sits on top of the image; hidden for visitors who prefer reduced motion */}
      {showVideo && (
        <video
          className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
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
      )}

      {/* Dark overlay keeps the text readable on any image or video */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#301200]/85 via-[#2F1C09]/70 to-[#321301]/75" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#301200]/70 to-transparent" />
      <div className="relative z-10 mx-auto flex max-w-[1338px] flex-col items-center px-6 py-16 text-center lg:px-12">
        <h2
          id="newsletter-heading"
          className={`${playfair.className} text-4xl font-bold leading-[1.1] tracking-[-0.01em] text-[#f2e9dd] lg:text-[3rem]`}
        >
          {headStart}
          <span className="text-[#D68921]">{headEnd}</span>
        </h2>
        <p className="mt-4 max-w-[640px] text-[15.5px] leading-[1.7] text-[#f2e9dd]/85 lg:text-base">
          {subtitle || DEFAULT_SUBTITLE}
        </p>

        <div className="mt-9 w-full max-w-[560px]">
          <NewsletterForm />
        </div>
      </div>
    </section>
  );
}
