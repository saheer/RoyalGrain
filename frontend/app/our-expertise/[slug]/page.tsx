import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import ExpertiseBanner from "@/components/ExpertiseBanner";
import ExpertiseBody from "@/components/ExpertiseBody";
import {
  genericExpertisePage,
  getExpertisePage,
  mergeExpertise,
} from "@/lib/expertisePages";
import {
  getExpertiseIndex,
  getExpertisePageDoc,
} from "@/sanity/lib/getExpertisePage";
import { buildMetadata } from "@/sanity/lib/seo";

type Props = { params: Promise<{ slug: string }> };

// The built-in five plus every page published in Sanity are prerendered. A page published
// later renders on its first visit, so no code change is needed to add one.
export async function generateStaticParams() {
  const pages = await getExpertiseIndex();
  return pages.map(({ slug }) => ({ slug }));
}

// Sanity first. The original five fall back to the built-in content (lib/expertisePages.ts) for
// anything not filled in, or when Sanity can't be reached. Any other slug needs a published
// document in Sanity, otherwise it is a 404.
async function loadPage(slug: string) {
  const doc = await getExpertisePageDoc(slug).catch(() => null);
  const builtIn = getExpertisePage(slug);
  if (!builtIn && !doc) return null;
  const base =
    builtIn ??
    genericExpertisePage(
      slug,
      doc?.menuName?.trim() || doc?.title?.trim() || slug,
    );
  return { content: mergeExpertise(base, doc) };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await loadPage(slug);
  if (!data)
    return { title: "Page not found | Royal Grain", robots: { index: false } };

  const { content } = data;
  return buildMetadata({
    seo: content.seo,
    path: `/our-expertise/${slug}`,
    fallback: {
      title: `${content.title} | Royal Grain`,
      description: content.bannerCopy,
      image: content.image,
    },
  });
}

// NOT async: `params` is URL data, so it is awaited only inside <Suspense>
// (same pattern as the other [slug] pages).
export default function ExpertiseDetailPage({ params }: Props) {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<div className="min-h-screen bg-[#280F01]" />}>
          <ExpertiseContent params={params} />
        </Suspense>
      </main>
    </>
  );
}

async function ExpertiseContent({ params }: Props) {
  const { slug } = await params;
  const data = await loadPage(slug);
  if (!data) notFound();
  const { content: c } = data;
  const index = await getExpertiseIndex();

  return (
    <>
      <ExpertiseBanner
        eyebrow={c.eyebrow}
        title={c.title}
        titleAccent={c.titleAccent}
        copy={c.bannerCopy}
        ctaLabel={c.ctaLabel}
        ctaLink={c.ctaLink}
        image={c.image}
        imageAlt={c.imageAlt}
        hotspot={c.hotspot}
      />
      <ExpertiseBody
        overview={c.overview}
        listHeading={c.listHeading}
        cards={c.cards}
        focusHeading={c.focusHeading}
        focusText={c.focusText}
        ctaLabel={c.ctaLabel}
        ctaLink={c.ctaLink}
        related={index
          .filter((p) => p.slug !== slug)
          .map((p) => ({
            title: p.label,
            href: `/our-expertise/${p.slug}`,
            icon: p.icon,
          }))}
      />
    </>
  );
}
