import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Imprint",
  description: "Legal notice and provider information for mattia-saviolo.com.",
  alternates: { canonical: "/imprint" },
};

export default function ImprintPage() {
  return (
    <LegalPage title="Imprint" updated="2025">
      <LegalSection heading="Information pursuant to § 5 TMG">
        <p>
          Mattia Saviolo
          <br />
          Beilsteiner Straße 121
          <br />
          12681 Berlin, Germany
        </p>
      </LegalSection>

      <LegalSection heading="Contact">
        <p>
          Phone: +49 151 59054117
          <br />
          Email:{" "}
          <a
            href="mailto:info.saviolo@gmail.com"
            className="text-accent hover:underline"
          >
            info.saviolo@gmail.com
          </a>
        </p>
      </LegalSection>

      <LegalSection heading="Responsible for Content">
        <p>
          Mattia Saviolo, pursuant to § 18 Abs. 2 MStV, at the address
          listed above.
        </p>
      </LegalSection>

      <LegalSection heading="Dispute Resolution">
        <p>
          The European Commission provides a platform for online dispute
          resolution (OS), available at{" "}
          <a
            href="https://ec.europa.eu/consumers/odr"
            target="_blank"
            rel="noreferrer"
            className="text-accent hover:underline"
          >
            ec.europa.eu/consumers/odr
          </a>
          . I am not obligated and not willing to participate in dispute
          resolution proceedings before a consumer arbitration board.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
