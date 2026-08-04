"use client";

import { useState } from "react";

const SERVICES = [
  {
    number: "01",
    name: "Mixing",
    description: "Balance, depth, and punch — tracks ready for the club system.",
  },
  {
    number: "02",
    name: "Mastering",
    description: "Loud, translatable masters that hold up on any sound system.",
  },
  {
    number: "03",
    name: "Sound design",
    description: "Custom patches, low-ends, and textures built from scratch.",
  },
  {
    number: "04",
    name: "Melodic composition",
    description: "Hooks and progressions written into your arrangement.",
  },
  {
    number: "05",
    name: "Arrangement editing",
    description: "Creative structure that keeps a floor moving from intro to outro.",
  },
];

const COACHING_TOPICS = ["Sound design", "Low-end power", "Mixing", "Finishing tracks"];

type ServicesProps = {
  theme?: "dark" | "light";
};

export function Services({ theme = "dark" }: ServicesProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const light = theme === "light";

  return (
    <section
      id="services"
      className={`px-6 py-20 sm:px-12 lg:py-28 ${light ? "bg-white text-black" : ""}`}
    >
      <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-20">
        <div>
          <span className="font-display text-6xl text-accent sm:text-7xl">
            20+
          </span>
          <h2 className="mt-4 font-display text-4xl uppercase leading-[0.95] sm:text-5xl">
            Years behind
            <br />
            the desk.
          </h2>
          <p
            className={`mt-6 max-w-md text-lg leading-relaxed ${
              light ? "text-black/70" : "text-white/70"
            }`}
          >
            Berlin-based techno producer and mixing/mastering engineer, with
            releases on Drumcode, NINETOZERO, Tronic, Kraftek, and Factory
            93 — played at Tomorrowland and Ultra. Available remote or
            in-studio in Berlin.
          </p>
        </div>

        <ul
          className={
            light
              ? "divide-y divide-black/10 border-t border-black/10"
              : "divide-y divide-white/10 border-t border-white/10"
          }
        >
          {SERVICES.map((service, index) => {
            const isOpen = openIndex === index;
            return (
              <li key={service.number} className="group">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="flex w-full flex-col gap-2 py-6 text-left sm:cursor-default sm:flex-row sm:items-baseline sm:gap-8"
                >
                  <span
                    className={`font-display text-lg sm:w-12 sm:shrink-0 ${
                      light ? "text-black/30" : "text-white/30"
                    }`}
                  >
                    {service.number}
                  </span>
                  <span className="flex flex-1 items-center justify-between gap-4 sm:justify-start">
                    <span className="font-display text-2xl uppercase transition-colors sm:w-72 sm:shrink-0 sm:text-3xl sm:group-hover:text-accent">
                      {service.name}
                    </span>
                    <svg
                      viewBox="0 0 24 24"
                      className={`h-5 w-5 shrink-0 transition-transform sm:hidden ${
                        light ? "text-black/40" : "text-white/40"
                      } ${isOpen ? "rotate-45" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="square" d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                  <span
                    className={`hidden sm:block sm:max-w-sm ${
                      light ? "text-black/60" : "text-white/60"
                    }`}
                  >
                    {service.description}
                  </span>
                </button>
                <div
                  className={`grid overflow-hidden transition-all duration-300 ease-out sm:hidden ${
                    isOpen ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="min-h-0">
                    <p className={`pl-0 ${light ? "text-black/60" : "text-white/60"}`}>
                      {service.description}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div
        id="coaching"
        className={`mt-16 grid gap-10 border-t pt-16 lg:mt-20 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-center lg:gap-20 lg:pt-20 ${
          light ? "border-black/10" : "border-white/10"
        }`}
      >
        <div>
          <h2 className="font-display text-4xl uppercase leading-[0.95] sm:text-5xl">
            1:1 coaching
            <br />
            <span className="text-accent">&amp; co-production.</span>
          </h2>
          <p
            className={`mt-6 max-w-lg text-lg leading-relaxed ${
              light ? "text-black/70" : "text-white/70"
            }`}
          >
            Learn sound design, low-end power, mixing, and finishing — while
            we work on your own tracks. In-studio in Berlin or remote via
            video call.
          </p>
          <a
            href="#contact"
            className={`mt-8 inline-block border px-6 py-3 text-sm uppercase tracking-wider transition-colors hover:border-accent hover:text-accent ${
              light ? "border-black/30" : "border-white/30"
            }`}
          >
            Book a session
          </a>
        </div>

        <ul className="flex flex-wrap gap-3">
          {COACHING_TOPICS.map((topic) => (
            <li
              key={topic}
              className="border border-accent/40 px-5 py-3 font-display text-lg uppercase text-accent"
            >
              {topic}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
