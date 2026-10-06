"use client";

import { createContext, useCallback, useContext, useRef, useState } from "react";

type ToastType = "error" | "success";
type ToastState = { id: number; message: string; type: ToastType };

const ToastContext = createContext<((message: string, type?: ToastType) => void) | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<ToastState | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const showToast = useCallback((message: string, type: ToastType = "error") => {
    clearTimeout(timer.current);
    setToast({ id: Date.now(), message, type });
    timer.current = setTimeout(() => setToast(null), 3000);
  }, []);

  return (
    <ToastContext value={showToast}>
      {children}
      {/* 화면 중앙 상단 토스트 */}
      <div aria-live="assertive" className="pointer-events-none fixed inset-x-0 top-6 z-50 flex justify-center px-4">
        {toast && (
          <div
            key={toast.id}
            role="alert"
            className={`pointer-events-auto rounded-xl px-5 py-3 text-sm font-semibold text-white shadow-lg ${
              toast.type === "error" ? "bg-red-600" : "bg-emerald-600"
            }`}
          >
            {toast.message}
          </div>
        )}
      </div>
    </ToastContext>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
