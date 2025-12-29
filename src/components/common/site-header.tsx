import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import {usePathname} from "next/navigation";

const TITLE_MAP: Record<string, string> = {
  "/dashboard": "대시보드",
  "/resumes": "이력서",
  "/resumes/new": "이력서 작성",
  "/resumes/[slug]/edit": "이력서 수정",
  "/settings": "설정",
  "/settings/profile": "프로필",
  "/settings/security": "보안",
};

export function SiteHeader() {
  const pathname = usePathname();
  const title =
      TITLE_MAP[pathname] ??
      (pathname.startsWith("/settings") ? "설정" : "대시보드");

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
  )
}
