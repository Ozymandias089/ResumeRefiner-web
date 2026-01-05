"use client";

import Link from "next/link";
import { useResumeReviews } from "@/features/reviews/hooks/useReviews";
import { Button } from "@/components/ui/button";
import { ReviewsTable } from "@/components/reviews/summary/ReviewsTable";
import {
    ReviewPanelCard,
    ReviewPanelEmpty,
    ReviewPanelError,
    ReviewPanelLoading,
} from "./ReviewPanelParts";
import {normalizeReviewBasePath, reviewPath} from "@/components/reviews/reviewPath";

export function ResumeReviewsPanel(props: { slug: string; basePath?: string }) {
    const basePath = normalizeReviewBasePath(props.slug, props.basePath);

    const list = useResumeReviews(props.slug, { page: 0, size: 20 });

    return (
        <ReviewPanelCard
            title="리뷰 목록"
            right={
                <Button asChild size="sm">
                    <Link href={reviewPath(basePath, "new")}>새 리뷰</Link>
                </Button>
            }
        >
            {list.isLoading && <ReviewPanelLoading />}

            {list.isError && (
                <ReviewPanelError
                    message="리뷰 목록을 불러오지 못했어요."
                    onRetry={() => list.refetch()}
                />
            )}

            {!list.isLoading && !list.isError && (
                <>
                    {list.reviews.length === 0 ? (
                        <ReviewPanelEmpty>
                            <Button asChild>
                                <Link href={reviewPath(basePath, "new")}>첫 리뷰 생성</Link>
                            </Button>
                        </ReviewPanelEmpty>
                    ) : (
                        // ✅ ReviewsTable 내부 링크가 /reviews/[id]로 하드코딩이면 여기도 basePath 전달 필요
                        <ReviewsTable reviews={list.reviews} basePath={basePath as any} />
                    )}

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
        </ReviewPanelCard>
    );
}
