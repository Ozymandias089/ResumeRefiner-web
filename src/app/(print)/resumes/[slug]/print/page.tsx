// src/app/(print)/resumes/[slug]/print/page.tsx
import PrintResumeClient from "./print.client";

export default async function ResumePrintRoute({
                                                   params,
                                               }: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    return <PrintResumeClient slug={slug} />;
}
