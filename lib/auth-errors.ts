import type { AuthError } from "@supabase/supabase-js";

const messages: Record<string, string> = {
  invalid_credentials: "이메일 또는 비밀번호가 올바르지 않습니다.",
  email_not_confirmed: "이메일 인증이 완료되지 않았습니다. 메일함을 확인해 주세요.",
  user_already_exists: "이미 가입된 이메일입니다.",
  email_exists: "이미 가입된 이메일입니다.",
  weak_password: "비밀번호가 너무 약합니다. 6자 이상으로 입력해 주세요.",
  email_address_invalid: "올바른 이메일 형식이 아닙니다.",
  validation_failed: "입력값을 다시 확인해 주세요.",
  over_email_send_rate_limit: "요청이 너무 많습니다. 잠시 후 다시 시도해 주세요.",
  over_request_rate_limit: "요청이 너무 많습니다. 잠시 후 다시 시도해 주세요.",
  signup_disabled: "현재 회원가입이 비활성화되어 있습니다.",
  same_password: "기존 비밀번호와 다른 비밀번호를 입력해 주세요.",
};

export function toKoreanAuthError(error: AuthError): string {
  return (error.code && messages[error.code]) || "알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.";
}
