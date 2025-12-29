"use client";

import { useCallback, useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { resumeApi } from "@/features/resumes/api";
import { resumeKeys } from "@/features/resumes/queries";
import type { UploadImageResponse } from "@/features/resumes/types/api";

type LoadingKey = "isUploadingResumeImage" | "isDeletingResumeImage";

export function useResumeImageMutations(slug: string) {
    const qc = useQueryClient();

    const [loading, setLoading] = useState<Record<LoadingKey, boolean>>({
        isUploadingResumeImage: false,
        isDeletingResumeImage: false,
    });
    const [error, setError] = useState<unknown>(null);

    const setLoadingKey = (k: LoadingKey, v: boolean) =>
        setLoading((prev) => ({ ...prev, [k]: v }));

    const invalidate = useCallback(async () => {
        // 상세(해당 slug) 갱신
        await qc.invalidateQueries({ queryKey: resumeKeys.detail(slug) });
        // 리스트(모든 파라미터 조합) 갱신
        await qc.invalidateQueries({ queryKey: resumeKeys.lists() });
    }, [qc, slug]);

    const uploadResumeImage = useCallback(
        async (file: File): Promise<UploadImageResponse> => {
            setLoadingKey("isUploadingResumeImage", true);
            setError(null);

            try {
                const res = await resumeApi.uploadResumeImage(slug, file);
                await invalidate();
                return res;
            } catch (e) {
                setError(e);
                throw e;
            } finally {
                setLoadingKey("isUploadingResumeImage", false);
            }
        },
        [slug, invalidate]
    );

    const deleteResumeImage = useCallback(async (): Promise<void> => {
        setLoadingKey("isDeletingResumeImage", true);
        setError(null);

        try {
            await resumeApi.deleteResumeImage(slug);
            await invalidate();
        } catch (e) {
            setError(e);
            throw e;
        } finally {
            setLoadingKey("isDeletingResumeImage", false);
        }
    }, [slug, invalidate]);

    return useMemo(
        () => ({
            uploadResumeImage,
            deleteResumeImage,
            isUploadingResumeImage: loading.isUploadingResumeImage,
            isDeletingResumeImage: loading.isDeletingResumeImage,
            error,
        }),
        [uploadResumeImage, deleteResumeImage, loading, error]
    );
}
