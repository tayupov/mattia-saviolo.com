"use client";

import Image from "next/image";
import { useRef, useState } from "react";

const TESTIMONIALS = [
  {
    quote:
      "Worked with Mattia on a couple of mixes. His different approach added value and led to a solid result.",
    name: "Veerus",
    labels: "Drumcode, Terminal M, Filth on Acid",
    avatar: "/testimonials/veerus.jpg",
    featured: true,
  },
  {
    quote:
      "I've had an amazing session with Mattia where he showed me a lot about how he makes his huge Techno low ends.",
    name: "ADHS",
    labels: "Drumcode, Exhale, Electric Ballroom",
    avatar: "/testimonials/adhs.png",
  },
  {
    quote:
      "I've been working with Mattia for over 2 years now, and he consistently delivers top-notch results.",
    name: "Mark Michael",
    labels: "Kraftek, Terminal M",
    avatar: "/testimonials/mark-michael.jpg",
  },
  {
    quote:
      "I had a great experience working with Mattia. His communication throughout the process was excellent.",
    name: "Jose Bonetto",
    labels: "Set About, Electric Ballroom, Spannung Records",
    avatar: "/testimonials/jose-bonetto.jpg",
  },
  {
    quote:
      "Working with Mattia Saviolo was an absolute pleasure. He is professional, responsive, and able to deliver.",
    name: "Audio State",
    labels: "Terminal M, unri'li:s, Second State",
    avatar: "/testimonials/audio-state.png",
  },
];

export function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  function handleScroll() {
    const track = trackRef.current;
    if (!track) return;
    const slideWidth = track.clientWidth;
    const index = Math.round(track.scrollLeft / slideWidth);
    setActiveIndex(index);
  }

  function scrollToIndex(index: number) {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: index * track.clientWidth, behavior: "smooth" });
  }

  return (
    <section
      id="testimonials"
      className="px-6 py-20 sm:px-12 lg:py-28"
    >
      <h2 className="font-display text-4xl uppercase sm:text-5xl">
        What artists say.
      </h2>

      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="mt-12 flex snap-x snap-mandatory gap-px overflow-x-auto overscroll-x-contain scroll-smooth border border-white/10 bg-white/10 [-ms-overflow-style:none] [scrollbar-width:none] sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-3 [&::-webkit-scrollbar]:hidden"
      >
        {TESTIMONIALS.map((testimonial) => (
          <figure
            key={testimonial.name}
            className={`flex w-full shrink-0 snap-start flex-col justify-between gap-8 bg-black p-8 sm:w-auto sm:shrink ${
              testimonial.featured ? "sm:col-span-2 lg:col-span-2" : ""
            }`}
          >
            <blockquote
              className={`font-display uppercase leading-tight text-white/90 ${
                testimonial.featured ? "text-3xl sm:text-4xl" : "text-2xl"
              }`}
            >
              <span className="text-accent">&ldquo;</span>
              {testimonial.quote}
              <span className="text-accent">&rdquo;</span>
            </blockquote>
            <figcaption className="flex items-center gap-4">
              <div
                className="relative h-14 w-14 shrink-0 overflow-hidden bg-white/10 grayscale"
                style={{ clipPath: "polygon(12% 0, 100% 0, 88% 100%, 0 100%)" }}
              >
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-display text-lg uppercase">
                  {testimonial.name}
                </p>
                <p className="mt-1 text-sm text-white/50">
                  {testimonial.labels}
                </p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-6 flex justify-center gap-3 sm:hidden">
        {TESTIMONIALS.map((testimonial, index) => (
          <button
            key={testimonial.name}
            type="button"
            aria-label={`Go to testimonial ${index + 1}`}
            onClick={() => scrollToIndex(index)}
            className={`h-2 w-2 transition-colors ${
              index === activeIndex ? "bg-accent" : "bg-white/20"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
