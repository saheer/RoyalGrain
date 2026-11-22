import Image from "next/image";

// Watercolour leaf accent for section corners, using the leaf artwork in /public/leaves
// (transparent WebP, converted from leafe.jpg / leafe_2.jpg / leafe_3.jpg): no Sanity upload.
//
// - sits BEHIND the content (-z-10 inside the section's own stacking context)
// - pointer-events-none + select-none, so it never blocks clicks or text selection
// - a soft mask fades the leaf tips into the background (no hard edges)
// - clipped by the section edge (no horizontal overflow) and hidden below `md`
//
// Use: give the <section> the classes "relative isolate" and put this as its first child.

type Corner = "top-right" | "bottom-left";
type Variant = 1 | 2 | 3;

const LEAVES: Record<
  Variant,
  { src: string; width: number; height: number; tone: string }
> = {
  1: { src: "/leaves/leaf-1.webp", width: 1000, height: 722, tone: "opacity-80" }, // branch enters from the right
  2: { src: "/leaves/leaf-2.webp", width: 1000, height: 946, tone: "opacity-75" }, // branch enters from the left
  3: { src: "/leaves/leaf-3.webp", width: 1000, height: 667, tone: "opacity-100" }, // paler branch, from the right
};

// leaf used when no `variant` is given
const DEFAULT_VARIANT: Record<Corner, Variant> = {
  "top-right": 1,
  "bottom-left": 2,
};

// Position + fade towards the free (tail) end, measured from the corner the branch grows from
const CORNER: Record<Corner, { place: string; size: string; mask: string }> = {
  "top-right": {
    place: "right-0 top-0",
    size: "w-28 lg:w-40 xl:w-52", // 112 / 160 / 208px
    mask: "radial-gradient(ellipse 110% 110% at 100% 0%, #000 50%, transparent 100%)",
  },
  "bottom-left": {
    place: "bottom-0 left-0",
    size: "w-24 lg:w-32 xl:w-40", // 96 / 128 / 160px
    mask: "radial-gradient(ellipse 110% 110% at 0% 100%, #000 50%, transparent 100%)",
  },
};

export default function LeafAccent({
  corner = "top-right",
  variant,
}: {
  corner?: Corner;
  variant?: Variant;
}) {
  const leaf = LEAVES[variant ?? DEFAULT_VARIANT[corner]];
  const { place, size, mask } = CORNER[corner];

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 hidden select-none overflow-hidden md:block"
    >
      <Image
        src={leaf.src}
        alt=""
        width={leaf.width}
        height={leaf.height}
        sizes="(min-width: 1280px) 208px, (min-width: 1024px) 160px, 112px"
        draggable={false}
        style={{ maskImage: mask, WebkitMaskImage: mask }}
        className={`absolute h-auto mix-blend-multiply ${size} ${leaf.tone} ${place}`}
      />
    </div>
  );
}
