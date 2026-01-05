import {ResumeReviewDetailPanel} from "@/components/reviews/ResumeReviewDetailPanel";

export default async function ResumeReviewDetailRoute({
                                                          params,
                                                      }: {
    params: Promise<{ slug: string; reviewId: string }>;
}) {
    const { slug, reviewId } = await params;

    // Next dynamic param은 string이라 number로 변환
    const id = Number(reviewId);

    return <ResumeReviewDetailPanel slug={slug} reviewId={id} />;
}
