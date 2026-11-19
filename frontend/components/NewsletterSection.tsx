import Image from "next/image";
import { manrope } from "@/app/fonts";
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
const DEFAULT_HEADING = "Subscribe to our newsletter";
const DEFAULT_SUBTITLE =
  "for the latest destination guides, travel tips and holiday ideas from Royal Grain.";

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

  return (
    <section
      aria-labelledby="newsletter-heading"
      className="relative isolate overflow-hidden bg-[#2F1200]"
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
      <div className="absolute inset-0 bg-gradient-to-r from-[#2F1200]/70 via-[#2F1200]/70 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#2F1200]/70 to-transparent" />
      <div className="relative z-10 mx-auto flex max-w-[1338px] flex-col items-center px-6 py-16 text-center lg:px-12">
        <h2
          id="newsletter-heading"
          className={`${manrope.className} text-2.4xl font-bold leading-[1.1] tracking-[-0.01em] text-[#f2e9dd] sm:text-2.2xl lg:text-[3rem]`}
        >
          {heading || DEFAULT_HEADING}
        </h2>
        <p className="mt-4 max-w-[600px] text-[15.5px] leading-[1.7] text-[#f2e9dd]/75 lg:text-base">
          {subtitle || DEFAULT_SUBTITLE}
        </p>

        <div className="mt-9 w-full max-w-[560px]">
          <NewsletterForm />
        </div>
      </div>
    </section>
  );
}
