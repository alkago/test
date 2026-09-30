import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TagLink from "@/components/TagLink";
import { formatDate } from "@/lib/format";
import { markdownToHtml } from "@/lib/markdown";
import { getAllPosts, getPostBySlug } from "@/lib/posts";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug((await params).slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const post = getPostBySlug((await params).slug);
  if (!post) notFound();

  const html = await markdownToHtml(post.content);

  return (
    <article>
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">{post.title}</h1>
        <div className="mt-3 text-sm text-muted">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span className="mx-2">·</span>
          {post.readingMinutes}분
        </div>
        {post.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <TagLink key={tag} tag={tag} />
            ))}
          </div>
        )}
      </header>
      <div
        className="prose prose-neutral max-w-none dark:prose-invert prose-pre:bg-transparent"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </article>
  );
}
