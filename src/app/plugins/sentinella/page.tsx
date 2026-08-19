import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { InteractiveScreenshot } from "@/components/InteractiveScreenshot";
import { TargetVisual } from "@/components/TargetVisual";
import { ReviewsCarousel } from "@/components/ReviewsCarousel";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { osIcon } from "@/components/OsIcons";

export const metadata: Metadata = {
  title: "SENTINELLA",
  description:
    "SENTINELLA — a real-time reference plugin for techno producers, built by Mattia Saviolo. Targets peak time, raw, and melodic techno, and compares your live mix against them right inside your DAW.",
  alternates: { canonical: "/plugins/sentinella" },
};

const PLUGIN = {
  name: "SENTINELLA",
  // What problem it solves, not just what it does. Kept word-for-word
  // identical to the tagline used on the homepage section and the /plugins
  // list card, so the messaging doesn't drift between pages.
  valueProp:
    "Hear how your mix stacks up against pro techno records — live, right in your DAW.",
  price: "€49",
  formats: ["VST3", "AU", "Standalone"],
  os: ["Windows", "macOS (Apple Silicon)"],
};

// Targets — each visualized with a B&W photo (via TargetVisual) rather than
// a screenshot, since picking a target is just a dropdown selection in the
// plugin UI, not something distinct to capture. Placeholder stock photos
// (Pexels — free license, no attribution required, commercial use OK),
// credited here for traceability; swap for Mattia's own event/studio shots
// whenever those are available:
//   - Peak Time:  Kei Scampa       — pexels.com/photo/16113682
//   - Raw:        Kelly            — pexels.com/photo/34472353
//   - Melodic:    DBaler           — pexels.com/photo/9534913
const TARGETS = [
  {
    name: "Peak Time / Driving",
    variant: "peak-time" as const,
    image: "/sentinella/target-peak-time.jpg",
    alt: "Peak Time / Driving techno — festival mainstage crowd",
  },
  {
    name: "Raw / Hypnotic / Deep",
    variant: "raw" as const,
    image: "/sentinella/target-raw.jpg",
    alt: "Raw / Hypnotic / Deep techno — underground stone-walled basement rave",
  },
  {
    name: "Melodic Techno",
    variant: "melodic" as const,
    image: "/sentinella/target-melodic.jpg",
    alt: "Melodic techno — big stage with large screen visuals",
  },
];

// Feature list — grounded in the actual plugin architecture (see
// ~/code/sentinella-plugin/CLAUDE.md), not marketing invention.
const FEATURES = [
  {
    number: "01",
    name: "Tonal Balance",
    description:
      "Live curve vs. Peak Time, Raw, Melodic, or Custom — one click of Shape nudges it into place, hold Bypass to A/B.",
  },
  {
    number: "02",
    name: "Imager",
    description:
      "A full-circle goniometer plus a correlation meter flag mono-compatibility problems before mastering does.",
  },
  {
    number: "03",
    name: "Levels",
    description:
      "RMS and integrated LUFS bar meters read live against the reference range — click a bar to reset it mid-session.",
  },
  {
    number: "04",
    name: "Waveform",
    description:
      "A scrolling strip locked to your host's playhead, so you always know where you are in the arrangement.",
  },
];

// System requirements — reflects the real build target (JUCE 9.0.1 plugin,
// see ~/code/sentinella-plugin): VST3/AU/Standalone only (no AAX, so no Pro
// Tools), mono/stereo I/O only (isBusesLayoutSupported rejects surround),
// no setLatencySamples call anywhere in the processor (zero added latency
// outside of Shape). Windows/macOS minimum versions are the standard JUCE
// plugin baseline, not independently QA'd yet on real machines — confirm
// before shipping.
const REQUIREMENTS = {
  platform: [
    "VST3, AU, and Standalone — no AAX (not compatible with Pro Tools)",
    "macOS 11 (Big Sur) or later, Apple Silicon",
    "Windows 10 or later, 64-bit",
    "Support for Ableton Live, Logic Pro, Bitwig, Cubase, Studio One, Reaper, FL Studio",
  ],
};

const FAQ = [
  {
    q: "How do I get started?",
    a: "Buy a license below, download the plugin, and activate with the key from your confirmation email.",
  },
  {
    q: "What do I get when I buy it?",
    a: "A single license, yours to use on your own machines. No subscription, no iLok.",
  },
  {
    q: "Which formats does it support?",
    a: "VST3 on Windows and macOS (Apple Silicon), AU on macOS.",
  },
  {
    q: "Do updates cost extra?",
    a: "No — updates are free for the life of the license.",
  },
];

