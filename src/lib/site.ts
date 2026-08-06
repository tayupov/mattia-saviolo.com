// Must match the canonical host Vercel actually serves (www) — the apex
// domain 308-redirects here, and link-preview crawlers (WhatsApp, etc.)
// don't reliably follow redirects when fetching og:image, so metadata URLs
// need to point straight at this host to avoid a broken/missing preview.
export const SITE_URL = "https://www.mattia-saviolo.com";

export const SITE_DESCRIPTION =
  "Berlin-based techno producer and mixing/mastering engineer with 15+ years of studio experience. Releases on Drumcode, NINETOZERO, Tronic, Kraftek, Factory 93. Sessions are limited — book now.";

export const SOCIAL_LINKS = [
  { label: "Soundcloud", href: "https://soundcloud.com/mattiasaviolo" },
  {
    label: "Spotify",
    href: "https://open.spotify.com/artist/0CHQALTC4ovqi6EU4xvUeq",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/officialmattiasaviolo",
  },
  { label: "Instagram", href: "https://www.instagram.com/mattia_saviolo/" },
] as const;
