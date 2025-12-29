// src/components/resumes/preview/a4/parts/CustomSections.tsx
import React from "react";
import type { ResumeCustomSection } from "@/features/resumes/types/api";
import type { A4Labels } from "../types";
import { ResumeCustomSectionsType } from "@/features/resumes/types/enum";
import { SectionTitle } from "./SectionTitle";
import { TextBlock } from "./TextBlock";
import {useCustomSectionsView} from "@/features/resumes/hooks/useCustomSectionsView";

export function CustomSections(props: {
    customSections: ResumeCustomSection[];
    labels: A4Labels;
    order: ResumeCustomSectionsType[];
}) {
    const { customSections, labels, order } = props;

    const groups = useCustomSectionsView({ customSections, labels, order });
    if (!groups.length) return null;

    return (
        <>
            {groups.map((g) => (
                <React.Fragment key={g.type}>
                    <SectionTitle>{g.sectionTitle}</SectionTitle>

                    <div className="space-y-3">
                        {g.items.map((item) => (
                            <div key={item.key} className="break-inside-avoid">
                                {item.showSubject && (
                                    <div className="text-[12.5px] font-semibold wrap-break-word">
                                        {item.subject}
                                    </div>
                                )}

                                <div className={item.showSubject ? "mt-1" : ""}>
                                    <TextBlock value={item.content} />
                                </div>
                            </div>
                        ))}
                    </div>
                </React.Fragment>
            ))}
        </>
    );
}
