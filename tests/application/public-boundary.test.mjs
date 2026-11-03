import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const read = (p) => readFileSync(join(process.cwd(), p), "utf8");
const sha256 = (p) => createHash("sha256").update(readFileSync(join(process.cwd(), p))).digest("hex");
const manifest = JSON.parse(read("apps/public/content/manifest.json"));
const site = read("apps/public/lib/site.ts");
const PAGES = [
  "apps/public/app/layout.tsx",
  "apps/public/app/page.tsx",
  "apps/public/app/DocumentView.tsx",
  "apps/public/app/address/page.tsx",
  "apps/public/app/act/page.tsx",
  "apps/public/app/notes/page.tsx",
  "apps/public/app/registry/page.tsx",
  "apps/public/app/how-it-works/page.tsx",
  "apps/public/app/documents/page.tsx",
  "apps/public/lib/site.ts",
];

test("workspace packages and pinned Next/React versions", () => {
  const root = JSON.parse(read("package.json"));
  const web = JSON.parse(read("apps/public/package.json"));
  const research = JSON.parse(read("apps/research/package.json"));
  assert.equal(root.engines.node, ">=24 <25");
  assert.equal(web.dependencies.next, "16.4.3");
  assert.equal(web.dependencies.react, "19.3.0");
  assert.equal(research.dependencies.next, web.dependencies.next);
  assert.deepEqual(new Set(root.workspaces), new Set(["apps/public", "apps/research", "packages/domain", "services/workers"]));
});

test("public output is static and contains no runtime database or secret references", () => {
  assert.match(read("apps/public/next.config.mjs"), /output: 'export'/);
  for (const name of PAGES) {
    assert.doesNotMatch(read(name), /DATABASE_URL|process\.env\.(?!NEXT_PUBLIC)|RESEARCH_DATABASE_URL|GARDEN_.*SECRET|private-data\//, name);
  }
});

test("every published document matches the committed source it was generated from", () => {
  for (const [key, doc] of Object.entries(manifest.documents)) {
    assert.ok(existsSync(doc.source), `${key}: source ${doc.source} is missing`);
    assert.equal(sha256(doc.source), doc.source_sha256,
      `${key}: ${doc.source} changed; run python3 scripts/generate_public_content.py and recheck apps/public/lib/site.ts`);
    assert.ok(existsSync(`apps/public/content/${key}.html`), `${key}: generated page is missing`);
    assert.ok(doc.words > 1000, `${key}: generated page is unexpectedly short`);
  }
});

test("the address is published in full, ending with its closing line", () => {
  const address = read("apps/public/content/address.html");
  assert.match(address, /Plant the garden!<\/p>\s*$/);
  assert.match(address, /^<p>Before I say one word of policy/);
});

test("every section cited on the how-it-works page exists in the published Act", () => {
  const act = read("apps/public/content/act.html");
  const cited = [...site.matchAll(/sections: \[([^\]]+)\]/g)].flatMap((m) => [...m[1].matchAll(/"(\d+)"/g)].map((s) => s[1]));
  assert.ok(cited.length >= 20);
  for (const section of cited) assert.match(act, new RegExp(`id="sec-${section}"`), `section ${section}`);
});

test("downloads point to committed originals and the copy step reads the same list", () => {
  const pairs = [...site.matchAll(/file: "([^"]+)", source: "([^"]+)"/g)];
  assert.equal(pairs.length, 6);
  for (const [, , source] of pairs) assert.ok(existsSync(source), source);
  assert.match(read("scripts/copy-public-documents.mjs"), /apps\/public\/lib\/site\.ts/);
  assert.match(JSON.parse(read("package.json")).scripts["build:public"], /copy-public-documents\.mjs/);
});

test("search indexing is controlled by one flag, and the site has no tracking, scripts or forms", () => {
  assert.match(site, /export const SEARCH_INDEXING_ENABLED = (true|false);/);
  assert.match(read("apps/public/app/robots.ts"), /SEARCH_INDEXING_ENABLED/);
  assert.match(read("apps/public/app/layout.tsx"), /index: SEARCH_INDEXING_ENABLED/);
  for (const name of PAGES) {
    assert.doesNotMatch(read(name), /google-analytics|gtag|pixel|posthog|<script|<form/i, name);
  }
});

test("the site never presents the proposal as enacted law or an operating program", () => {
  const layout = read("apps/public/app/layout.tsx");
  assert.match(layout, /NOT ENACTED LAW/);
  assert.match(layout, /no government program, enrollment, or account exists/);
});

test("private research shell is disabled and isolated", () => {
  assert.match(read("apps/research/app/api/health/route.ts"), /status:503/);
  assert.match(read("apps/research/app/page.tsx"), /not enabled/);
  assert.doesNotMatch(read("apps/research/app/page.tsx"), /<form|action=/);
});
