import {ResumeSort} from "@/features/resumes/types/enum";

export type ResumeListParams = {
    page?: number;
    size?: number;
    sort?: ResumeSort;
    q?: string | null;
};

export const resumeKeys = {
    all: ["resumes"] as const,
    lists: () => [...resumeKeys.all, "list"] as const,
    list: (params: Required<Omit<ResumeListParams, "q">> & { q: string }) =>
        [...resumeKeys.lists(), params] as const,
    details: () => [...resumeKeys.all, "detail"] as const,
    detail: (slug: string) => [...resumeKeys.details(), slug] as const,
};