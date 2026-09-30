import { getAllPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

const escape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function GET() {
  const items = getAllPosts()
    .map((post) => {
      const link = `${siteConfig.url}/posts/${post.slug}`;
      return `<item>
  <title>${escape(post.title)}</title>
  <link>${link}</link>
  <guid>${link}</guid>
  <pubDate>${new Date(post.date).toUTCString()}</pubDate>
  <description>${escape(post.description)}</description>
</item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>${escape(siteConfig.title)}</title>
  <link>${siteConfig.url}</link>
  <description>${escape(siteConfig.description)}</description>
${items}
</channel>
</rss>`;

  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
