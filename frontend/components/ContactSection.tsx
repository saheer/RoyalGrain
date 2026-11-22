import { playfair } from "@/app/fonts";
import ContactForm from "@/components/ContactForm";
import ContactInfo from "@/components/ContactInfo";
import LeafAccent from "@/components/LeafAccent";

type Props = {
  // heading / description belong to the Contact PAGE banner ("Get in Touch"), so this
  // home section keeps its own title. Everything below comes from the "Contact Us"
  // document in Sanity (with safe fallbacks inside ContactInfo).
  heading?: string | null;
  description?: string | null;
  generalEmail?: string | null;
  bookingEmail?: string | null;
  phone?: string | null;
  whatsapp?: string | null;
  address?: string | null;
};

const HOME_HEADING = "Have an Enquiry?";
const HOME_DESCRIPTION =
  "Planning a custom piece or a complete interior? Tell us about your space and we will get back to you shortly.";

export default function ContactSection({
  generalEmail,
  bookingEmail,
  phone,
  whatsapp,
  address,
}: Props) {
  const i = HOME_HEADING.lastIndexOf(" ");
  const headStart = HOME_HEADING.slice(0, i + 1);
  const headEnd = HOME_HEADING.slice(i + 1);

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative isolate bg-[#FBF1E4] py-16 lg:py-24"
    >
      <LeafAccent corner="bottom-left" />
      <div className="mx-auto grid max-w-[1338px] items-start gap-12 px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.45fr)] lg:gap-14 lg:px-12">
        {/* Left: heading, description, then address / phone / WhatsApp / emails */}
        <div className="lg:max-w-[485px]">
          <span aria-hidden className="block h-px w-6 bg-[#D68921]" />
          <h2
            id="contact-heading"
            className={`${playfair.className} mt-4 text-4xl font-bold leading-[1.05] tracking-[-0.01em] text-[#301200] lg:text-[3.5rem]`}
          >
            {headStart}
            <span className="text-[#D68921]">{headEnd}</span>
          </h2>
          <p className="mt-6 text-base leading-[1.65] text-[#2F1C09]/80">
            {HOME_DESCRIPTION}
          </p>
          <div className="mt-9">
            <ContactInfo
              generalEmail={generalEmail}
              bookingEmail={bookingEmail}
              phone={phone}
              whatsapp={whatsapp}
              address={address}
            />
          </div>
        </div>

        {/* Right: the form card */}
        <ContactForm />
      </div>
    </section>
  );
}
