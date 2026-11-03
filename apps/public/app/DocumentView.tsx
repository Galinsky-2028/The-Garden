import Link from "next/link";
import type { ReactNode } from "react";
import { documentHtml } from "../lib/documents";
import { DOCUMENTS, type DocumentKey } from "../lib/site";

export function DocumentView({
  docKey,
  eyebrow,
  title,
  meta,
  children,
}: {
  docKey: DocumentKey;
  eyebrow: string;
  title: string;
  meta: string;
  children?: ReactNode;
}) {
  const record = DOCUMENTS[docKey];
  // The contents list shows each document's highest heading level: titles of the Act,
  // sections of the registry, and headings of the drafting notes.
  const topLevel = Math.min(...record.toc.map((entry) => entry.level));
  const toc = record.toc.filter((entry) => entry.level === topLevel);
  return (
    <>
      <div className="section-heading">
        <div className="wrap">
          <p className="eyebrow gold">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="doc-meta">{meta} · {record.words.toLocaleString("en-US")} words</p>
        </div>
      </div>
      <div className={toc.length > 0 ? "wrap doc-layout" : "wrap doc-layout single"}>
        {toc.length > 0 && (
          <nav className="doc-toc" aria-label="Contents">
            <p className="eyebrow">Contents</p>
            <ol>
              {toc.map((entry) => (
                <li key={entry.id}>
                  <a href={`#${entry.id}`}>{entry.label}</a>
                </li>
              ))}
            </ol>
          </nav>
        )}
        <article className="doc-body">
          {children}
          <div dangerouslySetInnerHTML={{ __html: documentHtml(docKey) }} />
          <p className="doc-end">
            <Link href="/documents/">Download the original document</Link>
          </p>
        </article>
      </div>
    </>
  );
}
