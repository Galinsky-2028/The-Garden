import manifest from "../content/manifest.json";

/**
 * Search engines are told not to index the site while this is false. It stays false until
 * the owner approves the open items listed in docs/public-site.md, and then becomes true.
 */
export const SEARCH_INDEXING_ENABLED = false;

export type DocumentKey = "address" | "act" | "notes" | "registry";

export type TocEntry = { id: string; label: string; level: number };

export type DocumentRecord = {
  title: string;
  source: string;
  source_sha256: string;
  omitted_sections: string[];
  words: number;
  toc: TocEntry[];
};

export const DOCUMENTS = manifest.documents as Record<DocumentKey, DocumentRecord>;

export const NAV: readonly { label: string; href: string }[] = [
  { label: "The address", href: "/address/" },
  { label: "How it works", href: "/how-it-works/" },
  { label: "The Act", href: "/act/" },
  { label: "Nations registry", href: "/registry/" },
  { label: "Documents", href: "/documents/" },
];

export type Step = {
  title: string;
  paragraphs: readonly string[];
  sections: readonly string[];
};

/**
 * A plain-language walk through the Garden Act v1.0. Every statement here was checked against
 * the cited sections of policy/legislation/Garden_Act_v1-0_2026-09-28.md. When the Act changes,
 * this text must be checked again; the content manifest test fails when the Act's hash changes.
 */
