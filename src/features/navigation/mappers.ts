import type { CurrentUser } from "@/features/auth/types"

export type NavUserVM = {
  name: string
  handle: string
  email: string
  avatar: string
}

export function toNavUserVM(user: CurrentUser | null): NavUserVM {
  return {
    name: user?.name ?? "Guest",
    handle: user?.handle ?? "guest",
    email: user?.email ?? "",
    avatar: user?.profileImageUrl ?? "/avatars/default-user.png",
  }
}
