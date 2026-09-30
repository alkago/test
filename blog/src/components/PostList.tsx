import Link from "next/link";
import type { PostMeta } from "@/lib/posts";
import { formatDate } from "@/lib/format";
import TagLink from "./TagLink";

export default function PostList({ posts }: { posts: PostMeta[] }) {
  if (posts.length === 0) {
    return <p className="text-muted">아직 작성된 글이 없습니다.</p>;
  }
  return (
    <ul className="space-y-10">
      {posts.map((post) => (
        <li key={post.slug}>
          <article>
            <div className="text-sm text-muted">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span className="mx-2">·</span>
              {post.readingMinutes}분
              {post.draft && <span className="ml-2 text-amber-600">[draft]</span>}
            </div>
            <h2 className="mt-1 text-xl font-semibold">
              <Link href={`/posts/${post.slug}`} className="hover:underline">
                {post.title}
              </Link>
            </h2>
            {post.description && <p className="mt-2 text-muted">{post.description}</p>}
            {post.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <TagLink key={tag} tag={tag} />
                ))}
              </div>
            )}
          </article>
        </li>
      ))}
    </ul>
  );
}
