// src/features/resumes/edit/hooks/useUpdateResume.ts
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UpdateResumeRequest, PatchResumeResult } from "../type/api";
import { resumeEditApi } from "../api";

type Vars = {
    slug: string;
    expectedVersion: number; // 바디로 내려받은 version을 여기로
    payload: UpdateResumeRequest;
};

export function useUpdateResume() {
    const qc = useQueryClient();

    return useMutation<PatchResumeResult, Error, Vars>({
        mutationFn: ({ slug, payload, expectedVersion }) =>
            resumeEditApi.patchResume(slug, payload, expectedVersion),

        onSuccess: async (_res, vars) => {
            // 보통은 상세 조회 캐시를 무효화해서 서버 상태 재조회
            // (너의 getResume 훅 queryKey에 맞춰 키만 맞춰주면 됨)
            await qc.invalidateQueries({ queryKey: ["resume", vars.slug] });
            await qc.invalidateQueries({ queryKey: ["resumeSummaries"] });
        },
    });
}
