import type { Metadata } from "next";
import Link from "next/link";
import { DocumentView } from "../DocumentView";

export const metadata: Metadata = {
  title: "Registry of African Tribal Nations",
  description: "Working research edition of the registry of historic African political communities.",
};

export default function RegistryPage() {
  return (
    <DocumentView
      docKey="registry"
      eyebrow="Historical research · Not From Nowhere"
      title="Registry of African Tribal Nations"
      meta="Working research edition 1.30-alpha · October 10, 2026"
    >
      <p className="doc-note">
        This registry is independent research. Under section 201 of the <Link href="/act/#title-ii">Garden Act</Link>,
        the official Founding Roster would be prepared by historians commissioned through open competition, and
        research such as this may be submitted to that census on the same terms as any other evidence.
      </p>
    </DocumentView>
  );
}
