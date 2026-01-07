import { SectionTitle } from "./SectionTitle";
import { Line } from "./Line";
import type { ResumeMilitaryService } from "@/features/resumes/types/api";

export function MilitarySection(props: {
    title: string;
    uiField: { status: string; period: string; branch: string; rank: string; notes: string };
    labels: { status: Record<string, string>; branch: Record<string, string> };
    military: ResumeMilitaryService | null;
}) {
    const { title, uiField, labels, military } = props;
    if (!military) return null;

    return (
        <>
            <SectionTitle>{title}</SectionTitle>

            <div className="grid grid-cols-2 gap-x-8 gap-y-1 break-inside-avoid">
                <Line label={uiField.status} value={labels.status[military.militaryStatus]} />
                <Line label={uiField.period} value={military.period ?? null} />

                <Line label={uiField.branch} value={labels.branch[military.branch]} />
                <Line label={uiField.rank} value={military.rank ?? null} />

                <div className="col-span-2">
                    <Line label={uiField.notes} value={military.notes ?? null} />
                </div>
            </div>
        </>
    );
}
