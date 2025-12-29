import {
    LanguageCode,
    MilitaryStatus,
    ResumeCustomSectionsType,
    EducationDegrees, MilitaryBranch, Gender,
} from "@/features/resumes/types/enum";
import type { CreateResumeFormState } from "@/features/resumes/new/types/form";

// ---- Options ----

export const LANGUAGE_OPTIONS: { label: string; value: LanguageCode }[] = [
    { label: "Korean", value: "KO" as LanguageCode },
    { label: "English", value: "EN" as LanguageCode },
];

export const GENDER_OPTIONS: { label: string; value: Gender }[] = [
    { label: "남성", value: "MALE" as Gender },
    { label: "여성", value: "FEMALE" as Gender },
];

export const MILITARY_STATUS_OPTIONS: { label: string; value: MilitaryStatus }[] = [
    { label: "해당없음", value: "NOT_APPLICABLE" as MilitaryStatus },
    { label: "미필", value: "NOT_SERVED" as MilitaryStatus },
    { label: "복무중", value: "SERVING" as MilitaryStatus },
    { label: "복무완료", value: "SERVED" as MilitaryStatus },
    { label: "면제", value: "EXEMPT" as MilitaryStatus },
];

export const MILITARY_BRANCH_OPTIONS: { label: string; value: MilitaryBranch }[] = [
    { label: "육군", value: "ARMY" as MilitaryBranch },
    { label: "해군", value: "NAVY" as MilitaryBranch },
    { label: "공군", value: "AIR_FORCE" as MilitaryBranch },
    { label: "해병대", value: "MARINE" as MilitaryBranch },
    { label: "사회복무", value: "SOCIAL_SERVICE" as MilitaryBranch },
    { label: "기타", value: "OTHER" as MilitaryBranch },
];

export const DEGREE_OPTIONS: { label: string; value: EducationDegrees | "OTHER" }[] = [
    { label: "고등학교", value: "HIGH_SCHOOL" as EducationDegrees },
    { label: "전문학사", value: "ASSOCIATE" as EducationDegrees },
    { label: "학사", value: "BACHELOR" as EducationDegrees },
    { label: "석사", value: "MASTER" as EducationDegrees },
    { label: "박사", value: "DOCTOR" as EducationDegrees },
    { label: "기타", value: "OTHER" as EducationDegrees },
];

export const CUSTOM_TYPE_OPTIONS: { label: string; value: ResumeCustomSectionsType }[] =
    [
        { label: "소개", value: "INTRODUCTION" as ResumeCustomSectionsType },
        { label: "프로젝트", value: "PROJECT" as ResumeCustomSectionsType },
        { label: "자격증", value: "CERTIFICATION" as ResumeCustomSectionsType },
        { label: "수상", value: "AWARD" as ResumeCustomSectionsType },
        { label: "대외활동", value: "ACTIVITY" as ResumeCustomSectionsType },
        { label: "병역 보충설명", value: "MILITARY_NOTE" as ResumeCustomSectionsType },
        { label: "기타", value: "OTHER" as ResumeCustomSectionsType },
    ];

export const CUSTOM_TYPE_DEFAULT = "PROJECT" as ResumeCustomSectionsType;

// ---- Defaults (explicit, safe) ----

export const DEFAULT_LANGUAGE_CODE = "KO" as LanguageCode;
export const DEFAULT_GENDER_CODE = "MALE" as Gender;
export const DEFAULT_MILITARY_STATUS = "NOT_APPLICABLE" as MilitaryStatus;
export const DEFAULT_MILITARY_BRANCH = "ARMY" as MilitaryBranch;

export const createInitialResumeFormState = (): CreateResumeFormState => ({
    title: "",
    languageCode: DEFAULT_LANGUAGE_CODE,

    profile: { name: "", gender: DEFAULT_GENDER_CODE, email: "", phone: "", location: "", birthDate: "" },
    photoFile: null,

    military: {
        militaryStatus: DEFAULT_MILITARY_STATUS,
        branch: DEFAULT_MILITARY_BRANCH,
        period: "",
        rank: "",
        notes: "",
    },

    education: [
        { schoolName: "", major: "", degree: null, period: "", description: "" },
    ],
    experiences: [],
    custom: [],
});
