import type { Metadata } from "next";
import Header from "@/components/Header";
import FadeInWhenVisible from "@/components/FadeInWhenVisible";
import InstagramHero from "@/components/InstagramHero";
import OurExpertiseSection from "@/components/OurExpertiseSection";
import { getOurExpertise } from "@/sanity/lib/getOurExpertise";
import { buildMetadata } from "@/sanity/lib/seo";
import { getPageSeo } from "@/sanity/lib/getPageSeo";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageSeo("ourExpertisePage");
  return buildMetadata({
    seo: page?.seo,
    path: "/our-expertise",
    fallback: {
      title: "Our Expertise | Royal Grain",
      description:
        "Main doors, custom teakwood beds and wardrobes, traditional wooden swings and complete living and dining collections, crafted in solid wood by Royal Grain Woodcraft & Interiors.",
    },
  });
}

// The "Our Expertise Page" document may not be published yet: every field falls back
// to a default, so the menu link never lands on an error page.
export default async function OurExpertisePage() {
  const page = await getOurExpertise();

  return (
    <>
      <Header />
      <main>
        {/* InstagramHero is a generic page hero (badge, 2-part heading, subtitle, image) */}
        <InstagramHero
          eyebrow={page?.heroEyebrow ?? "Our Expertise"}
          headingWhite={page?.heroHeadingWhite ?? "Solid teakwood,"}
          headingBlue={page?.heroHeadingBlue ?? "skilfully crafted."}
          description={
            page?.heroDescription ??
            "Doors, beds, swings and complete interiors, built from solid teakwood with traditional joinery."
          }
          image={page?.heroBackground}
          imageAlt={page?.heroBackgroundAlt}
          hotspot={page?.heroHotspot}
        />
        <FadeInWhenVisible>
          <OurExpertiseSection
            heading={page?.expertiseHeading}
            subtitle={page?.expertiseSubtitle}
            items={page?.expertiseItems}
          />
        </FadeInWhenVisible>
      </main>
    </>
  );
}
