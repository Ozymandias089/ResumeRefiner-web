"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
    DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter, AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useDeleteResume } from "@/features/resumes/hooks/useDeleteResume";

function KebabIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
            <circle cx="12" cy="5" r="1.8" />
            <circle cx="12" cy="12" r="1.8" />
            <circle cx="12" cy="19" r="1.8" />
        </svg>
    );
}

export function ResumeRowActions(props: {
    slug: string;
    title: string;
    onOpenAction: () => void;
    onEditHref?: string; // 나중에 수정 페이지 생기면 사용
}) {
    const [deleteOpen, setDeleteOpen] = useState(false);
    const del = useDeleteResume();

    const isDeleting = del.isPending;

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        aria-label="이력서 액션"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <KebabIcon className="h-5 w-5" />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                    align="end"
                    onClick={(e) => e.stopPropagation()}
                >
                    <DropdownMenuLabel>액션</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                        onClick={(e) => {
                            e.stopPropagation();
                            props.onOpenAction();
                        }}
                    >
                        열기
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        disabled
                        onClick={(e) => {
                            e.stopPropagation();
                            // TODO: 수정 기능 들어오면 여기 연결
                        }}
                    >
                        수정(준비 중)
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={(e) => {
                            e.stopPropagation();
                            setDeleteOpen(true);
                        }}
                    >
                        삭제
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
                <AlertDialogContent onClick={(e) => e.stopPropagation()}>
                    <AlertDialogHeader>
                        <AlertDialogTitle>이력서를 삭제할까요?</AlertDialogTitle>
                        <AlertDialogDescription>
                            <span className="font-medium">{props.title}</span> 이력서를 삭제합니다.
                            이 작업은 되돌릴 수 없습니다.
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                        <AlertDialogCancel
                            disabled={isDeleting}
                            onClick={(e) => e.stopPropagation()}
                        >
                            취소
                        </AlertDialogCancel>

                        <AlertDialogAction
                            disabled={isDeleting}
                            onClick={(e) => {
                                e.stopPropagation();
                                del.mutate(props.slug, {
                                    onSuccess: () => setDeleteOpen(false),
                                });
                            }}
                        >
                            {isDeleting ? "삭제 중..." : "삭제"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
