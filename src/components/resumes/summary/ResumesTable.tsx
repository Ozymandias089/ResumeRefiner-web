"use client";

import { useRouter } from "next/navigation";
import { ResumesTableBase, type ResumeSummaryRow } from "@/components/resumes/summary/ResumesTableBase";
import {ResumeRowActions} from "@/components/resumes/summary/ResumesRowAction";

export function ResumesTable(props: { resumes: ResumeSummaryRow[] }) {
    const router = useRouter();

    return (
        <ResumesTableBase
            resumes={props.resumes}
            showUpdatedAt={true}
            onRowClick={(slug) => router.push(`/resumes/${slug}`)}
            renderActions={(r) => (
                <ResumeRowActions
                    slug={r.slug}
                    title={r.title}
                    onOpen={() => router.push(`/resumes/${r.slug}`)}
                />
            )}
            actionsHeader={null} // 헤더 비워도 되고 " "로 둬도 됨
        />
    );
}
