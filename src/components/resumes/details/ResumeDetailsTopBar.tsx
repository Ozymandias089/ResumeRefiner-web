// src/components/resumes/details/ResumeDetailsTopBar.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function ResumeDetailsTopBar(props: {
    title: string;
    slug: string;
    etag?: string;
}) {
    const { title, slug, etag } = props;

    return (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between print:hidden">
            <div className="min-w-0">
                <h1 className="truncate text-xl font-semibold">{title}</h1>
                <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
                    <span>미리보기는 A4 기준입니다. (인쇄/PDF 저장 최적화)</span>
                    {etag && (
                        <>
                            <span className="hidden sm:inline">·</span>
                            <span className="font-mono text-xs opacity-60">
                v{etag.replace(/"/g, "")}
              </span>
                        </>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-2">
                {/* ✏️ 수정 버튼 */}
                <Link href={`/resumes/${encodeURIComponent(slug)}/edit`}>
                    <Button variant="outline">수정</Button>
                </Link>

                <Button
                    variant="secondary"
                    onClick={() => window.print()}
                    title="브라우저 인쇄 → PDF로 저장 가능"
                >
                    인쇄 / PDF
                </Button>
            </div>
        </div>
    );
}
