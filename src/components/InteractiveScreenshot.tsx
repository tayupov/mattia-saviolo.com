"use client";

import Image from "next/image";
import { useState } from "react";

// Dark/light theme assets. Both screenshots (and both loop videos) are the
// same 3420x1860 GUI capture, just in the plugin's other color theme, so the
// HOTSPOTS boxes below (measured against dark-shaped.png) line up on all of
// them.
const ASSETS: Record<"dark" | "light", { video: string; poster: string; image: string; alt: string }> = {
  dark: {
    video: "/sentinella/sentinella-loop.mp4",
    poster: "/sentinella/dark-shaped.png",
    image: "/sentinella/dark-shaped.png",
    alt: "Sentinella — full GUI, reading a track live (dark theme)",
  },
  light: {
    video: "/sentinella/sentinella-loop-light.mp4",
    poster: "/sentinella/light-shaped.png",
    image: "/sentinella/light-shaped.png",
    alt: "Sentinella — full GUI, reading a track live (light theme)",
  },
};

// Hotspot boxes as fractions (left, top, width, height) of the underlying
// image's own dimensions — measured directly against
// public/sentinella/dark-shaped.png (3420x1860), so they stay aligned at
// any display size as long as the container keeps that same aspect ratio.
const HOTSPOTS: {
  id: string;
  label: string;
  detail: string;
  box: [number, number, number, number];
  // Which side of the box has room for the tooltip without it getting
  // clipped by the image container's edges.
  tooltip: "above" | "below";
  // Horizontal anchor for the tooltip. Defaults to "center" (centered on
  // the box, via translateX(-50%)). Hotspots close enough to the left/right
  // edge that a centered tooltip would overflow the container use "left"/
  // "right" instead, which anchors the tooltip's own edge to the box's
  // matching edge rather than centering it.
  align?: "left" | "center" | "right";
}[] = [
  {
    id: "curve",
    label: "Tonal Balance curve",
    detail: "Your track's frequency curve plotted live against the reference band.",
    box: [0.03, 0.17, 0.555, 0.535],
    tooltip: "above",
  },
  {
    id: "shape",
    label: "Shape",
    detail: "One click nudges your mix toward the target curve.",
    box: [0.45, 0.108, 0.055, 0.045],
    tooltip: "below",
  },
  {
    id: "target",
    label: "Target + dropdown",
    detail: "Switch the reference between Peak Time, Raw, and Melodic.",
    box: [0.6975, 0.029, 0.1975, 0.033],
    tooltip: "below",
  },
  {
    id: "imager-vis",
    label: "Imager visualization",
    detail: "A goniometer view of your stereo image, updating in real time.",
    box: [0.61, 0.17, 0.195, 0.381],
    tooltip: "above",
  },
  {
    id: "imager-corr",
    label: "Imager correlation",
    detail: "Phase correlation between left and right, at a glance.",
    box: [0.61, 0.579, 0.201, 0.115],
    tooltip: "above",
  },
  {
    id: "levels",
    label: "Levels — RMS + LUFS",
    detail: "RMS and LUFS levels, measured against the reference.",
    box: [0.8275, 0.118, 0.1525, 0.572],
    tooltip: "below",
    // This box sits almost flush with the right edge of the panel — a
    // centered tooltip would overflow past the container's right edge, so
    // anchor its right edge to the box's right edge instead.
    align: "right",
  },
  {
    id: "waveform",
    label: "Waveform",
    detail: "Bar/beat ruler synced to the playhead.",
    box: [0, 0.722, 1, 0.278],
    tooltip: "above",
  },
];

// Breathing room around each measured box, in the image's own pixel space
// (public/sentinella/dark-shaped.png is 3420x1860) — kept in image pixels
// rather than a flat percentage so the gap reads as the same size on every
// side regardless of the box's aspect ratio.
const IMG_W = 3420;
const IMG_H = 1860;
const PAD_PX = 22;

function padBox([left, top, width, height]: [number, number, number, number]) {
  const padX = PAD_PX / IMG_W;
  const padY = PAD_PX / IMG_H;
  const paddedLeft = Math.max(0, left - padX);
  const paddedTop = Math.max(0, top - padY);
  const paddedRight = Math.min(1, left + width + padX);
  const paddedBottom = Math.min(1, top + height + padY);
  return {
    left: paddedLeft,
    top: paddedTop,
    width: paddedRight - paddedLeft,
    height: paddedBottom - paddedTop,
  };
}

