"use client";

import PageHeader from "@/components/common/PageHeader";
import { useAuth } from "@/lib/auth-context";
import BoardMessage from "./BoardMessage";
import PostForm from "./PostForm";
import { usePost } from "./usePost";

export default function PostEdit({ id }: { id: number }) {
  const { user } = useAuth();
  const state = usePost(id);

  if (state.status === "loading") return <BoardMessage>불러오는 중...</BoardMessage>;
  if (state.status === "missing") return <BoardMessage backLink>존재하지 않거나 삭제된 글이에요.</BoardMessage>;
  if (state.status === "error") return <BoardMessage backLink>글을 불러오지 못했어요. 잠시 후 다시 시도해 주세요.</BoardMessage>;

  const { post } = state;
  if (user?.id !== post.authorId) return <BoardMessage backLink>본인이 작성한 글만 수정할 수 있어요.</BoardMessage>;

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        title="글 수정"
        crumbs={[
          { label: "자유 게시판", href: "/board" },
          { label: post.title, href: `/board/${post.id}` },
        ]}
      />
      <PostForm post={post} />
    </div>
  );
}
