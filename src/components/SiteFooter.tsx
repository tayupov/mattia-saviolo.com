import Image from "next/image";
import type { ComponentType, SVGProps } from "react";
import { SOCIAL_LINKS } from "@/lib/site";

function SoundcloudIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 22 20" fill="currentColor" {...props}>
      <rect x="1" y="10" width="2" height="8" />
      <rect x="5.5" y="6" width="2" height="12" />
      <rect x="10" y="2" width="2" height="16" />
      <rect x="14.5" y="7" width="2" height="11" />
      <rect x="19" y="10.5" width="2" height="7.5" />
    </svg>
  );
}

function SpotifyIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M7 9.2c3.2-1 7-.9 10 1" />
      <path d="M7.5 12.6c2.6-.8 6-.7 8.5.7" />
      <path d="M8 15.6c2-.6 4.4-.5 6.3.6" />
    </svg>
  );
}

function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.4A4 4 0 1 1 12.6 8 4 4 0 0 1 16 11.4z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

const SOCIAL_ICONS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  Soundcloud: SoundcloudIcon,
  Spotify: SpotifyIcon,
  Facebook: FacebookIcon,
  Instagram: InstagramIcon,
};

const EXPLORE_LINKS = [
  { href: "#services", label: "Services" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#coaching", label: "Coaching" },
  { href: "#contact", label: "Book a session" },
];

const LEGAL_LINKS = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-of-service", label: "Terms of Service" },
  { href: "/imprint", label: "Imprint" },
];

const cornerClip = {
  clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)",
};

type SiteFooterProps = {
  theme?: "dark" | "light";
};

export function SiteFooter({ theme = "dark" }: SiteFooterProps) {
  const light = theme === "light";

  return (
    <footer className={`mt-auto ${light ? "bg-white text-black" : ""}`}>
      <div className="grid gap-14 px-6 py-16 sm:px-12 lg:grid-cols-[1.3fr_1fr_1fr] lg:gap-10 lg:py-20">
        <div>
          <Image
            src="/brand/logo.png"
            alt="Mattia Saviolo"
            width={220}
            height={30}
            className={`h-auto w-[170px] ${light ? "invert" : ""}`}
          />
          <p className={`mt-6 max-w-xs text-sm leading-relaxed ${light ? "text-black/50" : "text-white/50"}`}>
            Techno production, mixing &amp; mastering — remote sessions
            worldwide.
          </p>

          <div className="mt-8 flex gap-3">
            {SOCIAL_LINKS.map(({ href, label }) => {
              const Icon = SOCIAL_ICONS[label];
              return (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  style={cornerClip}
                  className={`group flex h-11 w-11 items-center justify-center transition-colors hover:border-accent hover:bg-accent hover:text-black ${
                    light ? "border border-black/15 text-black/60" : "border border-white/15 text-white/60"
                  }`}
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className={`text-xs uppercase tracking-widest ${light ? "text-black/30" : "text-white/30"}`}>
            Explore
          </h3>
          <ul className={`mt-5 space-y-3 text-sm ${light ? "text-black/60" : "text-white/60"}`}>
            {EXPLORE_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="transition-colors hover:text-accent"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className={`text-xs uppercase tracking-widest ${light ? "text-black/30" : "text-white/30"}`}>
            Legal
          </h3>
          <ul className={`mt-5 space-y-3 text-sm ${light ? "text-black/60" : "text-white/60"}`}>
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="transition-colors hover:text-accent"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div
        className={`px-6 py-6 text-xs uppercase tracking-wider sm:px-12 ${
          light ? "border-t border-black/10 text-black/30" : "border-t border-white/10 text-white/30"
        }`}
      >
        <p>&copy; {new Date().getFullYear()} Mattia Saviolo. All rights reserved.</p>
      </div>
    </footer>
  );
}
