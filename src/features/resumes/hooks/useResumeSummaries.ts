import {resumeKeys, ResumeListParams} from "@/features/resumes/queries";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {resumeApi} from "@/features/resumes/api";
import {ResumeSummaryListResponse} from "@/features/resumes/types/api";
import {ResumeSort} from "@/features/resumes/types/enum";

export function useResumeSummaries(params: ResumeListParams = {}): UseQueryResult<ResumeSummaryListResponse, Error> {
    const page: number = params.page || 0;
    const size: number = params.size || 10;
    const sort: ResumeSort = params.sort || "UPDATED_AT_DESC";
    const q: string = (params.q ?? "").trim();

    return useQuery({
        queryKey: resumeKeys.list({ page, size, sort, q }),
        queryFn: (): Promise<ResumeSummaryListResponse> => resumeApi.getResumeSummaries({ page, size, sort, q }),
    });
}