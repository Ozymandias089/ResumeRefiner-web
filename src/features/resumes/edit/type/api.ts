// src/features/resumes/edit/type/api.ts
import {EducationDegrees, LanguageCode, ResumeCustomSectionsType} from "@/features/resumes/types/enum";
import type { Gender } from "@/features/resumes/types/enum";
import type { MilitaryBranch, MilitaryStatus } from "@/features/resumes/types/enum";

// PATCH DTO들
export type ProfilePatchDTO = {
    name?: string | null;
    gender?: Gender | null;
    email?: string | null;
    phone?: string | null;
    location?: string | null;
    birthDate?: string | null; // yyyy-MM-dd
};

export type MilitaryServicePatchDTO = {
    militaryStatus?: MilitaryStatus | null;
    branch?: MilitaryBranch | null;
    period?: string | null;
    rank?: string | null;
    notes?: string | null;
};

export type EducationDTO = {
    schoolName: string;
    major?: string | null;
    degree?: EducationDegrees | null;
    period?: string | null;
    description?: string | null;
    displayOrder: number;
};

export type ExperienceDTO = {
    company: string;
    role: string;
    period: string;
    description?: string | null;
    displayOrder: number;
};

export type CustomSectionDTO = {
    type: ResumeCustomSectionsType;
    subject: string;
    content: string;
    displayOrder: number;
};

export type UpdateResumeRequest = {
    title?: string | null;
    languageCode?: LanguageCode | null;

    profile?: ProfilePatchDTO | null;
    militaryService?: MilitaryServicePatchDTO | null;

    educations?: EducationDTO[] | null;
    experiences?: ExperienceDTO[] | null;
    customSections?: CustomSectionDTO[] | null;

    clearMilitaryService?: boolean; // 서버는 primitive boolean
};

// PATCH 응답: 204 + ETag 헤더
export type PatchResumeResult = {
    newVersion: number;
    etag: string; // 예: W/"12" 또는 "12" 형태 (서버 Etags.fromVersion 결과)
};
