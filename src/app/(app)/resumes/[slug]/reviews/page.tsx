import { ResumeDetailsPage } from "@/components/resumes/ResumeDetailsPage";
import { ResumeTwoPaneShell } from "@/components/resumes/ResumeTwoPaneShell";
import { ResumeReviewsPanel } from "@/components/reviews/details/ResumeReviewsPanel";

export default async function ResumeReviewsRoute({
                                                     params,
                                                 }: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    return (
        <ResumeTwoPaneShell
            left={<ResumeDetailsPage slug={slug} />}
            right={<ResumeReviewsPanel slug={slug} basePath={`/resumes/${slug}/reviews`} />}
        />
    );
}
