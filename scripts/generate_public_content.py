#!/usr/bin/env python3
"""Generate the public website's full-text pages from the Garden source documents.

The public site publishes four documents in full: the address (policy/supporting/garden.docx),
the Garden Act v1.0, its source and drafting notes, and the working-edition registry of
African nations. This script converts each source with pandoc into an HTML fragment under
apps/public/content/ and records each source's SHA-256 in apps/public/content/manifest.json.

The test suite recomputes those hashes. When a source document changes, the tests fail until
this script is run again, so the website can never silently drift from the documents.

Usage (requires pandoc on PATH):
    python3 scripts/generate_public_content.py          # regenerate
    python3 scripts/generate_public_content.py --check  # verify that committed output is current
"""
from __future__ import annotations

import hashlib
import html
import json
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "apps" / "public" / "content"

SOURCES = {
    "address": {
        "path": "policy/supporting/garden.docx",
        "title": "The Garden: the address",
    },
    "act": {
        "path": "policy/legislation/Garden_Act_v1-0_2026-09-28.md",
        "title": "Garden National Restoration and Economic Self-Government Act, version 1.0",
    },
    "notes": {
        "path": "policy/legislation/Garden_Act_Source-and-Drafting-Notes_v1-0_2026-09-28.md",
        "title": "Garden Act source and drafting notes, version 1.0",
        # The final section records internal file-library identifiers for the drafting
        # workflow. It is omitted from the web page; the complete original is linked from
        # the documents page.
        "omit_sections": ["Project continuity"],
    },
    "registry": {
        "path": "policy/historical-research/registry_African-Tribal-Nations_atlas_v1-30-alpha_2026-10-10.docx",
        "title": "Registry of African Tribal Nations, working research edition 1.30-alpha",
    },
}


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def slug(text: str) -> str:
    text = html.unescape(re.sub(r"<[^>]+>", "", text)).lower()
    match = re.match(r"\s*sec\.\s*(\d+)", text)
    if match:
        return f"sec-{match.group(1)}"
    match = re.match(r"\s*title\s+([ivxlc]+)\b", text)
    if match:
        return f"title-{match.group(1)}"
    text = re.sub(r"[^a-z0-9]+", "-", text).strip("-")
    return text[:80] or "section"


def pandoc(path: Path) -> str:
    # fancy_lists is disabled so that statutory subsections keep their "(a)" labels as written.
    fmt = "docx" if path.suffix == ".docx" else "markdown-fancy_lists"
    result = subprocess.run(
        ["pandoc", str(path), "-f", fmt, "-t", "html5", "--wrap=none", "--shift-heading-level-by=1"],
        check=True,
        capture_output=True,
        text=True,
    )
    return result.stdout


def omit_sections(fragment: str, titles: list[str]) -> str:
    for title in titles:
        pattern = re.compile(
            r"<h3[^>]*>\s*" + re.escape(title) + r"\s*</h3>.*?(?=<h[23][\s>]|\Z)", re.S
        )
        fragment, count = pattern.subn("", fragment)
        if count != 1:
            raise SystemExit(f"Expected to omit exactly one section titled {title!r}; found {count}")
    return fragment


def postprocess(fragment: str, drop_first_heading: bool) -> tuple[str, list[dict]]:
    # Pandoc's first heading repeats the document title, which the page already shows.
    if drop_first_heading:
        fragment = re.sub(r"^\s*<h2[^>]*>.*?</h2>\s*", "", fragment, count=1, flags=re.S)

    toc: list[dict] = []
    used: set[str] = set()

    def heading(match: re.Match) -> str:
        level, inner = match.group(1), match.group(3)
        base = slug(inner)
        ident, n = base, 2
        while ident in used:
            ident, n = f"{base}-{n}", n + 1
        used.add(ident)
        label = html.unescape(re.sub(r"<[^>]+>", "", inner)).strip()
        if level in ("2", "3"):
            toc.append({"id": ident, "label": label, "level": int(level)})
        return f'<h{level} id="{ident}">{inner}</h{level}>'

    fragment = re.sub(r"<h([2-6])([^>]*)>(.*?)</h\1>", heading, fragment, flags=re.S)
    # Wide tables scroll inside their own box instead of widening the page on phones.
    fragment = re.sub(r"<table", '<div class="table-wrap"><table', fragment)
    fragment = fragment.replace("</table>", "</table></div>")
    # Pandoc's column-width hints make long tables unreadable on narrow screens.
    fragment = re.sub(r"<colgroup>.*?</colgroup>", "", fragment, flags=re.S)
    # Bare URLs in the reference lists become links.
    fragment = re.sub(
        r'(?<![">=])(https?://[^\s<]+[^\s<.,;)])',
        lambda m: f'<a href="{m.group(1)}" rel="noopener">{m.group(1)}</a>',
        fragment,
    )
    return fragment.strip() + "\n", toc


def words(fragment: str) -> int:
    return len(html.unescape(re.sub(r"<[^>]+>", " ", fragment)).split())


def build() -> dict[str, str]:
    outputs: dict[str, str] = {}
    manifest: dict = {"generator": "scripts/generate_public_content.py", "documents": {}}
    for key, spec in SOURCES.items():
        source = ROOT / spec["path"]
        fragment = pandoc(source)
        if spec.get("omit_sections"):
            fragment = omit_sections(fragment, spec["omit_sections"])
        fragment, toc = postprocess(fragment, drop_first_heading=key in ("act", "notes"))
        outputs[f"{key}.html"] = fragment
        manifest["documents"][key] = {
            "title": spec["title"],
            "source": spec["path"],
            "source_sha256": sha256(source),
            "omitted_sections": spec.get("omit_sections", []),
            "words": words(fragment),
            "toc": toc,
        }
    outputs["manifest.json"] = json.dumps(manifest, indent=1, ensure_ascii=False) + "\n"
    return outputs


def main() -> int:
    outputs = build()
    if "--check" in sys.argv:
        stale = [name for name, text in outputs.items()
                 if not (OUT / name).exists() or (OUT / name).read_text(encoding="utf-8") != text]
        if stale:
            print("Public content is out of date: " + ", ".join(stale))
            print("Run: python3 scripts/generate_public_content.py")
            return 1
        print("Public content matches the source documents.")
        return 0
    OUT.mkdir(parents=True, exist_ok=True)
    for name, text in outputs.items():
        (OUT / name).write_text(text, encoding="utf-8")
    for key, doc in json.loads(outputs["manifest.json"])["documents"].items():
        print(f"{key}: {doc['words']} words, {len(doc['toc'])} headings")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
