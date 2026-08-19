"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { getStripeClient } from "@/lib/stripe";
import { SITE_URL } from "@/lib/site";
import { PLUGINS, type PluginSlug } from "@/data/plugins";

// Where to send the browser back to after Checkout. Deliberately NOT
// SITE_URL — that constant is pinned to the canonical production host
// (see src/lib/site.ts) for metadata/JSON-LD purposes, but success_url and
// cancel_url need to point back at whatever host actually started this
// checkout (localhost during dev, a preview deployment, or production) —
// hardcoding SITE_URL here sent local/preview test purchases back to the
// live site's (nonexistent, on this branch) /success route. Next enforces
// that a Server Action's Origin header matches its Host before the action
// is even allowed to run, so Origin is a trustworthy source of "where did
// this request actually come from."
async function resolveBaseUrl(): Promise<string> {
  const origin = (await headers()).get("origin");
  return origin ?? SITE_URL;
}

// Generic across every SKU in src/data/plugins.ts — no form fields, since
// price and quantity are fixed per plugin (a single license each). Wire it
// up per product page with the slug pre-bound, e.g.:
//   const buySentinella = startPluginCheckout.bind(null, "sentinella");
//   <form action={buySentinella}>
// Every path ends in redirect(), which throws internally, so nothing after
// it ever runs; that's why it must always be called outside the try/catch
// below.
export async function startPluginCheckout(slug: PluginSlug): Promise<void> {
  const plugin = PLUGINS[slug];
  const stripe = getStripeClient();

  if (!stripe || !plugin?.priceId) {
    console.error(
      `Checkout for "${slug}" is not configured: missing STRIPE_SECRET_KEY or a priceId in src/data/plugins.ts`,
    );
    redirect(`/plugins/${slug}?checkout_error=1`);
  }

  const baseUrl = await resolveBaseUrl();

  // €0 line items, one per plugin.highlights entry, so the Checkout order
  // summary reads as a small "what's included" table instead of a single
  // bare line. Currency is hardcoded to match the real price above (all
  // current Prices are EUR) — move it onto PluginSku if a non-EUR SKU ever
  // ships.
  const highlightLineItems = (plugin.highlights ?? []).map((label) => ({
    price_data: {
      currency: "eur",
      unit_amount: 0,
      product_data: { name: label },
    },
    quantity: 1,
  }));

  let session;
  try {
    session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: plugin.priceId, quantity: 1 }, ...highlightLineItems],
      success_url: `${baseUrl}/plugins/${slug}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/plugins/${slug}`,
      // Lets the webhook know which plugin this purchase was for, so the
      // purchase confirmation email names the right product — see
      // src/app/api/webhooks/stripe/route.ts.
      metadata: { pluginSlug: slug },
    });
  } catch (error) {
    console.error(
      `Stripe checkout session creation failed for "${slug}":`,
      error,
    );
    redirect(`/plugins/${slug}?checkout_error=1`);
  }

  if (!session.url) {
    console.error(`Stripe checkout session created without a URL for "${slug}"`);
    redirect(`/plugins/${slug}?checkout_error=1`);
  }

  redirect(session.url);
}
