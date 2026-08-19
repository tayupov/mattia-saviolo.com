import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { osIcon } from "@/components/OsIcons";
import { getStripeClient } from "@/lib/stripe";
import { DOWNLOADS, PLUGIN_VERSION, formatFileSize } from "@/data/downloads";

// Transient, personalized page — not indexable, unlike the rest of the site
// which defaults to indexable via the root layout.
export const metadata: Metadata = {
  title: "Thank you — SENTINELLA",
  robots: { index: false, follow: false },
};

export default async function SentinellaSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id: sessionId } = await searchParams;

  let paid = false;
  let customerEmail: string | null = null;

  if (sessionId) {
    const stripe = getStripeClient();
    if (stripe) {
      try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        paid = session.payment_status === "paid";
        customerEmail = session.customer_details?.email ?? null;
      } catch (error) {
        console.error("Failed to retrieve Stripe checkout session:", error);
      }
    }
  }

  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center sm:px-12">
        {paid ? (
          <>
            <h1 className="font-display text-4xl uppercase leading-[0.95] sm:text-5xl">
              Thanks for your purchase.
            </h1>
            <p className="mt-6 max-w-lg text-white/70">
              {customerEmail
                ? `A confirmation is on its way to ${customerEmail}.`
                : "A confirmation email is on its way."}{" "}
            </p>

            {/* Downloads — instant delivery, no license-key gate yet (see
                src/data/downloads.ts). Grouped by OS/format so a customer on
                either platform can find their file at a glance. */}
            <div className="mt-16 w-full max-w-2xl text-left">
              <div className="flex items-baseline justify-between gap-4 border-b border-white/10 pb-4">
                <h2 className="font-display text-2xl uppercase leading-none sm:text-3xl">
                  Your download.
                </h2>
                <span className="shrink-0 font-display text-sm uppercase tracking-widest text-white/40">
                  v{PLUGIN_VERSION.sentinella}
                </span>
              </div>
              <ul className="mt-6 flex flex-col gap-3">
                {DOWNLOADS.sentinella.map((file) => (
                  <li key={file.href}>
                    <a
                      href={file.href}
                      download
                      className="group flex items-center justify-between gap-4 border border-white/15 bg-white/[0.02] px-5 py-4 transition-colors duration-200 hover:border-accent/60 hover:bg-white/[0.04]"
                    >
                      <span className="flex items-center gap-3">
                        <span className="flex items-center gap-1.5 text-white/50">
                          {osIcon(file.os)}
                        </span>
                        <span className="font-display text-base uppercase tracking-wide">
                          {file.os} — {file.format}
                        </span>
                      </span>
                      <span className="flex items-center gap-4">
                        <span className="text-sm text-white/40">
                          {formatFileSize(file.sizeBytes)}
                        </span>
                        <span className="shrink-0 bg-accent px-4 py-2 font-display text-xs uppercase tracking-wide text-black transition-colors group-hover:bg-white">
                          Download
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <>
            {/* Soft state, never a hard 404/notFound — a bookmarked,
                back-buttoned, or bot-hit URL shouldn't error, and a hard
                failure here would leak fulfillment state. */}
            <h1 className="font-display text-4xl uppercase leading-[0.95] sm:text-5xl">
              We couldn&rsquo;t confirm that order.
            </h1>
            <p className="mt-6 max-w-lg text-white/70">
              If you were charged, hang tight — your confirmation email is on
              its way. Otherwise, please try again.
            </p>
          </>
        )}
        <Link
          href="/plugins/sentinella"
          className="mt-10 inline-block bg-accent px-8 py-4 font-display text-base uppercase tracking-wide text-black transition-colors hover:bg-white"
        >
          Back to SENTINELLA
        </Link>
      </main>
      <SiteFooter />
    </div>
  );
}
