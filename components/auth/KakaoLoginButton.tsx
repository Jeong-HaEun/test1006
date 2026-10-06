"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth-context";
import { useToast } from "@/components/common/Toast";

// 카카오 로그인 디자인 가이드: 컨테이너 #FEE500, 심볼 #000000, 레이블 85% 검정
export default function KakaoLoginButton({ label = "카카오 로그인" }: { label?: string }) {
  const router = useRouter();
  const { user } = useAuth();
  const showToast = useToast();
  const [loading, setLoading] = useState(false);

  // 카카오 인증을 마치고 이 페이지로 돌아왔을 때 처리
  useEffect(() => {
    if (user) router.replace("/");
  }, [user, router]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.slice(1) || window.location.search);
    if (params.get("error")) showToast("카카오 로그인에 실패했습니다. 다시 시도해 주세요.");
  }, [showToast]);

  const handleClick = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "kakao",
      options: { redirectTo: `${window.location.origin}/login` },
    });
    // 성공하면 카카오 페이지로 이동하므로 실패한 경우에만 여기로 온다.
    if (error) {
      setLoading(false);
      showToast("카카오 로그인을 시작하지 못했습니다. 잠시 후 다시 시도해 주세요.");
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className="flex w-full items-center justify-center gap-2 rounded-full bg-[#FEE500] py-3 text-sm font-bold text-black/85 transition-[filter] hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-black">
        <path d="M12 3C6.48 3 2 6.54 2 10.9c0 2.82 1.87 5.3 4.69 6.7l-.95 3.48c-.08.3.26.54.52.37l4.13-2.74c.53.06 1.07.1 1.61.1 5.52 0 10-3.54 10-7.9S17.52 3 12 3z" />
      </svg>
      {loading ? "카카오로 이동 중..." : label}
    </button>
  );
}
