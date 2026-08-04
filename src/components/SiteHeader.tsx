import Image from "next/image";
import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-white/10 bg-black/70 px-6 py-5 backdrop-blur sm:px-12">
      <Link href="/" className="shrink-0">
        <Image
          src="/brand/logo.png"
          alt="Mattia Saviolo"
          width={220}
          height={30}
          className="h-auto w-[140px] sm:w-[180px]"
          priority
        />
      </Link>

      <a
        href="#contact"
        className="shrink-0 bg-accent px-4 py-2 text-sm uppercase tracking-wider text-black transition-opacity hover:opacity-90"
      >
        Book a session
      </a>
    </header>
  );
}
