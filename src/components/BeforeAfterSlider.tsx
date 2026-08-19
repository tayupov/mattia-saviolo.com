"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// Same capture as dark-shaped.png (used in the hero and InteractiveScreenshot)
// paired with its pre-Shape counterpart: identical track, identical target,
// only the Shape button differs. Proves feature 02 ("One-click Shape") with
// a real screenshot instead of a claim. After is deliberately the light
// theme rather than dark-shaped.png — the two curves alone read as a
// subtle EQ tweak, but the theme swap makes which side is which obvious at
// a glance, without needing a text label.
const BEFORE = { src: "/sentinella/dark-unshaped.png" };
const AFTER = { src: "/sentinella/light-shaped.png" };

const IMG_ASPECT = "3420/1860";

export function BeforeAfterSlider() {
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasInteractedRef = useRef(false);
  const wiggleFrameRef = useRef<number | null>(null);

  function clampPosition(value: number) {
    return Math.min(100, Math.max(0, value));
  }

  function cancelWiggle() {
    if (wiggleFrameRef.current !== null) {
      cancelAnimationFrame(wiggleFrameRef.current);
      wiggleFrameRef.current = null;
    }
  }

  // One-time hint animation — a slow, eased glide to the left and back to
  // the resting position — so first-time visitors realize this bar is
  // draggable rather than a static illustration. Driven by a continuous
  // requestAnimationFrame loop through a single there-and-back excursion
  // (not a multi-beat wiggle), so it reads as a deliberate demo drag. Only
  // fires once the slider scrolls into view, and bails immediately if the
  // visitor starts interacting with it (or prefers reduced motion).
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasInteractedRef.current) return;
        hasInteractedRef.current = true;
        observer.disconnect();

        const base = position;
        const amplitude = 36; // how far left, in % of track width
        const outRatio = 0.55; // fraction of duration spent gliding left
        const duration = 1500; // ms, full there-and-back
        const start = performance.now();

        const easeInOutCubic = (t: number) =>
          t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

        const step = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          let offset: number;
          if (t < outRatio) {
            offset = -amplitude * easeInOutCubic(t / outRatio);
          } else {
            const returnT = (t - outRatio) / (1 - outRatio);
            offset = -amplitude * (1 - easeInOutCubic(returnT));
          }
          setPosition(clampPosition(base + offset));

          if (t < 1) {
            wiggleFrameRef.current = requestAnimationFrame(step);
          } else {
            setPosition(base);
            wiggleFrameRef.current = null;
          }
        };
        wiggleFrameRef.current = requestAnimationFrame(step);
      },
      { threshold: 0.6 },
    );
    observer.observe(node);

    return () => {
      observer.disconnect();
      cancelWiggle();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function updateFromClientX(clientX: number) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const fraction = ((clientX - rect.left) / rect.width) * 100;
    setPosition(clampPosition(fraction));
  }

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    hasInteractedRef.current = true;
    cancelWiggle();
    setDragging(true);
    containerRef.current?.setPointerCapture(event.pointerId);
    updateFromClientX(event.clientX);
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!dragging) return;
    updateFromClientX(event.clientX);
  }

  function endDrag() {
    setDragging(false);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (
      event.key === "ArrowLeft" ||
      event.key === "ArrowRight" ||
      event.key === "Home" ||
      event.key === "End"
    ) {
      hasInteractedRef.current = true;
      cancelWiggle();
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      setPosition((current) => Math.max(0, current - 5));
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      setPosition((current) => Math.min(100, current + 5));
    } else if (event.key === "Home") {
      event.preventDefault();
      setPosition(0);
    } else if (event.key === "End") {
      event.preventDefault();
      setPosition(100);
    }
  }

  return (
    <div>
      {/* Same halo/frame treatment as the hero shot and InteractiveScreenshot,
          so this reads as part of the same set of GUI panels rather than a
          different widget bolted on. */}
      <div className="relative mx-auto w-full max-w-5xl">
        <div
          aria-hidden
          className="absolute -inset-4 -z-10 rounded-[2rem] bg-[#4d8dff]/[0.12] blur-2xl"
        />
        <div
          ref={containerRef}
          role="slider"
          tabIndex={0}
          aria-label="Before/after comparison — drag to compare the mix unshaped and shaped"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(position)}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onKeyDown={handleKeyDown}
          style={{ aspectRatio: IMG_ASPECT, touchAction: "none" }}
          className="relative w-full cursor-ew-resize touch-none select-none overflow-hidden rounded-xl border border-white/15 bg-black shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          {/* Base layer — always the full "after" shot. */}
          <Image
            src={AFTER.src}
            alt="Sentinella — Balance curve after Shape"
            fill
            draggable={false}
            className="pointer-events-none object-cover"
          />

          {/* "Before" layer, clipped to the handle position so it only
              covers the left portion of the frame — the After layer
              underneath shows through on the right. */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          >
            <Image
              src={BEFORE.src}
              alt="Sentinella — Balance curve before Shape"
              fill
              draggable={false}
              className="object-cover"
            />
          </div>

          {/* Drag handle — a vertical accent line with a diamond grip at
              center, echoing the wordmark's angular cuts rather than a
              rounded slider knob. */}
          <div
            className="pointer-events-none absolute inset-y-0 z-10 w-0.5 bg-accent"
            style={{ left: `${position}%`, transform: "translateX(-50%)" }}
          >
            <div
              className="absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-accent text-black shadow-[0_8px_20px_-4px_rgba(0,0,0,0.6)]"
              style={{
                clipPath: "polygon(50% 0, 100% 50%, 50% 100%, 0 50%)",
              }}
            >
              <span className="font-display text-xs">↔</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
