import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import type { DocumentKey } from "./site";

// Pages are rendered once at build time, so the generated HTML is read from disk here and
// never shipped as a separate request. The build runs from apps/public; the fallback covers
// a build started from the repository root.
function contentDir(): string {
  const local = path.join(process.cwd(), "content");
  return existsSync(local) ? local : path.join(process.cwd(), "apps", "public", "content");
}

export function documentHtml(key: DocumentKey): string {
  return readFileSync(path.join(contentDir(), `${key}.html`), "utf8");
}

export function repositoryFileSize(source: string): number {
  const root = path.resolve(contentDir(), "..", "..", "..");
  return statSync(path.join(root, source)).size;
}
