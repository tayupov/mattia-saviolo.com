type Theme = "dark" | "light";

type SectionDividerProps = {
  direction: "up" | "down";
  from: Theme;
  to: Theme;
  className?: string;
};

const WIDTH = 1000;
const HEIGHT = 40;
const BASE = HEIGHT / 2;
const PEAK = 1;

// dark must stay in sync with --background in globals.css (SVG fill can't
// reference the CSS custom property directly).
const FILL: Record<Theme, string> = {
  dark: "#121212",
  light: "#ffffff",
};

export function SectionDivider({
  direction,
  from,
  to,
  className = "",
}: SectionDividerProps) {
  const midX = direction === "up" ? 620 : 380;
  const peakY = direction === "up" ? PEAK : HEIGHT - PEAK;

  const topPolygon = `0,0 ${WIDTH},0 ${WIDTH},${BASE} ${midX},${peakY} 0,${BASE}`;
  const bottomPolygon = `0,${BASE} ${midX},${peakY} ${WIDTH},${BASE} ${WIDTH},${HEIGHT} 0,${HEIGHT}`;
  const line = `M0,${BASE} L${midX},${peakY} L${WIDTH},${BASE}`;

  return (
    <div className={`w-full ${className}`} aria-hidden="true">
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        preserveAspectRatio="none"
        className="h-12 w-full sm:h-16 lg:h-20"
      >
        <polygon points={topPolygon} fill={FILL[from]} />
        <polygon points={bottomPolygon} fill={FILL[to]} />
        <path
          d={line}
          fill="none"
          stroke="var(--accent)"
          strokeWidth={4}
          strokeLinecap="square"
          strokeLinejoin="miter"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
