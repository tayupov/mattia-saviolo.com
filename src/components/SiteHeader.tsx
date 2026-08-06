import Image from "next/image";
import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-white/10 bg-black/30 px-6 py-2 backdrop-blur-sm sm:px-12">
      <Link href="/" className="shrink-0 -mt-4">
        <Image
          src="/brand/logo.png"
          alt="Mattia Saviolo"
          width={220}
          height={30}
          className="h-auto w-[140px] sm:w-[180px]"
          priority
        />
      </Link>

      <nav className="flex items-center gap-6 sm:gap-8">
        <Link
          href="/about"
          className="font-display text-sm uppercase tracking-wide text-white/70 transition-colors hover:text-accent"
        >
          About
        </Link>

        <Link
          href="/#contact"
          className="shrink-0 bg-accent px-5 py-3 font-display text-sm uppercase tracking-wide text-black transition-colors hover:bg-white sm:px-6 sm:text-base"
          style={{ clipPath: "polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)" }}
        >
          Contact
        </Link>
      </nav>
    </header>
  );
}
