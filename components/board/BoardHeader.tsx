import Link from "next/link";

export default function BoardHeader({ count }: { count: number }) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        <h1 className="text-3xl font-extrabold text-ink">자유 게시판</h1>
        <p className="mt-1 text-sm text-muted">전체 글 {count}개</p>
      </div>
      <Link
        href="/board/write"
        className="shrink-0 rounded-full bg-tomato shadow-tomato px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-tomato-hover"
      >
        ✏️ 글쓰기
      </Link>
    </div>
  );
}
