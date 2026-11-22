import type { Metadata } from "next";
import Header from "@/components/Header";
import FadeInWhenVisible from "@/components/FadeInWhenVisible";
import Hero from "@/components/Hero";
import LogoMarquee from "@/components/LogoMarquee";
import FeaturedCollectionSection from "@/components/FeaturedCollectionSection";
import LandscapeSection from "@/components/LandscapeSection";
import ApproachSection from "@/components/ApproachSection";
import CollectionsSection from "@/components/CollectionsSection";
import WhySection from "@/components/WhySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import TravelGuideSection from "@/components/TravelGuideSection";
import NewsletterSection from "@/components/NewsletterSection";
import ContactSection from "@/components/ContactSection";
import { getHome, getNewsletter } from "@/sanity/lib/getHome";
import { getGuideHome } from "@/sanity/lib/getTravelGuide";
import { getContact } from "@/sanity/lib/getContact";
import { buildMetadata } from "@/sanity/lib/seo";
import { getPageSeo } from "@/sanity/lib/getPageSeo";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageSeo("home");
  return buildMetadata({
    seo: page?.seo,
    path: "/",
    fallback: {
      title: "Royal Grain Woodcraft & Interiors",
      description:
        "Custom teakwood doors, handcrafted furniture and timeless interiors by Royal Grain Woodcraft & Interiors in Puthentheru, Kerala.",
    },
  });
}

export default async function HomePage() {
  // The Home Page and Contact Us documents are separate
  // Studio documents, so they are fetched (and cached) separately, in parallel.
  const [home, guide, newsletter, contact] = await Promise.all([
    getHome(),
    getGuideHome(),
    getNewsletter(),
    getContact(),
  ]);

  if (!home) {
    return (
      <main className="p-10">
        Home content not found. Publish the “Home Page” document in Sanity
        Studio.
      </main>
    );
  }

  const {
    logos,
    featured,
    landscape,
    approach,
    collections,
    why,
    testimonials,
    ...hero
  } = home;

  return (
    <>
      <Header />
      <main>
        <Hero {...hero} />
        <FadeInWhenVisible>
          <FeaturedCollectionSection {...featured} />
        </FadeInWhenVisible>
        <FadeInWhenVisible>
          <LogoMarquee logos={logos} />
        </FadeInWhenVisible>
        <FadeInWhenVisible>
          <LandscapeSection {...landscape} />
        </FadeInWhenVisible>
        <FadeInWhenVisible>
          <ApproachSection {...approach} />
        </FadeInWhenVisible>
        <FadeInWhenVisible>
          <CollectionsSection {...collections} />
        </FadeInWhenVisible>
        <FadeInWhenVisible>
          <WhySection {...why} />
        </FadeInWhenVisible>
        <FadeInWhenVisible>
          <TestimonialsSection {...testimonials} />
        </FadeInWhenVisible>
        <FadeInWhenVisible>
          <TravelGuideSection posts={guide} />
        </FadeInWhenVisible>
        <FadeInWhenVisible>
          <NewsletterSection {...(newsletter ?? {})} />
        </FadeInWhenVisible>
        <FadeInWhenVisible>
          <ContactSection {...(contact ?? {})} />
        </FadeInWhenVisible>
      </main>
    </>
  );
}
