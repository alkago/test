import type { Metadata } from "next";
import TagLink from "@/components/TagLink";
import { getAllTags } from "@/lib/posts";

export const metadata: Metadata = { title: "Tags" };

export default function TagsPage() {
  const tags = getAllTags();
  return (
    <>
      <h1 className="mb-8 text-2xl font-bold">Tags</h1>
      {tags.length === 0 ? (
        <p className="text-muted">태그가 없습니다.</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {tags.map(({ tag, count }) => (
            <TagLink key={tag} tag={tag} count={count} />
          ))}
        </div>
      )}
    </>
  );
}
