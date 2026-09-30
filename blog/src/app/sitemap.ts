import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteConfig.url },
    ...getAllPosts().map((post) => ({
      url: `${siteConfig.url}/posts/${post.slug}`,
      lastModified: post.date,
    })),
  ];
}
