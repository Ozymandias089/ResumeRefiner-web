"use client";

import { SectionCards } from "@/components/dashboard/section-cards";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardRecentResumes } from "@/components/dashboard/dashboard-recent-resumes";
import { DashboardRecentReviews } from "@/components/dashboard/dashboard-recent-reviews";

export default function Page() {
  return (
    <>
      {/* ✅ 항상 보이는 요약 카드 영역 */}
      <SectionCards />

      {/* ✅ 카드 아래에 위치하는 탭 영역 */}
      <div className="px-4 lg:px-6">
        <Tabs defaultValue="resumes" className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-2">
            <TabsList>
              <TabsTrigger value="resumes">최근 이력서</TabsTrigger>
              <TabsTrigger value="reviews">최근 리뷰</TabsTrigger>
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
    </>
  );
}
