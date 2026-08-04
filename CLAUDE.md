@AGENTS.md

# mattia-saviolo.com

Personal portfolio site for Mattia Saviolo — a Berlin-based techno producer and
mixing/mastering engineer with 15+ years in the industry, releasing on labels like
NINETOZERO, Tronic, Kraftek, and Factory 93. The site's job is to establish
credibility with artists/labels and convert visitors into booked mixing/mastering/
coaching sessions.

This is a ground-up rebuild replacing the current Squarespace site. Treat the live
site (https://mattia-saviolo.com) as **reference for subject matter only** — who he
is, what services he offers, the kind of testimonials he has — not as a design or
copy source. This is a redesign, not a port.

## Status

Next.js app is scaffolded (App Router, TypeScript, Tailwind v4). Homepage content
still needs to be built out section by section.

## Stack decisions (confirmed)

- **Framework**: Next.js, App Router
- **Language**: TypeScript
- **Package manager**: npm
- **Styling**: Tailwind CSS (v4)
- **Deployment**: Vercel (user is handling this manually — don't set up
  deployment config/CLI actions unless asked)
- **Contact/booking form**: Resend (transactional email API) via a Next.js
  Server Action — see `src/app/actions/contact.ts`. Requires a `RESEND_API_KEY`
  env var (see `.env.example`) and a verified sending domain in Resend before it
  will actually deliver mail.

## Design direction (confirmed)

Bold/brutalist: oversized type, high contrast, asymmetric layout, art-directed —
not minimal, not soft.

- **Background**: black / near-black as the base
- **Type color**: white for primary headlines/body
- **Accent color**: `#F38444` (burnt orange), sampled from the source brand
  assets — use sparingly, for CTAs and highlighted lines only, not as a base color
- **Headline typeface**: Anton (Google Font, weight 900, condensed poster-style
  display face) — used for oversized all-caps headlines, loaded via
  `next/font/google` as `--font-display`
- **Body typeface**: Epilogue (Google Font, variable) — matches the typeface the
  original Squarespace site was already loading, kept for brand continuity, used
  as `--font-body`
- **Photography**: desaturated / near-B&W, moody, low-key studio lighting — no
  glossy or brightly colored imagery
- **Logo/accent shapes**: the wordmark logo uses sharp diagonal cuts (jagged,
  rave-flyer-adjacent). Echo that angularity in section dividers, borders, or
  hover states rather than using soft rounded corners
- **Social proof**: a row of label logos (NINETOZERO, Kraftek, Factory93, Tronic)
  as a low-contrast strip on dark background

## Brand assets

Source assets live at `~/Desktop/assets mattia-saviolo.com/` and have been copied
into this repo under `public/brand/`:

- `public/brand/logo.png` — wordmark logotype (white artwork, transparent bg)
- `public/brand/hero-banner.png` — reference hero comp showing headline type
  treatment and accent color in context (not meant to be used as-is, it's a
  design reference)
- `public/brand/label-strip.png` — label logos row (NINETOZERO, Kraftek,
  Factory93, Tronic)
- `public/brand/video-thumbnail.png` — poster image for the hero video
- `public/brand/hero-video.mp4` — hero video, first thing on the site (pending —
  to be dropped into `public/brand/` before it plays; poster shows until then)

## Content reference (from current live site)

Sections present on the existing site, useful as a checklist of what the new site
likely needs to cover (copy and layout are open to reinvention):

- **Hero** — production/mixing/mastering services, CTA to book a session
- **About / services** — mixing, mastering, sound design, melody composition,
  arrangement editing; remote or in-studio, Berlin-based
- **Testimonials** — endorsements from Veerus, ADHS, Mark Michael, Jose Bonetto,
  Audio State
- **Coaching / mentoring** — 1:1 sessions on sound design, low-end, mixing, and
  finishing tracks
- **Contact** — form, with privacy/terms links
- **Footer / social** — Soundcloud, Spotify, Facebook, Instagram

## Working conventions

- App Router idioms: Server Components by default, Client Components only where
  interactivity is needed (e.g. the contact form).
- Keep this file in sync as real decisions get made.
- No CMS is planned; content (testimonials, service descriptions, etc.) lives in
  code/content files unless a future decision introduces one.
- `AGENTS.md` in this repo is auto-generated/rewritten by `next dev` — don't hand
  edit it, don't remove the `@AGENTS.md` reference line at the top of this file.
