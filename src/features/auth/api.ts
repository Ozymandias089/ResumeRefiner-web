import { apiFetch } from "@/shared/api/client";

export const authApi = {
  login(email: string, password: string) {
    return apiFetch<void>("/api/auth/login", {
      method: "POST",
      json: { email, password },
    });
  },

  logout() {
    return apiFetch<void>("/api/auth/logout", {
      method: "POST",
    });
  },

  // 1단계에는 선택인데, 곧 필요해질 가능성이 높아서 같이 둠
  me() {
    return apiFetch<any>("/api/auth/me", { method: "GET" });
  },
};
