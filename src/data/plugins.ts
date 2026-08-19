// Registry of every plugin SKU sold via Stripe Checkout. Add an entry here
// (plus its own STRIPE_PRICE_ID_<SLUG> env var) for each new plugin — the
// checkout Server Action (src/app/actions/checkout.ts) and the Stripe
// webhook (src/app/api/webhooks/stripe/route.ts) are both generic over this
// map, so neither needs a code change when a new SKU launches.
//
// priceId is read from env (not hardcoded) purely to match how
// STRIPE_SECRET_KEY/STRIPE_WEBHOOK_SECRET are already managed per
// environment (dev/preview/prod can point at different Stripe price
// objects) — Stripe Price IDs themselves aren't secret.
export type PluginSku = {
  slug: string;
  name: string;
  priceId: string | undefined;
  // Optional €0 line items appended after the real price in Stripe
  // Checkout's order summary (see startPluginCheckout in
  // src/app/actions/checkout.ts). Checkout has no concept of a single item
  // with a breakdown under it — its order summary is just a flat list of
  // line items — so this is the only way to get a multi-row "table" look;
  // these rows bill at €0, so the actual charge is still exactly one
  // purchase of the real price above.
  highlights?: string[];
};

export const PLUGINS = {
  sentinella: {
    slug: "sentinella",
    name: "SENTINELLA",
    priceId: process.env.STRIPE_PRICE_ID_SENTINELLA,
    highlights: ["Instant delivery"],
  },
} satisfies Record<string, PluginSku>;

export type PluginSlug = keyof typeof PLUGINS;
