import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { NAV, SEARCH_INDEXING_ENABLED } from "../lib/site";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "The Garden", template: "%s | The Garden" },
  description:
    "The Garden: a proposed federal law for self-governing nations founded by descendants of people enslaved in the United States. The address, the Act, and the research, published in full.",
  robots: { index: SEARCH_INDEXING_ENABLED, follow: SEARCH_INDEXING_ENABLED },
};

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">Skip to main content</a>
        <header className="site-header">
          <div className="preheader">PROPOSED FEDERAL LEGISLATION · GARDEN ACT VERSION 1.0 · NOT ENACTED LAW</div>
          <div className="topbar wrap">
            <Link href="/" className="logo"><span aria-hidden="true" className="logo-mark">✦</span> The Garden</Link>
            <nav aria-label="Primary" className="main-nav">
              {NAV.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
            </nav>
          </div>
        </header>
        <main id="main" tabIndex={-1}>{children}</main>
        <footer className="site-footer">
          <div className="wrap footer-inner">
            <div>
              <div className="footer-brand">✦ The Garden</div>
              <p>The Garden is a legislative proposal by Phillip Galinsky. It is not enacted law, and no government program, enrollment, or account exists under it.</p>
            </div>
            <nav aria-label="Further information" className="footer-links">
              {NAV.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
              <Link href="/notes/">Drafting notes</Link>
              <a href="https://github.com/neophilism/The-Garden">Development repository</a>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}
