import { apiFetch } from "@/shared/api/client";
import type { CurrentUser } from "./types";

export const authApi = {
  login(email: string, password: string) {
    return apiFetch<void>("/api/auth/login", {
      method: "POST",
      json: { email, password },
    });
  },

  logout() {
    return apiFetch<void>("/api/auth/logout", { method: "POST" });
  },

  me() {
    return apiFetch<CurrentUser>("/api/auth/me", { method: "GET" });
  },
};
