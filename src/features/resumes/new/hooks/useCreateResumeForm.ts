// src/features/resumes/new/hooks/useCreateResumeForm.ts
"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { resumeApi } from "@/features/resumes/api";
import type { CreateResumeFormState } from "../types/form";
import {createInitialResumeFormState, CUSTOM_TYPE_DEFAULT} from "@/features/resumes/new/constants";
import {validateCreateResumeForm} from "@/features/resumes/new/vaidators";
import {toCreateResumeRequest} from "@/features/resumes/new/mappers";
import {MilitaryStatus} from "@/features/resumes/types/enum";

export function useCreateResumeForm() {
    const router = useRouter();

    const [state, setState] = React.useState<CreateResumeFormState>(() => createInitialResumeFormState());
    const [submitting, setSubmitting] = React.useState(false);

    // ---- basic setters
    const setTitle = (v: string) => setState((s) => ({ ...s, title: v }));
    const setLanguageCode = (v: any) => setState((s) => ({ ...s, languageCode: v }));
    const setPhotoFile = (f: File | null) => setState((s) => ({ ...s, photoFile: f }));

    const updateProfile = (patch: Partial<CreateResumeFormState["profile"]>) =>
        setState((s) => ({ ...s, profile: { ...s.profile, ...patch } }));

    const setMilitaryStatus = (status: MilitaryStatus) =>
        setState((s) => ({
            ...s,
            military: {
                ...s.military,
                militaryStatus: status,
                ...(String(status) === "NOT_APPLICABLE"
                    ? { period: "", rank: "", notes: "" } // 선택: NONE이면 입력값 초기화
                    : {}),
            },
        }));
    const updateMilitary = (patch: Partial<CreateResumeFormState["military"]>) =>
        setState((s) => ({
            ...s,
            military: { ...s.military, ...patch },
        }));

    // ---- education
    const addEducation = () =>
        setState((s) => ({
            ...s,
            education: [...s.education, { schoolName: "", major: "", degree: null, period: "", description: "" }],
        }));

    const removeEducation = (idx: number) =>
        setState((s) => ({ ...s, education: s.education.filter((_, i) => i !== idx) || s.education }));

    const updateEducation = (idx: number, patch: Partial<CreateResumeFormState["education"][number]>) =>
        setState((s) => ({
            ...s,
            education: s.education.map((e, i) => (i === idx ? { ...e, ...patch } : e)),
        }));

    // ---- experiences
    const addExperience = () =>
        setState((s) => ({
            ...s,
            experiences: [...s.experiences, { company: "", role: "", period: "", description: "" }],
        }));

    const removeExperience = (idx: number) =>
        setState((s) => ({ ...s, experiences: s.experiences.filter((_, i) => i !== idx) }));

    const updateExperience = (idx: number, patch: Partial<CreateResumeFormState["experiences"][number]>) =>
        setState((s) => ({
            ...s,
            experiences: s.experiences.map((x, i) => (i === idx ? { ...x, ...patch } : x)),
        }));

    // ---- custom sections
    const addCustomSection = () =>
        setState((s) => ({
            ...s,
            custom: [...s.custom, { type: CUSTOM_TYPE_DEFAULT, subject: "", content: "" }],
        }));

    const removeCustomSection = (idx: number) =>
        setState((s) => ({ ...s, custom: s.custom.filter((_, i) => i !== idx) }));

    const updateCustomSection = (idx: number, patch: Partial<CreateResumeFormState["custom"][number]>) =>
        setState((s) => ({
            ...s,
            custom: s.custom.map((c, i) => (i === idx ? { ...c, ...patch } : c)),
        }));

    // ---- submit
    const submit = async () => {
        const errors = validateCreateResumeForm(state);
        if (errors.length) {
            toast.error(errors[0]!);
            return;
        }

        setSubmitting(true);
        try {
            const payload = toCreateResumeRequest(state);
            console.log("[CreateResume payload]", payload);
            const { slug } = await resumeApi.postResume(payload);

            if (state.photoFile) {
                await resumeApi.uploadResumeImage(slug, state.photoFile);
            }

            toast.success("이력서가 생성되었습니다.");
            router.push(`/resumes/${encodeURIComponent(slug)}`);
        } catch (e: any) {
            toast.error(e?.message ?? "이력서 생성에 실패했습니다.");
            throw e;
        } finally {
            setSubmitting(false);
        }
    };

    return {
        state,
        submitting,

        setTitle,
        setLanguageCode,
        setPhotoFile,
        updateProfile,
        setMilitaryStatus,
        updateMilitary,

        addEducation,
        removeEducation,
        updateEducation,

        addExperience,
        removeExperience,
        updateExperience,

        addCustomSection,
        removeCustomSection,
        updateCustomSection,

        submit,
    };
}
