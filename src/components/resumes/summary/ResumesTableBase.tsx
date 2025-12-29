"use client";

import { useRouter } from "next/navigation";
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { formatMDHM } from "@/lib/datetime";

export type ResumeSummaryRow = {
    slug: string;
    title: string;
    updatedAt: string;
    reviewCount?: number;
};

export function ResumesTableBase(props: {
    resumes: ResumeSummaryRow[];
    showUpdatedAt?: boolean; // 대시보드에서 md 이상만 보여주고 싶으면 caller에서 처리
    onRowClickAction?: (slug: string) => void; // 없으면 row 클릭 없음
    renderAction?: (r: ResumeSummaryRow) => React.ReactNode;
    actionsHeader?: React.ReactNode;
}) {
    const router = useRouter();

    const onRowClick =
        props.onRowClickAction ??
        ((slug: string) => {
            // 기본 동작을 원하면 여기서 push. 싫으면 caller에서 onRowClick 안 넘기면 됨.
            router.push(`/resumes/${slug}`);
        });

    const clickable = !!props.onRowClickAction; // caller가 명시적으로 주입했을 때만 row click
    // 만약 “기본으로 row click” 원하면 위 로직 바꾸면 됨.

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>제목</TableHead>
                    {props.showUpdatedAt !== false && (
                        <TableHead className="hidden text-right md:table-cell">
                            마지막 수정
                        </TableHead>
                    )}
                    <TableHead className="text-right">
                        {props.actionsHeader ?? "액션"}
                    </TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {props.resumes.map((r) => (
                    <TableRow
                        key={r.slug}
                        className={clickable ? "cursor-pointer" : ""}
                        onClick={
                            clickable
                                ? () => onRowClick(r.slug)
                                : undefined
                        }
                    >
                        <TableCell className="max-w-[320px] truncate font-medium">
                            {r.title}
                        </TableCell>

                        {props.showUpdatedAt !== false && (
                            <TableCell className="hidden text-right text-xs text-muted-foreground md:table-cell">
                                {formatMDHM(r.updatedAt)}
                            </TableCell>
                        )}

                        <TableCell className="text-right">
                            <div onClick={(e) => e.stopPropagation()}>
                                {props.renderAction?.(r)}
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
