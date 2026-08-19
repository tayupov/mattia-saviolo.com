"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/plugins", label: "Plugins" },
];

// Mobile menu folds Contact into the plain link list instead of keeping it
// as a separate accent CTA — the desktop bar still gets its own CTA below.
const MOBILE_NAV_LINKS = [...NAV_LINKS, { href: "/#contact", label: "Contact" }];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  // Lock body scroll while the mobile menu is open, and close it if the
  // viewport grows past the mobile breakpoint (e.g. rotating a tablet).
  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";
    const mql = window.matchMedia("(min-width: 640px)");
    const closeOnDesktop = () => {
      if (mql.matches) setOpen(false);
    };
    mql.addEventListener("change", closeOnDesktop);

    return () => {
      document.body.style.overflow = "";
      mql.removeEventListener("change", closeOnDesktop);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50">
      {/* Bar: backdrop-blur lives here, scoped to the bar only — putting it
          on the outer <header> would create a containing block for the
          fixed-position mobile menu below and trap it inside this strip. */}
      <div className="flex h-16 items-center justify-between border-b border-white/10 bg-background/30 px-6 backdrop-blur-sm sm:h-20 sm:px-12">
        <Link href="/" className="shrink-0 -mt-2" onClick={() => setOpen(false)}>
          <Image
            src="/brand/logo.png"
            alt="Mattia Saviolo"
            width={220}
            height={30}
            className="h-auto w-[140px] sm:w-[180px]"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 sm:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-display text-sm uppercase tracking-wide text-white/70 transition-colors hover:text-accent"
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="/#contact"
            className="shrink-0 bg-accent px-6 py-3 font-display text-base uppercase tracking-wide text-black transition-colors hover:bg-white"
          >
            Contact
          </Link>
        </nav>

        {/* Mobile hamburger toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="relative flex h-10 w-10 shrink-0 flex-col items-center justify-center gap-[5px] sm:hidden"
        >
          <span
            className={`h-[2px] w-6 bg-white transition-transform ${
              open ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-[2px] w-6 bg-white transition-transform ${
              open ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile full-screen menu */}
      <div
        id="mobile-nav"
        className={`fixed inset-0 top-16 z-40 flex flex-col bg-background px-6 pt-4 transition-opacity duration-200 sm:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-2">
          {MOBILE_NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="border-b border-white/10 py-4 font-display text-xl uppercase tracking-wide text-white transition-colors hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
