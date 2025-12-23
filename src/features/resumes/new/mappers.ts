// src/features/resumes/new/lib/mappers.ts
import type { CreateResumeRequest } from "@/features/resumes/types/api";
import {CreateResumeFormState} from "@/features/resumes/new/types/form";

const opt = (s: string) => {
    const t = s.trim();
    return t.length === 0 ? null : t;
};

export function toCreateResumeRequest(state: CreateResumeFormState): CreateResumeRequest {
    const isNone = String(state.military.militaryStatus) === "NOT_APPLICABLE";

    return {
        title: state.title.trim(),
        languageCode: state.languageCode,

        profile: {
            name: opt(state.profile.name),
            gender: state.profile.gender,
            email: opt(state.profile.email),
            phone: opt(state.profile.phone),
            location: opt(state.profile.location),
            birthDate: opt(<string>state.profile.birthDate)
        },

        military: {
            militaryStatus: state.military.militaryStatus,
            branch: (isNone ? ("OTHER" as any) : state.military.branch),
            period: isNone ? null : opt(state.military.period),
            rank: isNone ? null : opt(state.military.rank),
            notes: isNone ? null : opt(state.military.notes),
        },

        education: state.education.map((e, i) => ({
            schoolName: e.schoolName.trim(),
            major: opt(e.major),
            degree: e.degree ?? null,
            period: opt(e.period) ?? undefined,
            description: opt(e.description) ?? undefined,
            displayOrder: i,
        })),

        experiences:
            state.experiences.length === 0
                ? null
                : state.experiences.map((x, i) => ({
                    company: x.company.trim(),
                    role: x.role.trim(),
                    period: x.period.trim(),
                    description: opt(x.description) ?? undefined,
                    displayOrder: i,
                })),

        custom:
            state.custom.length === 0
                ? null
                : state.custom.map((c, i) => ({
                    type: c.type,
                    subject: c.subject.trim(),
                    content: c.content.trim(),
                    displayOrder: i,
                })),
    };
}
