// src/features/resumes/edit/api.ts
import { apiFetch, type ApiResponseMeta } from "@/shared/api/client";
import type { UpdateResumeRequest, PatchResumeResult } from "./type/api";

function toIfMatchFromVersion(version: number): string {
    // 서버 Etags.parseIfMatch는 보통 If-Match: "12" / W/"12" 둘 다 처리하게 구현하는 편이지만,
    // 안전하게 가장 흔한 형태로 보냄.
    return `"${version}"`;
}

function parseVersionFromETag(etag: string): number {
    // 예: W/"12"  또는  "12"  또는  12
    const cleaned = etag.trim().replace(/^W\//, "").replace(/^"+|"+$/g, "");
    const n = Number(cleaned);
    if (!Number.isFinite(n)) throw new Error(`Invalid ETag version: ${etag}`);
    return n;
}

export const resumeEditApi = {
    async patchResume(slug: string, payload: UpdateResumeRequest, expectedVersion: number): Promise<PatchResumeResult> {
        const meta: ApiResponseMeta<void> = await apiFetch(`/api/resumes/${encodeURIComponent(slug)}`, {
            method: "PATCH",
            json: payload,
            meta: true,
            headers: {
                "If-Match": toIfMatchFromVersion(expectedVersion),
            },
        });

        const etag = meta.headers.get("ETag");
        if (!etag) throw new Error("ETag header missing from PATCH response");

        return {
            etag,
            newVersion: parseVersionFromETag(etag),
        };
    },
};
