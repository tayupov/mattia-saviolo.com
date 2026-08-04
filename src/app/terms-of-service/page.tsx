import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms and conditions covering production, mixing, mastering, and coaching services booked with Mattia Saviolo.",
  alternates: { canonical: "/terms-of-service" },
};

export default function TermsOfServicePage() {
  return (
    <LegalPage title="Terms of Service" updated="2025">
      <LegalSection heading="1. Scope">
        <p>
          These Terms of Service apply to all services offered by Mattia
          Saviolo via this website. By booking a session you agree to these
          conditions, which cover music production, mixing, mastering, and
          1:1 mentoring.
        </p>
      </LegalSection>

      <LegalSection heading="2. Services">
        <p>
          Services delivered include creative and technical work such as
          production, mixing, mastering, and one-on-one coaching. The scope
          and pricing of each project are agreed individually with the
          client before work begins.
        </p>
      </LegalSection>

      <LegalSection heading="3. Payment">
        <p>
          Payment terms are agreed upon before the start of a project.
          Unless specified otherwise, full payment is due immediately upon
          completion of the service.
        </p>
      </LegalSection>

      <LegalSection heading="4. Copyright">
        <p>
          All music, mixes, and productions remain the intellectual property
          of the client. I retain the right to use anonymized excerpts for
          portfolio and demonstration purposes, unless the client objects in
          writing.
        </p>
      </LegalSection>

      <LegalSection heading="5. Liability">
        <p>
          I am not liable for indirect damages, loss of profit, or data
          loss. Liability for willful misconduct and gross negligence
          remains unaffected.
        </p>
      </LegalSection>

      <LegalSection heading="6. Final Provisions">
        <p>
          German law applies. The place of jurisdiction is Berlin, Germany,
          insofar as legally permissible.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
