import { ResumeDetailsPage } from "@/components/resumes/ResumeDetailsPage";
import "@/styles/print-resume.css";

export default async function ResumeDetailsRoute(
    { params }: {
        params: Promise<{ slug: string }>
    }
) {
    const { slug } = await params;
    return <ResumeDetailsPage slug={slug} />;
}
