// src/app/(app)/resumes/[slug]/reviews/_components/ResumeReviewsPanel.tsx
"use client";

import Link from "next/link";
import { useResumeReviews } from "@/features/reviews/hooks/useReviews";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ReviewsTable } from "@/components/reviews/summary/ReviewsTable";

export function ResumeReviewsPanel(props: { slug: string }) {
  const list = useResumeReviews(props.slug, { page: 0, size: 20 });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-3">
        <CardTitle>리뷰 목록</CardTitle>

        <Button asChild size="sm">
          <Link href={`/resumes/${props.slug}/reviews/new`}>새 리뷰</Link>
        </Button>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* 로딩 */}
        {list.isLoading && (
          <div className="space-y-2">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        )}

        {/* 에러 */}
        {list.isError && (
          <div className="space-y-2">
            <p className="text-sm text-destructive">
              리뷰 목록을 불러오지 못했어요.
            </p>
            <Button variant="secondary" onClick={() => list.refetch()}>
              다시 시도
            </Button>
          </div>
        )}

        {/* 데이터 */}
        {!list.isLoading && !list.isError && (
          <>
            {list.reviews.length === 0 ? (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  아직 생성된 리뷰가 없어요.
                </p>
                <Button asChild>
                  <Link href={`/resumes/${props.slug}/reviews/new`}>
                    첫 리뷰 생성
                  </Link>
                </Button>
              </div>
            ) : (
              <ReviewsTable reviews={list.reviews} />
            )}

            {/* Pager */}
            <div className="flex items-center justify-between gap-2 pt-2">
              <p className="text-xs text-muted-foreground">
                총 {list.totalElements}개 · page {list.page + 1}
              </p>

              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={list.prev}
                  disabled={!list.hasPrev || list.isFetching}
                >
                  이전
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={list.next}
                  disabled={!list.hasNext || list.isFetching}
                >
                  다음
                </Button>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
