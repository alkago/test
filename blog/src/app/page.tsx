import PostList from "@/components/PostList";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  return <PostList posts={getAllPosts()} />;
}
