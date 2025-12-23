import type { ResumeExperience } from "@/features/resumes/types/api";
import { SectionTitle } from "./SectionTitle";
import { TextBlock } from "./TextBlock";
import { nonEmpty } from "../helpers";

export function ExperienceSection(props: {
    title: string;
    experiences: ResumeExperience[];
}) {
    const { title, experiences } = props;
    if (!experiences.length) return null;

    return (
        <>
            <SectionTitle>{title}</SectionTitle>

            <div className="space-y-3">
                {experiences.map((exp, idx) => (
                    <div key={`exp:${exp.displayOrder}:${idx}`} className="break-inside-avoid">
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
    );
}
