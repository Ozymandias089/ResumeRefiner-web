// src/components/resumes/preview/ResumeA4.tsx
import React from "react";
import type {
    GetResumeResponse,
    ResumeProfileResponse,
    ResumeEducation,
    ResumeExperience,
    ResumeCustomSection,
} from "@/features/resumes/types/api";

import { langOf, UI, LABELS, CUSTOM_SECTION_ORDER } from "./a4/i18n";
import { byOrder } from "./a4/helpers";

import { ProfileHeader } from "./a4/parts/ProfileHeader";
import { ExperienceSection } from "./a4/parts/ExperienceSection";
import { EducationSection } from "./a4/parts/EducationSection";
import { MilitarySection } from "./a4/parts/MilitarySection";
import { CustomSections } from "./a4/parts/CustomSections";

export function ResumeA4({ resume }: { resume: GetResumeResponse }) {
    const lang = langOf(resume.languageCode);
    const ui = UI[lang];
    const labels = LABELS[lang];

    const profile: ResumeProfileResponse | null = resume.profile ?? null;
    const military = resume.military ?? null;

    const educations: ResumeEducation[] = [...(resume.educations ?? [])].sort(byOrder);
    const experiences: ResumeExperience[] = [...(resume.experiences ?? [])].sort(byOrder);
    const customs: ResumeCustomSection[] = [...(resume.customSections ?? [])].sort(byOrder);

    return (
        <div className="print-root">
            <div className="mb-4 print:hidden">
                <h1 className="text-xl font-semibold">{resume.title}</h1>
            </div>

            <div className="a4-page bg-background text-foreground shadow-sm print:shadow-none">
                <div className="mb-5 flex items-end justify-between">
                    <div className="text-[26px] font-bold tracking-tight leading-none">{ui.docTitle}</div>
                    <div className="text-[10.5px] text-muted-foreground" />
                </div>

                <ProfileHeader
                    profile={profile}
                    photoUrl={resume.photoUrl}
                    ui={{ profile: ui.profile, contact: ui.contact }}
                    labels={{ gender: labels.gender }}
                />

                <ExperienceSection title={ui.experience} experiences={experiences} />

                <EducationSection
                    title={ui.education}
                    educations={educations}
                    labels={{ degree: labels.degree }}
                />

                <MilitarySection
                    title={ui.military}
                    uiField={ui.field}
                    labels={{
                        status: labels.militaryStatus,
                        branch: labels.militaryBranch,
                    }}
                    military={military}
                />

                <CustomSections
                    customSections={customs}
                    labels={labels}
                    order={CUSTOM_SECTION_ORDER}
                />
            </div>
        </div>
    );
}
