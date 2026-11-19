import { manrope } from "@/app/fonts";
import HolidayIcon from "@/components/holiday/HolidayIcon";

type Item = {
  _key: string;
  title?: string | null;
  description?: string | null;
  icon?: string | null;
};

export default function HolidayCoverGrid({
  heading,
  intro,
  items,
}: {
  heading?: string | null;
  intro?: string | null;
  items?: Item[] | null;
}) {
  const cards = (items ?? []).filter((i) => i?.title?.trim());
  if (cards.length === 0) return null;

  return (
    <section
      aria-labelledby="holiday-cover-heading"
      className="bg-[#FCF1E2] py-16 lg:py-24"
    >
      <div className="mx-auto max-w-[1338px] px-6 lg:px-12">
        <div className="grid gap-4 lg:grid-cols-2 lg:items-end">
          <h2
            id="holiday-cover-heading"
            className={`${manrope.className} text-3xl font-bold leading-[1.1] tracking-tight text-[#2F1200] lg:text-[2.5rem]`}
          >
            {heading || "What we cover"}
          </h2>
          {intro && (
            <p className="max-w-[380px] text-[14px] leading-[1.6] text-[#432115] lg:justify-self-end lg:pb-1">
              {intro}
            </p>
          )}
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {cards.map((c) => (
            <li
              key={c._key}
              className="flex min-h-[140px] flex-col items-center justify-center gap-4 rounded-xl border border-[#E3E9F3] bg-white p-6 text-center transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_20px_44px_-24px_rgba(10,26,58,0.3)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              <HolidayIcon src={c.icon} className="h-10 w-10" />
              <div>
                <h3 className="text-[13px] font-semibold leading-snug text-[#0C2268]">
                  {c.title}
                </h3>
                {c.description && (
                  <p className="mt-1.5 text-[12px] leading-[1.55] text-[#5B6F94]">
                    {c.description}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
