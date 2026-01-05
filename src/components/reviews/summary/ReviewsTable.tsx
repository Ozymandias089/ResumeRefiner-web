"use client";

import { useRouter } from "next/navigation";
import { ReviewsTableBase, type ReviewSummaryRow } from "./ReviewsTableBase";
import { ReviewRowActions } from "./ReviewRowActions";

export function ReviewsTable(props: {
    reviews: ReviewSummaryRow[];
    basePath?: string; // ✅ 추가
}) {
    const router = useRouter();

    const openReview = (r: ReviewSummaryRow) => {
        const base = props.basePath?.trim();
        if (base) {
            router.push(`${base}/${r.reviewId}`);
            return;
        }
        // fallback: 기존 동작 유지
        router.push(`/resumes/${r.slug}/reviews/${r.reviewId}`);
    };

    const openResume = (r: ReviewSummaryRow) => {
        router.push(`/resumes/${r.slug}`);
    };

    return (
        <ReviewsTableBase
            reviews={props.reviews}
            showCreatedAt={true}
            onRowClickAction={(review) => openReview(review)}
            renderAction={(r) => (
                <ReviewRowActions
                    reviewId={r.reviewId}
                    slug={r.slug}
                    title={r.title}
                    onOpenAction={() => openReview(r)}
                    onOpenResumeAction={() => openResume(r)}
                />
            )}
            actionsHeader={null}
        />
    );
}
