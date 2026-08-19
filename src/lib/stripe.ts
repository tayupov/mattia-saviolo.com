import Stripe from "stripe";

// Lazy singleton, mirroring how the contact Server Action reads
// RESEND_API_KEY per-call rather than throwing at import time — an
// import-time throw would break any route that imports this module,
// including at build. Callers check for `null` and handle it themselves
// (a redirect from the checkout action vs. an HTTP Response from the
// webhook need different failure shapes, so there's no shared helper).
let cachedClient: Stripe | null = null;

export function getStripeClient(): Stripe | null {
  const apiKey = process.env.STRIPE_SECRET_KEY;
  if (!apiKey) return null;
  if (!cachedClient) {
    cachedClient = new Stripe(apiKey);
  }
  return cachedClient;
}
