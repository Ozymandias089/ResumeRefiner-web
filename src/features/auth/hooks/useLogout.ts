"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authApi } from "../api";
import { currentUserStore } from "../current-user-store";

export function useLogout() {
  const router = useRouter();

  const logout = async () => {
    return toast.promise(authApi.logout(), {
      loading: "로그아웃 중입니다…",
      success: () => {
        currentUserStore.clear();
        router.push("/login");
        router.refresh();
        return "로그아웃되었습니다.";
      },
      error: (e) => e?.message ?? "로그아웃에 실패했습니다. 다시 시도해주세요.",
    });
  };

  return { logout };
}
