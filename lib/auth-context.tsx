"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

export type User = { id: string; name: string; email: string };

type AuthContextValue = {
  user: User | null;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function toUser(user: SupabaseUser | null | undefined): User | null {
  if (!user) return null;
  const email = user.email ?? "";
  // 카카오 로그인은 닉네임이 메타데이터에 오고, 이메일이 없을 수도 있다.
  const nickname = user.user_metadata?.full_name ?? user.user_metadata?.name;
  return { id: user.id, email, name: nickname || email.split("@")[0] || "회원" };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // 최초 세션 복원 + 이후 로그인/로그아웃 변화 구독
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(toUser(session?.user));
    });
    return () => data.subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return <AuthContext value={{ user, signOut }}>{children}</AuthContext>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
