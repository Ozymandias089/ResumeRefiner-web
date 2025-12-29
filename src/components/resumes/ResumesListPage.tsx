"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ResumesTable } from "@/components/resumes/summary/ResumesTable";
import { PagedNavigation } from "@/components/common/PagedNavigation";
import { useResumeSummaries } from "@/features/resumes/hooks/useResumeSummaries";
import { useResumesListQueryState } from "@/features/resumes/hooks/useResumesListQueryState";

export function ResumesListPage() {
    const { query, goToPage1 } = useResumesListQueryState();
    const { page, size, sort, q } = query;

    const { data, isLoading, isError, error } = useResumeSummaries({
        page,
        size,
        sort,
        q,
    });

    const totalElements = data?.totalElements ?? 0;
    const totalPages = Math.max(1, Math.ceil(totalElements / size));
    const currentPage1 = page + 1;

    return (
        <div className="mx-auto w-full max-w-8xl px-6 py-6">
            <Card>
                <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <CardTitle className="text-lg">이력서</CardTitle>
                            <CardDescription>생성한 이력서를 관리합니다.</CardDescription>
                        </div>
                        <Button asChild>
                            <Link href="/resumes/new">새 이력서</Link>
                        </Button>
                    </div>
                </CardHeader>

                <CardContent className="space-y-4">
                    {isLoading ? (
                        <div className="py-10 text-center text-sm text-muted-foreground">
                            불러오는 중…
                        </div>
                    ) : isError ? (
                        <div className="py-10 text-center text-sm text-destructive">
                            {(error as any)?.message ?? "목록을 불러오지 못했습니다."}
                        </div>
                    ) : (data?.resumes?.length ?? 0) === 0 ? (
                        <div className="py-10 text-center text-sm text-muted-foreground">
                            표시할 이력서가 없습니다.
                        </div>
                    ) : (
                        <>
                            <ResumesTable resumes={data!.resumes} />
                            <PagedNavigation
                                currentPage1={currentPage1}
                                totalPages={totalPages}
                                hasPrev={!!data?.hasPrev}
                                hasNext={!!data?.hasNext}
                                onGoToPage1Action={(p1) => goToPage1(p1, totalPages)}
                            />
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
