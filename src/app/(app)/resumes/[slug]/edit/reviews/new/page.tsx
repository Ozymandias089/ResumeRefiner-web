import { UpdateResumePageView } from "@/components/resumes/UpdateResumePageView";
import { ResumeTwoPaneShell } from "@/components/resumes/ResumeTwoPaneShell";
import {ResumeReviewCreatePanel} from "@/components/reviews/create/ResumeReviewCreatePanel";

export default async function EditReviewNewRoute({
                                                     params,
                                                 }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    return (
        <ResumeTwoPaneShell
            left={<UpdateResumePageView slug={slug} />}
            right={<ResumeReviewCreatePanel slug={slug} basePath={`/resumes/${slug}/edit/reviews`} />}
        />
    );
}
