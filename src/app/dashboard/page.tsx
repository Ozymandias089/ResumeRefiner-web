"use client";

import { AppSidebar } from "@/components/app-sidebar"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import { DashboardRecentResumes } from "@/components/dashboard-recent-resumes"
import { DashboardRecentReviews } from "@/components/dashboard-recent-reviews"

export default function Page() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {/* ✅ 항상 보이는 요약 카드 영역 */}
              <SectionCards />

              {/* ✅ 카드 아래에 위치하는 탭 영역 */}
              <div className="px-4 lg:px-6">
                <Tabs
                  defaultValue="resumes"
                  className="flex flex-col gap-4"
                >
                  <div className="flex items-center justify-between gap-2">
                    <TabsList>
                      <TabsTrigger value="resumes">
                        최근 이력서
                      </TabsTrigger>
                      <TabsTrigger value="reviews">
                        최근 리뷰
                      </TabsTrigger>
                    </TabsList>
                    {/* 필요하면 오른쪽에 필터/버튼 넣어도 됨 */}
                  </div>

                  <TabsContent value="resumes" className="mt-2">
                    <DashboardRecentResumes />
                  </TabsContent>

                  <TabsContent value="reviews" className="mt-2">
                    <DashboardRecentReviews />
                  </TabsContent>
                </Tabs>
              </div>

            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
