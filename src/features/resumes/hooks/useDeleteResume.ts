import {useMutation, useQueryClient} from "@tanstack/react-query";
import {resumeApi} from "@/features/resumes/api";
import {resumeKeys} from "@/features/resumes/queries";

export function useDeleteResume() {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: (slug: string) => resumeApi.deleteResume(slug),
        onSuccess: async (_data, slug) => {
            // 목록 갱신 + 해당 상세 캐시 제거
            await Promise.all([
                qc.invalidateQueries({ queryKey: resumeKeys.lists() }),
                qc.removeQueries({ queryKey: resumeKeys.detail(slug) }),
            ]);
        },
    });
}