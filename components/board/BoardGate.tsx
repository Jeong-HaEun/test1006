"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";

// 자유 게시판은 로그인한 사용자에게만 보여준다.
export default function BoardGate({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl glass px-6 py-16 text-center">
        <span className="text-4xl" aria-hidden>
          🔒
        </span>
        <p className="text-lg font-semibold text-ink">
          자유 게시판은 로그인 후 이용할 수 있어요.
        </p>
        <Link
          href="/login"
          className="rounded-full bg-tomato shadow-tomato px-6 py-2.5 text-sm font-bold text-white hover:bg-tomato-hover"
        >
          로그인하러 가기
        </Link>
      </div>
    );
  }

  return children;
}
