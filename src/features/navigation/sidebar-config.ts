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
    { title: "대시보드", url: "/dashboard", icon: IconDashboard },
    { title: "이력서", url: "/resumes", icon: IconFileDescription },
    { title: "리뷰", url: "/reviews", icon: IconReport },
    { title: "결제", url: "/billing", icon: IconReport },
    { title: "관리자", url: "/admin", icon: IconUsers, requiresAdmin: true },
    { title: "디버깅", url: "/debug", icon: IconDatabase },
  ] satisfies SidebarNavItem[],

  navSecondary: [
    { title: "설정", url: "/settings", icon: IconSettings },
    { title: "문의", url: "/help", icon: IconHelp },
    { title: "검색", url: "/search", icon: IconSearch },
  ] satisfies SidebarNavItem[],

  documents: [
    { name: "새 이력서 만들기", url: "/resumes/new", icon: IconFileDescription },
    { name: "최근 리뷰 보기", url: "/reviews/recent", icon: IconReport },
    { name: "크레딧 구매", url: "/billing/checkout", icon: IconReport },
  ] satisfies SidebarDocItem[],
}
