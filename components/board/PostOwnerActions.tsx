"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { deletePost } from "@/lib/board-data";
import { useToast } from "@/components/common/Toast";

// 글 작성자에게만 수정/삭제 버튼을 보여준다.
// onDeleted가 없으면(상세 페이지) 삭제 후 목록으로 이동한다.
export default function PostOwnerActions({
  postId,
  authorId,
  onDeleted,
}: {
  postId: number;
  authorId: string | null;
  onDeleted?: (id: number) => void;
}) {
  const { user } = useAuth();
  const router = useRouter();
  const showToast = useToast();
  const [deleting, setDeleting] = useState(false);

  if (!user || user.id !== authorId) return null;

  const handleDelete = async () => {
    if (!window.confirm("이 글을 삭제할까요? 삭제한 글은 되돌릴 수 없어요.")) return;

    setDeleting(true);
    try {
      await deletePost(postId);
    } catch {
      setDeleting(false);
      showToast("글을 삭제하지 못했어요. 잠시 후 다시 시도해 주세요.");
      return;
    }
    showToast("글을 삭제했어요.", "success");
    if (onDeleted) onDeleted(postId);
    else router.push("/board");
  };

  return (
    <div className="flex shrink-0 items-center gap-2">
      <Link
        href={`/board/${postId}/edit`}
        className="rounded-md border border-white/80 bg-glass px-3 py-1 text-xs font-medium text-ink hover:bg-glass-hover"
      >
        수정
      </Link>
      <button
        type="button"
        onClick={handleDelete}
        disabled={deleting}
        className="rounded-md border border-red-200 px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
      >
        {deleting ? "삭제 중..." : "삭제"}
      </button>
    </div>
  );
}
