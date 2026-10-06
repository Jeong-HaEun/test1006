import AuthCard from "@/components/auth/AuthCard";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

export const metadata = { title: "비밀번호 재설정 - 꿈꾸리" };

export default function ResetPasswordPage() {
  return (
    <AuthCard title="비밀번호 재설정">
      <ResetPasswordForm />
    </AuthCard>
  );
}
