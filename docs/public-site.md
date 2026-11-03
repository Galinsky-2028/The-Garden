# Public website

The public website publishes the Garden's documents in full. It is a static site built from `apps/public` and deployed on Render as a static site.

## What it publishes

| Page | Content | Source |
| --- | --- | --- |
| `/address/` | The address, complete | `policy/supporting/garden.docx` |
| `/act/` | Garden Act version 1.0, complete, with title and section anchors (`#title-ii`, `#sec-1101`) | `policy/legislation/Garden_Act_v1-0_2026-09-28.md` |
| `/notes/` | Source and drafting notes, without the final "Project continuity" section, which lists internal file identifiers | `policy/legislation/Garden_Act_Source-and-Drafting-Notes_v1-0_2026-09-28.md` |
| `/registry/` | Registry of African Tribal Nations, working research edition 1.30-alpha, complete | `policy/historical-research/registry_African-Tribal-Nations_atlas_v1-30-alpha_2026-10-10.docx` |
| `/how-it-works/` | A plain-language walkthrough of the Act in twelve steps; every step links to the sections it describes | `apps/public/lib/site.ts` (`HOW_IT_WORKS`), checked against the Act |
| `/documents/` | Downloads of the unaltered originals | copied from `policy/` at build time |

## How the pages stay faithful to the documents

`scripts/generate_public_content.py` converts each source with pandoc into `apps/public/content/<name>.html` and records each source's SHA-256 in `apps/public/content/manifest.json`. The test suite recomputes those hashes. When any source document changes, `npm test` fails until the content is regenerated:

```sh
python3 scripts/generate_public_content.py          # regenerate (requires pandoc)
python3 scripts/generate_public_content.py --check  # confirm the committed pages are current
```

When the Act changes, the `HOW_IT_WORKS` text in `apps/public/lib/site.ts` must also be checked against the new text, because it paraphrases the Act.

## Build and deployment

```sh
npm ci --include=dev --ignore-scripts --no-audit
npm run build:public      # writes apps/public/out
```

Render static site settings: build command `npm ci --include=dev --ignore-scripts --no-audit && npm run build:public`, publish directory `apps/public/out`, environment variable `NODE_VERSION=24`.

## Search indexing

`SEARCH_INDEXING_ENABLED` in `apps/public/lib/site.ts` controls both `robots.txt` and the page-level robots tag. It is `false` until the owner approves the open items below.

## Open items for the owner (November 3, 2026)

1. The address (July 2026) says the program has "zero taxpayer cost" and that the advance "repays itself". Section 1101(e) of the Act says repayment "is not guaranteed if enterprises fail", and section 1102(b) forbids describing the Act as having zero fiscal cost.
2. The address says "there is no state sorting of citizens by ancestry". Sections 103(1) and 301(b) of the Act make founding eligibility depend on documented lineal descent from a person held in chattel slavery, decided by an enrollment body under published standards.
3. The address says cannabis "is federally prohibited to every citizen". Since April 28, 2026 (91 Fed. Reg. 22,714), marijuana under a State medical license is in Schedule III; other marijuana remains in Schedule I.
4. The address says the April 2026 executive order on ibogaine pledges "federal dollars to labor beside the very states". Contemporary reporting describes a $50 million federal investment in psychedelic research generally and does not describe a partnership with the States.
5. The address spells "Mash Inn tuck it Pee kwat" phonetically for reading aloud; the web text could use "Mashantucket Pequot".
6. The illustrated research book (`book_Not-From-Nowhere_atlas-working-research-edition_v1-30-alpha_2026-10-10.docx`, 219 MB, plus a later v1.33) is not in this repository. Publishing it requires the file and an item-by-item check of illustration rights.
