// src/features/resumes/edit/utils/buildUpdateResumePayload.ts
import type { UpdateResumeRequest } from "../type/api";
import { isDirtyTree, pickDirtyObject } from "./rhfDirty";

/**
 * 폼 타입 예시:
 * - 너의 edit 폼 state 구조에 맞춰 아래 ResumeEditFormValues를 조정하면 됨.
 */
export type ResumeEditFormValues = {
    title: string;
    languageCode: UpdateResumeRequest["languageCode"];

    profile: NonNullable<UpdateResumeRequest["profile"]>;
    militaryService: NonNullable<UpdateResumeRequest["militaryService"]> | null;

    educations: NonNullable<UpdateResumeRequest["educations"]>;
    experiences: NonNullable<UpdateResumeRequest["experiences"]>;
    customSections: NonNullable<UpdateResumeRequest["customSections"]>;

    clearMilitaryService: boolean;
};

/**
 * dirtyFields 타입은 react-hook-form의 FormState["dirtyFields"] 형태를 기대
 * (구체 타입이 필요하면 RHF의 FieldNamesMarkedBoolean<...>로 바꿔도 됨)
 */
export type ResumeEditDirtyFields = any;

function shouldSendArray(values: unknown, dirty: unknown): boolean {
    // 배열은 "어느 하나라도 변경"이면 전체 replace를 보내는 정책
    return Array.isArray(values) && isDirtyTree(dirty);
}

function normalizeOptionalString(v: unknown): string | null | undefined {
    // PATCH에서 "빈 문자열"을 그대로 보낼지 null로 보낼지 정책 결정:
    // - 여기선 UX 상 빈 값은 null로 보내 '지우기'를 표현하게 함.
    if (v === undefined) return undefined;
    if (v === null) return null;
    if (typeof v !== "string") return v as any;
    const t = v.trim();
    if (t.length === 0) return null;
    return t;
}

/**
 * 변경된 값만 포함한 UpdateResumeRequest 생성
 */
export function buildUpdateResumePayload(
    values: ResumeEditFormValues,
    dirtyFields: ResumeEditDirtyFields
): UpdateResumeRequest {
    const payload: UpdateResumeRequest = {
        // 서버가 primitive boolean이라면 기본 false를 넣어주는 게 안전
        clearMilitaryService: false,
    };

    // top-level primitives
    if (isDirtyTree(dirtyFields?.title)) payload.title = normalizeOptionalString(values.title);
    if (isDirtyTree(dirtyFields?.languageCode)) payload.languageCode = values.languageCode ?? null;

    // profile: 부분 patch
    if (isDirtyTree(dirtyFields?.profile)) {
        const picked = pickDirtyObject(values.profile as any, dirtyFields.profile);
        // 문자열 정리(빈값 = null) 정책 적용
        payload.profile = {
            ...picked,
            name: normalizeOptionalString((picked as any).name) as any,
            email: normalizeOptionalString((picked as any).email) as any,
            phone: normalizeOptionalString((picked as any).phone) as any,
            location: normalizeOptionalString((picked as any).location) as any,
            // birthDate는 yyyy-MM-dd string으로 들어오는 형태라면 trim만
            birthDate: normalizeOptionalString((picked as any).birthDate) as any,
        };
    }

    // militaryService: 부분 patch or clear flag
    // 1) clearMilitaryService가 dirty면 그대로 보냄
    if (isDirtyTree(dirtyFields?.clearMilitaryService)) {
        payload.clearMilitaryService = values.clearMilitaryService;
    }

    // 2) clearMilitaryService가 true면, militaryService는 보내지 않아도 됨(서버가 clear flag 우선이라면)
    //    그래도 안전하게: clearMilitaryService=true면 militaryService 필드는 생략
    if (!payload.clearMilitaryService) {
        if (isDirtyTree(dirtyFields?.militaryService)) {
            // militaryService가 null로 바뀐 경우(= 제거)도 표현해야 하면 null을 보내도 됨.
            // 하지만 너는 clearMilitaryService로 제거하는 설계라 했으니,
            // 여기서는 militaryService가 존재할 때만 patch 전송.
            if (values.militaryService) {
                const picked = pickDirtyObject(values.militaryService as any, dirtyFields.militaryService);
                payload.militaryService = {
                    ...picked,
                    period: normalizeOptionalString((picked as any).period) as any,
                    rank: normalizeOptionalString((picked as any).rank) as any,
                    notes: normalizeOptionalString((picked as any).notes) as any,
                };
            }
        }
    }

    // arrays: 더 안전하게 전체 replace
    if (shouldSendArray(values.educations, dirtyFields?.educations)) payload.educations = values.educations ?? [];
    if (shouldSendArray(values.experiences, dirtyFields?.experiences)) payload.experiences = values.experiences ?? [];
    if (shouldSendArray(values.customSections, dirtyFields?.customSections)) payload.customSections = values.customSections ?? [];

    // 아무 변경도 없으면 최소 payload만 남을 수 있음:
    // 백엔드가 "빈 patch" 허용 안 하면 여기서 throw하거나, 호출부에서 mutate 막아도 됨.
    return payload;
}
