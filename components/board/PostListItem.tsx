import Link from "next/link";
import type { Post } from "@/lib/board-data";
import PostOwnerActions from "./PostOwnerActions";

export default function PostListItem({ post, onDeleted }: { post: Post; onDeleted: (id: number) => void }) {
  return (
    <li className="flex items-start justify-between gap-4 px-5 py-4">
      <div className="min-w-0">
        <Link
          href={`/board/${post.id}`}
          className="block truncate font-semibold text-ink hover:text-tomato"
        >
          {post.title}
        </Link>
        <p className="mt-1 text-xs text-muted">
          {post.authorName} · {post.createdAt} · 조회 {post.views}
        </p>
      </div>
      <PostOwnerActions postId={post.id} authorId={post.authorId} onDeleted={onDeleted} />
    </li>
  );
}
