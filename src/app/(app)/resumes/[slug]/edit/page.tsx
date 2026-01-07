import { UpdateResumePageView } from "@/components/resumes/UpdateResumePageView";
import { ResumeTwoPaneShell } from "@/components/resumes/ResumeTwoPaneShell";
import { ReviewPanelHomeCard } from "@/components/reviews/details/ReviewPanelHomeCard";

export default async function ResumeEditRoute({
                                                  params,
                                              }: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    return (
        <ResumeTwoPaneShell
            left={<UpdateResumePageView slug={slug} />}
            right={<ReviewPanelHomeCard slug={slug} mode="edit" />}
        />
    );
}
