import type { ReactNode } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <main className="flex-1 px-6 py-16 sm:px-12 lg:py-24">
        <div className="mx-auto max-w-2xl">
          <h1 className="font-display text-4xl uppercase leading-[0.95] sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 text-xs uppercase tracking-widest text-white/30">
            Last updated {updated}
          </p>
          <div className="mt-12 space-y-10">{children}</div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

export function LegalSection({
  heading,
  children,
}: {
  heading: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h2 className="font-display text-xl uppercase tracking-wide text-white">
        {heading}
      </h2>
      <div className="mt-3 space-y-4 text-sm leading-relaxed text-white/60">
        {children}
      </div>
    </section>
  );
}
