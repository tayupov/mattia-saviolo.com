"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { REVIEWS } from "@/data/reviews";

function Stars({ rating }: { rating: number }) {
  return (
    <span aria-label={`${rating} out of 5 stars`} className="font-display text-sm tracking-widest">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < rating ? "text-accent" : "text-white/15"}>
          ★
        </span>
      ))}
    </span>
  );
}

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="h-4 w-4 fill-none stroke-current stroke-2"
    >
      <path
        d={direction === "left" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"}
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

const EDGE_THRESHOLD = 4; // px — treated as "at the edge" to absorb subpixel rounding

export function ReviewsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  function updateEdges() {
    const track = trackRef.current;
    if (!track) return;
    setAtStart(track.scrollLeft <= EDGE_THRESHOLD);
    setAtEnd(
      track.scrollLeft + track.clientWidth >= track.scrollWidth - EDGE_THRESHOLD,
    );
  }

  // Card widths are breakpoint-driven percentages, so whether the track
  // overflows at all (and how far) changes on resize — recheck rather than
  // trusting the initial guess.
  useEffect(() => {
    updateEdges();
    window.addEventListener("resize", updateEdges);
    return () => window.removeEventListener("resize", updateEdges);
  }, []);

  function scrollByCard(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-review-card]");
    const gap = 24; // gap-6
    const amount = card ? card.offsetWidth + gap : track.clientWidth * 0.85;
    track.scrollBy({ left: amount * direction, behavior: "smooth" });
  }

  return (
    <section className="border-t border-white/10 py-20 sm:py-28">
      <div className="flex items-end justify-between gap-4 px-6 sm:px-12">
        <h2 className="font-display text-4xl uppercase leading-[0.95] sm:text-5xl">
          What producers are saying.
        </h2>
        <div className="hidden shrink-0 gap-2 sm:flex">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            disabled={atStart}
            aria-label="Previous review"
            className="flex h-10 w-10 items-center justify-center border border-white/15 text-white/70 transition-colors hover:border-accent hover:text-accent disabled:pointer-events-none disabled:opacity-25"
          >
            <ArrowIcon direction="left" />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            disabled={atEnd}
            aria-label="Next review"
            className="flex h-10 w-10 items-center justify-center border border-white/15 text-white/70 transition-colors hover:border-accent hover:text-accent disabled:pointer-events-none disabled:opacity-25"
          >
            <ArrowIcon direction="right" />
          </button>
        </div>
      </div>

      <div className="relative mt-10">
        <div
          ref={trackRef}
          onScroll={updateEdges}
          // scroll-px-* matches the visual px-* padding — without it, the
          // browser's snap target doesn't account for the gutter and
          // settles the first/last card a few px into the padding instead
          // of flush against it (visible as a "pop"/lean at rest and after
          // scrolling back to the start).
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto overscroll-x-contain scroll-smooth px-6 scroll-px-6 [-ms-overflow-style:none] [scrollbar-width:none] sm:px-12 sm:scroll-px-12 [&::-webkit-scrollbar]:hidden"
        >
          {REVIEWS.map((review) => (
            <div
              key={review.quote}
              data-review-card
              className="flex w-[85%] shrink-0 snap-start flex-col gap-4 border border-white/10 bg-white/[0.03] p-6 sm:w-[46%] lg:w-[30%]"
            >
              <Stars rating={review.rating} />
              <p className="text-white/70">&ldquo;{review.quote}&rdquo;</p>
              <div className="mt-auto flex items-center gap-3">
                <div
                  className="relative h-10 w-10 shrink-0 overflow-hidden bg-white/10 grayscale"
                  style={{
                    clipPath: "polygon(12% 0, 100% 0, 88% 100%, 0 100%)",
                  }}
                >
                  {review.avatar ? (
                    <Image
                      src={review.avatar}
                      alt={review.name}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  ) : (
                    // Fallback for a named review added before its photo is
                    // sourced — see Alex Lentini's earlier placeholder.
                    <span className="flex h-full w-full items-center justify-center font-display text-sm text-white/60">
                      {review.name
                        .split(" ")
                        .map((word) => word[0])
                        .join("")
                        .slice(0, 2)}
                    </span>
                  )}
                </div>
                <div>
                  <p className="font-display text-sm uppercase leading-tight">
                    {review.name}
                  </p>
                  <p className="mt-0.5 text-xs text-white/40">
                    {review.labels}
                  </p>
                  {review.achievement && (
                    <p className="mt-0.5 text-xs uppercase tracking-wide text-accent">
                      {review.achievement}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Edge fades only read as "more to scroll" when there's more to
            scroll — shown fixed regardless of position, the left one used
            to shade the first card even at rest, reading as an odd lean. */}
        <div
          className={`pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-background to-transparent transition-opacity duration-300 sm:w-12 ${atStart ? "opacity-0" : "opacity-100"}`}
        />
        <div
          className={`pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-background to-transparent transition-opacity duration-300 sm:w-12 ${atEnd ? "opacity-0" : "opacity-100"}`}
        />
      </div>
    </section>
  );
}
