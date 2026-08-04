"use client";

import { useState } from "react";
import Image from "next/image";

type ShowreelProps = {
  theme?: "dark" | "light";
};

export function Showreel({ theme = "dark" }: ShowreelProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section
      className={`px-6 py-20 sm:px-12 lg:py-28 ${
        theme === "light" ? "bg-white text-black" : ""
      }`}
    >
      <h2 className="text-center font-display text-4xl uppercase sm:text-5xl">
        In the studio.
      </h2>

      <div className="relative mx-auto mt-10 aspect-video max-w-4xl overflow-hidden bg-black">
        {isPlaying ? (
          <video
            className="h-full w-full object-cover"
            src="/brand/hero-video.mp4"
            poster="/brand/video-thumbnail.png"
            controls
            autoPlay
            playsInline
          />
        ) : (
          <button
            type="button"
            onClick={() => setIsPlaying(true)}
            className="group absolute inset-0"
            aria-label="Play video"
          >
            <Image
              src="/brand/video-thumbnail.png"
              alt="Mattia Saviolo in the studio"
              fill
              className="object-cover grayscale transition-opacity group-hover:opacity-80"
            />
            <span className="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/10" />
            <span className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center border-2 border-accent bg-black/60 transition-transform group-hover:scale-110 sm:h-24 sm:w-24">
              <svg viewBox="0 0 24 24" className="ml-1 h-8 w-8 fill-accent">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>
        )}
      </div>
    </section>
  );
}
