// src/components/common/site-header.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

const EXACT_TITLE_MAP: Record<string, string> = {
  "/dashboard": "대시보드",
  "/resumes": "이력서",
  "/resumes/new": "이력서 작성",
  "/settings": "설정",
  "/settings/profile": "프로필",
  "/settings/security": "보안",
  "/reviews/recent": "최근 리뷰",
};

function resolveTitle(pathname: string): string {
  // 1) exact match 먼저
  const exact = EXACT_TITLE_MAP[pathname];
  if (exact) return exact;

  // 2) settings 하위는 다 "설정" (세부가 늘어나도 안전)
  if (pathname.startsWith("/settings")) return "설정";

  // 3) resumes 하위 규칙
  if (pathname.startsWith("/resumes/")) {
    // edit 문맥
    if (pathname.endsWith("/edit")) return "이력서 수정";
    if (pathname.includes("/edit/reviews/new")) return "리뷰 생성";
    if (pathname.includes("/edit/reviews/")) return "리뷰 상세";
    if (pathname.includes("/edit/reviews")) return "리뷰 목록";

    // read 문맥
    if (pathname.includes("/reviews/new")) return "리뷰 생성";
    if (pathname.includes("/reviews/")) return "리뷰 상세";
    if (pathname.includes("/reviews")) return "리뷰 목록";

    // slug 상세
    return "이력서";
  }

  // 4) fallback
  return "대시보드";
}

export function SiteHeader() {
  const pathname = usePathname();
  const title = resolveTitle(pathname);

  return (
      <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
        <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
          <SidebarTrigger className="-ml-1" />
          <Separator
              orientation="vertical"
              className="mx-2 data-[orientation=vertical]:h-4"
          />
          <h1 className="text-base font-medium">{title}</h1>

          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" asChild size="sm" className="hidden sm:flex">
              <a
                  href="https://github.com/Ozymandias089/ResumeRefiner-web"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="dark:text-foreground"
              >
                GitHub
              </a>
            </Button>
          </div>
        </div>
      </header>
  );
}
