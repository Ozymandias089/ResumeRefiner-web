import {ResumeReviewsPanel} from "@/components/reviews/ResumeReviewsPanel";

export default async function ResumeReviewsRoute({
                                                     params,
                                                 }: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    return <ResumeReviewsPanel slug={slug} />;
}
