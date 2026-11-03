import type { Metadata } from "next";
import Link from "next/link";
import { HOW_IT_WORKS } from "../../lib/site";

export const metadata: Metadata = {
  title: "How it works",
  description: "A step-by-step explanation of the Garden Act, with every step tied to the section of the Act that requires it.",
};

export default function HowItWorksPage() {
  return (
    <>
      <div className="section-heading">
        <div className="wrap">
          <p className="eyebrow gold">How it works</p>
          <h1>From an act of Congress to self-governing nations</h1>
          <p className="hero-context">
            Each step below explains one part of the Garden Act, version 1.0, and links to the sections of
            the Act that require it, so that every statement on this page can be checked against the law itself.
          </p>
        </div>
      </div>
      <div className="section wrap">
        <ol className="walkthrough">
          {HOW_IT_WORKS.map((step, index) => (
            <li key={step.title} className="walk-step">
              <p className="walk-num" aria-hidden="true">{String(index + 1).padStart(2, "0")}</p>
              <div>
                <h2>{step.title}</h2>
                {step.paragraphs.map((text) => (
                  <p key={text}>{text}</p>
                ))}
                <p className="walk-cite">
                  {step.sections.length > 1 ? "Sections " : "Section "}
                  {step.sections.map((section, i) => (
                    <span key={section}>
                      {i > 0 ? ", " : ""}
                      <Link href={`/act/#sec-${section}`}>{section}</Link>
                    </span>
                  ))}
                </p>
              </div>
            </li>
          ))}
        </ol>
        <p className="walk-end">
          <Link className="btn primary" href="/act/">Read the full Act</Link>
        </p>
      </div>
    </>
  );
}
