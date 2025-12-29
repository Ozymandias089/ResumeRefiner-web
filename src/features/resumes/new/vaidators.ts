import {CreateResumeFormState} from "@/features/resumes/new/types/form";

export function validateCreateResumeForm(state: CreateResumeFormState): string[] {
    const errors: string[] = [];

    if (state.title.trim().length === 0) errors.push("제목은 필수입니다.");

    if (state.education.some((e) => e.schoolName.trim().length === 0)) {
        errors.push("학력의 학교명은 필수입니다.");
    }

    const badExp = state.experiences.some(
        (x) => x.company.trim().length === 0 || x.role.trim().length === 0 || x.period.trim().length === 0
    );
    if (badExp) errors.push("경력은 회사/역할/기간이 필수입니다.");

    const badCustom = state.custom.some((c) => c.subject.trim().length === 0 || c.content.trim().length === 0);
    if (badCustom) errors.push("커스텀 섹션은 제목/내용이 필수입니다.");

    return errors;
}
