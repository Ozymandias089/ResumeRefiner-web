import { UpdateResumePageView } from "@/components/resumes/UpdateResumePageView";

export default async function ResumeEditRoute({ params }: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    return <UpdateResumePageView slug={slug} />;
}
