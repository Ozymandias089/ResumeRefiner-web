"use client";

import { useResumeDetails } from "@/features/resumes/hooks/useResumeDetails";
import { Separator } from "@/components/ui/separator";
import { ResumeA4 } from "@/components/resumes/preview/ResumeA4";
import { ResumeDetailsLoading } from "@/components/resumes/details/ResumeDetailsLoading";
import { ResumeDetailsError } from "@/components/resumes/details/ResumeDetailsError";
import { ResumeDetailsTopBar } from "@/components/resumes/details/ResumeDetailsTopBar";

export function ResumeDetailsPage({ slug }: { slug: string }) {
    const { data, isLoading, isError, error } = useResumeDetails(slug);
    const title = data?.title ?? "Resume";

    if (isLoading) return <ResumeDetailsLoading />;
    if (isError || !data) {
        return <ResumeDetailsError message={error instanceof Error ? error.message : "Unknown error"} />;
    }

    return (
        <div className="mx-auto w-full max-w-6xl px-6 py-8">
            <ResumeDetailsTopBar title={title} etag={`"${data.version}"`} slug={slug} />
            <Separator className="my-6" />

            {/* ✅ 단일 컬럼 */}
            <div className="min-w-0">
                <ResumeA4 resume={data} mode="screen" showTitle={false} />
            </div>
        </div>
    );
}


