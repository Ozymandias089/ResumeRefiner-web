import { UpdateResumePageView } from "@/components/resumes/UpdateResumePageView";
import { ResumeTwoPaneShell } from "@/components/resumes/ResumeTwoPaneShell";
import {ResumeReviewDetailPanel} from "@/components/reviews/details/ResumeReviewDetailPanel";

export default async function EditReviewDetailRoute({
                                                        params,
                                                    }: {
    params: Promise<{ slug: string; reviewId: string }>;
}) {
    const { slug, reviewId } = await params;

    return (
        <ResumeTwoPaneShell
            left={<UpdateResumePageView slug={slug} />}
            right={
                <ResumeReviewDetailPanel
                    slug={slug}
                    reviewId={reviewId}
                    basePath={`/resumes/${slug}/edit/reviews`}
                />
            }
        />
    );
}
