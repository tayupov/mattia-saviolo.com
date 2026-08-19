import Stripe from "stripe";
import { Resend } from "resend";
import { getStripeClient } from "@/lib/stripe";
import { purchaseConfirmationEmail } from "@/lib/emails/purchase-confirmation";
import { PLUGINS, type PluginSlug } from "@/data/plugins";
import { DOWNLOADS } from "@/data/downloads";

// Sends the purchase confirmation email, with download links attached (same
// files as the Stripe success page, see
// src/app/plugins/sentinella/success/page.tsx) so a customer has a durable
// way to get the installer even if they close that tab. No license-key
// mechanism exists, and none is planned until there's real sales volume to
// justify it. See the checkout Server Action for the rest of the purchase
// flow.
export async function POST(request: Request) {
  const stripe = getStripeClient();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripe || !webhookSecret) {
    console.error(
      "Stripe webhook is not configured: missing STRIPE_SECRET_KEY or STRIPE_WEBHOOK_SECRET",
    );
    // 500 (not 400): a missing env var is plausibly a transient deploy
    // misconfiguration, so let Stripe retry rather than silently dropping
    // a real purchase event.
    return new Response("Webhook not configured", { status: 500 });
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return new Response("Missing stripe-signature header", { status: 400 });
  }

  // Raw body, read once, before any JSON parsing — constructEvent needs the
  // exact bytes to verify the HMAC signature.
  const body = await request.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    // 400: not retriable — a signature that fails now will fail again.
    console.error("Stripe webhook signature verification failed:", error);
    return new Response(
      `Webhook signature verification failed: ${(error as Error).message}`,
      { status: 400 },
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const email = session.customer_details?.email;

    if (!email) {
      console.error(
        `checkout.session.completed (${session.id}) has no customer email`,
      );
    } else {
      const apiKey = process.env.RESEND_API_KEY;
      // Dedicated address for order receipts — kept separate from
      // CONTACT_FROM_EMAIL (the booking-inquiry inbox) so purchase
      // confirmations don't read as unsolicited mail from an "inquiry@"
      // address, and so the two mail streams can be told apart in Resend's
      // logs/reputation if one of them ever has deliverability issues.
      const fromEmail = process.env.ORDERS_FROM_EMAIL;

      if (!apiKey || !fromEmail) {
        console.error(
          "Purchase confirmation email not sent: missing RESEND_API_KEY or ORDERS_FROM_EMAIL",
        );
      } else {
        const amountFormatted =
          session.amount_total != null && session.currency
            ? new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: session.currency.toUpperCase(),
              }).format(session.amount_total / 100)
            : "—";

        // Which plugin this was is stamped into the session as metadata at
        // creation time (see startPluginCheckout in
        // src/app/actions/checkout.ts) — fall back to a generic label
        // rather than guessing, since a metadata-less session shouldn't
        // silently claim to be a specific product.
        const pluginSlug = session.metadata?.pluginSlug as
          | PluginSlug
          | undefined;
        const productName = pluginSlug
          ? PLUGINS[pluginSlug]?.name
          : undefined;

        const { subject, text, html } = purchaseConfirmationEmail({
          productName: productName ?? "your purchase",
          amountFormatted,
          downloads: pluginSlug ? DOWNLOADS[pluginSlug] : undefined,
        });

        const resend = new Resend(apiKey);
        const { error } = await resend.emails.send({
          from: fromEmail,
          to: email,
          subject,
          text,
          html,
        });

        // Still 200 below even on failure: the charge already succeeded by
        // the time this runs, and nothing about retrying the webhook fixes
        // a flaky email send. The success page is still the fast path for
        // the download, so a failed send here isn't a total loss — but
        // check Resend's logs if this fires, since it's now the only
        // fallback delivery a customer has.
        if (error) {
          console.error("Resend error sending purchase confirmation:", error);
        }
      }
    }
  }

  return new Response("OK", { status: 200 });
}