export function InteractiveScreenshot() {
  const [active, setActive] = useState<string | null>(null);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [videoFailed, setVideoFailed] = useState(false);
  const activeHotspot = HOTSPOTS.find((hotspot) => hotspot.id === active) ?? null;
  const asset = ASSETS[theme];
  const showVideo = !videoFailed;

  return (
    <div>
      {/* Dark/light toggle — switches which theme's loop video (or, on
          failure, screenshot) is shown below. Styled after the plugin's own
          dark/light switch (moon knob slid right on dark, sun knob slid left
          on light) rather than a generic segmented control, so the site
          control mirrors the GUI control it's driving. Centered above the
          panel rather than overlaid on it so it never competes with the
          hotspots for hover/click space. */}
      <div className="flex w-full justify-center">
        <button
          type="button"
          role="switch"
          aria-checked={theme === "dark"}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          onClick={() => {
            setTheme((current) => (current === "dark" ? "light" : "dark"));
            setVideoFailed(false);
          }}
          className={`relative h-7 w-12 shrink-0 rounded-full border transition-colors duration-200 ${
            theme === "dark" ? "border-white/15 bg-white/10" : "border-black/10 bg-white"
          }`}
        >
          <span
            aria-hidden
            className={`absolute top-0.5 left-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-white text-black/70 shadow-[0_2px_4px_rgba(0,0,0,0.3)] transition-transform duration-200 ${
              theme === "dark" ? "translate-x-5" : "translate-x-0"
            }`}
          >
            {theme === "dark" ? (
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current">
                <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 1020.354 15.354z" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <circle cx="12" cy="12" r="4" fill="currentColor" stroke="none" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
              </svg>
            )}
          </span>
        </button>
      </div>

      {/* Same treatment as the hero product shot: a blurred halo tinted with
          the plugin GUI's own accent blue sits behind the panel rather than
          a shadow cast from it (a plain dark shadow disappears against the
          near-black page background), plus a contact shadow underneath. */}
      <div className="relative mx-auto mt-4 w-full max-w-5xl">
        <div
          aria-hidden
          className="absolute -inset-4 -z-10 rounded-[2rem] bg-[#4d8dff]/[0.12] blur-2xl"
        />
        <div className="relative aspect-[3420/1860] w-full overflow-hidden rounded-xl border border-white/15 bg-black shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)]">
          {/* Muted, autoplaying, looping video of the plugin actually
              reading a track — cropped from the same screen recording as
              the (now-dropped) "See it in action" demo video, with the
              window title bar trimmed off so its content frame matches
              dark-shaped.png's aspect ratio closely enough for the hotspot
              boxes below (measured against that still) to stay aligned.
              A real <video> loop rather than a GIF: same look and behavior
              (no controls, autoplay, loop) at a fraction of the file size
              and none of a GIF's 256-color banding. `poster` covers the gap
              before the video has loaded; if it fails to load at all (flaky
              network, unsupported format) it falls back to the static
              screenshot so the section never goes blank. `key` forces a
              remount on theme switch so the <video> element actually reloads
              its new src/poster instead of silently keeping the old frame. */}
          {showVideo ? (
            <video
              key={asset.video}
              src={asset.video}
              poster={asset.poster}
              aria-label={asset.alt}
              autoPlay
              loop
              muted
              playsInline
              onError={() => setVideoFailed(true)}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <Image
              key={asset.image}
              src={asset.image}
              alt={asset.alt}
              fill
              className="object-cover"
            />
          )}
          {HOTSPOTS.map((hotspot) => {
            const { left, top, width, height } = padBox(hotspot.box);
            const isActive = active === hotspot.id;
            return (
              <button
                key={hotspot.id}
                type="button"
                aria-label={hotspot.label}
                aria-pressed={isActive}
                onMouseEnter={() => setActive(hotspot.id)}
                onMouseLeave={() => setActive((current) => (current === hotspot.id ? null : current))}
                onFocus={() => setActive(hotspot.id)}
                onBlur={() => setActive((current) => (current === hotspot.id ? null : current))}
                onClick={() => setActive((current) => (current === hotspot.id ? null : hotspot.id))}
                className="absolute cursor-pointer"
                style={{
                  left: `${left * 100}%`,
                  top: `${top * 100}%`,
                  width: `${width * 100}%`,
                  height: `${height * 100}%`,
                }}
              >
                <span
                  className={`block h-full w-full border-2 transition-colors duration-150 ${
                    isActive ? "border-accent bg-accent/15" : "border-transparent"
                  }`}
                />
              </button>
            );
          })}

          {/* Tooltip for the active hotspot, anchored to its box. Above/below
              is decided per-hotspot (see the `tooltip` field above) so it
              never gets clipped by the image container's own edges. */}
          {activeHotspot && (() => {
            const box = padBox(activeHotspot.box);
            const above = activeHotspot.tooltip === "above";
            const align = activeHotspot.align ?? "center";
            const verticalTranslate = above ? "calc(-100% - 10px)" : "10px";
            // Horizontal placement depends on `align`: "center" centers the
            // tooltip on the box (and needs the -50% translateX to offset
            // its own width); "left"/"right" instead pin the tooltip's
            // matching edge to the box's matching edge, so it grows inward
            // away from the container edge instead of overflowing it.
            const horizontal =
              align === "left"
                ? { left: `${box.left * 100}%`, transform: `translate(0, ${verticalTranslate})` }
                : align === "right"
                  ? {
                      right: `${(1 - (box.left + box.width)) * 100}%`,
                      transform: `translate(0, ${verticalTranslate})`,
                    }
                  : {
                      left: `${(box.left + box.width / 2) * 100}%`,
                      transform: `translate(-50%, ${verticalTranslate})`,
                    };
            return (
              <div
                className="pointer-events-none absolute z-10 w-56 border border-accent/40 bg-black/90 px-3 py-2 sm:w-64"
                style={{
                  top: `${(above ? box.top : box.top + box.height) * 100}%`,
                  ...horizontal,
                }}
              >
                <p className="font-display text-xs uppercase tracking-wide text-accent">
                  {activeHotspot.label}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-white/70">{activeHotspot.detail}</p>
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
}
