// src/features/auth/api.ts
import { apiFetch } from "@/shared/api/client"
import type { CurrentUser } from "./types"

export const authApi = {
  login(email: string, password: string) {
    return apiFetch<void>("/api/auth/login", {
      method: "POST",
      json: { email, password },
    })
  },

  logout() {
    return apiFetch<void>("/api/auth/logout", { method: "POST" })
  },

  me() {
    return apiFetch<CurrentUser>("/api/auth/me")
  },

  register(payload: {
    name: string
    handle: string
    email: string
    password: string
  }) {
    return apiFetch<void>("/api/auth/register", {
      method: "POST",
      json: payload,
    })
  },

  checkHandle(handle: string) {
    return apiFetch<{ handle: string; isAvailable: boolean }>(
      `/api/handle/check?handle=${encodeURIComponent(handle)}`
    )
  },

  checkEmail(email: string) {
    return apiFetch<{ email: string; isAvailable: boolean }>(
      `/api/email/check?email=${encodeURIComponent(email)}`
    )
  },
}