export default function SentinellaPage() {
  return (
    <div className="flex flex-1 flex-col">
      {/* Header + hero share a dedicated min-h-dvh flex column so the hero
          section (flex-1) fills exactly the rest of the first viewport
          below the header, regardless of the rest of the page's content —
          it's the only thing visible on load. */}
      <div className="flex min-h-dvh flex-col">
        <SiteHeader />

        {/* Product hero */}
        <section className="grid flex-1 items-center gap-10 px-6 py-10 sm:px-12 lg:grid-cols-[0.9fr_1.2fr] lg:gap-16">
          <div className="flex flex-col justify-center">
            <h1 className="font-display text-5xl uppercase leading-[0.9] sm:text-6xl lg:text-7xl">
              {PLUGIN.name}
            </h1>
            {/* Hardcoded with a manual <br /> (instead of PLUGIN.valueProp)
                to force the line break after "against" on desktop only —
                keep this in sync with PLUGIN.valueProp if that tagline ever
                changes. */}
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
              Hear how your mix stacks up against{" "}
              <br className="hidden lg:block" />
              pro techno records — live, right in your DAW.
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {PLUGIN.formats.map((format) => (
                <span
                  key={format}
                  className="border border-white/15 px-2.5 py-1 text-xs uppercase tracking-wide text-white/50"
                >
                  {format}
                </span>
              ))}
            </div>

            <div className="mt-2 flex flex-wrap gap-2">
              {PLUGIN.os.map((os) => (
                <span
                  key={os}
                  className="flex items-center gap-1.5 border border-white/15 px-2.5 py-1 text-xs uppercase tracking-wide text-white/50"
                >
                  {osIcon(os)}
                  {os}
                </span>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/#contact"
                className="inline-block bg-accent px-8 py-4 font-display text-base uppercase tracking-wide text-black transition-colors hover:bg-white"
              >
                Buy — {PLUGIN.price}
              </Link>
            </div>
          </div>

          {/* Hero product shot — the real GUI, "shaped" state. Depth comes
              from a blurred glow sitting behind the panel, not a shadow cast
              from it — a plain dark box-shadow disappears against the
              near-black page background, but a soft halo behind the edges
              reads clearly. Tinted with the plugin GUI's own accent blue
              (eyeballed off the screenshot, ~#4d8dff) at low opacity, kept
              tight and restrained rather than a wash. A real (if subtle)
              contact shadow underneath adds grounding on top of that.
              NOTE: rounded corners here are a deliberate one-off try, at
              odds with the sharp/angular look CLAUDE.md specifies elsewhere
              — revert to square if it doesn't earn its place. */}
          <div className="relative order-first aspect-video w-full lg:order-last lg:-translate-x-24 lg:scale-115">
            <div
              aria-hidden
              className="absolute -inset-4 -z-10 rounded-[2rem] bg-[#4d8dff]/[0.12] blur-2xl"
            />
            <div className="absolute inset-0 overflow-hidden rounded-xl border border-white/15 bg-white/[0.02] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)]">
              <Image
                src="/sentinella/dark-shaped.png"
                alt="Sentinella — main GUI"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>
      </div>

      <main>
        {/* Interactive screenshot — hover (or tap) a feature to see it
            highlighted directly on the real GUI. The "See it in action" demo
            video previously lived here as its own section (via
            PluginVideoPlayer); dropped for now in favor of the looping video
            used as this section's background — see InteractiveScreenshot. */}
        <section className="border-t border-white/10 px-6 py-20 sm:px-12 lg:py-28">
          <h2 className="text-center font-display text-4xl uppercase sm:text-5xl">
            See what you&rsquo;re hearing.
          </h2>
          <div className="mt-4">
            <InteractiveScreenshot />
          </div>
        </section>

        {/* Feature list — written breakdown, complements the hover-driven
            InteractiveScreenshot above (which is mouse/touch only) with
            something skimmable and indexable. */}
        <section className="border-t border-white/10 px-6 py-20 sm:px-12 lg:py-28">
          <h2 className="font-display text-4xl uppercase leading-[0.95] sm:text-5xl">
            What&rsquo;s inside.
          </h2>
          <p className="mt-4 max-w-xl text-white/60">
            Drag the handle — same track, same target, before and after one
            click of Shape.
          </p>
          <div className="mt-10">
            <BeforeAfterSlider />
          </div>
          <ul className="mx-auto mt-16 grid max-w-5xl divide-y divide-white/10 px-4 sm:grid-cols-2 sm:gap-x-12 sm:divide-y-0 sm:px-0">
            {FEATURES.map((feature) => (
              <li
                key={feature.number}
                className="flex gap-6 py-6 sm:border-b sm:border-t sm:border-white/10"
              >
                <span className="font-display text-lg text-white/30">
                  {feature.number}
                </span>
                <div>
                  <h3 className="font-display text-xl uppercase leading-tight">
                    {feature.name}
                  </h3>
                  <p className="mt-2 text-white/60">{feature.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Targets — visualized via TargetVisual (B&W photo, falling back to
            a brutalist bar-meter graphic), see comment on the TARGETS
            constant above. */}
        <section className="border-t border-white/10 px-6 py-20 sm:px-12 lg:py-28">
          <h2 className="font-display text-4xl uppercase leading-[0.95] sm:text-5xl">
            Built for your target.
          </h2>
          <p className="mt-4 max-w-xl text-white/60">
            Every preset target is distilled from hundreds of
            released records, so you&rsquo;re mixing against
            the sound of the genre.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {TARGETS.map((target) => (
              <div
                key={target.name}
                className="group relative aspect-[16/10] overflow-hidden border border-white/10 bg-white/[0.03] transition-colors duration-300 hover:border-accent/60"
              >
                <TargetVisual
                  variant={target.variant}
                  image={target.image}
                  alt={target.alt}
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent px-5 pb-6 pt-16">
                  <span className="font-display text-xl uppercase leading-[0.95] transition-colors duration-300 group-hover:text-accent sm:text-2xl">
                    {target.name}
                  </span>
                  <span className="mt-2 block h-0.5 w-8 bg-accent transition-all duration-300 ease-out group-hover:w-16" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Reviews — extracted to a client component (ReviewsCarousel) since
            it needs interactivity (prev/next arrow buttons, scroll-edge
            state) beyond what a Server Component can do. */}
        <ReviewsCarousel />

        {/* System requirements + License & guarantee — merged onto one row
            so the two shorter trust-building lists sit side by side instead
            of each claiming a full-height section. License and guarantee
            bullets are combined into a single list (no separate subheading)
            per the same request. */}
        <section className="border-t border-white/10 px-6 py-20 sm:px-12 lg:py-28">
          <div className="grid gap-16 sm:grid-cols-2">
            <div>
              <h2 className="font-display text-4xl uppercase leading-[0.95] sm:text-5xl">
                System requirements.
              </h2>
              <div className="mt-10">
                <span className="font-display text-sm uppercase tracking-widest text-accent">
                  Platform
                </span>
                <ul className="mt-4 flex flex-col gap-3 border-t border-white/10 pt-4 text-white/70">
                  {REQUIREMENTS.platform.map((line) => (
                    <li key={line} className="flex gap-3">
                      <span className="shrink-0 text-accent">—</span>
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <h2 className="font-display text-4xl uppercase leading-[0.95] sm:text-5xl">
                License &amp; guarantee.
              </h2>
              <ul className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-4 text-white/70">
                <li className="flex gap-3">
                  <span className="shrink-0 text-accent">—</span>
                  One paid license per user, for use across your own machines
                </li>
                <li className="flex gap-3">
                  <span className="shrink-0 text-accent">—</span>
                  No subscription, no iLok, no dongle — a single offline key
                </li>
                <li className="flex gap-3">
                  <span className="shrink-0 text-accent">—</span>
                  Free updates for the life of the license
                </li>
                <li className="flex gap-3">
                  <span className="shrink-0 text-accent">—</span>
                  14-day money-back guarantee, no questions asked
                </li>
                <li className="flex gap-3">
                  <span className="shrink-0 text-accent">—</span>
                  Refund requests go through the same contact form below
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ — centered accordion. Native <details>/<summary> so it works
            without client JS, in keeping with Server Components by default. */}
        <section className="border-t border-white/10 px-6 py-20 sm:px-12 lg:py-28">
          <h2 className="text-center font-display text-4xl uppercase leading-[0.95] sm:text-5xl">
            FAQ.
          </h2>
          <div className="mx-auto mt-10 max-w-2xl divide-y divide-white/10 border-t border-white/10">
            {FAQ.map((item) => (
              <details key={item.q} className="group py-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg uppercase leading-tight [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span className="shrink-0 font-display text-2xl leading-none text-accent transition-transform duration-200 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-white/60">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Closing CTA — buy button repeated after all the trust-building
            content (features, reviews, requirements, FAQ). */}
        <section className="border-t border-white/10 px-6 py-20 text-center sm:px-12 lg:py-28">
          <h2 className="font-display text-4xl uppercase leading-[0.95] sm:text-5xl">
            Stop guessing.
            <br />
            Start hearing it.
          </h2>
          <Link
            href="/#contact"
            className="mt-8 inline-block bg-accent px-8 py-4 font-display text-base uppercase tracking-wide text-black transition-colors hover:bg-white"
          >
            Buy — {PLUGIN.price}
          </Link>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
