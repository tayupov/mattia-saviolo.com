const STATS = [
  { value: "20+", label: "Years industry experience" },
  { value: "Worldwide", label: "Remote & in-studio sessions" },
];

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
        <h1 className="font-display text-[15vw] uppercase leading-[0.85] sm:text-[9vw]">
          Production.
          <br />
          Mixing.
          <br />
          Mastering.
        </h1>

        <div className="flex flex-col gap-4">
          <p className="max-w-md border-l-2 border-accent pl-4 font-display text-2xl uppercase leading-tight text-accent sm:text-3xl">
            Join me in the studio.
          </p>

          <dl className="grid grid-cols-3 gap-6">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <dt className="font-display text-3xl text-accent sm:text-4xl">
                  {stat.value}
                </dt>
                <dd className="mt-1 text-xs uppercase tracking-wider text-white/60">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Desktop/tablet: original bottom-aligned row layout */}
      <div className="relative z-10 mt-auto hidden gap-10 px-12 pb-20 lg:flex lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <h1 className="font-display text-[5.5vw] uppercase leading-[0.85]">
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

        <dl className="grid w-72 shrink-0 grid-cols-1 gap-5 border-l border-white/20 pl-8">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <dt className="font-display text-4xl text-accent">
                {stat.value}
              </dt>
              <dd className="mt-1 text-xs uppercase tracking-wider text-white/60">
                {stat.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
