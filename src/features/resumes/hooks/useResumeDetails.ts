import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { resumeKeys } from "@/features/resumes/queries";
import { resumeApi } from "@/features/resumes/api";
import { GetResumeResponse } from "@/features/resumes/types/api";

export function useResumeDetails(slug?: string): UseQueryResult<GetResumeResponse, Error> {
    return useQuery({
        queryKey: resumeKeys.detail(slug ?? ""), // slug 없으면 빈 값
        queryFn: () => resumeApi.getResume(slug as string),
        enabled: typeof slug === "string" && slug.length > 0,
        staleTime: 30_000,
        retry: 1,
    });
}
