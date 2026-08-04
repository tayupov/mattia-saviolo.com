export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[calc(100svh-73px)] flex-col overflow-hidden"
    >
      <video
        className="absolute inset-0 h-full w-full object-cover grayscale"
        poster="/brand/video-thumbnail.png"
        src="/brand/hero-loop.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent" />

      {/* Mobile: headline pinned to top, subtitle + stats pinned to bottom */}
      <div className="relative z-10 flex flex-1 flex-col justify-between px-6 pt-6 pb-14 sm:px-12 sm:pt-8 lg:hidden">
        <h1 className="font-display text-[13vw] uppercase leading-[0.85] sm:text-[8vw]">
          Production.
          <br />
          Mixing.
          <br />
          Mastering.
        </h1>

        <p className="max-w-md border-l-2 border-accent pl-4 font-display text-2xl uppercase leading-tight text-accent sm:text-3xl">
          Join me in the studio.
        </p>
      </div>

      {/* Desktop/tablet: original bottom-aligned row layout */}
      <div className="relative z-10 mt-auto hidden px-12 pb-20 lg:block">
        <div className="max-w-3xl">
          <h1 className="font-display text-[4.8vw] uppercase leading-[0.85]">
            Production.
            <br />
            Mixing.
            <br />
            Mastering.
          </h1>
          <p className="mt-8 max-w-md border-l-2 border-accent pl-4 font-display text-3xl uppercase leading-tight text-accent">
            Join me in the studio.
          </p>
        </div>
      </div>
    </section>
  );
}
