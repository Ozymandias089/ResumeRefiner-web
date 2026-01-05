import { UpdateResumePageView } from "@/components/resumes/UpdateResumePageView";
import { ResumeTwoPaneShell } from "@/components/resumes/ResumeTwoPaneShell";
import { ResumeReviewsPanel } from "@/components/reviews/details/ResumeReviewsPanel";

export default async function EditReviewsRoute({
                                                   params,
                                               }: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    return (
        <ResumeTwoPaneShell
            left={<UpdateResumePageView slug={slug} />}
            right={<ResumeReviewsPanel slug={slug} basePath={`/resumes/${slug}/edit/reviews`} />}
        />
    );
}
