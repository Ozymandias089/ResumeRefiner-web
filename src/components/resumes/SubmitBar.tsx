"use client";

import { Button } from "@/components/ui/button";

export function SubmitBar(props: {
    submitting: boolean;
    canSubmit: boolean;
    onSubmit: () => void;
}) {
    const { submitting, canSubmit, onSubmit } = props;

    return (
        <div className="sticky bottom-0 z-10 border-t bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60">
            <div className="mx-auto flex w-full max-w-4xl items-center justify-end gap-2 p-4">
                <Button onClick={onSubmit} disabled={!canSubmit || submitting}>
                    {submitting ? "생성 중..." : "생성"}
                </Button>
            </div>
        </div>
    );
}
