"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useMyReviews } from "@/features/reviews/hooks/useReviews";
import {ReviewsTable} from "@/components/reviews/summary/ReviewsTable";
import {ReviewSummaryRow} from "@/components/reviews/summary/ReviewsTableBase";

export function ReviewsRecentClient() {
    const router = useRouter();
    const my = useMyReviews({ page: 0, size: 20 });

    return (
        <div className="space-y-4 p-4 md:p-6">
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <h1 className="text-lg font-semibold">최근 리뷰</h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        내가 생성한 리뷰를 최신순으로 보여줍니다.
                    </p>
                </div>

                <Button variant="secondary" onClick={() => router.push("/dashboard")}>
                    대시보드
                </Button>
            </div>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>리뷰 목록</CardTitle>
                    <div className="text-xs text-muted-foreground">
                        총 {my.totalElements.toLocaleString()}개
                    </div>
                </CardHeader>

                <CardContent className="space-y-3">
                    <ReviewsTable reviews={my.reviews as ReviewSummaryRow[]} />

                    <div className="flex justify-end gap-2">
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={my.prev}
                            disabled={!my.hasPrev || my.isLoading}
                        >
                            이전
                        </Button>
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={my.next}
                            disabled={!my.hasNext || my.isLoading}
                        >
                            다음
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
