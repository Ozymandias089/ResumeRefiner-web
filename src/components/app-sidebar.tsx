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

import { sidebarConfig } from "@/features/navigation/sidebar-config";
import { filterNavByRole } from "@/features/navigation/selectors";
import { toNavUserVM } from "@/features/navigation/mappers";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useCurrentUser();

  const navMainItems = React.useMemo(
    () => filterNavByRole(sidebarConfig.navMain, user),
    [user]
  );

  const navUserData = React.useMemo(() => toNavUserVM(user), [user]);

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
        <NavDocuments items={sidebarConfig.documents} />
        <NavSecondary items={sidebarConfig.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={navUserData} />
      </SidebarFooter>
    </Sidebar>
  );
}
