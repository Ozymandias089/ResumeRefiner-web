"use client";

import { useMemo } from "react";
import { useResumeDetails } from "@/features/resumes/hooks/useResumeDetails";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { ResumeA4 } from "@/components/resumes/preview/ResumeA4";

export function ResumeDetailsPage({ slug }: { slug: string }) {
    const { data, isLoading, isError, error } = useResumeDetails(slug);

    const title = useMemo(() => data?.title ?? "Resume", [data]);

    if (isLoading) {
        return (
            <div className="mx-auto w-full max-w-6xl px-6 py-8">
                <div className="flex items-center justify-between">
                    <Skeleton className="h-7 w-64" />
                    <div className="flex gap-2">
                        <Skeleton className="h-9 w-24" />
                        <Skeleton className="h-9 w-24" />
                    </div>
                </div>
                <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_380px]">
                    <Skeleton className="h-[900px] w-full rounded-xl" />
                    <Skeleton className="h-[520px] w-full rounded-xl" />
                </div>
            </div>
        );
    }

    if (isError || !data) {
        return (
            <div className="mx-auto w-full max-w-3xl px-6 py-12">
                <h1 className="text-xl font-semibold">이력서를 불러오지 못했어요.</h1>
                <p className="mt-2 text-sm text-muted-foreground">
                    {error instanceof Error ? error.message : "Unknown error"}
                </p>
            </div>
        );
    }

    return (
        <div className="mx-auto w-full max-w-6xl px-6 py-8">
            {/* Top bar */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between print:hidden">
                <div className="min-w-0">
                    <h1 className="truncate text-xl font-semibold">{title}</h1>
                    <p className="text-sm text-muted-foreground">
                        미리보기는 A4 기준입니다. (인쇄/PDF 저장 최적화)
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        variant="secondary"
                        onClick={() => window.print()}
                        title="브라우저 인쇄 → PDF로 저장 가능"
                    >
                        인쇄 / PDF
                    </Button>
                    <Button
                        onClick={() => {
                            // 나중에 “공유 링크/공개” 같은 기능 넣을 때 확장하기 좋음
                            navigator.clipboard?.writeText(window.location.href);
                        }}
                    >
                        링크 복사
                    </Button>
                </div>
            </div>

            <Separator className="my-6 print:hidden" />

            {/* Content */}
            <div className="grid gap-8 lg:grid-cols-[1fr_380px] print:block">
                {/* A4 Preview */}
                <div className="min-w-0">
                    <ResumeA4 resume={data} />
                </div>

                {/* Side panel (옵션) */}
                {/*<aside className="w-80 shrink-0 sticky top-20 print:hidden">*/}
                {/*    <div className="sticky top-6 rounded-xl border bg-card p-4 shadow-sm">*/}
                {/*        <h2 className="text-sm font-semibold">내보내기 팁</h2>*/}
                {/*        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">*/}
                {/*            <li>• 인쇄에서 “용지: A4”, “여백: 없음/최소” 권장</li>*/}
                {/*            <li>• 배경 그래픽 허용(옵션) 체크하면 더 깔끔</li>*/}
                {/*            <li>• 2페이지 이상이면 자동으로 페이지 나뉩니다</li>*/}
                {/*        </ul>*/}
                {/*        <Separator className="my-4" />*/}
                {/*        <p className="text-xs text-muted-foreground">*/}
                {/*            이후 “진짜 PDF 생성(서버/클라이언트)”로 가고 싶으면,*/}
                {/*            Playwright/Chrome PDF 또는 react-pdf 방식으로 확장 가능.*/}
                {/*        </p>*/}
                {/*    </div>*/}
                {/*</aside>*/}
            </div>

            {/* print 전용: 타이틀 */}
            <div className="hidden print:block">
                <style>{`
          @page { size: A4; margin: 12mm; }
          html, body { background: white !important; }
        `}</style>
            </div>
        </div>
    );
}
