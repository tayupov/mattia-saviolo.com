import { SITE_URL } from "@/lib/site";

// Table-based HTML — the layout email clients (notably Outlook desktop,
// which renders via Word) actually support consistently. Google Fonts are
// linked as progressive enhancement (Apple Mail, most webmail clients
// honor them); every element also carries a system-font fallback stack so
// clients that strip <style>/<link> (Gmail's app, older Outlook) still
// render something close to on-brand instead of Times New Roman.
//
// Deliberately doesn't promise a license key or download link inline —
// fulfillment for those is still a deferred follow-up (see the webhook
// route's header comment). This is a receipt, not a delivery.

type PurchaseConfirmationEmailParams = {
  productName: string;
  /** Pre-formatted, e.g. "€49.00" — build with Intl.NumberFormat at the call site. */
  amountFormatted: string;
};

const ACCENT = "#F38444";
const BG = "#0a0a0a";
const PANEL_BORDER = "#2a2a2a";
const BODY_TEXT = "#d4d4d4";
const MUTED_TEXT = "#8a8a8a";

const DISPLAY_FONT_STACK =
  "'Anton', 'Arial Black', 'Helvetica Neue', Helvetica, Arial, sans-serif";
const BODY_FONT_STACK =
  "'Epilogue', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

export function purchaseConfirmationEmail({
  productName,
  amountFormatted,
}: PurchaseConfirmationEmailParams) {
  const subject = `Thanks for your ${productName} purchase`;

  const text = [
    "Thanks for your purchase.",
    "",
    `${productName} — ${amountFormatted}`,
    "",
    "We'll follow up shortly with your license key and download link.",
    "",
    "— Mattia Saviolo",
    SITE_URL,
  ].join("\n");

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="color-scheme" content="dark" />
    <title>${subject}</title>
    <!--[if !mso]><!-->
    <link
      href="https://fonts.googleapis.com/css2?family=Anton&family=Epilogue:wght@400;600&display=swap"
      rel="stylesheet"
    />
    <!--<![endif]-->
  </head>
  <body
    style="margin:0; padding:0; background-color:${BG}; font-family:${BODY_FONT_STACK};"
  >
    <table
      role="presentation"
      width="100%"
      cellpadding="0"
      cellspacing="0"
      style="background-color:${BG};"
    >
      <tr>
        <td align="center" style="padding:40px 16px;">
          <table
            role="presentation"
            width="600"
            cellpadding="0"
            cellspacing="0"
            style="width:100%; max-width:600px;"
          >
            <!-- Logo -->
            <tr>
              <td style="padding-bottom:32px;">
                <img
                  src="${SITE_URL}/brand/logo.png"
                  alt="Mattia Saviolo"
                  width="160"
                  height="38"
                  style="display:block; width:160px; height:auto; border:0;"
                />
              </td>
            </tr>

            <!-- Headline -->
            <tr>
              <td style="padding-bottom:16px;">
                <h1
                  style="margin:0; font-family:${DISPLAY_FONT_STACK}; font-weight:900; font-size:32px; line-height:1.05; letter-spacing:0.01em; text-transform:uppercase; color:#ffffff;"
                >
                  Thanks for your purchase.
                </h1>
              </td>
            </tr>

            <!-- Body copy -->
            <tr>
              <td style="padding-bottom:28px;">
                <p
                  style="margin:0; font-family:${BODY_FONT_STACK}; font-size:16px; line-height:1.6; color:${BODY_TEXT};"
                >
                  We&rsquo;ll follow up shortly with your license key and
                  download link. No subscription, no iLok &mdash; a single
                  offline key, yours to keep.
                </p>
              </td>
            </tr>

            <!-- Order summary -->
            <tr>
              <td style="padding-bottom:32px;">
                <table
                  role="presentation"
                  width="100%"
                  cellpadding="0"
                  cellspacing="0"
                  style="border:1px solid ${PANEL_BORDER};"
                >
                  <tr>
                    <td style="padding:20px 24px;">
                      <table
                        role="presentation"
                        width="100%"
                        cellpadding="0"
                        cellspacing="0"
                      >
                        <tr>
                          <td
                            style="font-family:${DISPLAY_FONT_STACK}; font-weight:900; font-size:18px; text-transform:uppercase; letter-spacing:0.02em; color:#ffffff;"
                          >
                            ${productName}
                          </td>
                          <td
                            align="right"
                            style="font-family:${BODY_FONT_STACK}; font-size:16px; font-weight:600; color:${ACCENT};"
                          >
                            ${amountFormatted}
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding-top:8px; border-top:1px solid ${PANEL_BORDER};">
                <p
                  style="margin:16px 0 0; font-family:${BODY_FONT_STACK}; font-size:13px; line-height:1.6; color:${MUTED_TEXT};"
                >
                  Mattia Saviolo &mdash; Berlin<br />
                  <a href="${SITE_URL}" style="color:${MUTED_TEXT};">${SITE_URL.replace("https://", "")}</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  return { subject, text, html };
}
