import type { Metadata } from "next";
import Image from "next/image";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "About",
  description:
    "Berlin-based techno producer and mixing/mastering engineer Mattia Saviolo — 20+ years behind the desk, releases on NINETOZERO, Tronic, Kraftek, and Factory 93.",
  alternates: { canonical: "/about" },
};

const SERVICES = [
  "Mixing",
  "Mastering",
  "Sound design",
  "Arrangement editing",
  "1:1 coaching",
];

export default function AboutPage() {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />

      <main>
        {/* Intro */}
        <section className="flex min-h-[calc(100svh-73px)] flex-col pt-8 sm:pt-10">
          <div className="grid gap-12 px-6 sm:px-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-16">
            <div className="order-2 lg:order-1">
              <h1 className="font-display text-5xl uppercase leading-[0.9] sm:text-6xl lg:text-7xl">
                Twenty years
                <br />
                behind the desk.
              </h1>

              <div className="mt-8 space-y-6 text-lg leading-relaxed text-white/70">
                <p>
                  Mattia Saviolo is a Berlin-based techno producer and
                  mixing/mastering engineer with over 20 years in the
                  industry. His music and mix work sit on labels like
                  NINETOZERO, Tronic, Kraftek, and Factory 93, and his sets
                  have taken him to stages including Tomorrowland and
                  Ultra.
                </p>
                <p>
                  What started as a bedroom setup has turned into a
                  full-service mix and mastering practice — trusted by
                  artists who need masters that hold up in a club, on a
                  phone speaker, and everywhere in between. Alongside
                  production work, he runs 1:1 coaching sessions for
                  producers who want to learn the craft, not just
                  outsource it.
                </p>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div
                className="relative aspect-[4/3] w-full overflow-hidden bg-white/5 grayscale"
                style={{
                  clipPath:
                    "polygon(0 0, 100% 0, 100% calc(100% - 28px), calc(100% - 28px) 100%, 0 100%)",
                }}
              >
                <Image
                  src="/mattia-headshot.jpg"
                  alt="Mattia Saviolo in the studio"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="mt-4 overflow-hidden pt-2 pb-10 sm:mt-auto">
            <div className="flex w-max animate-[marquee_28s_linear_infinite] items-center gap-10 hover:[animation-play-state:paused] sm:gap-16">
              {[...SERVICES, ...SERVICES].map((service, index) => (
                <div key={`${service}-${index}`} className="flex items-center gap-10 sm:gap-16">
                  <span className="whitespace-nowrap font-display text-6xl uppercase leading-none sm:text-8xl">
                    {service}
                  </span>
                  <span className="text-4xl text-accent sm:text-6xl" aria-hidden="true">
                    /
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
