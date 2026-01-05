// src/app/(app)/resumes/[slug]/layout.tsx
import { ResumeDetailsPage } from "@/components/resumes/ResumeDetailsPage";
import { Separator } from "@/components/ui/separator";
import "@/styles/print-resume.css";

export default async function ResumeSlugLayout({
                                                   children,
                                                   params,
                                               }: {
    children: React.ReactNode;
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    return (
        <div className="h-[calc(100dvh-4rem)]">
            <div
                className={[
                    "grid h-full gap-0",
                    "grid-cols-1",
                    // ✅ 비율 기반: 오른쪽은 33vw 중심, 320~560 사이
                    "lg:grid-cols-[minmax(0,1fr)_1px_clamp(320px,33vw,560px)]",
                    "xl:grid-cols-[minmax(0,1fr)_1px_clamp(360px,30vw,620px)]",
                ].join(" ")}
            >
                <div className="min-w-0 overflow-auto overflow-x-auto p-4 md:p-6">
                    <ResumeDetailsPage slug={slug} />
                </div>

                <div className="hidden lg:block">
                    <Separator orientation="vertical" className="h-full" />
                </div>

                <aside className="min-w-0 overflow-auto border-t lg:border-t-0 p-4 md:p-6">
                    {children}
                </aside>
            </div>
        </div>
    );
}
