import { ResumeDetailsPage } from "@/components/resumes/ResumeDetailsPage";
import { ResumeTwoPaneShell } from "@/components/resumes/ResumeTwoPaneShell";
import {ResumeReviewDetailPanel} from "@/components/reviews/details/ResumeReviewDetailPanel";

export default async function ReviewDetailRoute({
                                                    params,
                                                }: {
    params: Promise<{ slug: string; reviewId: string }>;
}) {
    const { slug, reviewId } = await params;

    return (
        <ResumeTwoPaneShell
            left={<ResumeDetailsPage slug={slug} />}
            right={
                <ResumeReviewDetailPanel
                    slug={slug}
                    reviewId={reviewId}
                    basePath={`/resumes/${slug}/reviews`}
                />
            }
        />
    );
}
