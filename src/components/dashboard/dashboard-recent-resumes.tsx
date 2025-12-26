"use client";

import { IconArrowRight } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ResumesTable } from "@/components/resumes/summary/ResumesTable";
import { useRecentResumes } from "@/features/dashboard/hooks/useRecentResumes";
import Link from "next/link";

export function DashboardRecentResumes() {
  const { items: resumes, loading } = useRecentResumes(5);

  return (
      <Card className="h-full">
        <CardHeader className="flex flex-row items-center justify-between gap-2">
          <div>
            <CardTitle className="text-base">최근 이력서</CardTitle>
            <CardDescription>최근에 수정된 이력서입니다.</CardDescription>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/resumes">
              전체 보기
              <IconArrowRight className="ml-1 size-3" />
            </Link>
          </Button>
        </CardHeader>

        <CardContent>
          {loading ? (
              <div className="py-8 text-center text-sm text-muted-foreground">
                불러오는 중...
              </div>
          ) : resumes.length === 0 ? (
              <div className="py-8 text-center text-sm text-muted-foreground">
                아직 등록된 이력서가 없습니다.
              </div>
          ) : (
              <ResumesTable resumes={resumes} />
          )}
        </CardContent>
      </Card>
  );
}
