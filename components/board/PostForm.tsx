"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { createPost, updatePost, type Post } from "@/lib/board-data";
import { useToast } from "@/components/common/Toast";

// post가 있으면 수정, 없으면 새 글 등록
export default function PostForm({ post }: { post?: Post }) {
  const router = useRouter();
  const showToast = useToast();
  const { user } = useAuth();
  const [title, setTitle] = useState(post?.title ?? "");
  const [content, setContent] = useState(post?.content ?? "");
  const [saving, setSaving] = useState(false);

  const fieldClass =
    "rounded-lg border border-white/80 bg-white/40 placeholder:text-faint px-3 py-2.5 font-normal text-ink outline-none focus:border-tomato focus:ring-2 focus:ring-tomato-soft";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || saving) return;
    if (!title.trim()) {
      showToast("제목을 입력해 주세요.");
      return;
    }

    setSaving(true);
    const input = { title: title.trim(), content: content.trim() };
    try {
      const saved = post ? await updatePost(post.id, input) : await createPost(input, user);
      showToast(post ? "글을 수정했어요." : "글을 등록했어요.", "success");
      router.push(`/board/${saved.id}`);
    } catch {
      setSaving(false);
      showToast("글을 저장하지 못했어요. 잠시 후 다시 시도해 주세요.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-2xl glass p-6"
    >
      <label className="flex flex-col gap-1.5 text-sm font-medium text-ink">
        제목
        <input
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력하세요"
          className={fieldClass}
        />
      </label>
      <label className="flex flex-col gap-1.5 text-sm font-medium text-ink">
        내용
        <textarea
          name="content"
          rows={10}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="내용을 입력하세요"
          className={fieldClass}
        />
      </label>
      <div className="flex justify-end gap-2">
        <Link
          href={post ? `/board/${post.id}` : "/board"}
          className="rounded-full border border-white/80 bg-glass px-5 py-2.5 text-sm font-semibold text-ink hover:bg-glass-hover"
        >
          취소
        </Link>
        <button
          type="submit"
          disabled={saving || !title.trim()}
          className="rounded-full bg-tomato shadow-tomato px-5 py-2.5 text-sm font-bold text-white hover:bg-tomato-hover disabled:cursor-not-allowed disabled:bg-faint disabled:shadow-none"
        >
          {saving ? "저장 중..." : post ? "수정하기" : "등록하기"}
        </button>
      </div>
    </form>
  );
}
