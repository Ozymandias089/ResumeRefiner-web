"use client";

import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { formatMDHM } from "@/lib/datetime";

export type ReviewSummaryRow = {
    reviewId: number;
    title: string;
    slug: string;
    resumeVersion: number;
    createdAt: string;
};

export function ReviewsTableBase(props: {
    reviews: ReviewSummaryRow[];
    showCreatedAt?: boolean;
    onRowClickAction?: (review: ReviewSummaryRow) => void;
    renderAction?: (r: ReviewSummaryRow) => React.ReactNode;
    actionsHeader?: React.ReactNode;
}) {
    const clickable = !!props.onRowClickAction;

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>제목</TableHead>
                    <TableHead className="hidden md:table-cell">이력서</TableHead>
                    <TableHead className="hidden text-right md:table-cell">버전</TableHead>

                    {props.showCreatedAt !== false && (
                        <TableHead className="hidden text-right md:table-cell">생성일</TableHead>
                    )}

                    <TableHead className="text-right">{props.actionsHeader ?? "액션"}</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {props.reviews.map((r) => (
                    <TableRow
                        key={r.reviewId}
                        className={clickable ? "cursor-pointer" : ""}
                        onClick={clickable ? () => props.onRowClickAction?.(r) : undefined}
                    >
                        <TableCell className="max-w-[280px] truncate font-medium">
                            {r.title}
                        </TableCell>

                        <TableCell className="hidden max-w-[240px] truncate text-muted-foreground md:table-cell">
                            {r.slug}
                        </TableCell>

                        <TableCell className="hidden text-right text-xs text-muted-foreground md:table-cell">
                            v{r.resumeVersion}
                        </TableCell>

                        {props.showCreatedAt !== false && (
                            <TableCell className="hidden text-right text-xs text-muted-foreground md:table-cell">
                                {formatMDHM(r.createdAt)}
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
