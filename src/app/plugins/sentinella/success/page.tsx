import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getStripeClient } from "@/lib/stripe";

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
              We&rsquo;ll be in touch shortly.
            </p>
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
