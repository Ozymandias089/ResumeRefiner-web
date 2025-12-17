"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { authApi } from "../api";
import { currentUserStore } from "../current-user-store";

export function useLogin() {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (email: string, password: string) => {
    setError(null);
    setIsSubmitting(true);

    try {
      await authApi.login(email, password);
      await currentUserStore.refresh();
      router.push("/dashboard");
      router.refresh();
    } catch (e: any) {
      const msg = e?.message ?? "로그인에 실패했습니다.";
      setError(msg);
      throw e;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submit, isSubmitting, error, setError };
}
