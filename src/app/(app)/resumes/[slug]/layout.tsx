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
            {/* 2-pane: left resume, right reviews/children */}
            <div
                className={[
                    "grid h-full grid-cols-1 gap-0",
                    // ✅ 오른쪽 패널 폭 확보 (420 -> 520, 그리고 상한도 둠)
                    "md:grid-cols-[minmax(0,1fr)_1px_minmax(460px,520px)]",
                    "xl:grid-cols-[minmax(0,1fr)_1px_minmax(520px,600px)]",
                ].join(" ")}
            >
                {/* Left: Resume */}
                <div className="min-w-0 overflow-auto p-4 md:p-6">
                    <ResumeDetailsPage slug={slug} />
                </div>

                {/* Middle: Divider (desktop) */}
                <div className="hidden md:block">
                    <Separator orientation="vertical" className="h-full" />
                </div>

                {/* Right: Review panel */}
                <aside className="min-w-0 overflow-auto border-t md:border-t-0 p-4 md:p-6">
                    {children}
                </aside>
            </div>
        </div>
    );
}
