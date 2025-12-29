"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { ResumeSort } from "@/features/resumes/types/enum";

function clamp(n: number, min: number, max: number) {
    return Math.max(min, Math.min(max, n));
}

function safeInt(v: string | null, fallback: number) {
    if (!v) return fallback;
    const n = Number(v);
    return Number.isFinite(n) ? n : fallback;
}

export function useResumesListQueryState() {
    const router = useRouter();
    const sp = useSearchParams();

    const page = useMemo(() => Math.max(0, safeInt(sp.get("page"), 0)), [sp]);
    const size = useMemo(() => clamp(safeInt(sp.get("size"), 10), 1, 50), [sp]);
    const sort = useMemo(
        () => (sp.get("sort") as ResumeSort) ?? "UPDATED_AT_DESC",
        [sp]
    );
    const q = useMemo(() => (sp.get("q") ?? "").trim(), [sp]);

    function push(next: Partial<{
        page: number;
        size: number;
        sort: ResumeSort;
        q: string;
    }>) {
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

    function goToPage1(p1: number, totalPages: number) {
        const next0 = clamp(p1, 1, totalPages) - 1;
        push({ page: next0 });
    }

    return {
        query: { page, size, sort, q },
        push,
        goToPage1,
    };
}
