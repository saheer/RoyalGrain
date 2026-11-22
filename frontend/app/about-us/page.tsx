import type { Metadata } from "next";
import Header from "@/components/Header";
import FadeInWhenVisible from "@/components/FadeInWhenVisible";
import AboutHero from "@/components/AboutHero";
import AboutPeopleSection from "@/components/AboutPeopleSection";
import JourneySection from "@/components/JourneySection";
import AboutCraftSection from "@/components/AboutCraftSection";
import StatsSection from "@/components/StatsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import { getAbout } from "@/sanity/lib/getAbout";
import { buildMetadata } from "@/sanity/lib/seo";
import { getPageSeo } from "@/sanity/lib/getPageSeo";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageSeo("about");
  return buildMetadata({
    seo: page?.seo,
    path: "/about-us",
    fallback: {
      title: "About Us | Royal Grain",
      description:
        "Royal Grain Woodcraft & Interiors in Puthentheru, Kerala: solid teakwood furniture, doors, unjals and custom interiors, crafted with traditional skill and care.",
    },
  });
}

export default async function AboutUsPage() {
  const about = await getAbout();

  if (!about) {
    return (
      <>
        <Header />
        <main className="p-10 pt-40">
          About Us content not found. Publish the “About Us” document in Sanity
          Studio.
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main>
        <AboutHero
          headingWhite={about.heroHeadingWhite}
          headingBlue={about.heroHeadingBlue}
          description={about.heroDescription}
          buttonText={about.heroButtonText}
          buttonLink={about.heroButtonLink}
          image={about.heroBackground}
          imageAlt={about.heroBackgroundAlt}
          hotspot={about.heroHotspot}
        />
        <FadeInWhenVisible>
          <StatsSection items={about.stats} note={about.statsNote} />
        </FadeInWhenVisible>
        <FadeInWhenVisible>
          <AboutPeopleSection
            heading={about.peopleHeading}
            paragraphs={about.peopleDescription}
            image={about.peopleImage}
            imageAlt={about.peopleImageAlt}
            buttonText={about.peopleButtonText}
            buttonLink={about.peopleButtonLink}
          />
        </FadeInWhenVisible>
        <FadeInWhenVisible>
          <JourneySection
            heading={about.journeyHeading}
            items={about.journey}
          />
        </FadeInWhenVisible>

        {/* Light panel behind the craft cards and the testimonials */}
        <div className="bg-[#FCF1E2]">
          <FadeInWhenVisible>
            <AboutCraftSection
              heading={about.craftHeading}
              subtitle={about.craftSubtitle}
              cards={about.craftCards}
            />
          </FadeInWhenVisible>
          <FadeInWhenVisible>
            <TestimonialsSection
              heading={about.testimonialsHeading}
              subtitle={about.testimonialsSubtitle}
              items={about.testimonials}
            />
          </FadeInWhenVisible>
        </div>
      </main>
    </>
  );
}
