import type { Metadata } from "next";
import Link from "next/link";
import { DocumentView } from "../DocumentView";

export const metadata: Metadata = {
  title: "Source and drafting notes",
  description: "The sources and drafting choices behind the Garden Act, version 1.0.",
};

export default function NotesPage() {
  return (
    <DocumentView
      docKey="notes"
      eyebrow="Companion to the Act"
      title="Source and drafting notes"
      meta="Version 1.0 · September 28, 2026"
    >
      <p className="doc-note">
        This page omits the original&apos;s final section, which lists internal file identifiers used while
        drafting. The <Link href="/documents/">complete original</Link> is available on the documents page.
      </p>
    </DocumentView>
  );
}
