"use client";

import Link from "next/link";
import BoardMessage from "./BoardMessage";
import PostOwnerActions from "./PostOwnerActions";
import { usePost } from "./usePost";

export default function PostDetail({ id }: { id: number }) {
  const state = usePost(id);

  if (state.status === "loading") return <BoardMessage>불러오는 중...</BoardMessage>;
  if (state.status === "missing") return <BoardMessage backLink>존재하지 않거나 삭제된 글이에요.</BoardMessage>;
  if (state.status === "error") return <BoardMessage backLink>글을 불러오지 못했어요. 잠시 후 다시 시도해 주세요.</BoardMessage>;

  const { post } = state;
  return (
    <article className="mx-auto max-w-3xl rounded-2xl glass p-6">
      <header className="flex items-start justify-between gap-4 border-b border-ink/8 pb-4">
        <div className="min-w-0">
          <h1 className="text-2xl font-extrabold text-ink">{post.title}</h1>
          <p className="mt-2 text-sm text-muted">
            {post.authorName} · {post.createdAt} · 조회 {post.views}
          </p>
        </div>
        <PostOwnerActions postId={post.id} authorId={post.authorId} />
      </header>
      <p className="whitespace-pre-line py-6 leading-7 text-ink">{post.content}</p>
      <Link href="/board" className="text-sm font-medium text-tomato hover:underline">
        ← 목록으로
      </Link>
    </article>
  );
}
