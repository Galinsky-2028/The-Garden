// Copies the original source documents into the public site's download folder before each build.
// The list mirrors DOWNLOADS in apps/public/lib/site.ts; the public-site test checks that they match.
import { copyFileSync, mkdirSync, readFileSync, rmSync } from "node:fs";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const target = root + "apps/public/public/documents/";
const site = readFileSync(root + "apps/public/lib/site.ts", "utf8");
const pairs = [...site.matchAll(/file: "([^"]+)", source: "([^"]+)"/g)].map((m) => [m[1], m[2]]);
if (pairs.length === 0) throw new Error("No downloads declared in apps/public/lib/site.ts");

rmSync(target, { recursive: true, force: true });
mkdirSync(target, { recursive: true });
for (const [file, source] of pairs) copyFileSync(root + source, target + file);
console.log(`Copied ${pairs.length} source documents into apps/public/public/documents/`);
