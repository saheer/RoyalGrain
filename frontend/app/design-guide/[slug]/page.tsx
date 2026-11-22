import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import { playfair } from "@/app/fonts";
import { formatGuideDate, hotspotPosition } from "@/components/GuideCard";
import PortableTextBody from "@/components/PortableTextBody";
import { getGuidePost, getGuideSlugs } from "@/sanity/lib/getTravelGuide";
import { buildMetadata } from "@/sanity/lib/seo";

type Props = { params: Promise<{ slug: string }> };

// Prerender every post at build time; with Cache Components this must return at
// least one param, so a placeholder is used while the CMS has no posts yet (the page
// below answers it with a 404). New posts published later are rendered on first visit.
export async function generateStaticParams() {
  const slugs = (await getGuideSlugs()).filter((s) => s?.slug);
  return slugs.length > 0 ? slugs : [{ slug: "no-posts-yet" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getGuidePost(slug);
  if (!post)
    return {
      title: "Post not found | Royal Grain",
      robots: { index: false },
    };

  return buildMetadata({
    seo: post.seo,
    path: `/design-guide/${slug}`,
    fallback: {
      title: `${post.title} | Royal Grain`,
      description: post.excerpt,
      image: post.image,
      type: "article",
      publishedTime: post.publishedAt,
    },
  });
}

export default async function GuidePostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getGuidePost(slug);
  if (!post) notFound();

  const date = formatGuideDate(post.publishedAt);

  return (
    <>
      <Header />
      <main>
        {/* Hero: main image under a wood-brown tint, breadcrumb, title, excerpt, date */}
        <section className="relative overflow-hidden bg-[#2F1200]">
          {post.image && (
            <Image
              src={post.image}
              alt={post.imageAlt || ""}
              fill
              priority
              sizes="100vw"
              style={hotspotPosition(post.hotspot)}
              className="object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-[#2F1200]/95 via-[#2F1200]/70 to-[#2F1200]/30" />

          <div className="relative z-10 mx-auto max-w-[1338px] px-6 pb-16 pt-36 lg:px-12 lg:pb-[4.5rem] lg:pt-[10.25rem]">
            <nav
              aria-label="Breadcrumb"
              className="flex flex-wrap items-center gap-2 text-[11px] font-medium uppercase tracking-[0.25em] text-[#f2e9dd]/60"
            >
              <Link
                href="/design-guide"
                className="transition-colors hover:text-[#f2e9dd] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-400"
              >
                Resources
              </Link>
              {post.category && (
                <>
                  <span aria-hidden>/</span>
                  <span aria-current="page" className="text-brand-gold">
                    {post.category}
                  </span>
                </>
              )}
            </nav>

            <h1
              className={`${playfair.className} mt-8 max-w-[900px] text-4xl font-bold leading-[1.05] tracking-[-0.01em] text-[#f2e9dd] sm:text-5xl lg:text-[4rem]`}
            >
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="mt-6 max-w-[680px] text-[15.5px] leading-[1.7] text-[#f2e9dd]/75">
                {post.excerpt}
              </p>
            )}
            {date && post.publishedAt && (
              <time
                dateTime={post.publishedAt}
                className="mt-6 block text-[12px] font-medium uppercase tracking-[0.2em] text-[#f2e9dd]/50"
              >
                {date}
              </time>
            )}
          </div>
        </section>

        {/* Article body */}
        <article className="bg-[#FEF8F0] pb-20 pt-14 lg:pb-28 lg:pt-16">
          <div className="mx-auto max-w-[840px] px-6">
            <PortableTextBody value={post.body} />

            <div className="mt-16 border-t border-[#EBD3AE] pt-8">
              <Link
                href="/design-guide"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#2F1200] transition-colors hover:text-[#432115] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D68921]"
              >
                <span aria-hidden>←</span>
                Back to Design Guide
              </Link>
            </div>
          </div>
        </article>
      </main>
    </>
  );
}
