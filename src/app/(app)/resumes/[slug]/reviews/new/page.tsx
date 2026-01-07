import { ResumeDetailsPage } from "@/components/resumes/ResumeDetailsPage";
import { ResumeTwoPaneShell } from "@/components/resumes/ResumeTwoPaneShell";
import {ResumeReviewCreatePanel} from "@/components/reviews/create/ResumeReviewCreatePanel";

export default async function ReviewNewRoute({
                                                 params,
                                             }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    return (
        <ResumeTwoPaneShell
            left={<ResumeDetailsPage slug={slug} />}
            right={<ResumeReviewCreatePanel slug={slug} basePath={`/resumes/${slug}/reviews`} />}
        />
    );
}
