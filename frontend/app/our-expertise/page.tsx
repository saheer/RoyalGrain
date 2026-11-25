import type { Metadata } from "next";
import Header from "@/components/Header";
import FadeInWhenVisible from "@/components/FadeInWhenVisible";
import InstagramHero from "@/components/InstagramHero";
import OurExpertiseSection from "@/components/OurExpertiseSection";
import ExpertiseLinksSection from "@/components/ExpertiseLinksSection";
import { getOurExpertise } from "@/sanity/lib/getOurExpertise";
import { getExpertiseIndex } from "@/sanity/lib/getExpertisePage";
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
        "Doors, beds, swings and complete interiors, built from solid teakwood with traditional joinery.",
    },
  });
}

// The /our-expertise overview page: hero + the "Our Expertise" cards (Sanity > Our Expertise Page).
// The five detail pages live in app/our-expertise/[slug]/page.tsx.
export default async function OurExpertisePage() {
  const [page, expertisePages] = await Promise.all([
    getOurExpertise().catch(() => null),
    getExpertiseIndex(),
  ]);

  return (
    <>
      <Header />
      <main>
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
          edgeColor="#FCF1E2"
        />
        <FadeInWhenVisible>
          <OurExpertiseSection
            heading={page?.expertiseHeading}
            subtitle={page?.expertiseSubtitle}
            items={page?.expertiseItems}
          />
        </FadeInWhenVisible>
        <FadeInWhenVisible>
          <ExpertiseLinksSection pages={expertisePages} />
        </FadeInWhenVisible>
      </main>
    </>
  );
}
