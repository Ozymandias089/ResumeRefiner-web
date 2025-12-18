"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { resumeApi } from "@/features/resumes/api";
import { resumeKeys } from "@/features/resumes/queries";
import type { CreateResumeRequest } from "@/features/resumes/types/api";

export function useCreateResume() {
    const qc = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: (payload: CreateResumeRequest) => resumeApi.postResume(payload),

        onSuccess: async ({ slug }) => {
            // 목록 갱신
            await qc.invalidateQueries({ queryKey: resumeKeys.lists() });

            // 상세로 이동 (프런트 라우트 기준으로 수정)
            router.push(`/resumes/${slug}`);
        },
    });
}
