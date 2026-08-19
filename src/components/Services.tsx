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
    name: "1:1 coaching &\nco-production",
    description:
      "Learn sound design, low-end power, mixing, and finishing — while we work on your own tracks. In-studio in Berlin or remote via video call.",
  },
  {
    number: "04",
    name: "Track feedback",
    description:
      "Send a track, get honest, detailed notes on the mix, arrangement, and whether it's ready for release.",
  },
  {
    number: "05",
    name: "Industry insights",
    description:
      "How to approach labels, write emails that get replies, and navigate a release from demo to drop.",
  },
];

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
            15+
          </span>
          <h2 className="mt-4 font-display text-4xl uppercase leading-[0.95] sm:text-5xl">
            Years behind the desk.
          </h2>
          <p
            className={`mt-6 max-w-md text-lg leading-relaxed ${
              light ? "text-black/70" : "text-white/70"
            }`}
          >
            Berlin-based techno producer and mixing/mastering engineer, with
            releases on Drumcode, NINETOZERO, Tronic, Kraftek, and Factory
            93 — played at Awakenings, Tomorrowland and Ultra. Available remote or
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
            const isCoaching = service.number === "03";
            return (
              <li
                key={service.number}
                id={isCoaching ? "coaching" : undefined}
                className="group"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="flex w-full flex-col gap-2 py-4 text-left sm:cursor-default sm:flex-row sm:items-start sm:gap-8"
                >
                  <span
                    className={`font-display text-lg sm:w-12 sm:shrink-0 ${
                      light ? "text-black/30" : "text-white/30"
                    }`}
                  >
                    {service.number}
                  </span>
                  <span className="flex flex-1 items-center justify-between gap-4 sm:justify-start">
                    <span className="whitespace-pre-line font-display text-2xl uppercase sm:w-72 sm:shrink-0 sm:text-3xl">
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
                    isOpen ? "grid-rows-[1fr] pb-4" : "grid-rows-[0fr]"
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
    </section>
  );
}
