// src/features/resumes/edit/hooks/useUpdateResumeForm.ts
"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useUpdateResume } from "@/features/resumes/edit/hooks/useUpdateResume";
import { useResumeDetails } from "@/features/resumes/hooks/useResumeDetails";
import { buildUpdateResumePayloadFromState } from "@/features/resumes/edit/utils/buildUpdateResumePayloadFromState";
import type { UpdateResumeRequest } from "@/features/resumes/edit/type/api";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {resumeApi} from "@/features/resumes/api";

export type ResumeFormState = {
    title: string;
    languageCode: any;

    profile: {
        name: string;
        gender: any | null;
        email: string;
        phone: string;
        location: string;
        birthDate: string | undefined;
    };

    photoFile: File | null;
    removePhoto: boolean;

    military: {
        militaryStatus: any;
        branch: any | null;
        period: string;
        rank: string;
        notes: string;
    };

    education: any[];
    experiences: any[];
    custom: any[];

    clearMilitaryService: boolean;
};

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

function makeEmptyDirty(): DirtyFlags {
    return {
        title: false,
        languageCode: false,
        profile: false,
        military: false,
        clearMilitaryService: false,
        education: false,
        experiences: false,
        custom: false,
        photoFile: false,
    };
}

export function useUpdateResumeForm(slug: string) {
    const router = useRouter();

    const { data, isLoading, error } = useResumeDetails(slug);
    const patch = useUpdateResume();

    const [state, setState] = useState<ResumeFormState | null>(null);
    const [dirty, setDirty] = useState<DirtyFlags>(makeEmptyDirty);

    const [expectedVersion, setExpectedVersion] = useState<number | null>(null);

    // ✅ 초기 기준 snapshot (payload 생성용)
    const baseRef = useRef<ResumeFormState | null>(null);

    // ✅ 수정 화면에서 “현재 등록된 사진 URL”이 필요함 (파일 선택 전 표시)
    const currentPhotoUrl = data?.photoUrl ?? null;

    useEffect(() => {
        if (!data) return;

        const p = data.profile;
        const m = data.military;

        const initial: ResumeFormState = {
            title: data.title ?? "",
            languageCode: data.languageCode,

            profile: {
                name: p?.name ?? "",
                gender: p?.gender ?? null,
                email: p?.email ?? "",
                phone: p?.phone ?? "",
                location: p?.location ?? "",
                birthDate: p?.birthDate ?? undefined,
            },

            photoFile: null,
            removePhoto: false,

            military: m
                ? {
                    militaryStatus: m.militaryStatus,
                    branch: m.branch ?? null,
                    period: m.period ?? "",
                    rank: m.rank ?? "",
                    notes: m.notes ?? "",
                }
                : {
                    militaryStatus: "NOT_APPLICABLE",
                    branch: null,
                    period: "",
                    rank: "",
                    notes: "",
                },

            education: data.educations ?? [],
            experiences: data.experiences ?? [],
            custom: data.customSections ?? [],

            clearMilitaryService: false,
        };

        baseRef.current = initial;
        setState(initial);
        setDirty(makeEmptyDirty());
        setExpectedVersion(data.version);
    }, [data]);

    const submitting = patch.isPending;

    const markDirty = useCallback((key: keyof DirtyFlags) => {
        setDirty((prev) => (prev[key] ? prev : { ...prev, [key]: true }));
    }, []);

    // ===== setters =====
    const setTitle = useCallback(
        (title: string) => {
            setState((s) => (s ? { ...s, title } : s));
            markDirty("title");
        },
        [markDirty]
    );

    const setLanguageCode = useCallback(
        (languageCode: any) => {
            setState((s) => (s ? { ...s, languageCode } : s));
            markDirty("languageCode");
        },
        [markDirty]
    );

    const updateProfile = useCallback(
        (patchObj: Partial<ResumeFormState["profile"]>) => {
            setState((s) => (s ? { ...s, profile: { ...s.profile, ...patchObj } } : s));
            markDirty("profile");
        },
        [markDirty]
    );

    // ✅ 삭제 토글: 삭제 선택하면 업로드 파일은 의미 없으므로 null
    const toggleRemovePhoto = useCallback(
        (remove: boolean) => {
            setState((s) => (s ? { ...s, removePhoto: remove, photoFile: remove ? null : s.photoFile } : s));
            markDirty("photoFile");
        },
        [markDirty]
    );

    // ✅ 파일 선택하면 삭제 의도 해제
    const setPhotoFile = useCallback(
        (file: File | null) => {
            setState((s) => (s ? { ...s, photoFile: file, removePhoto: file ? false : s.removePhoto } : s));
            markDirty("photoFile");
        },
        [markDirty]
    );

    const updateMilitary = useCallback(
        (patchObj: Partial<ResumeFormState["military"]>) => {
            setState((s) => (s ? { ...s, military: { ...s.military, ...patchObj } } : s));
            markDirty("military");
        },
        [markDirty]
    );

    const setMilitaryStatus = useCallback(
        (militaryStatus: any) => {
            setState((s) => {
                if (!s) return s;
                const shouldClear = militaryStatus === "NOT_APPLICABLE";
                return {
                    ...s,
                    military: { ...s.military, militaryStatus },
                    clearMilitaryService: shouldClear ? true : s.clearMilitaryService,
                };
            });
            markDirty("military");
            markDirty("clearMilitaryService");
        },
        [markDirty]
    );

    // arrays (생략: 너 코드 그대로)
    const addEducation = useCallback(() => {
        setState((s) => {
            if (!s) return s;
            const nextItem = {
                schoolName: "",
                major: "",
                degree: null,
                period: "",
                description: "",
                displayOrder: s.education.length,
            };
            return { ...s, education: [...s.education, nextItem] };
        });
        markDirty("education");
    }, [markDirty]);

    const removeEducation = useCallback((index: number) => {
        setState((s) => (s ? { ...s, education: s.education.filter((_, i) => i !== index) } : s));
        markDirty("education");
    }, [markDirty]);

    const updateEducation = useCallback((index: number, patchObj: any) => {
        setState((s) => {
            if (!s) return s;
            const next = s.education.map((it, i) => (i === index ? { ...it, ...patchObj } : it));
            return { ...s, education: next };
        });
        markDirty("education");
    }, [markDirty]);

    const addExperience = useCallback(() => {
        setState((s) => {
            if (!s) return s;
            const nextItem = {
                company: "",
                role: "",
                period: "",
                description: "",
                displayOrder: s.experiences.length,
            };
            return { ...s, experiences: [...s.experiences, nextItem] };
        });
        markDirty("experiences");
    }, [markDirty]);

    const removeExperience = useCallback((index: number) => {
        setState((s) => (s ? { ...s, experiences: s.experiences.filter((_, i) => i !== index) } : s));
        markDirty("experiences");
    }, [markDirty]);

    const updateExperience = useCallback((index: number, patchObj: any) => {
        setState((s) => {
            if (!s) return s;
            const next = s.experiences.map((it, i) => (i === index ? { ...it, ...patchObj } : it));
            return { ...s, experiences: next };
        });
        markDirty("experiences");
    }, [markDirty]);

    const addCustomSection = useCallback(() => {
        setState((s) => {
            if (!s) return s;
            const nextItem = {
                type: "OTHER",
                subject: "",
                content: "",
                displayOrder: s.custom.length,
            };
            return { ...s, custom: [...s.custom, nextItem] };
        });
        markDirty("custom");
    }, [markDirty]);

    const removeCustomSection = useCallback((index: number) => {
        setState((s) => (s ? { ...s, custom: s.custom.filter((_, i) => i !== index) } : s));
        markDirty("custom");
    }, [markDirty]);

    const updateCustomSection = useCallback((index: number, patchObj: any) => {
        setState((s) => {
            if (!s) return s;
            const next = s.custom.map((it, i) => (i === index ? { ...it, ...patchObj } : it));
            return { ...s, custom: next };
        });
        markDirty("custom");
    }, [markDirty]);

    const canSubmit = useMemo(() => Object.values(dirty).some(Boolean), [dirty]);

    const submit = useCallback(async () => {
        if (!state || !baseRef.current) return;
        if (expectedVersion == null) return;
        if (!canSubmit) return;

        const payload: UpdateResumeRequest = buildUpdateResumePayloadFromState(
            baseRef.current,
            state,
            dirty
        );

        try {
            // 1) 본문 PATCH
            const res = await patch.mutateAsync({
                slug,
                expectedVersion,
                payload,
            });

            setExpectedVersion(res.newVersion);

            // 2) 이미지 처리 (PATCH 성공 이후)
            if (dirty.photoFile) {
                // 삭제 의도
                if (state.removePhoto) {
                    // 실제로 현재 사진이 있을 때만 호출해도 됨(없어도 서버가 204면 상관없음)
                    await resumeApi.deleteResumeImage(slug);
                    toast.success("사진 삭제 완료");
                } else if (state.photoFile) {
                    await resumeApi.uploadResumeImage(slug, state.photoFile);
                    toast.success("사진 업로드 완료");
                }

                // 이미지 변경이 끝났으니 로컬 state 정리
                setState((s) => (s ? { ...s, photoFile: null, removePhoto: false } : s));
            }

            // 3) base/dirties 갱신
            baseRef.current = state;
            setDirty(makeEmptyDirty());

            toast.success("저장 완료", {
                description: "변경사항이 저장되었습니다.",
                action: {
                    label: "상세 보기",
                    onClick: () => router.push(`/resumes/${encodeURIComponent(slug)}`),
                },
            });
        } catch (e: any) {
            const msg = e?.message ?? "알 수 없는 오류";
            toast.error("저장 실패", {
                description: msg.includes("412")
                    ? "버전 충돌이 발생했습니다. 새로고침 후 다시 시도하세요."
                    : msg,
                action: {
                    label: "새로고침",
                    onClick: () => window.location.reload(),
                },
            });
        }
    }, [state, expectedVersion, canSubmit, slug, patch, dirty, router]);

    return {
        loading: isLoading || !state,
        error,
        submitting,

        photoUrl: currentPhotoUrl,

        state: state!,
        dirty,

        canSubmit,
        submit,

        setTitle,
        setLanguageCode,
        updateProfile,

        toggleRemovePhoto,
        setPhotoFile,

        updateMilitary,
        setMilitaryStatus,

        addEducation,
        removeEducation,
        updateEducation,

        addExperience,
        removeExperience,
        updateExperience,

        addCustomSection,
        removeCustomSection,
        updateCustomSection,
    };
}
