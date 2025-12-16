"use client";

import {
  IconCreditCard,
  IconDotsVertical,
  IconLogout,
  IconNotification, IconShieldLock,
  IconUserCircle,
} from "@tabler/icons-react";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import React from "react";
import {useRouter} from "next/navigation";
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import {toNavUserVM} from "@/features/navigation/mappers";

export function NavUser() {

  const { isMobile } = useSidebar();

  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const { logout } = useLogout();
  const router = useRouter();

  const go = (href: string) => {
    router.push(href);
  };

  const { user } = useCurrentUser();
  if (!user) return null;

  const navUserData = toNavUserVM(user);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg grayscale">
                <AvatarImage src={navUserData.avatar} alt={navUserData.name} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{navUserData.name}</span>
                <div className="text-xs text-muted-foreground">
                  @{navUserData.handle}
                </div>
                <span className="text-muted-foreground truncate text-xs">
                  {navUserData.email}
                </span>
              </div>
              <IconDotsVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={mounted && isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={navUserData.avatar} alt={navUserData.name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{navUserData.name}</span>
                  <div className="text-xs text-muted-foreground">
                    @{navUserData.handle}
                  </div>
                  <span className="text-muted-foreground truncate text-xs">
                    {navUserData.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onSelect={() => go("/settings")}>
                <IconUserCircle />
                설정
              </DropdownMenuItem>

              <DropdownMenuItem onSelect={() => go("/settings/security")}>
                <IconShieldLock />
                보안
              </DropdownMenuItem>

              {/* 지금은 준비 안 된 기능이면 disabled 처리하는 게 더 “완성도” 있어 보여 */}
              <DropdownMenuItem disabled>
                <IconCreditCard />
                결제
              </DropdownMenuItem>
              <DropdownMenuItem disabled>
                <IconNotification />
                알림
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={logout}
              className="text-destructive focus:text-destructive"
            >
              <IconLogout />
              로그아웃
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
