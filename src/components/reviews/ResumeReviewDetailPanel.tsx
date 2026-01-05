"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useReviewActions, useReviewDetail } from "@/features/reviews/hooks/useReviews";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import {ReviewOutputView} from "@/components/reviews/details/ReviewOutputView";

export function ResumeReviewDetailPanel(props: { slug: string; reviewId: number }) {
    const router = useRouter();
    const detail = useReviewDetail(props.slug, props.reviewId);
    const actions = useReviewActions(props.slug);

    const onDelete = async () => {
        await actions.removeAsync(props.reviewId);
        router.push(`/resumes/${props.slug}/reviews`);
    };

    if (!Number.isFinite(props.reviewId) || props.reviewId <= 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>리뷰 상세</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-destructive">올바르지 않은 reviewId 입니다.</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader className="flex flex-row items-start justify-between gap-3">
                <div className="min-w-0">
                    <CardTitle className="truncate">리뷰 상세</CardTitle>
                    <p className="mt-1 text-xs text-muted-foreground">ID {props.reviewId}</p>
                </div>

                <div className="flex gap-2">
                    <Button asChild variant="secondary" size="sm">
                        <Link href={`/resumes/${props.slug}/reviews`}>목록</Link>
                    </Button>

                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={onDelete}
                        disabled={actions.isRemoving}
                    >
                        삭제
                    </Button>
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                {detail.isLoading && (
                    <div className="space-y-2">
                        <Skeleton className="h-6 w-2/3" />
                        <Skeleton className="h-24 w-full" />
                        <Skeleton className="h-24 w-full" />
                    </div>
                )}

                {detail.isError && (
                    <div className="space-y-2">
                        <p className="text-sm text-destructive">리뷰를 불러오지 못했어요.</p>
                        <Button variant="secondary" onClick={() => detail.refetch()}>
                            다시 시도
                        </Button>
                    </div>
                )}

                {!detail.isLoading && !detail.isError && detail.detail && (
                    <>
                        {/* 메타 */}
                        <div className="space-y-1">
                            <div className="flex items-center justify-between gap-2">
                                <span className="text-xs text-muted-foreground">모델</span>
                                <span className="text-xs">{detail.detail.model ?? "-"}</span>
                            </div>
                            <div className="flex items-center justify-between gap-2">
                                <span className="text-xs text-muted-foreground">톤</span>
                                <span className="text-xs">{detail.detail.tone ?? "-"}</span>
                            </div>
                            <div className="flex items-center justify-between gap-2">
                                <span className="text-xs text-muted-foreground">버전</span>
                                <span className="text-xs">v{detail.detail.resumeVersion ?? "-"}</span>
                            </div>
                        </div>

                        <Separator />

                        {/* ✅ 보기 좋은 결과 렌더링 */}
                        <ReviewOutputView outputJson={detail.detail.outputJson} />
                    </>
                )}
            </CardContent>
        </Card>
    );
}
