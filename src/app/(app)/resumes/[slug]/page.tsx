import { ResumeDetailsPage } from "@/components/resumes/ResumeDetailsPage";
import { ResumeTwoPaneShell } from "@/components/resumes/ResumeTwoPaneShell";
import { ReviewPanelHomeCard } from "@/components/reviews/details/ReviewPanelHomeCard";

export default async function ResumeDetailsRoute({
                                                     params,
                                                 }: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    return (
        <ResumeTwoPaneShell
            left={<ResumeDetailsPage slug={slug} />}
            right={<ReviewPanelHomeCard slug={slug} mode="read" />}
        />
    );
}
