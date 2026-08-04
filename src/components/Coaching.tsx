const TOPICS = ["Sound design", "Low-end power", "Mixing", "Finishing tracks"];

export function Coaching() {
  return (
    <section
      id="coaching"
      className="bg-white/[0.03] px-6 py-20 sm:px-12 lg:py-28"
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-center lg:gap-20">
        <div>
          <h2 className="font-display text-4xl uppercase leading-[0.95] sm:text-5xl">
            1:1 coaching
            <br />
            <span className="text-accent">&amp; co-production.</span>
          </h2>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/70">
            Learn sound design, low-end power, mixing, and finishing — while
            we work on your own tracks. In-studio in Berlin or remote via
            video call.
          </p>
          <a
            href="#contact"
            className="mt-8 inline-block border border-white/30 px-6 py-3 text-sm uppercase tracking-wider transition-colors hover:border-accent hover:text-accent"
          >
            Book a session
          </a>
        </div>

        <ul className="flex flex-wrap gap-3">
          {TOPICS.map((topic) => (
            <li
              key={topic}
              className="border border-accent/40 px-5 py-3 font-display text-lg uppercase text-accent"
            >
              {topic}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
