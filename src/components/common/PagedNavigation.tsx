"use client";

import {
    Pagination, PaginationContent, PaginationItem, PaginationLink,
    PaginationNext, PaginationPrevious, PaginationEllipsis,
} from "@/components/ui/pagination";

export function PagedNavigation(props: {
    currentPage1: number;
    totalPages: number;
    hasPrev: boolean;
    hasNext: boolean;
    onGoToPage1Action: (p1: number) => void;
}) {
    const { currentPage1, totalPages, hasPrev, hasNext, onGoToPage1Action } = props;

    const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

    const window = 2;
    const start = clamp(currentPage1 - window, 1, totalPages);
    const end = clamp(currentPage1 + window, 1, totalPages);
    const arr: number[] = [];
    for (let i = start; i <= end; i++) arr.push(i);

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            if (hasPrev) onGoToPage1Action(currentPage1 - 1);
                        }}
                        aria-disabled={!hasPrev}
                        className={!hasPrev ? "pointer-events-none opacity-50" : ""}
                    />
                </PaginationItem>

                {start > 1 && (
                    <>
                        <PaginationItem>
                            <PaginationLink
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    onGoToPage1Action(1);
                                }}
                                isActive={currentPage1 === 1}
                            >
                                1
                            </PaginationLink>
                        </PaginationItem>
                        {start > 2 && (
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                        )}
                    </>
                )}

                {arr.map((p1) => (
                    <PaginationItem key={p1}>
                        <PaginationLink
                            href="#"
                            isActive={p1 === currentPage1}
                            onClick={(e) => {
                                e.preventDefault();
                                onGoToPage1Action(p1);
                            }}
                        >
                            {p1}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                {end < totalPages && (
                    <>
                        {end < totalPages - 1 && (
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                        )}
                        <PaginationItem>
                            <PaginationLink
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    onGoToPage1Action(totalPages);
                                }}
                                isActive={currentPage1 === totalPages}
                            >
                                {totalPages}
                            </PaginationLink>
                        </PaginationItem>
                    </>
                )}

                <PaginationItem>
                    <PaginationNext
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            if (hasNext) onGoToPage1Action(currentPage1 + 1);
                        }}
                        aria-disabled={!hasNext}
                        className={!hasNext ? "pointer-events-none opacity-50" : ""}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
