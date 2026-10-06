import Link from "next/link";

// 로딩/빈 목록/없는 글/오류 안내에 쓰는 상자
export default function BoardMessage({ children, backLink = false }: { children: React.ReactNode; backLink?: boolean }) {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 rounded-2xl glass py-16 text-center text-muted">
      <p>{children}</p>
      {backLink && (
        <Link href="/board" className="text-sm font-medium text-tomato hover:underline">
          ← 목록으로
        </Link>
      )}
    </div>
  );
}
