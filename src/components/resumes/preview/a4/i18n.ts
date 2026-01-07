import { LanguageCode, ResumeCustomSectionsType } from "@/features/resumes/types/enum";
import type { A4Labels, A4Lang, A4UI } from "./types";

export const langOf = (code: LanguageCode): A4Lang => (code === "KO" ? "KO" : "EN");

export const UI: Record<A4Lang, A4UI> = {
    KO: {
        docTitle: "이력서",
        profile: "개인정보",
        experience: "경력",
        education: "학력",
        military: "병역",
        contact: {
            email: "이메일",
            phone: "전화번호",
            location: "거주지",
            birthDate: "생년월일",
            age: "만 나이",
            gender: "성별",
        },
        field: {
            period: "기간",
            degree: "학위",
            major: "전공",
            status: "상태",
            branch: "군별",
            rank: "계급",
            notes: "비고",
        },
    },
    EN: {
        docTitle: "RESUME",
        profile: "PROFILE",
        experience: "EXPERIENCE",
        education: "EDUCATION",
        military: "MILITARY SERVICE",
        contact: {
            email: "Email",
            phone: "Phone",
            location: "Location",
            birthDate: "Date of Birth",
            age: "Age",
            gender: "Gender",
        },
        field: {
            period: "Period",
            degree: "Degree",
            major: "Major",
            status: "Status",
            branch: "Branch",
            rank: "Rank",
            notes: "Notes",
        },
    },
};

export const LABELS: Record<A4Lang, A4Labels> = {
    KO: {
        gender: {
            MALE: "남성",
            FEMALE: "여성",
        },
        militaryStatus: {
            NOT_APPLICABLE: "해당없음",
            NOT_SERVED: "미필",
            SERVING: "복무중",
            SERVED: "복무완료",
            EXEMPT: "면제",
        },
        militaryBranch: {
            ARMY: "육군",
            NAVY: "해군",
            AIR_FORCE: "공군",
            MARINE: "해병대",
            SOCIAL_SERVICE: "사회복무",
            OTHER: "기타",
        },
        degree: {
            HIGH_SCHOOL: "고등학교",
            ASSOCIATE: "전문학사",
            BACHELOR: "학사",
            MASTER: "석사",
            DOCTOR: "박사",
            OTHER: "기타",
        },
        customType: {
            INTRODUCTION: "소개",
            PROJECT: "프로젝트",
            CERTIFICATION: "자격증",
            AWARD: "수상",
            ACTIVITY: "대외활동",
            MILITARY_NOTE: "병역 보충설명",
            OTHER: "기타",
        },
    },
    EN: {
        gender: {
            MALE: "Male",
            FEMALE: "Female",
        },
        militaryStatus: {
            NOT_APPLICABLE: "N/A",
            NOT_SERVED: "Not served",
            SERVING: "Serving",
            SERVED: "Served",
            EXEMPT: "Exempt",
        },
        militaryBranch: {
            ARMY: "Army",
            NAVY: "Navy",
            AIR_FORCE: "Air Force",
            MARINE: "Marine",
            SOCIAL_SERVICE: "Social service",
            OTHER: "Other",
        },
        degree: {
            HIGH_SCHOOL: "High school",
            ASSOCIATE: "Associate",
            BACHELOR: "Bachelor",
            MASTER: "Master",
            DOCTOR: "Doctorate",
            OTHER: "Other",
        },
        customType: {
            INTRODUCTION: "Introduction",
            PROJECT: "Projects",
            CERTIFICATION: "Certifications",
            AWARD: "Awards",
            ACTIVITY: "Activities",
            MILITARY_NOTE: "Military note",
            OTHER: "Other",
        },
    },
};

export const CUSTOM_SECTION_ORDER: ResumeCustomSectionsType[] = [
    ResumeCustomSectionsType.INTRODUCTION,
    ResumeCustomSectionsType.PROJECT,
    ResumeCustomSectionsType.CERTIFICATION,
    ResumeCustomSectionsType.AWARD,
    ResumeCustomSectionsType.ACTIVITY,
    ResumeCustomSectionsType.MILITARY_NOTE,
    ResumeCustomSectionsType.OTHER,
];
