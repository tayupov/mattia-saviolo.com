import Image from "next/image";

// Visual for a target card on the Sentinella product page. Takes a real photo
// (desaturated via CSS to near-B&W, matching the site's photography direction
// in CLAUDE.md) when one is provided, and falls back to an abstract bar-meter
// graphic when it isn't — so the section ships now and upgrades in place the
// moment a real image lands, no layout changes required.
//
// SOURCING NOTE: don't pull festival/club footage or photos off YouTube/
// Google Images — that's someone else's copyrighted work. Use either
// Mattia's own event/studio shots, or properly licensed stock (Pexels,
// Artgrid, Envato all carry usable festival-crowd, warehouse-rave, and
// big-stage/LED-screen shots). Drop the file into public/sentinella/ and
// point the TARGETS entry's `image` field at it — no manual B&W conversion
// needed, the grayscale filter below handles that on any color source.
type Variant = "peak-time" | "raw" | "melodic";

const BARS: Record<Variant, number[]> = {
  "peak-time": [78, 88, 82, 92, 80, 90, 84, 94, 80, 88, 82, 92, 78, 90, 84, 88],
  raw: [40, 44, 38, 46, 40, 42, 38, 44, 40, 46, 38, 42, 40, 44, 38, 42],
  melodic: [24, 62, 34, 90, 20, 70, 30, 96, 18, 58, 40, 84, 22, 66, 28, 92],
};

function BarMeter({ variant }: { variant: Variant }) {
  const bars = BARS[variant];
  const gap = 2;
  const barWidth = (100 - gap * (bars.length - 1)) / bars.length;

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="h-full w-full"
      aria-hidden
    >
      {bars.map((height, i) => (
        <rect
          key={i}
          x={i * (barWidth + gap)}
          y={100 - height}
          width={barWidth}
          height={height}
          fill="#F38444"
        />
      ))}
    </svg>
  );
}

export function TargetVisual({
  variant,
  image,
  alt,
}: {
  variant: Variant;
  image?: string;
  alt: string;
}) {
  return (
    <div className="relative h-full w-full">
      {/* Glow behind the panel — same halo treatment as the hero shot.
          Requires a `group` class on an ancestor (the card wrapper) to
          intensify on hover. */}
      <div
        aria-hidden
        className="absolute inset-4 -z-10 bg-accent/20 opacity-70 blur-2xl transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100"
      />
      {image ? (
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(min-width: 640px) 33vw, 100vw"
          className="transform-gpu object-cover grayscale contrast-125 brightness-90 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform group-hover:scale-105 group-hover:grayscale-[0.55] group-hover:brightness-100"
        />
      ) : (
        <BarMeter variant={variant} />
      )}
    </div>
  );
}
