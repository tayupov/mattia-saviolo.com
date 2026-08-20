import Link from "next/link";
import { HeroVideo } from "./HeroVideo";

function PluginNudge({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/plugins/sentinella"
      className={`group inline-flex w-fit items-center gap-2 border border-white/20 bg-white/5 py-1.5 pl-3 pr-4 text-xs uppercase tracking-widest text-white/70 backdrop-blur-sm transition-colors hover:border-accent/50 hover:text-white ${className}`}
    >
      <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
      New — Sentinella plugin
      <span aria-hidden className="text-accent transition-transform group-hover:translate-x-0.5">
        →
      </span>
    </Link>
  );
}

function PluginCard({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/plugins/sentinella"
      className={`group flex w-72 flex-col gap-3 border border-white/15 bg-black/60 p-5 backdrop-blur-md transition-colors hover:border-accent/50 ${className}`}
    >
      <span className="inline-flex w-fit items-center gap-1.5 text-[11px] uppercase tracking-widest text-accent">
        <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
        New plugin
      </span>
      <span className="font-display text-2xl uppercase leading-none">Sentinella</span>
      <p className="text-sm leading-snug text-white/60">
        Built from my own studio work — hear how your mix
        compares to my references.
      </p>
      <span className="mt-1 inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-white/70 transition-colors group-hover:text-white">
        Explore
        <span aria-hidden className="text-accent transition-transform group-hover:translate-x-0.5">
          →
        </span>
      </span>
    </Link>
  );
}

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[calc(100svh-73px)] flex-col overflow-hidden"
    >
      <HeroVideo />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent" />

      {/* Mobile: headline + subtitle grouped at bottom */}
      <div className="animate-hero-in relative z-10 mt-auto flex flex-col px-6 pb-14 sm:px-12 lg:hidden">
        <PluginNudge className="mb-5" />
        <h1 className="font-display text-[13vw] uppercase leading-[0.85] sm:text-[8vw]">
          Production.
          <br />
          Mixing.
          <br />
          Mastering.
        </h1>

        <p className="mt-6 max-w-md border-l-2 border-accent pl-4 font-display text-2xl uppercase leading-tight text-accent sm:text-3xl">
          Join me in the studio.
        </p>
      </div>

      {/* Desktop/tablet: original bottom-aligned row layout */}
      <div className="animate-hero-in relative z-10 mt-auto hidden items-end justify-between gap-8 px-12 pb-20 lg:flex">
        <div className="max-w-3xl">
          <h1 className="font-display text-[4.8vw] uppercase leading-[0.85]">
            Production.
            <br />
            Mixing.
            <br />
            Mastering.
          </h1>
          <p className="mt-8 max-w-md border-l-2 border-accent pl-4 font-display text-3xl uppercase leading-tight text-accent">
            Join me in the studio.
          </p>
        </div>

        <PluginCard className="shrink-0" />
      </div>
    </section>
  );
}
