import Link from "next/link";

export default function TagLink({ tag, count }: { tag: string; count?: number }) {
  return (
    <Link
      href={`/tags/${encodeURIComponent(tag)}`}
      className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted hover:border-foreground hover:text-foreground"
    >
      #{tag}
      {count !== undefined && <span className="ml-1">({count})</span>}
    </Link>
  );
}
