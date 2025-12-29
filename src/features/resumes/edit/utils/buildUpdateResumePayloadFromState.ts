// src/features/resumes/edit/utils/buildUpdateResumePayloadFromState.ts
import type { UpdateResumeRequest } from "@/features/resumes/edit/type/api";

type DirtyFlags = {
    title: boolean;
    languageCode: boolean;
    profile: boolean;
    military: boolean;
    clearMilitaryService: boolean;
    education: boolean;
    experiences: boolean;
    custom: boolean;
    photoFile: boolean;
};

function trimOrKeep(v: unknown): string | undefined {
    if (v === undefined || v === null) return undefined;
    if (typeof v !== "string") return v as any;
    return v.trim(); // ✅ "" 유지
}

export function buildUpdateResumePayloadFromState(
    _base: any,
    cur: any,
    dirty: DirtyFlags
): UpdateResumeRequest {
    // 서버 primitive boolean: 항상 포함
    const payload: UpdateResumeRequest = {
        clearMilitaryService: false,
    };

    if (dirty.title) payload.title = trimOrKeep(cur.title);
    if (dirty.languageCode) payload.languageCode = cur.languageCode;

    if (dirty.profile) {
        payload.profile = {
            name: trimOrKeep(cur.profile?.name) as any,
            gender: cur.profile?.gender ?? undefined,
            email: trimOrKeep(cur.profile?.email) as any,
            phone: trimOrKeep(cur.profile?.phone) as any,
            location: trimOrKeep(cur.profile?.location) as any,
            birthDate: cur.profile?.birthDate ?? undefined,
        };
    }

    if (dirty.clearMilitaryService) {
        payload.clearMilitaryService = !!cur.clearMilitaryService;
    }

    // clear가 true면 militaryService를 절대 보내지 않음
    if (!payload.clearMilitaryService && dirty.military) {
        const status = cur.military?.militaryStatus;

        // ✅ status는 필수. null/undefined면 보내면 안 됨(서버에서 DomainRuleViolation 또는 DB 에러 유발)
        if (status == null) {
            // 여기서 throw로 막아도 되고, 그냥 omit해도 됨.
            // 디버깅/안전 위해 throw 추천:
            throw new Error("militaryStatus is required when sending militaryService patch");
        }

        payload.militaryService = {
            militaryStatus: status,
            branch: cur.military?.branch ?? undefined,
            period: trimOrKeep(cur.military?.period) as any,
            rank: trimOrKeep(cur.military?.rank) as any,
            notes: trimOrKeep(cur.military?.notes) as any,
        };
    }

    if (dirty.education) payload.educations = cur.education ?? [];
    if (dirty.experiences) payload.experiences = cur.experiences ?? [];
    if (dirty.custom) payload.customSections = cur.custom ?? [];

    return payload;
}
