import Image from "next/image";
import { playfair } from "@/app/fonts";
import { splitHeading } from "@/lib/splitHeading";
import { ArrowIcon, SmartLink } from "./FeaturedParts";

type Props = {
  heading?: string | null;
  paragraphs?: string[] | null;
  image?: string | null;
  imageAlt?: string | null;
  buttonText?: string | null;
  buttonLink?: string | null;
};

// Heritage block: short gold line, two-tone heading (last word in gold), paragraphs,
// "Know More" pill and the image on the right. Managed in About Us > "Our People" tab.
export default function AboutPeopleSection({
  heading,
  paragraphs,
  image,
  imageAlt,
  buttonText,
  buttonLink,
}: Props) {
  const texts = (paragraphs ?? []).filter((p) => p?.trim());
  const [lead, gold] = splitHeading(heading || "Our People", null, 1);
  const label = (buttonText ?? "Know More").trim() || "Know More";

  return (
    <section
      id="our-people"
      aria-labelledby="people-heading"
      className="scroll-mt-24 bg-[#FBF1E4] py-16 lg:py-24"
    >
      <div className="mx-auto grid max-w-[1338px] items-center gap-10 px-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] lg:gap-14 lg:px-12">
        <div>
          <span aria-hidden className="mb-6 block h-0.5 w-12 bg-[#D68921]" />
          <h2
            id="people-heading"
            className={`${playfair.className} text-4xl font-bold leading-[1.1] tracking-tight text-[#2F1200] lg:text-[3rem]`}
          >
            {lead}
            {gold && (
              <>
                {" "}
                <span className="text-[#D68921]">{gold}</span>
              </>
            )}
          </h2>
          <div className="mt-6 max-w-[440px] space-y-4 text-[15px] leading-[1.7] text-[#432115]">
            {texts.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <SmartLink
            href={buttonLink?.trim() || "/our-expertise"}
            className="group/cta mt-8 inline-flex items-center gap-2.5 rounded-full bg-[#2F1200] px-7 py-3.5 text-sm font-semibold text-[#f2e9dd] transition-colors duration-300 hover:bg-[#432115] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D68921]"
          >
            {label}
            <ArrowIcon className="h-4 w-4 text-[#D68921] transition-transform duration-300 group-hover/cta:translate-x-1 motion-reduce:transition-none" />
          </SmartLink>
        </div>

        {image && (
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-[#2F1200] shadow-[0_30px_60px_-36px_rgba(47,18,0,0.6)]">
            <Image
              src={image}
              alt={imageAlt || ""}
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
            />
          </div>
        )}
      </div>
    </section>
  );
}
