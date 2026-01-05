import {ResumeReviewCreatePanel} from "@/components/reviews/ResumeReviewCreatePanel";

export default async function ResumeReviewCreateRoute({
                                                          params,
                                                      }: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    return <ResumeReviewCreatePanel slug={slug} />;
}
