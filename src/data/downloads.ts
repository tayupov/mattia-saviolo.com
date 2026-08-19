import type { PluginSlug } from "@/data/plugins";

// Installer files served straight out of /public/downloads — no gating, no
// license-key check (none is planned until there's real sales volume to
// justify it). Anyone with the URL can fetch these; acceptable for this
// pass since the goal here is just "does a paying customer land on a
// working download", not access control. Linked from both the Stripe
// success page and the purchase confirmation email (see
// src/lib/emails/purchase-confirmation.ts) — keep both call sites in mind
// when changing this shape.
export type DownloadFile = {
  os: "Windows" | "macOS";
  format: string;
  href: string;
  // Hardcoded rather than read off disk at build time — public/downloads
  // isn't imported anywhere else, so there's no existing build step to hang
  // a filesystem read off. Keep in sync by hand when files are replaced.
  sizeBytes: number;
};

export const PLUGIN_VERSION: Record<PluginSlug, string> = {
  sentinella: "0.5.1",
};

export const DOWNLOADS: Record<PluginSlug, DownloadFile[]> = {
  sentinella: [
    {
      os: "Windows",
      format: "VST3",
      href: "/downloads/sentinella/Sentinella-0.5.1-Windows-VST3.zip",
      sizeBytes: 3_651_412,
    },
    {
      os: "macOS",
      format: "VST3",
      href: "/downloads/sentinella/Sentinella-0.5.1-macOS-VST3.zip",
      sizeBytes: 6_785_704,
    },
    {
      os: "macOS",
      format: "AU",
      href: "/downloads/sentinella/Sentinella-0.5.1-macOS-AU.zip",
      sizeBytes: 6_776_708,
    },
  ],
};

export function formatFileSize(bytes: number): string {
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
