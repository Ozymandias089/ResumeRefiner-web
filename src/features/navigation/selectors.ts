import type { CurrentUser } from "@/features/auth/types"
import type { SidebarNavItem } from "./sidebar-config"

export function filterNavByRole(
  items: SidebarNavItem[],
  user: CurrentUser | null
) {
  const isAdmin = user?.role === "ADMIN"
  return items.filter((item) => !(item.requiresAdmin && !isAdmin))
}
