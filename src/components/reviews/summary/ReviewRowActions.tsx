"use client";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconDotsVertical, IconFileText, IconExternalLink, IconTrash } from "@tabler/icons-react";
import { useReviewActions } from "@/features/reviews/hooks/useReviews";

export function ReviewRowActions(props: {
    reviewId: number;
    slug: string;
    title: string;
    onOpenAction: () => void;
    onOpenResumeAction: () => void;
}) {
    const actions = useReviewActions(props.slug);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="리뷰 액션">
                    <IconDotsVertical className="size-4" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={props.onOpenAction}>
                    <IconFileText className="mr-2 size-4" />
                    리뷰 열기
                </DropdownMenuItem>

                <DropdownMenuItem onClick={props.onOpenResumeAction}>
                    <IconExternalLink className="mr-2 size-4" />
                    이력서로 이동
                </DropdownMenuItem>

                <DropdownMenuItem
                    onClick={() => actions.remove(props.reviewId)}
                    disabled={actions.isRemoving}
                    className="text-destructive focus:text-destructive"
                >
                    <IconTrash className="mr-2 size-4" />
                    삭제
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
