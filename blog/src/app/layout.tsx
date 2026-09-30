import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: siteConfig.title, template: `%s | ${siteConfig.title}` },
  description: siteConfig.description,
  alternates: { types: { "application/rss+xml": "/rss.xml" } },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body className="font-sans antialiased">
        <div className="mx-auto flex min-h-screen max-w-2xl flex-col px-4">
          <header className="flex items-center justify-between py-8">
            <Link href="/" className="text-lg font-bold">
              {siteConfig.title}
            </Link>
            <nav className="flex gap-4 text-sm text-muted">
              <Link href="/tags" className="hover:text-foreground">Tags</Link>
              <a href="/rss.xml" className="hover:text-foreground">RSS</a>
            </nav>
          </header>
          <main className="flex-1 pb-16">{children}</main>
          <footer className="border-t border-border py-6 text-sm text-muted">
            © {new Date().getFullYear()} {siteConfig.author}
          </footer>
        </div>
      </body>
    </html>
  );
}
