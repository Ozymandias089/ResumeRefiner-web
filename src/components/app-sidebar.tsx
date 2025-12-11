"use client";

import * as React from "react";
import {
  IconDashboard,
  IconDatabase,
  IconFileDescription,
  IconHelp,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react";

import { NavDocuments } from "@/components/nav-documents";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { AppLogo } from "./app-logo";
import { useCurrentUser } from "@/hooks/use-current-user";

const data = {
  user: {
    name: "홍길동",
    handle: "honggildong",
    email: "user@example.com",
    avatar: "/avatars/default-user.png",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Resumes",
      url: "/resumes",
      icon: IconFileDescription,
    },
    {
      title: "Reviews",
      url: "/reviews",
      icon: IconReport,
    },
    {
      title: "Billing",
      url: "/billing",
      icon: IconReport,
    },
    {
      title: "Admin",
      url: "/admin",
      icon: IconUsers,
      requiresAdmin: true,
    },
    {
      title: "Server Debug",
      url: "/debug/server",
      icon: IconDatabase,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/settings",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "/help",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "/search",
      icon: IconSearch,
    },
  ],
  documents: [
    {
      name: "새 이력서 만들기",
      url: "/resumes/new",
      icon: IconFileDescription,
    },
    {
      name: "최근 리뷰 보기",
      url: "/reviews/recent",
      icon: IconReport,
    },
    {
      name: "크레딧 구매",
      url: "/billing/checkout",
      icon: IconReport,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useCurrentUser();
  const isAdmin = user?.role === "ADMIN";

  // Admin 메뉴 필터링
  const navMainItems = React.useMemo(
    () =>
      data.navMain.filter((item: any) => {
        if (item.requiresAdmin && !isAdmin) return false;
        return true;
      }),
    [isAdmin]
  );

  const navUserData = user
    ? {
        name: user.name,
        handle: user.handle,
        email: user.email,
        avatar: user.profileImageUrl ?? "/avatars/default-user.png",
      }
    : data.user;

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/dashboard">
                <AppLogo className="h-8 w-auto" />
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMainItems} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={navUserData} />
      </SidebarFooter>
    </Sidebar>
  );
}
