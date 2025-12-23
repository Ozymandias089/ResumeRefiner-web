import React from "react";
import { cn } from "@/lib/utils";
import type {GetResumeResponse, ResumeProfileResponse} from "@/features/resumes/types/api";
import type {
    ResumeEducation,
    ResumeExperience,
    ResumeCustomSection,
    ResumeMilitaryService,
} from "@/features/resumes/types/api";
import {
    LanguageCode,
    MilitaryStatus,
    MilitaryBranch,
    EducationDegrees, Gender,
} from "@/features/resumes/types/enum";

import {
    ResumeCustomSectionsType,
} from "@/features/resumes/types/enum";


type Lang = "KO" | "EN";
const langOf = (code: LanguageCode): Lang => (code === "KO" ? "KO" : "EN");

/** ====== UI 텍스트(섹션/필드 라벨) ====== */
const UI = {
    KO: {
        docTitle: "이력서",
        profile: "개인정보",
        experience: "경력",
        education: "학력",
        military: "병역",

        contact: { email: "이메일", phone: "전화번호", location: "거주지", birthDate: "생년월일", age: "만 나이", gender: "성별" },
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

        contact: { email: "Email", phone: "Phone", location: "Location", birthDate: "Date of Birth", age: "Age", gender: "Gender" },
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
} as const;

/** ====== Enum 라벨(프런트 책임) ====== */
const LABELS = {
    KO: {
        gender: {
            MALE: "남성",
            FEMALE: "여성",
        } satisfies Record<Gender, string>,
        militaryStatus: {
            NOT_APPLICABLE: "해당없음",
            NOT_SERVED: "미필",
            SERVING: "복무중",
            SERVED: "복무완료",
            EXEMPT: "면제",
        } satisfies Record<MilitaryStatus, string>,
        militaryBranch: {
            ARMY: "육군",
            NAVY: "해군",
            AIR_FORCE: "공군",
            MARINE: "해병대",
            SOCIAL_SERVICE: "사회복무",
            OTHER: "기타",
        } satisfies Record<MilitaryBranch, string>,
        degree: {
            HIGH_SCHOOL: "고등학교",
            ASSOCIATE: "전문학사",
            BACHELOR: "학사",
            MASTER: "석사",
            DOCTOR: "박사",
            OTHER: "기타",
        } satisfies Record<EducationDegrees, string>,
        customType: {
            INTRODUCTION: "소개",
            PROJECT: "프로젝트",
            CERTIFICATION: "자격증",
            AWARD: "수상",
            ACTIVITY: "대외활동",
            MILITARY_NOTE: "병역 보충설명",
            OTHER: "기타",
        } satisfies Record<ResumeCustomSectionsType, string>,
    },
    EN: {
        gender: {
            MALE: "Male",
            FEMALE: "Female",
        } satisfies Record<Gender, string>,
        militaryStatus: {
            NOT_APPLICABLE: "N/A",
            NOT_SERVED: "Not served",
            SERVING: "Serving",
            SERVED: "Served",
            EXEMPT: "Exempt",
        } satisfies Record<MilitaryStatus, string>,
        militaryBranch: {
            ARMY: "Army",
            NAVY: "Navy",
            AIR_FORCE: "Air Force",
            MARINE: "Marine",
            SOCIAL_SERVICE: "Social service",
            OTHER: "Other",
        } satisfies Record<MilitaryBranch, string>,
        degree: {
            HIGH_SCHOOL: "High school",
            ASSOCIATE: "Associate",
            BACHELOR: "Bachelor",
            MASTER: "Master",
            DOCTOR: "Doctorate",
            OTHER: "Other",
        } satisfies Record<EducationDegrees, string>,
        customType: {
            INTRODUCTION: "Introduction",
            PROJECT: "Projects",
            CERTIFICATION: "Certifications",
            AWARD: "Awards",
            ACTIVITY: "Activities",
            MILITARY_NOTE: "Military note",
            OTHER: "Other",
        } satisfies Record<ResumeCustomSectionsType, string>,
    },
} as const;

/** ====== Custom section 출력 순서(고정) ====== */
const CUSTOM_SECTION_ORDER: ResumeCustomSectionsType[] = [
    ResumeCustomSectionsType.INTRODUCTION,
    ResumeCustomSectionsType.PROJECT,
    ResumeCustomSectionsType.CERTIFICATION,
    ResumeCustomSectionsType.AWARD,
    ResumeCustomSectionsType.ACTIVITY,
    ResumeCustomSectionsType.MILITARY_NOTE,
    ResumeCustomSectionsType.OTHER,
];

/** ====== helpers ====== */
const byOrder = <T extends { displayOrder: number }>(a: T, b: T) =>
    (a.displayOrder ?? 0) - (b.displayOrder ?? 0);

const nonEmpty = (v?: string | null) => {
    const s = (v ?? "").trim();
    return s.length ? s : null;
};

function SectionTitle({ children }: { children: React.ReactNode }) {
    return (
        <div className="mt-6 mb-2 flex items-center gap-3">
            <h2 className="text-[13px] font-semibold tracking-wide text-foreground">{children}</h2>
            <div className="h-px flex-1 bg-border" />
        </div>
    );
}

function Line({ label, value }: { label: string; value?: string | null }) {
    const v = nonEmpty(value);
    if (!v) return null;
    return (
        <div className="flex gap-2 text-[11.5px] leading-5 text-foreground">
            <div className="w-20 shrink-0 text-muted-foreground">{label}</div>
            <div className="min-w-0 flex-1 wrap-break-word">{v}</div>
        </div>
    );
}

function normalizeNewlines(s: string) {
    return s.replace(/\r\n/g, "\n");
}

function TextBlock({ value }: { value?: string | null }) {
    const v0 = nonEmpty(value);
    if (!v0) return null;
    const v = normalizeNewlines(v0);

    return (
        <div className="text-[11.5px] leading-5 text-foreground whitespace-pre-line wrap-break-word">
            {v}
        </div>
    );
}

export function ResumeA4({ resume }: { resume: GetResumeResponse }) {
    const lang = langOf(resume.languageCode);
    const ui = UI[lang];
    const labels = LABELS[lang];

    const profile: ResumeProfileResponse | null = resume.profile ?? null;
    const military: ResumeMilitaryService | null = resume.military ?? null;

    const educations: ResumeEducation[] = [...(resume.educations ?? [])].sort(byOrder);
    const experiences: ResumeExperience[] = [...(resume.experiences ?? [])].sort(byOrder);
    const customs: ResumeCustomSection[] = [...(resume.customSections ?? [])].sort(byOrder);

    // 커스텀 섹션: type별로 그룹핑
    const grouped = customs.reduce<Record<string, ResumeCustomSection[]>>((acc, cur) => {
        const k = String(cur.type);
        (acc[k] ??= []).push(cur);
        return acc;
    }, {});

    const photoSrc = nonEmpty(resume.photoUrl) ?? "/images/profile-placeholder.png";

    // type 정렬 순서 고정 (정의되지 않은 type은 맨 뒤)
    const typeRank = new Map<ResumeCustomSectionsType, number>(
        CUSTOM_SECTION_ORDER.map((t, i) => [t, i]),
    );
    const sortedTypes: ResumeCustomSectionsType[] = Object.values(grouped)
        .map((list) => list[0]!.type)
        .sort((a, b) => (typeRank.get(a) ?? 999) - (typeRank.get(b) ?? 999));

    return (
        <div className="print-root">
            {/* 화면에서만: 작성 타이틀 */}
            <div className="mb-4 print:hidden">
                <h1 className="text-xl font-semibold">{resume.title}</h1>
            </div>

            {/* A4 */}
            <div className="a4-page bg-background text-foreground shadow-sm print:shadow-none">
                {/* 문서 헤더: 크게 */}
                <div className="mb-5 flex items-end justify-between">
                    <div className="text-[26px] font-bold tracking-tight leading-none">
                        {ui.docTitle}
                    </div>
                    <div className="text-[10.5px] text-muted-foreground">{/* optional */}</div>
                </div>

                {/* 상단 프로필 영역: 좌(정보) 우(사진) */}
                <div className="flex items-start gap-6">
                    <div className="flex-1 min-w-0">
                        <div className="text-[18px] font-semibold leading-6 wrap-break-word">
                            {nonEmpty(profile?.name) ?? ""}
                        </div>

                        <SectionTitle>{ui.profile}</SectionTitle>

                        <div className="grid grid-cols-2 gap-x-8 gap-y-1">
                            <div className="col-span-2">
                                <Line
                                    label={ui.contact.gender}
                                    value={profile?.gender ? labels.gender[profile.gender] : null}
                                />
                            </div>
                            <Line label={ui.contact.age} value={profile?.age?.toString() ?? null} />
                            <Line label={ui.contact.birthDate} value={profile?.birthDate ?? null} />
                            <Line label={ui.contact.email} value={profile?.email ?? null} />
                            <Line label={ui.contact.phone} value={profile?.phone ?? null} />
                            {/* Location은 한 줄 전체 */}
                            <div className="col-span-2">
                                <Line label={ui.contact.location} value={profile?.location ?? null} />
                            </div>
                        </div>
                    </div>

                    {/* 사진: 3:4 규격, 충분히 크게 */}
                    <div className="shrink-0">
                        <img
                            src={photoSrc}
                            alt="Photo"
                            referrerPolicy="no-referrer"
                            className={cn("h-[140px] w-[105px] object-cover rounded-md border bg-muted")}
                        />
                    </div>
                </div>

                {/* EXPERIENCE */}
                {experiences.length > 0 && (
                    <>
                        <SectionTitle>{ui.experience}</SectionTitle>
                        <div className="space-y-3">
                            {experiences.map((exp) => (
                                <div key={exp.displayOrder} className="break-inside-avoid">
                                    <div className="flex items-baseline justify-between gap-4">
                                        <div className="min-w-0">
                                            <div className="text-[12.5px] font-semibold wrap-break-word">
                                                {exp.company} — {exp.role}
                                            </div>
                                        </div>
                                        <div className="shrink-0 text-[11px] text-muted-foreground">
                                            {nonEmpty(exp.period) ?? ""}
                                        </div>
                                    </div>
                                    <div className="mt-1">
                                        <TextBlock value={exp.description ?? null} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {/* EDUCATION */}
                {educations.length > 0 && (
                    <>
                        <SectionTitle>{ui.education}</SectionTitle>
                        <div className="space-y-3">
                            {educations.map((edu) => (
                                <div key={edu.displayOrder} className="break-inside-avoid">
                                    <div className="flex items-baseline justify-between gap-4">
                                        <div className="min-w-0">
                                            <div className="text-[12.5px] font-semibold wrap-break-word">
                                                {edu.schoolName}
                                            </div>
                                            <div className="mt-0.5 text-[11px] text-muted-foreground wrap-break-word">
                                                {[
                                                    nonEmpty(edu.major ?? null),
                                                    edu.degree ? labels.degree[edu.degree] : null,
                                                ]
                                                    .filter(Boolean)
                                                    .join(" · ")}
                                            </div>
                                        </div>
                                        <div className="shrink-0 text-[11px] text-muted-foreground">
                                            {nonEmpty(edu.period ?? null) ?? ""}
                                        </div>
                                    </div>
                                    <div className="mt-1">
                                        <TextBlock value={edu.description ?? null} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {/* MILITARY */}
                {military && (
                    <>
                        <SectionTitle>{ui.military}</SectionTitle>

                        <div className="grid grid-cols-2 gap-x-8 gap-y-1 break-inside-avoid">
                            <Line
                                label={ui.field.status}
                                value={labels.militaryStatus[military.militaryStatus]}
                            />
                            <Line label={ui.field.period} value={military.period ?? null} />

                            <Line
                                label={ui.field.branch}
                                value={labels.militaryBranch[military.branch]}
                            />
                            <Line label={ui.field.rank} value={military.rank ?? null} />

                            <div className="col-span-2">
                                <Line label={ui.field.notes} value={military.notes ?? null} />
                            </div>
                        </div>
                    </>
                )}

                {/* CUSTOM SECTIONS: type 섹션 1번 + subject 항목 제목 (중복이면 생략) */}
                {customs.length > 0 && (
                    <>
                        {sortedTypes.map((type) => {
                            const list = (grouped[String(type)] ?? []).sort(byOrder);
                            const sectionTitle = labels.customType[type];

                            return (
                                <React.Fragment key={type}>
                                    <SectionTitle>{sectionTitle}</SectionTitle>

                                    <div className="space-y-3">
                                        {list.map((sec) => {
                                            const subject = nonEmpty(sec.subject);
                                            const showSubject = subject && subject !== sectionTitle;

                                            return (
                                                <div
                                                    key={`${sec.type}-${sec.displayOrder}`}
                                                    className="break-inside-avoid"
                                                >
                                                    {showSubject && (
                                                        <div className="text-[12.5px] font-semibold wrap-break-word">
                                                            {subject}
                                                        </div>
                                                    )}

                                                    <div className={showSubject ? "mt-1" : ""}>
                                                        <TextBlock value={sec.content} />
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </React.Fragment>
                            );
                        })}
                    </>
                )}
            </div>
        </div>
    );
}
