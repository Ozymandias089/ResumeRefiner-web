// src/components/resumes/preview/a4/parts/EducationSection.tsx
import type { ResumeEducation } from "@/features/resumes/types/api";
import { SectionTitle } from "./SectionTitle";
import { TextBlock } from "./TextBlock";
import { nonEmpty } from "../helpers";

export function EducationSection(props: {
    title: string;
    educations: ResumeEducation[];
    labels: {
        degree: Record<string, string>;
    };
}) {
    const { title, educations, labels } = props;
    if (!educations.length) return null;

    return (
        <>
            <SectionTitle>{title}</SectionTitle>

            <div className="space-y-3">
                {educations.map((edu, idx) => (
                    <div key={`edu:${edu.displayOrder}:${idx}`} className="break-inside-avoid">
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
    );
}
