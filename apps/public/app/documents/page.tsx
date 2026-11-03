import type { Metadata } from "next";
import { repositoryFileSize } from "../../lib/documents";
import { DOWNLOADS } from "../../lib/site";

export const metadata: Metadata = {
  title: "Documents",
  description: "Download the original Garden documents.",
};

function size(bytes: number): string {
  return bytes >= 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.round(bytes / 1024)} KB`;
}

export default function DocumentsPage() {
  return (
    <>
      <div className="section-heading">
        <div className="wrap">
          <p className="eyebrow gold">Documents</p>
          <h1>The original documents</h1>
          <p className="hero-context">
            Every page of this site is generated from these files. Each download is the unaltered original.
          </p>
        </div>
      </div>
      <div className="section wrap">
        <ul className="download-list">
          {DOWNLOADS.map((item) => (
            <li key={item.file}>
              <a href={`/documents/${item.file}`} download>
                <span className="dl-label">{item.label}</span>
                <span className="dl-meta">{item.note} · {size(repositoryFileSize(item.source))}</span>
              </a>
            </li>
          ))}
        </ul>
        <p className="source-note">
          The development repository, including the complete history of every document, is at{" "}
          <a href="https://github.com/neophilism/The-Garden">github.com/neophilism/The-Garden</a>.
        </p>
      </div>
    </>
  );
}
