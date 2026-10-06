import AuthCard from "@/components/auth/AuthCard";
import AuthSwitchLink from "@/components/auth/AuthSwitchLink";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

export const metadata = { title: "비밀번호 찾기 - 꿈꾸리" };

export default function ForgotPasswordPage() {
  return (
    <AuthCard title="비밀번호 찾기">
      <ForgotPasswordForm />
      <AuthSwitchLink question="비밀번호가 기억나셨나요?" linkLabel="로그인" href="/login" />
    </AuthCard>
  );
}
