import { ContactForm } from "@/components/ContactForm";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="border-t border-white/10 px-6 py-20 sm:px-12 lg:py-28"
    >
      <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <h2 className="font-display text-4xl uppercase leading-[0.95] sm:text-5xl">
            Get in
            <br />
            touch.
          </h2>
          <p className="mt-6 max-w-sm text-lg leading-relaxed text-white/70">
            Sessions are limited — tell me about your track and I&apos;ll get
            back to you.
          </p>
          <dl className="mt-10 space-y-4 text-sm uppercase tracking-wider text-white/50">
            <div className="flex gap-4">
              <dt className="w-24 shrink-0 text-white/30">Based</dt>
              <dd>Berlin, Germany — remote worldwide</dd>
            </div>
            <div className="flex gap-4">
              <dt className="w-24 shrink-0 text-white/30">Response</dt>
              <dd>Within 2 business days</dd>
            </div>
          </dl>
        </div>

        <div
          className="border border-white/10 bg-white/[0.03] p-8 sm:p-10"
          style={{
            clipPath:
              "polygon(0 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%)",
          }}
        >
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
