"use client";

export default function AuthForm({
  submitLabel,
  disabled,
  loading,
  onSubmit,
  children,
}: {
  submitLabel: string;
  disabled: boolean;
  loading: boolean;
  onSubmit: () => void;
  children: React.ReactNode;
}) {
  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        if (!disabled && !loading) onSubmit();
      }}
      className="flex flex-col gap-4"
    >
      {children}
      <button
        type="submit"
        disabled={disabled || loading}
        className="mt-2 rounded-full bg-tomato shadow-tomato py-3 text-sm font-bold text-white transition-colors hover:bg-tomato-hover disabled:cursor-not-allowed disabled:bg-faint disabled:shadow-none"
      >
        {loading ? "처리 중..." : submitLabel}
      </button>
    </form>
  );
}
