import Link from "next/link";
import AuthCard from "@/components/auth/AuthCard";
import AuthSwitchLink from "@/components/auth/AuthSwitchLink";
import LoginForm from "@/components/auth/LoginForm";
import AuthDivider from "@/components/auth/AuthDivider";
import KakaoLoginButton from "@/components/auth/KakaoLoginButton";

export const metadata = { title: "로그인 - 꿈꾸리" };

export default function LoginPage() {
  return (
    <AuthCard title="로그인">
      <LoginForm />
      <p className="mt-4 text-center text-sm">
        <Link href="/forgot-password" className="text-muted hover:underline">
          비밀번호를 잊으셨나요?
        </Link>
      </p>
      <AuthDivider />
      <KakaoLoginButton />
      <AuthSwitchLink question="아직 회원이 아니신가요?" linkLabel="회원가입" href="/signup" />
    </AuthCard>
  );
}
