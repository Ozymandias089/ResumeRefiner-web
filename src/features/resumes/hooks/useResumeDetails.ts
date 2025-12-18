import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {resumeKeys} from "@/features/resumes/queries";
import {resumeApi} from "@/features/resumes/api";
import {GetResumeResponse} from "@/features/resumes/types/api";

export function useResumeDetails(slug?: string): UseQueryResult<GetResumeResponse, Error> {
    return useQuery({
        queryKey: slug ? resumeKeys.detail(slug): resumeKeys.detail("__missing__"),
        queryFn: (): Promise<GetResumeResponse> => resumeApi.getResume(slug!),
        enabled: !!slug
    });
}