// src/features/navigation/sidebar-config.ts
import {
  IconDashboard,
  IconDatabase,
  IconFileDescription,
  IconHelp,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react"

export type SidebarNavItem = {
  title: string
  url: string
  icon: any
  requiresAdmin?: boolean
}

export type SidebarDocItem = {
  name: string
  url: string
  icon: any
}

export const sidebarConfig = {
  navMain: [
    { title: "Dashboard", url: "/dashboard", icon: IconDashboard },
    { title: "Resumes", url: "/resumes", icon: IconFileDescription },
    { title: "Reviews", url: "/reviews", icon: IconReport },
    { title: "Billing", url: "/billing", icon: IconReport },
    { title: "Admin", url: "/admin", icon: IconUsers, requiresAdmin: true },
    { title: "Server Debug", url: "/debug/server", icon: IconDatabase },
  ] satisfies SidebarNavItem[],

  navSecondary: [
    { title: "Settings", url: "/settings", icon: IconSettings },
    { title: "Get Help", url: "/help", icon: IconHelp },
    { title: "Search", url: "/search", icon: IconSearch },
  ] satisfies SidebarNavItem[],

  documents: [
    { name: "새 이력서 만들기", url: "/resumes/new", icon: IconFileDescription },
    { name: "최근 리뷰 보기", url: "/reviews/recent", icon: IconReport },
    { name: "크레딧 구매", url: "/billing/checkout", icon: IconReport },
  ] satisfies SidebarDocItem[],
}
