import Link from "next/link";
import { DOCUMENTS, HOW_IT_WORKS } from "../lib/site";

const CARDS = [
  {
    key: "address" as const,
    label: "01 / THE ADDRESS",
    title: "Why the Garden, in full",
    text: "The address that introduces the Garden: its premise, its history, and its answers to the objections it expects.",
    href: "/address/",
    link: "Read the address",
  },
  {
    key: "act" as const,
    label: "02 / THE ACT",
    title: "The law that would build it",
    text: "Version 1.0 of the Garden Act, in thirteen titles, from the historical census to the Founding Fund.",
    href: "/act/",
    link: "Read the Act",
  },
  {
    key: "registry" as const,
    label: "03 / THE REGISTRY",
    title: "The nations behind it",
    text: "A working research registry of historic African political communities, with the evidence and the limits of the record for each.",
    href: "/registry/",
    link: "Read the registry",
  },
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="wrap hero-inner">
          <p className="eyebrow gold">Proposed federal legislation</p>
          <h1>The <em>Garden</em></h1>
          <p className="hero-lead">
            A proposed federal law that would let descendants of people enslaved in the United States found
            self-governing nations, and would let States, by their own choice, offer those nations limited
            exclusive rights in industries that are closed to every ordinary business in the districts where
            they are offered.
          </p>
          <div className="actions">
            <Link className="btn primary" href="/address/">Read the address</Link>
            <Link className="btn outline" href="/how-it-works/">How it works</Link>
          </div>
        </div>
      </section>

      <section className="section wrap">
        <p className="eyebrow">Published in full</p>
        <h2>Every document, complete, with nothing summarized away.</h2>
        <div className="three-col">
          {CARDS.map((card) => (
            <article key={card.key} className="editorial-card">
              <p className="card-num">{card.label}</p>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
              <p className="card-words">{DOCUMENTS[card.key].words.toLocaleString("en-US")} words</p>
              <Link href={card.href}>{card.link} <span aria-hidden="true">→</span></Link>
            </article>
          ))}
        </div>
      </section>

      <section className="section mist">
        <div className="wrap split">
          <div>
            <p className="eyebrow">How it works</p>
            <h2>{HOW_IT_WORKS.length} steps, each tied to the section of the Act that requires it.</h2>
            <p>
              The walkthrough explains the Act in plain language, from the historical census through the
              compacts and the repayment of public funds, and links every step to the text of the law.
            </p>
            <Link className="text-link" href="/how-it-works/">Follow the steps <span aria-hidden="true">→</span></Link>
          </div>
          <ol className="steps" aria-label="The steps of the Garden Act">
            {HOW_IT_WORKS.map((step, i) => (
              <li key={step.title} className="step">
                <b>{String(i + 1).padStart(2, "0")}</b>
                <span>{step.title}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section dark-panel">
        <div className="wrap split">
          <div>
            <p className="eyebrow gold">The sources</p>
            <h2>Check the drafting against its sources.</h2>
          </div>
          <div>
            <p>
              The source and drafting notes record why the Act takes the form it does, what the Mohegan Tribe and
              the Mashantucket Pequot Tribal Nation actually do under their own governments, and the questions left
              for legislative counsel.
            </p>
            <Link className="btn outline" href="/notes/">Read the drafting notes</Link>
          </div>
        </div>
      </section>
    </>
  );
}
