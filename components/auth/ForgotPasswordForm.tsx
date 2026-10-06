"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { toKoreanAuthError } from "@/lib/auth-errors";
import { useToast } from "@/components/common/Toast";
import AuthForm from "./AuthForm";
import TextField from "./TextField";

export default function ForgotPasswordForm() {
  const showToast = useToast();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    // 메일의 리셋 링크를 누르면 /reset-password 로 돌아온다.
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);

    if (error) {
      showToast(toKoreanAuthError(error));
      return;
    }
    showToast("비밀번호 리셋 링크를 보냈어요. 메일함을 확인해 주세요.", "success");
  };

  return (
    <AuthForm submitLabel="비밀번호 리셋 링크 발송" disabled={!email.trim()} loading={loading} onSubmit={handleSubmit}>
      <TextField label="이메일" name="email" type="email" placeholder="example@email.com" autoComplete="email" value={email} onChange={setEmail} />
    </AuthForm>
  );
}
