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

      <div className="relative z-10 mt-auto flex flex-col gap-10 px-6 pb-14 sm:px-12 sm:pb-20 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <h1 className="font-display text-[15vw] uppercase leading-[0.85] sm:text-[9vw] lg:text-[6.5vw]">
            Production.
            <br />
            Mixing.
            <br />
            Mastering.
          </h1>
          <p className="mt-8 max-w-md border-l-2 border-accent pl-4 font-display text-2xl uppercase leading-tight text-accent sm:text-3xl">
            Join me in the studio.
          </p>
        </div>

        <dl className="grid grid-cols-3 gap-6 border-t border-white/20 pt-6 lg:w-72 lg:shrink-0 lg:grid-cols-1 lg:gap-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
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
    </section>
  );
}
