"use client";

import Image from "next/image";
import { useState } from "react";

type PluginVideoPlayerProps = {
  videoSrc: string;
  posterSrc: string;
  alt: string;
};

// Same click-to-play treatment as Showreel.tsx's "In the studio" video,
// generalized to take a src/poster so it can front a plugin demo instead.
export function PluginVideoPlayer({ videoSrc, posterSrc, alt }: PluginVideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="relative mx-auto mt-10 aspect-video max-w-4xl overflow-hidden bg-black">
      {isPlaying ? (
        <video
          className="h-full w-full object-cover"
          src={videoSrc}
          poster={posterSrc}
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
          <Image src={posterSrc} alt={alt} fill className="object-cover" />
          <span className="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/10" />
          <span className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center border-2 border-accent bg-black/60 transition-transform group-hover:scale-110 sm:h-24 sm:w-24">
            <svg viewBox="0 0 24 24" className="ml-1 h-8 w-8 fill-accent">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
