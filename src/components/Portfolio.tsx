"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

type Release = {
  title: string;
  artist: string;
  label: string;
  coverUrl: string;
  spotifyUrl: string;
};

const RELEASES: Release[] = [
  {
    title: "Move Your Body (EP)",
    artist: "Veerus, Mattia Saviolo",
    label: "Drumcode",
    coverUrl: "https://i.scdn.co/image/ab67616d0000b273cba7d0a96d4bf7a6845ece87",
    spotifyUrl: "https://open.spotify.com/album/5cgWFOpEQFfLmCFiHkKMKJ",
  },
  {
    title: "Funke (Audio State Remix)",
    artist: "Pan-Pot, Audio State (RO)",
    label: "Second State Audio",
    coverUrl: "https://i.scdn.co/image/ab67616d0000b273731e8c37aa010e771d5b98eb",
    spotifyUrl: "https://open.spotify.com/album/2LoGJvZwgvUg29rmY7F7so",
  },
  {
    title: "Break (Single)",
    artist: "Devid Dega",
    label: "Terminal M",
    coverUrl: "https://i.scdn.co/image/ab67616d0000b273f2a2c318ebcab5871519c9ea",
    spotifyUrl: "https://open.spotify.com/album/2vMvXw2nF5KvEHuhGY3jiw",
  },
  {
    title: "Valkyrie (EP)",
    artist: "Mattia Saviolo, Subject32",
    label: "Kraftek",
    coverUrl: "https://i.scdn.co/image/ab67616d0000b2732580eea07937f040bb98d719",
    spotifyUrl: "https://open.spotify.com/album/4uLU3R16gIHbu3n1nhMxNL",
  },
  {
    title: "Algorythm (Single)",
    artist: "Veerus",
    label: "Le Club Records",
    coverUrl: "https://i.scdn.co/image/ab67616d0000b273b036a701c432452d9ddf6b11",
    spotifyUrl: "https://open.spotify.com/album/051dK6i3lpcaeNekJbiIby",
  },
  {
    title: "Astel (EP)",
    artist: "Mattia Saviolo",
    label: "Hypnostate",
    coverUrl: "https://i.scdn.co/image/ab67616d0000b2730047ec1331d4796910b68a40",
    spotifyUrl: "https://open.spotify.com/album/7IPVqgQjOvY3MQ3IYTfm7I",
  },
  {
    title: "Distant Memories",
    artist: "Mattia Saviolo",
    label: "NINETOZERO",
    coverUrl: "https://i.scdn.co/image/ab67616d0000b273edfc1b8bc99d30075c787245",
    spotifyUrl: "https://open.spotify.com/album/2cX9QC3jope2AZovyjGmih",
  },
  {
    title: "Nu Human (EP)",
    artist: "Mark Michael",
    label: "Odd Recordings",
    coverUrl: "https://i.scdn.co/image/ab67616d0000b27347066a12a4c752bb6cb7a1ef",
    spotifyUrl: "https://open.spotify.com/album/7cXr1zAxf5l3sCvDmaWuQm",
  },
  {
    title: "Underground (EP)",
    artist: "Devid Dega",
    label: "DCLTD (Drumcode Limited)",
    coverUrl: "https://i.scdn.co/image/ab67616d0000b27329e7992679b1cc6b83a3c69f",
    spotifyUrl: "https://open.spotify.com/album/4EioSXSHxQQFqMNnIHAaJx",
  },
  {
    title: "World Connected (EP)",
    artist: "RAYO (ITA)",
    label: "Off Recordings",
    coverUrl: "https://i.scdn.co/image/ab67616d0000b273aa4593a8bb233e3bb963978b",
    spotifyUrl: "https://open.spotify.com/album/4DvHKpAy3F7ZY4Ccx3uNqn",
  },
  {
    title: "FOUR ON JAM 9 (EP)",
    artist: "Audio State (RO)",
    label: "JAM",
    coverUrl: "https://i.scdn.co/image/ab67616d0000b273fc7b32bfc23db65fa76da3aa",
    spotifyUrl: "https://open.spotify.com/album/5Xwypc7Wv6WFUcgrj9H0wA",
  },
  {
    title: "Infinite Sunrise (EP)",
    artist: "Mattia Saviolo",
    label: "VOLTA",
    coverUrl: "https://i.scdn.co/image/ab67616d0000b273e4205be9d53a3fae010286e5",
    spotifyUrl: "https://open.spotify.com/album/0FnQhmYw3YDRGhA0CFVW5v",
  },
  {
    title: "Riding Waves (Single)",
    artist: "Mattia Saviolo",
    label: "Factory 93 Records",
    coverUrl: "https://i.scdn.co/image/ab67616d0000b27352d209da13f5eb5f1e80531a",
    spotifyUrl: "https://open.spotify.com/album/0UNKbIpPbX8e5E4FqLtFqi",
  },
];

