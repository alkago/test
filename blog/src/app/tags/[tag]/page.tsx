import type { Metadata } from "next";
import PostList from "@/components/PostList";
import { getAllTags, getPostsByTag } from "@/lib/posts";

type Props = { params: Promise<{ tag: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllTags().map(({ tag }) => ({ tag }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return { title: `#${decodeURIComponent((await params).tag)}` };
}

export default async function TagPage({ params }: Props) {
  const tag = decodeURIComponent((await params).tag);
  return (
    <>
      <h1 className="mb-8 text-2xl font-bold">#{tag}</h1>
      <PostList posts={getPostsByTag(tag)} />
    </>
  );
}
