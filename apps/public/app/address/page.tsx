import type { Metadata } from "next";
import { DocumentView } from "../DocumentView";

export const metadata: Metadata = {
  title: "The address",
  description: "The full text of the address that introduces the Garden.",
};

export default function AddressPage() {
  return (
    <DocumentView
      docKey="address"
      eyebrow="The address"
      title="The Garden"
      meta="Address by Phillip Galinsky · July 2026"
    />
  );
}
