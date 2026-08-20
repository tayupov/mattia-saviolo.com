"use client";

import { useEffect, useRef, useState } from "react";

// Split out from Hero.tsx (a Server Component) purely so this can hold the
// ref/effect needed to detect a blocked autoplay. `autoPlay` alone works on
// most devices, but some mobile browsers (iOS Low Power Mode, in-app
// webviews, Low Data Mode) silently reject it — no error event fires, the
// <video> just sits frozen on its poster with no way to start it. Calling
// play() ourselves gives us the promise so we can catch that rejection and
// fall back to a tap-to-play button, the same affordance already used in
// Showreel.tsx / PluginVideoPlayer.tsx for their click-to-play videos.
export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  useEffect(() => {
    const attempt = videoRef.current?.play();
    attempt?.catch(() => setAutoplayBlocked(true));
  }, []);

  return (
    <>
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover grayscale"
        poster="/brand/video-thumbnail.png"
        src="/brand/hero-loop.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      {autoplayBlocked && (
        <button
          type="button"
          onClick={() => {
            videoRef.current
              ?.play()
              .then(() => setAutoplayBlocked(false))
              .catch(() => {});
          }}
          aria-label="Play video"
          className="group absolute left-1/2 top-1/2 z-10 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center border-2 border-accent bg-black/60 transition-transform hover:scale-110 sm:h-20 sm:w-20"
        >
          <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6 fill-accent sm:h-8 sm:w-8">
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
      )}
    </>
  );
}
