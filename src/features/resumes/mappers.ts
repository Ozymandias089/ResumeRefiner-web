import type { GetResumeResponse } from "@/features/resumes/types/api";

const byDisplayOrder = <T extends { displayOrder: number }>(a: T, b: T) =>
    a.displayOrder - b.displayOrder;

export function normalizeResume(r: GetResumeResponse) {
    return {
        ...r,
        educations: [...(r.educations ?? [])].sort(byDisplayOrder),
        experiences: [...(r.experiences ?? [])].sort(byDisplayOrder),
        customSections: [...(r.customSections ?? [])].sort(byDisplayOrder),
    };
}

export function isNonEmptyArray<T>(arr?: T[] | null): arr is T[] {
    return Array.isArray(arr) && arr.length > 0;
}
