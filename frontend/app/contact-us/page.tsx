import LeafAccent from "@/components/LeafAccent";
import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import FadeInWhenVisible from "@/components/FadeInWhenVisible";
import ContactForm from "@/components/ContactForm";
import ContactInfo from "@/components/ContactInfo";
import { manrope } from "@/app/fonts";
import { getContact } from "@/sanity/lib/getContact";
import {
  DEFAULT_CONTACT_DESCRIPTION,
  DEFAULT_CONTACT_HEADING,
} from "@/lib/enquiry";
import { buildMetadata } from "@/sanity/lib/seo";
import { getPageSeo } from "@/sanity/lib/getPageSeo";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageSeo("contact");
  return buildMetadata({
    seo: page?.seo,
    path: "/contact-us",
    fallback: {
      title: "Contact Us | Royal Grain",
      description:
        "Planning a custom door, furniture, wooden unjal or full home interior? Send an enquiry to Royal Grain Woodcraft & Interiors.",
    },
  });
}

export default async function ContactUsPage() {
  // The "Contact Us" document may not be published yet: fall back to the
  // built-in defaults instead of showing an error page.
  const data = (await getContact()) ?? {};

  const objectPosition = data.heroHotspot
    ? `${data.heroHotspot.x * 100}% ${data.heroHotspot.y * 100}%`
    : undefined;

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative isolate overflow-hidden bg-[#280F01]">
          {data.heroImage && (
            <Image
              src={data.heroImage}
              alt={data.heroImageAlt || ""}
              fill
              loading="eager"
              fetchPriority="high"
              sizes="100vw"
              style={{ objectPosition }}
              className="object-cover"
            />
          )}
          {/* deep teakwood-brown tint (same warm tone as the About Us banner) */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#301200]/95 via-[#2F1C09]/75 to-[#280F01]/45" />
          {/* subtle gold edge */}
          <div className="absolute inset-x-0 bottom-0 h-px bg-[#D68921]/50" />

          <div className="relative z-10 mx-auto max-w-[1338px] px-6 pb-20 pt-36 lg:px-12 lg:pb-[7.2rem] lg:pt-[7.625rem]">
            <h1
              className={`${manrope.className} text-5xl font-bold leading-[1.05] tracking-[-0.008em] text-[#f2e9dd] lg:text-[4rem]`}
            >
              {data.heading || DEFAULT_CONTACT_HEADING}
            </h1>
            <p className="mt-6 max-w-[600px] text-base leading-[1.7] text-[#f2e9dd]/85">
              {data.description || DEFAULT_CONTACT_DESCRIPTION}
            </p>
          </div>
        </section>

        {/* Contact details (left) + form (right) */}
        <FadeInWhenVisible>
          <section
            aria-label="Send an enquiry"
            className="relative isolate bg-[#FBF1E4] py-16 lg:py-28"
          >
            <LeafAccent corner="top-right" />
            <div className="mx-auto grid max-w-[1338px] items-start gap-12 px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.45fr)] lg:gap-14 lg:px-12">
              <div className="lg:pt-12">
                <ContactInfo
                  generalEmail={data.generalEmail}
                  bookingEmail={data.bookingEmail}
                  phone={data.phone}
                  whatsapp={data.whatsapp}
                  address={data.address}
                />
              </div>
              <ContactForm />
            </div>
          </section>
        </FadeInWhenVisible>
      </main>
    </>
  );
}
