"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";

export default function LoginButton() {
  const { user, signOut } = useAuth();

  if (user) {
    return (
      <div className="flex items-center gap-3">
        <span className="hidden text-sm font-medium text-ink sm:inline">
          {user.name}님
        </span>
        <button
          type="button"
          onClick={signOut}
          className="rounded-full border border-white/80 bg-glass px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-glass-hover"
        >
          로그아웃
        </button>
      </div>
    );
  }

  return (
    <Link
      href="/login"
      className="rounded-full bg-tomato shadow-tomato px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-tomato-hover"
    >
      로그인
    </Link>
  );
}
