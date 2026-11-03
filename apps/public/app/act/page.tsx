import type { Metadata } from "next";
import { DocumentView } from "../DocumentView";

export const metadata: Metadata = {
  title: "The Garden Act",
  description: "The full text of the Garden National Restoration and Economic Self-Government Act, version 1.0.",
};

export default function ActPage() {
  return (
    <DocumentView
      docKey="act"
      eyebrow="Proposed federal legislation"
      title="Garden National Restoration and Economic Self-Government Act"
      meta="Version 1.0 · September 28, 2026 · Not enacted law"
    />
  );
}