function ReleaseCover({ release }: { release: Release }) {
  return (
    <a
      href={release.spotifyUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Listen to ${release.title} by ${release.artist} on Spotify`}
      className="group/cover relative aspect-square w-44 shrink-0 overflow-hidden border border-white/10 bg-white/[0.04] outline-none sm:w-52"
    >
      <Image
        src={release.coverUrl}
        alt={`${release.title} cover art — ${release.artist}`}
        fill
        sizes="(min-width: 640px) 208px, 176px"
        className="object-cover transition-transform duration-300 group-hover/cover:scale-[1.02] group-focus-visible/cover:scale-[1.02]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-4">
        <span className="font-display text-xs uppercase tracking-wider text-accent">
          {release.label}
        </span>
        <span className="mt-1 block font-display text-lg uppercase leading-tight">
          {release.title}
        </span>
        <span className="block text-xs text-white/60">{release.artist}</span>
      </div>
      <span className="absolute inset-0 border-2 border-transparent transition-colors group-hover/cover:border-accent group-focus-visible/cover:border-accent" />
    </a>
  );
}

// Auto-advances via rAF-driven `scrollLeft` around a duplicated track (list
// rendered twice, so halfway through its scroll width is one full loop).
// Same behaviour on every input: autoplay pauses as soon as a pointer
// touches it, and a drag/swipe always wins over the animation.
//   - Touch: left to native `overflow-x-auto` scrolling — browsers already
//     handle touch drag natively, so we just pause/resume around it.
//   - Mouse: browsers don't scroll on click-drag by default, so mouse
//     pointers get manual drag-to-scroll (with a moved-far-enough check that
//     suppresses the click, so a drag doesn't also open the Spotify link).
const SCROLL_SPEED = 40; // px/sec
const RESUME_DELAY = 2000; // ms after release before autoplay resumes
const DRAG_CLICK_THRESHOLD = 6; // px of movement before a drag suppresses the click

function PortfolioScroller({ releases }: { releases: Release[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const draggingRef = useRef(false);
  const movedRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    let frame: number;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      if (!pausedRef.current) {
        const halfWidth = el.scrollWidth / 2;
        el.scrollLeft += SCROLL_SPEED * dt;
        if (el.scrollLeft >= halfWidth) {
          el.scrollLeft -= halfWidth;
        }
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  const pause = () => {
    pausedRef.current = true;
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
  };
  const scheduleResume = () => {
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      pausedRef.current = false;
    }, RESUME_DELAY);
  };

  // Mouse dragging is tracked via window-level listeners rather than
  // setPointerCapture — capture retargets every subsequent pointer/mouse
  // event (including the eventual click) to this container, which stops the
  // anchor underneath from ever seeing a click and breaks navigation, drag
  // or not.
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    pause();
    if (e.pointerType !== "mouse") return;
    const el = scrollerRef.current;
    if (!el) return;
    draggingRef.current = true;
    movedRef.current = false;
    startXRef.current = e.clientX;
    startScrollLeftRef.current = el.scrollLeft;

    const handleWindowPointerMove = (ev: PointerEvent) => {
      const deltaX = ev.clientX - startXRef.current;
      if (Math.abs(deltaX) > DRAG_CLICK_THRESHOLD) movedRef.current = true;
      el.scrollLeft = startScrollLeftRef.current - deltaX;
    };
    const handleWindowPointerUp = () => {
      draggingRef.current = false;
      scheduleResume();
      window.removeEventListener("pointermove", handleWindowPointerMove);
      window.removeEventListener("pointerup", handleWindowPointerUp);
    };
    window.addEventListener("pointermove", handleWindowPointerMove);
    window.addEventListener("pointerup", handleWindowPointerUp);
  };

  // Touch has no drag tracking of its own to clean up — this just resumes
  // autoplay after native touch scrolling releases.
  const handlePointerUp = () => {
    scheduleResume();
  };

  const handleClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
    if (movedRef.current) {
      e.preventDefault();
      movedRef.current = false;
    }
  };

  const track = [...releases, ...releases];
  const fade =
    "linear-gradient(to right, transparent, black 5%, black 95%, transparent)";

  return (
    <div style={{ WebkitMaskImage: fade, maskImage: fade }}>
      <div
        ref={scrollerRef}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onClickCapture={handleClickCapture}
        className="flex cursor-grab gap-6 overflow-x-auto px-6 [-ms-overflow-style:none] [scrollbar-width:none] active:cursor-grabbing sm:px-12 [&::-webkit-scrollbar]:hidden"
      >
        {track.map((release, index) => (
          <ReleaseCover key={`${release.title}-${index}`} release={release} />
        ))}
      </div>
    </div>
  );
}

export function Portfolio() {
  return (
    <section className="overflow-hidden pt-16 pb-16 sm:pb-20">
      <PortfolioScroller releases={RELEASES} />
    </section>
  );
}