export const HOW_IT_WORKS: readonly Step[] = [
  {
    title: "Congress passes the Act",
    paragraphs: [
      "Nothing in the Garden operates until Congress enacts the Act. A power that depends on certification, funding, land, a compact, or a regulatory approval begins only when that condition is met.",
      "Within 180 days after enactment, the Secretary of the Interior must publish proposed rules for certification, enrollment evidence and privacy, compact review, and fees, and must take public comment before the rules become final.",
    ],
    sections: ["1301", "1303"],
  },
  {
    title: "Historians build the Founding Roster",
    paragraphs: [
      "The Secretary of the Interior commissions qualified historians and archivists through open competition to prepare a Founding Roster of historic African political communities. Each entry must state the evidence that the community existed, what is known of its institutions, its relationship to enslavement, and the limits of the record. A people, a language, a trading port, or a region is not listed as a political community without affirmative evidence.",
      "An initial roster is due within 18 months after funding becomes available. A public comment period of at least 180 days follows, then a revised roster. Anyone may petition to add or correct an entry, and the decision on a petition can be reviewed in federal court.",
    ],
    sections: ["201", "202"],
  },
  {
    title: "Descendants choose whether to join",
    paragraphs: [
      "An eligible descendant is a United States citizen who is a lineal descendant of a person held in hereditary chattel slavery before December 6, 1865, in territory that is now a State or the District of Columbia. Eligibility does not depend on race, appearance, or proportion of ancestry.",
      "Each eligible descendant may choose one nation to join during a founding period that stays open for at least 24 months. No government may assign anyone an African origin, require proof of descent from a particular historic community, or require a genetic test, a blood-quantum determination, or a racial classification.",
      "Eligibility is decided under uniform published standards by an enrollment body that each organizing community selects. The standard is a preponderance of the evidence, a missing record does not by itself establish ineligibility, and an applicant who is refused receives the reasons and an appeal to an impartial decision maker.",
      "Joining does not replace or reduce United States citizenship or the right to vote in United States, State, or local elections. A citizen may later renounce national citizenship.",
    ],
    sections: ["103", "301", "302"],
  },
  {
    title: "Communities write constitutions and are certified",
    paragraphs: [
      "A founding community submits its name, its historical affiliation, its founding roll, a constitution approved by a recorded vote of its adult founders, and the results of its first election.",
      "The constitution must provide representative government, regular elections, published laws and budgets, an impartial judiciary, and the rights protections the Act requires. Beyond those requirements, each nation designs its own government, and the Secretary may not prescribe a uniform constitution.",
      "The Secretary must certify a community that meets the published criteria within 180 days or state in writing which requirement it has not met, and a denial can be challenged in federal court. Certification may not depend on securing a business compact or demonstrating racial identity.",
    ],
    sections: ["401"],
  },
  {
    title: "Certified nations govern themselves",
    paragraphs: [
      "A certified nation holds the governmental powers the Act confers, modeled on those exercised by the Mohegan Tribe and the Mashantucket Pequot Tribal Nation: lawmaking, courts, taxation within its jurisdiction, police, fire, and emergency medical services, and a sovereign immunity that it may waive.",
      "Recognition under the Act is not recognition as an Indian tribe, not international statehood, and not a right of secession. National citizenship creates no exemption from federal income tax.",
      "Every person subject to a nation's authority keeps, at a minimum, the protections of the Indian Civil Rights Act, the right to appointed counsel whenever imprisonment is possible, and access to federal habeas corpus.",
    ],
    sections: ["401", "402", "403", "404", "405", "406"],
  },
  {
    title: "The nations form the Garden",
    paragraphs: [
      "Certified nations may join together in the General Assembly of African American Republican Tribal Nations, which the Act names the Garden. Each participating nation has an equal voice in the procedures that govern access to published opportunities.",
      "The Assembly keeps the register of published opportunities, receives the nations' sealed preference lists, and helps nations negotiate. It may not legislate for any nation, tax anyone, compel a settlement, or promise any nation a business award. A nation that stays out of the Assembly keeps equal access to the same opportunities through the Secretary's register.",
    ],
    sections: ["501"],
  },
  {
    title: "States decide what, if anything, to offer",
    paragraphs: [
      "No State is required to take part. A State may participate one industry and one district at a time, and it must publish each offer with its districts, activities, conditions, and duration.",
      "An offer qualifies only if the activity was closed to ordinary private businesses in that district beforehand and no existing operator, license, or vested right would be displaced. An activity already authorized under State law counts as an open market even where federal law restricts it. Before a compact is certified, the State must publish a market and rights assessment and allow at least 90 days of public comment.",
      "Land becomes Garden land only with the consent of the nation, the State legislature, the affected local government, and each affected owner. The Act authorizes no taking by eminent domain and no displacement of existing occupants.",
    ],
    sections: ["601", "602", "701"],
  },
  {
    title: "Nations rank their choices, negotiate, and sign compacts",
    paragraphs: [
      "After founding enrollment closes, every published opportunity enters a common register, and each nation may submit a sealed, ranked list of the opportunities it wants.",
      "An uncontested first choice gives that nation the opportunity to negotiate with the offering government; it is not an automatic award. Where several nations want the same opportunity, they negotiate among themselves for a division, a joint enterprise, or a revised proposal, and the opportunity stays unawarded until they agree.",
      "A resulting compact takes effect only after federal certification, which the Secretary must grant or deny in writing within 180 days of a complete compact.",
    ],
    sections: ["602", "801"],
  },
  {
    title: "Three industries, and no others without a new act of Congress",
    paragraphs: [
      "Cannabis: a qualifying enterprise may cultivate, process, and sell cannabis within the limits of its compact, and only adults at least 21 years old may buy it.",
      "Gaming: a qualifying enterprise may offer the games and in-state sports wagering that a compact authorizes, under independent licensing, audits, age limits, and problem-gambling protections.",
      "Therapeutic substances: a compact may authorize research, manufacture, distribution, or supervised administration of psilocybin or ibogaine, but operation begins only to the extent federal drug law allows it.",
      "Outside these stated exceptions, federal criminal, tax, employment, environmental, banking, and consumer-protection law continues to apply.",
    ],
    sections: ["901", "902", "903", "904"],
  },
  {
    title: "Each nation owns its enterprise",
    paragraphs: [
      "The exclusive authorization belongs to the nation as a whole and cannot be sold, pledged, or transferred. The nation must keep majority voting control and a majority economic interest, although private lenders and minority investors may take part on disclosed terms.",
      "Each nation decides through its own budget process how its enterprise returns are used. No initial exclusive term may exceed 25 years. If a State later opens the same activity to everyone in the district, the exclusivity ends, and the enterprise may continue on the same terms as other licensed operators.",
    ],
    sections: ["1001", "1002"],
  },
  {
    title: "How the public money works",
    paragraphs: [
      "The only appropriation the Act authorizes is for the historical census, its publication, source preservation, and its administration. The Founding Fund may not pay for land, businesses, or payments to individuals.",
      "A nation that receives an exclusive authorization pays 1 percent of its share of positive net income from its qualifying enterprises each year until the Treasury has recovered the audited Founding Fund spending plus a fixed 5 percent. The payment then ends permanently, and no payment is due in a year without positive qualifying income.",
      "Repayment comes only from enterprise receipts, creates no liability for individual citizens, and is not guaranteed if the enterprises do not earn enough. Regulators may charge fees limited to the documented cost of reviewing and supervising a compact.",
    ],
    sections: ["1101", "1102"],
  },
  {
    title: "Accountability",
    paragraphs: [
      "Each nation must publish its constitution, its laws, its budget, and audited accounts of its enterprises, and its officers must disclose conflicts of interest.",
      "Federal courts can hear disputes about a nation's jurisdiction and enforce the rights the Act secures, and anyone detained by a nation can petition a federal court for habeas corpus.",
      "The Comptroller General reports to Congress every five years on results, costs, recoveries, and effects on existing markets. The authority to certify new exclusive compacts expires 15 years after enactment unless Congress renews it.",
    ],
    sections: ["1201", "1202", "1301"],
  },
];

export const DOWNLOADS: readonly { label: string; file: string; source: string; note: string }[] = [
  { label: "The address", file: "the-garden-address.docx", source: "policy/supporting/garden.docx", note: "Word document" },
  { label: "Garden Act, version 1.0", file: "garden-act-v1-0.docx", source: "policy/legislation/Garden_Act_v1-0_2026-09-28.docx", note: "Word document" },
  { label: "Garden Act, version 1.0", file: "garden-act-v1-0.md", source: "policy/legislation/Garden_Act_v1-0_2026-09-28.md", note: "Markdown text" },
  { label: "Garden Act, version 1.0", file: "garden-act-v1-0.tex", source: "policy/legislation/Garden_Act_v1-0_2026-09-28.tex", note: "LaTeX source" },
  { label: "Source and drafting notes, complete original", file: "garden-act-drafting-notes-v1-0.md", source: "policy/legislation/Garden_Act_Source-and-Drafting-Notes_v1-0_2026-09-28.md", note: "Markdown text" },
  { label: "Registry of African Tribal Nations, edition 1.30-alpha", file: "registry-african-tribal-nations-v1-30-alpha.docx", source: "policy/historical-research/registry_African-Tribal-Nations_atlas_v1-30-alpha_2026-10-10.docx", note: "Word document" },
];
