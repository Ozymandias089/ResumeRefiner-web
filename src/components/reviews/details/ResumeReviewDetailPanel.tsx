"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useReviewActions, useReviewDetail } from "@/features/reviews/hooks/useReviews";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ReviewOutputView } from "@/components/reviews/details/ReviewOutputView";

import {
    ReviewPanelCard,
    ReviewPanelError,
    ReviewPanelLoading,
} from "./ReviewPanelParts";
import {normalizeReviewBasePath} from "@/components/reviews/reviewPath";

export function ResumeReviewDetailPanel(props: {
    slug: string;
    reviewId: string | number;
    basePath?: string;
}) {
    const router = useRouter();
    const basePath = normalizeReviewBasePath(props.slug, props.basePath);

    const parsedId =
        typeof props.reviewId === "number"
            ? props.reviewId
            : Number.parseInt(props.reviewId, 10);

    const detail = useReviewDetail(props.slug, parsedId);
    const actions = useReviewActions(props.slug);

    if (!Number.isFinite(parsedId) || parsedId <= 0) {
        return (
            <ReviewPanelCard title="리뷰 상세">
                <ReviewPanelError message="올바르지 않은 reviewId 입니다." />
            </ReviewPanelCard>
        );
    }

    const goList = () => router.push(basePath);

    const onDelete = async () => {
        await actions.removeAsync(parsedId);
        goList();
    };

    return (
        <ReviewPanelCard
            title="리뷰 상세"
            subtitle={<span>ID {props.reviewId}</span>}
            right={
                <div className="flex gap-2">
                    <Button asChild variant="secondary" size="sm">
                        <Link href={basePath}>목록</Link>
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
            }
        >
            {detail.isLoading && <ReviewPanelLoading />}

            {detail.isError && (
                <ReviewPanelError
                    message="리뷰를 불러오지 못했어요."
                    onRetry={() => detail.refetch()}
                />
            )}

            {!detail.isLoading && !detail.isError && detail.detail && (
                <>
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

                    <ReviewOutputView outputJson={detail.detail.outputJson} />
                </>
            )}
        </ReviewPanelCard>
    );
}
