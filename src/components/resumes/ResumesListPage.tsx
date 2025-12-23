"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
    Pagination, PaginationContent, PaginationItem, PaginationLink,
    PaginationNext, PaginationPrevious, PaginationEllipsis,
} from "@/components/ui/pagination";

import { useResumeSummaries } from "@/features/resumes/hooks/useResumeSummaries";
import type { ResumeSort } from "@/features/resumes/types/enum";
import { formatMDHM } from "@/lib/datetime";
import Link from "next/link";

const SORT_OPTIONS: { value: ResumeSort; label: string }[] = [
    { value: "UPDATED_AT_DESC", label: "최근 수정 순" },
    { value: "UPDATED_AT_ASC", label: "오래된 수정 순" },
    { value: "CREATED_AT_DESC", label: "최근 생성 순" },
    { value: "CREATED_AT_ASC", label: "오래된 생성 순" },
    { value: "TITLE_ASC", label: "제목 오름차순" },
    { value: "TITLE_DESC", label: "제목 내림차순" },
];

function clamp(n: number, min: number, max: number) {
    return Math.max(min, Math.min(max, n));
}

function safeInt(v: string | null, fallback: number) {
    if (!v) return fallback;
    const n = Number(v);
    return Number.isFinite(n) ? n : fallback;
}

export function ResumesListPage() {
    const router = useRouter();
    const sp = useSearchParams();

    const page = useMemo(() => Math.max(0, safeInt(sp.get("page"), 0)), [sp]);
    const size = useMemo(() => clamp(safeInt(sp.get("size"), 10), 1, 50), [sp]);
    const sort = useMemo(() => (sp.get("sort") as ResumeSort) ?? "UPDATED_AT_DESC", [sp]);
    const q = useMemo(() => (sp.get("q") ?? "").trim(), [sp]);

    // 검색 입력은 디바운스 없이 "검색" 버튼 누를 때 URL 반영
    const [qDraft, setQDraft] = useState(q);

    const { data, isLoading, isError, error } = useResumeSummaries({
        page,
        size,
        sort,
        q,
    });

    const totalElements = data?.totalElements ?? 0;
    const totalPages = Math.max(1, Math.ceil(totalElements / size));
    const currentPage1 = page + 1;

    function pushQuery(next: Partial<{ page: number; size: number; sort: ResumeSort; q: string }>) {
        const params = new URLSearchParams(sp.toString());

        if (next.page !== undefined) params.set("page", String(next.page));
        if (next.size !== undefined) params.set("size", String(next.size));
        if (next.sort !== undefined) params.set("sort", next.sort);
        if (next.q !== undefined) {
            const trimmed = next.q.trim();
            if (trimmed) params.set("q", trimmed);
            else params.delete("q");
        }

        router.push(`/resumes?${params.toString()}`);
    }

    function onSearch() {
        // 검색 바뀌면 첫 페이지로
        pushQuery({ q: qDraft, page: 0 });
    }

    function onChangeSort(nextSort: ResumeSort) {
        pushQuery({ sort: nextSort, page: 0 });
    }

    function onChangeSize(nextSize: number) {
        pushQuery({ size: nextSize, page: 0 });
    }

    function goToPage1(p1: number) {
        const next0 = clamp(p1, 1, totalPages) - 1;
        pushQuery({ page: next0 });
    }

    // 페이지네이션 숫자(간단 버전)
    const pageNumbers = useMemo(() => {
        // 1..totalPages 중 현재 근처 5개 정도
        const window = 2;
        const start = clamp(currentPage1 - window, 1, totalPages);
        const end = clamp(currentPage1 + window, 1, totalPages);
        const arr: number[] = [];
        for (let i = start; i <= end; i++) arr.push(i);
        return { start, end, arr };
    }, [currentPage1, totalPages]);

    return (
        <div className="mx-auto w-full max-w-8xl px-6 py-6">
        <Card>
            <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <CardTitle className="text-lg">이력서</CardTitle>
                        <CardDescription>
                            생성한 이력서를 관리합니다.
                        </CardDescription>
                    </div>

                    <Button asChild>
                        <Link href="/resumes/new">새 이력서</Link>
                    </Button>
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                {isLoading ? (
                    <div className="py-10 text-center text-sm text-muted-foreground">불러오는 중…</div>
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
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>제목</TableHead>
                                    <TableHead className="hidden md:table-cell">slug</TableHead>
                                    <TableHead className="text-right">마지막 수정</TableHead>
                                    <TableHead className="text-right">리뷰</TableHead>
                                    <TableHead className="text-right">액션</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data!.resumes.map((r) => (
                                    <TableRow key={r.slug}>
                                        <TableCell className="max-w-[320px] truncate">{r.title}</TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            <span className="font-mono text-xs text-muted-foreground">{r.slug}</span>
                                        </TableCell>
                                        <TableCell className="text-right text-xs text-muted-foreground">
                                            {formatMDHM(r.updatedAt)}
                                        </TableCell>
                                        <TableCell className="text-right text-xs">
                                            {r.reviewCount}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="outline" size="sm" asChild>
                                                <a href={`/resumes/${r.slug}`}>열기</a>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        {/* Pagination */}
                        <div className="flex items-center justify-between gap-3">
                            <div className="text-xs text-muted-foreground">
                                {totalElements.toLocaleString()}개 중{" "}
                                {((page * size) + 1).toLocaleString()}–
                                {Math.min((page + 1) * size, totalElements).toLocaleString()}개 표시
                            </div>

                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                if (data?.hasPrev) goToPage1(currentPage1 - 1);
                                            }}
                                            aria-disabled={!data?.hasPrev}
                                            className={!data?.hasPrev ? "pointer-events-none opacity-50" : ""}
                                        />
                                    </PaginationItem>

                                    {/* 첫 페이지/… */}
                                    {pageNumbers.start > 1 && (
                                        <>
                                            <PaginationItem>
                                                <PaginationLink
                                                    href="#"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        goToPage1(1);
                                                    }}
                                                    isActive={currentPage1 === 1}
                                                >
                                                    1
                                                </PaginationLink>
                                            </PaginationItem>
                                            {pageNumbers.start > 2 && (
                                                <PaginationItem>
                                                    <PaginationEllipsis />
                                                </PaginationItem>
                                            )}
                                        </>
                                    )}

                                    {/* 가운데 페이지들 */}
                                    {pageNumbers.arr.map((p1) => (
                                        <PaginationItem key={p1}>
                                            <PaginationLink
                                                href="#"
                                                isActive={p1 === currentPage1}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    goToPage1(p1);
                                                }}
                                            >
                                                {p1}
                                            </PaginationLink>
                                        </PaginationItem>
                                    ))}

                                    {/* …/마지막 페이지 */}
                                    {pageNumbers.end < totalPages && (
                                        <>
                                            {pageNumbers.end < totalPages - 1 && (
                                                <PaginationItem>
                                                    <PaginationEllipsis />
                                                </PaginationItem>
                                            )}
                                            <PaginationItem>
                                                <PaginationLink
                                                    href="#"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        goToPage1(totalPages);
                                                    }}
                                                    isActive={currentPage1 === totalPages}
                                                >
                                                    {totalPages}
                                                </PaginationLink>
                                            </PaginationItem>
                                        </>
                                    )}

                                    <PaginationItem>
                                        <PaginationNext
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                if (data?.hasNext) goToPage1(currentPage1 + 1);
                                            }}
                                            aria-disabled={!data?.hasNext}
                                            className={!data?.hasNext ? "pointer-events-none opacity-50" : ""}
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    </>
                )}
            </CardContent>
        </Card>
        </div>
    );
}
