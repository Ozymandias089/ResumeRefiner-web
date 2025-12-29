// src/features/resumes/new/types/form.ts
import {
    LanguageCode,
    MilitaryStatus,
    EducationDegrees,
    ResumeCustomSectionsType,
    MilitaryBranch, Gender,
} from "@/features/resumes/types/enum";

export type ResumeProfileForm = {
    name: string;
    gender: Gender;
    email: string;
    phone: string;
    location: string;
    birthDate?: string;      // "yyyy-MM-dd"
};

export type ResumeMilitaryForm = {
    militaryStatus: MilitaryStatus;
    branch?: MilitaryBranch | null;
    period: string;
    rank: string;
    notes: string;
};

export type ResumeEducationForm = {
    schoolName: string;
    major: string;
    degree: EducationDegrees | null;
    period: string;
    description: string;
};

export type ResumeExperienceForm = {
    company: string;
    role: string;
    period: string;
    description: string;
};

export type ResumeCustomSectionForm = {
    type: ResumeCustomSectionsType;
    subject: string;
    content: string;
};

export type CreateResumeFormState = {
    title: string;
    languageCode: LanguageCode;

    profile: ResumeProfileForm;
    photoFile: File | null;

    military: ResumeMilitaryForm;
    education: ResumeEducationForm[];

    experiences: ResumeExperienceForm[];
    custom: ResumeCustomSectionForm[];
};
