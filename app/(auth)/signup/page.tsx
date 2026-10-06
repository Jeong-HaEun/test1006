import AuthCard from "@/components/auth/AuthCard";
import AuthSwitchLink from "@/components/auth/AuthSwitchLink";
import SignupForm from "@/components/auth/SignupForm";
import AuthDivider from "@/components/auth/AuthDivider";
import KakaoLoginButton from "@/components/auth/KakaoLoginButton";

export const metadata = { title: "회원가입 - 꿈꾸리" };

export default function SignupPage() {
  return (
    <AuthCard title="회원가입">
      <SignupForm />
      <AuthDivider />
      <KakaoLoginButton label="카카오로 시작하기" />
      <AuthSwitchLink question="이미 계정이 있으신가요?" linkLabel="로그인" href="/login" />
    </AuthCard>
  );
}
