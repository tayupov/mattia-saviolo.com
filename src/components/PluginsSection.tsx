import Image from "next/image";
import Link from "next/link";
import { osIcon } from "@/components/OsIcons";

const PLUGIN = {
  name: "SENTINELLA",
  tagline:
    "The reference tool I use in my own studio — now live in your DAW.",
  formats: ["VST3", "AU", "Standalone"],
  os: ["Windows", "macOS (Apple Silicon)"],
  price: "€49",
  image: "/sentinella/dark-shaped.png",
};

export function PluginsSection() {
  return (
    <section id="plugins" className="px-6 py-20 sm:px-12 lg:py-28">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-4xl uppercase leading-[0.95] sm:text-5xl">
            Studio tools built from the mixing chair.
          </h2>
        </div>
      </div>

      <div
        className="relative mt-14 overflow-hidden border border-white/10 bg-white/[0.03] p-8 sm:p-12"
        style={{
          clipPath:
            "polygon(0 0, 100% 0, 100% calc(100% - 28px), calc(100% - 28px) 100%, 0 100%)",
        }}
      >
        <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-12">
          <div>
            <h3 className="font-display text-3xl uppercase leading-none sm:text-6xl">
              {PLUGIN.name}
            </h3>
            <p className="mt-4 max-w-sm text-lg text-white/60">{PLUGIN.tagline}</p>
            <div className="mt-6 flex flex-wrap gap-2">
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
            <span className="mt-6 block font-display text-4xl text-accent">
              {PLUGIN.price}
            </span>
          </div>

          {/* Product shot — same glow treatment as the plugin's own hero. */}
          <div className="relative order-first aspect-video w-full lg:order-last">
            <div
              aria-hidden
              className="absolute -inset-4 -z-10 rounded-[2rem] bg-[#4d8dff]/[0.12] blur-2xl"
            />
            <div className="absolute inset-0 overflow-hidden rounded-xl border border-white/15 bg-white/[0.02]">
              <Image
                src={PLUGIN.image}
                alt={`${PLUGIN.name} — plugin interface`}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/plugins/sentinella"
          className="inline-block bg-accent px-8 py-4 font-display text-base uppercase tracking-wide text-black transition-colors hover:bg-white"
        >
          Explore Sentinella
        </Link>
      </div>
    </section>
  );
}
