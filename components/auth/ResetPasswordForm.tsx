"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth-context";
import { toKoreanAuthError } from "@/lib/auth-errors";
import { useToast } from "@/components/common/Toast";
import AuthForm from "./AuthForm";
import TextField from "./TextField";

export default function ResetPasswordForm() {
  const router = useRouter();
  const showToast = useToast();
  // 리셋 링크로 들어오면 Supabase가 URL의 토큰으로 임시 로그인 세션을 만든다.
  const { user } = useAuth();
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!user) {
      showToast("링크가 만료되었거나 올바르지 않습니다. 리셋 링크를 다시 요청해 주세요.");
      return;
    }
    if (password !== passwordConfirm) {
      showToast("비밀번호가 일치하지 않습니다.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (error) {
      showToast(toKoreanAuthError(error));
      return;
    }
    showToast("비밀번호가 변경되었습니다.", "success");
    router.push("/");
  };

  return (
    <AuthForm
      submitLabel="비밀번호 변경"
      disabled={!password || !passwordConfirm}
      loading={loading}
      onSubmit={handleSubmit}
    >
      <TextField label="새 비밀번호" name="password" type="password" placeholder="새 비밀번호를 입력하세요" autoComplete="new-password" value={password} onChange={setPassword} />
      <TextField label="새 비밀번호 확인" name="passwordConfirm" type="password" placeholder="새 비밀번호를 한 번 더 입력하세요" autoComplete="new-password" value={passwordConfirm} onChange={setPasswordConfirm} />
    </AuthForm>
  );
}
