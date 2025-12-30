"use client";

import { useRouter } from "next/navigation";
import { ReviewsTableBase, type ReviewSummaryRow } from "./ReviewsTableBase";
import { ReviewRowActions } from "./ReviewRowActions";

export function ReviewsTable(props: { reviews: ReviewSummaryRow[] }) {
    const router = useRouter();

    return (
        <ReviewsTableBase
            reviews={props.reviews}
            showCreatedAt={true}
            onRowClickAction={(review) =>
                router.push(`/resumes/${review.slug}/reviews/${review.reviewId}`)
            }
            renderAction={(r) => (
                <ReviewRowActions
                    reviewId={r.reviewId}
                    slug={r.slug}
                    title={r.title}
                    onOpenAction={() => router.push(`/resumes/${r.slug}/reviews/${r.reviewId}`)}
                    onOpenResumeAction={() => router.push(`/resumes/${r.slug}`)}
                />
            )}
            actionsHeader={null}
        />
    );
}
