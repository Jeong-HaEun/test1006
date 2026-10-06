import Link from "next/link";

export default function ComingSoon({ message = "곧 오픈 예정입니다." }: { message?: string }) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl glass px-6 py-16 text-center">
      <span className="text-4xl" aria-hidden>
        🚧
      </span>
      <p className="text-lg font-semibold text-ink">{message}</p>
      <Link href="/" className="text-sm font-medium text-tomato hover:underline">
        홈으로 돌아가기
      </Link>
    </div>
  );
}
