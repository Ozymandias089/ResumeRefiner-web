import type {
    Gender,
    MilitaryStatus,
    MilitaryBranch,
    EducationDegrees,
    ResumeCustomSectionsType,
} from "@/features/resumes/types/enum";

export type A4Lang = "KO" | "EN";

export type A4UI = {
    docTitle: string;
    profile: string;
    experience: string;
    education: string;
    military: string;
    contact: {
        email: string;
        phone: string;
        location: string;
        birthDate: string;
        age: string;
        gender: string;
    };
    field: {
        period: string;
        degree: string;
        major: string;
        status: string;
        branch: string;
        rank: string;
        notes: string;
    };
};

export type A4Labels = {
    gender: Record<Gender, string>;
    militaryStatus: Record<MilitaryStatus, string>;
    militaryBranch: Record<MilitaryBranch, string>;
    degree: Record<EducationDegrees, string>;
    customType: Record<ResumeCustomSectionsType, string>;
};
