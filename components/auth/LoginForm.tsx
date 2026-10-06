"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { toKoreanAuthError } from "@/lib/auth-errors";
import { useToast } from "@/components/common/Toast";
import AuthForm from "./AuthForm";
import TextField from "./TextField";

export default function LoginForm() {
  const router = useRouter();
  const showToast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setLoading(false);

    if (error) {
      showToast(toKoreanAuthError(error));
      return;
    }
    router.push("/");
  };

  return (
    <AuthForm
      submitLabel="로그인"
      disabled={!email.trim() || !password}
      loading={loading}
      onSubmit={handleSubmit}
    >
      <TextField label="이메일" name="email" type="email" placeholder="example@email.com" autoComplete="email" value={email} onChange={setEmail} />
      <TextField label="비밀번호" name="password" type="password" placeholder="비밀번호를 입력하세요" autoComplete="current-password" value={password} onChange={setPassword} />
    </AuthForm>
  );
}
