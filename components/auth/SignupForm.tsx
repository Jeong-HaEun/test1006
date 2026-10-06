"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { toKoreanAuthError } from "@/lib/auth-errors";
import { useToast } from "@/components/common/Toast";
import AuthForm from "./AuthForm";
import TextField from "./TextField";

export default function SignupForm() {
  const router = useRouter();
  const showToast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (password !== passwordConfirm) {
      showToast("비밀번호가 일치하지 않습니다.");
      return;
    }

    setLoading(true);
    const { data, error } = await supabase.auth.signUp({ email: email.trim(), password });
    setLoading(false);

    if (error) {
      showToast(toKoreanAuthError(error));
      return;
    }
    // 이메일 인증이 켜져 있으면 세션 없이 가입만 완료된다.
    if (!data.session) {
      showToast("가입 완료! 메일함에서 인증 후 로그인해 주세요.", "success");
    }
    router.push("/");
  };

  return (
    <AuthForm
      submitLabel="회원가입"
      disabled={!email.trim() || !password || !passwordConfirm}
      loading={loading}
      onSubmit={handleSubmit}
    >
      <TextField label="이메일" name="email" type="email" placeholder="example@email.com" autoComplete="email" value={email} onChange={setEmail} />
      <TextField label="비밀번호" name="password" type="password" placeholder="비밀번호를 입력하세요" autoComplete="new-password" value={password} onChange={setPassword} />
      <TextField label="비밀번호 확인" name="passwordConfirm" type="password" placeholder="비밀번호를 한 번 더 입력하세요" autoComplete="new-password" value={passwordConfirm} onChange={setPasswordConfirm} />
    </AuthForm>
  );
}
