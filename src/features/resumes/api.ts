import { apiFetch, type ApiResponseMeta } from "@/shared/api/client";
import {
    CreateResumeRequest,
    GetResumeResponse,
    GetResumeSummariesParams,
    ResumeSummaryListResponse, UploadImageResponse
} from "@/features/resumes/types/api";

export const resumeApi = {
    async postResume(payload: CreateResumeRequest): Promise<{ slug: string; location: string }> {
        const meta: ApiResponseMeta<void> = await apiFetch("/api/resumes", {
            method: "POST",
            json: payload,
            meta: true,
        });

        const location = meta.headers.get("Location");
        if (!location) throw new Error("Location header missing");

        const slug = location.split("/").pop()!;
        return { slug, location };
    },

    getResume(slug: string): Promise<GetResumeResponse> {
        return apiFetch<GetResumeResponse> (`/api/resumes/${encodeURIComponent(slug)}`, {
            method: "GET"
        });
    },

    getResumeSummaries(params: GetResumeSummariesParams = {}): Promise<ResumeSummaryListResponse> {
        const {
            page = 0,
            size = 10,
            sort = "UPDATED_AT_DESC",
            q,
        } = params;

        const qs = new URLSearchParams();
        qs.set("page", String(page));
        qs.set("size", String(size));
        qs.set("sort", sort);
        if (q && q.trim().length > 0) qs.set("q", q.trim());

        return apiFetch<ResumeSummaryListResponse> (`/api/resumes?${qs.toString()}`, {
            method: "GET",
        });
    },

    deleteResume(slug: string): Promise<void> {
        return apiFetch<void> (`/api/resumes/${encodeURIComponent(slug)}`, {
            method: "DELETE"
        })
    },

    uploadResumeImage(slug: string, file: File): Promise<UploadImageResponse> {
        const formData = new FormData();
        formData.append("file", file);

        return apiFetch<UploadImageResponse> (`/api/media/resume-image/${encodeURIComponent(slug)}`, {
            method: "POST",
            body: formData,
        })
    },

    deleteResumeImage(slug: string): Promise<void> {
        return apiFetch<void> (`/api/media/resume-image/${encodeURIComponent(slug)}`, {
            method: "DELETE",
        })
    }
};