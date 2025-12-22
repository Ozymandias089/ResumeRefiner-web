import {
    EducationDegrees,
    LanguageCode, MilitaryBranch,
    MilitaryStatus,
    ResumeCustomSectionsType,
    ResumeSort
} from "@/features/resumes/types/enum";

/**
 * POST /api/resumes 이력서 생성 요청 DTO
 */
export type CreateResumeRequest = {
    title: string;
    languageCode: LanguageCode;
    profile?: ResumeProfile | null;
    military: ResumeMilitaryService;
    education: ResumeEducation[];
    experiences?: ResumeExperience[] | null;
    custom?: ResumeCustomSection[] | null;
};

/**
 * GET /api/resumes/{slug} Response DTO
 */
export type GetResumeResponse = {
    slug: string;
    title: string;
    createdAt: string;
    updatedAt: string;
    languageCode: LanguageCode;
    photoUrl: string;
    profile: ResumeProfile | null;
    military: ResumeMilitaryService | null;
    educations: ResumeEducation[];
    experiences?: ResumeExperience[];
    customSections?: ResumeCustomSection[] | null;
};

/**
 * GET /api/resumes Response DTO
 */
export type ResumeSummaryListResponse = {
    resumes: ResumeSummary[];
    page: number;
    size: number;
    totalElements: number;
    hasPrev: boolean;
    hasNext: boolean;
};

export type ResumeSummary = {
    slug: string;
    title: string;
    createdAt: string;
    updatedAt: string;
    reviewCount: number;
};

/**
 * 이력서 개인정보 내부DTO
 */
export type ResumeProfile = {
    name?: string | null;
    email?: string | null;
    phone?: string | null;
    location?: string | null;
};

/**
 * 이력서 군복무 DTO
 */
export type ResumeMilitaryService = {
    militaryStatus: MilitaryStatus;
    branch: MilitaryBranch;
    period?: string | null;
    rank?: string | null;
    notes?: string | null;
};

/**
 * 이력서 학력 DTO
 */
export type ResumeEducation = {
    schoolName: string;
    major?: string | null;
    degree? : EducationDegrees | null;
    period?: string;
    description?: string;
    displayOrder: number;
};

/**
 * 이력서 경력 DTO
 */
export type ResumeExperience = {
    company: string;
    role: string;
    period: string;
    description?: string;
    displayOrder: number
}

/**
 * 이력서 커스텀 섹션 DTO
 */
export type ResumeCustomSection = {
    type: ResumeCustomSectionsType;
    subject: string;
    content: string;
    displayOrder: number;
}

export type GetResumeSummariesParams = {
    page?: number;
    size?: number;
    sort?: ResumeSort;
    q?: string | null;
};

export type UploadImageResponse = {
    url: string;
    fileId: number;
};