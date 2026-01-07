"use client";

import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ReviewsTable } from "@/components/reviews/summary/ReviewsTable";
import { useMyReviews } from "@/features/reviews/hooks/useReviews";

export function DashboardRecentReviews() {
  // size만 5로 고정하고, 훅이 page state를 내부에서 갖고 있어도
  // 대시보드는 "최근"이므로 page는 안 쓰는 게 깔끔.
  const list = useMyReviews({ page: 0, size: 5 });

  return (
      <Card className="h-full">
        <CardHeader className="flex flex-row items-center justify-between gap-2">
          <div>
            <CardTitle className="text-base">최근 리뷰</CardTitle>
            <CardDescription>최근 생성된 AI 리뷰입니다.</CardDescription>
          </div>

          <Button variant="ghost" size="sm" asChild>
            <Link href="/reviews">
              전체 보기
              <IconArrowRight className="ml-1 size-3" />
            </Link>
          </Button>
        </CardHeader>

        <CardContent>
          {list.isLoading ? (
              <div className="py-8 text-center text-sm text-muted-foreground">불러오는 중...</div>
          ) : list.reviews.length === 0 ? (
              <div className="py-8 text-center text-sm text-muted-foreground">아직 생성된 리뷰가 없습니다.</div>
          ) : (
              <ReviewsTable reviews={list.reviews} />
          )}
        </CardContent>
      </Card>
  );
}
