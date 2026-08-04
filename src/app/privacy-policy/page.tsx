import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Mattia Saviolo collects, uses, and protects personal data submitted through this site.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="2025">
      <LegalSection heading="1. Controller">
        <p>
          Mattia Saviolo, Beilsteiner Straße 121, 12681 Berlin, Germany.
          Contact:{" "}
          <a
            href="mailto:info.saviolo@gmail.com"
            className="text-accent hover:underline"
          >
            info.saviolo@gmail.com
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection heading="2. Data Collection">
        <p>
          I only collect and process personal data that you provide
          voluntarily — for example when you get in touch by email or through
          the contact form on this site.
        </p>
      </LegalSection>

      <LegalSection heading="3. Use of Data">
        <p>
          Any data you share is used solely for the purpose of communication
          and fulfilling the requested services. It is not sold or passed on
          to third parties, except where required by law.
        </p>
      </LegalSection>

      <LegalSection heading="4. Cookies &amp; Analytics">
        <p>
          This site may use cookies required for basic technical operation.
          If analytics tools are used, data such as IP address, device
          information, and general usage behavior may be collected. You can
          disable cookies at any time in your browser settings.
        </p>
      </LegalSection>

      <LegalSection heading="5. Storage &amp; Deletion">
        <p>
          Personal data is only stored for as long as necessary to provide
          the requested service or to meet legal obligations, and is deleted
          once that purpose no longer applies.
        </p>
      </LegalSection>

      <LegalSection heading="6. Your Rights">
        <p>
          You have the right to access, correct, delete, or restrict the
          processing of your personal data, and the right to data
          portability. You may object to the processing of your data at any
          time.
        </p>
      </LegalSection>

      <LegalSection heading="7. Contact &amp; Complaints">
        <p>
          For any questions regarding this policy, contact{" "}
          <a
            href="mailto:info.saviolo@gmail.com"
            className="text-accent hover:underline"
          >
            info.saviolo@gmail.com
          </a>
          . You also have the right to lodge a complaint with the Berlin
          Commissioner for Data Protection and Freedom of Information
          (Berliner Beauftragte für Datenschutz und Informationsfreiheit).
        </p>
      </LegalSection>
    </LegalPage>
  );
}
