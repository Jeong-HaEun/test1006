import AuthCard from "@/components/auth/AuthCard";
import AuthSwitchLink from "@/components/auth/AuthSwitchLink";
import SignupForm from "@/components/auth/SignupForm";

export const metadata = { title: "회원가입 - 꿈꾸리" };

export default function SignupPage() {
  return (
    <AuthCard title="회원가입">
      <SignupForm />
      <AuthSwitchLink question="이미 계정이 있으신가요?" linkLabel="로그인" href="/login" />
    </AuthCard>
  );
}
