"use client";

import * as React from "react";
import { NavDocuments } from "@/components/navigator/nav-documents";
import { NavMain } from "@/components/navigator/nav-main";
import { NavSecondary } from "@/components/navigator/nav-secondary";
import { NavUser } from "@/components/navigator/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { AppLogo } from "../common/app-logo";

import { sidebarConfig } from "@/features/navigation/sidebar-config";
import { filterNavByRole } from "@/features/navigation/selectors";
import {useCurrentUser} from "@/features/auth/hooks/useCurrentUser";
import Link from "next/link";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useCurrentUser();

  const navMainItems = React.useMemo(
      () => filterNavByRole(sidebarConfig.navMain, user),
      [user]
  );

  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <Link href="/dashboard">
                <AppLogo className="h-8 w-auto" />
              </Link>
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
        <NavUser/>
      </SidebarFooter>
    </Sidebar>
  );
}
