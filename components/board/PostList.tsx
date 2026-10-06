import type { Post } from "@/lib/board-data";
import PostListItem from "./PostListItem";

export default function PostList({ posts, onDeleted }: { posts: Post[]; onDeleted: (id: number) => void }) {
  if (posts.length === 0) {
    return (
      <p className="rounded-2xl glass py-16 text-center text-muted">
        아직 작성된 글이 없어요. 첫 글을 남겨보세요!
      </p>
    );
  }

  return (
    <ul className="divide-y divide-ink/8 rounded-2xl glass">
      {posts.map((post) => (
        <PostListItem key={post.id} post={post} onDeleted={onDeleted} />
      ))}
    </ul>
  );
}
