import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { osIcon } from "@/components/OsIcons";

export const metadata: Metadata = {
  title: "Plugins",
  description:
    "Studio tools for mixing and mastering techno, built by Mattia Saviolo. Sentinella, a real-time mix-reference plugin, is available now.",
  alternates: { canonical: "/plugins" },
};

// PLACEHOLDER content — replace with real plugin names/copy/pricing. Each
// entry links through to its own detail page at /plugins/{slug}, except
// coming-soon entries, which don't have one yet.
type PluginSummary = {
  slug: string;
  name: string;
  tagline: string;
  formats: string[];
  os?: string[];
  status: "available" | "coming-soon";
  price?: string;
  image?: string;
};

const PLUGINS: PluginSummary[] = [
  {
    slug: "sentinella",
    name: "SENTINELLA",
    tagline:
      "Hear how your mix stacks up against pro techno records — live, right in your DAW.",
    formats: ["VST3", "AU", "Standalone"],
    os: ["Windows", "macOS (Apple Silicon)"],
    status: "available",
    price: "€49",
    image: "/sentinella/dark-shaped.png",
  },
  {
    slug: "loender",
    name: "LOENDER",
    tagline: "Details coming soon.",
    formats: [],
    status: "coming-soon",
  },
];

function PluginCard({ plugin }: { plugin: PluginSummary }) {
  const comingSoon = plugin.status === "coming-soon";

  const content = (
    <>
      {comingSoon && (
        <span className="absolute right-6 top-6 z-10 border border-accent px-3 py-1 font-display text-xs uppercase tracking-wide text-accent">
          Coming soon
        </span>
      )}
      <div
        className={`grid gap-6 ${plugin.image ? "lg:grid-cols-[0.9fr_1fr] lg:items-center lg:gap-8" : ""}`}
      >
        {/* Product shot — same glow treatment as the plugin's own hero, so
            the card reads as a preview of that page rather than a plain
            list entry. */}
        {plugin.image && (
          <div className="relative order-first aspect-[57/31] w-full lg:order-last">
            <div
              aria-hidden
              className="absolute -inset-3 -z-10 rounded-2xl bg-[#4d8dff]/[0.12] blur-2xl"
            />
            <div className="absolute inset-0 overflow-hidden rounded-xl border border-white/15 bg-white/[0.02]">
              <Image
                src={plugin.image}
                alt={`${plugin.name} — plugin interface`}
                fill
                className="object-cover"
              />
            </div>
          </div>
        )}
        <div>
          <h2 className="font-display text-4xl uppercase leading-none transition-colors sm:text-5xl group-hover:text-accent">
            {plugin.name}
          </h2>
          <p className="mt-3 max-w-sm text-base text-white/60">{plugin.tagline}</p>
          {plugin.formats.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {plugin.formats.map((format) => (
                <span
                  key={format}
                  className="border border-white/15 px-2.5 py-1 text-xs uppercase tracking-wide text-white/50"
                >
                  {format}
                </span>
              ))}
            </div>
          )}
          {plugin.os && (
            <div className="mt-2 flex flex-wrap gap-2">
              {plugin.os.map((os) => (
                <span
                  key={os}
                  className="flex items-center gap-1.5 border border-white/15 px-2.5 py-1 text-xs uppercase tracking-wide text-white/50"
                >
                  {osIcon(os)}
                  {os}
                </span>
              ))}
            </div>
          )}
          {plugin.price && (
            <span className="mt-4 block font-display text-2xl text-accent">
              {plugin.price}
            </span>
          )}
          {!comingSoon && (
            <span className="mt-5 inline-block font-display text-sm uppercase tracking-wide text-white/50 transition-colors group-hover:text-accent">
              View details →
            </span>
          )}
        </div>
      </div>
    </>
  );

  const className =
    "group relative block overflow-hidden border border-white/10 bg-white/[0.03] p-6 sm:p-8" +
    (comingSoon ? "" : " transition-colors hover:border-accent");

  // Coming-soon entries don't have a detail page yet — render as a plain
  // card instead of a dead link.
  if (comingSoon) {
    return <div className={className}>{content}</div>;
  }

  return (
    <Link href={`/plugins/${plugin.slug}`} className={className}>
      {content}
    </Link>
  );
}

export default function PluginsPage() {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />

      <main>
        {/* Intro */}
        <section className="flex flex-col justify-center px-6 pt-6 pb-8 sm:px-12 sm:pt-8">
          <h1 className="font-display text-4xl uppercase leading-[0.9] sm:text-5xl lg:text-6xl">
            Studio tools,
            <br />
            built from the mixing chair.
          </h1>
        </section>

        {/* Plugin list */}
        <section className="px-6 pb-20 sm:px-12 lg:pb-28">
          <div className="grid gap-6">
            {PLUGINS.map((plugin) => (
              <PluginCard key={plugin.slug} plugin={plugin} />
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
