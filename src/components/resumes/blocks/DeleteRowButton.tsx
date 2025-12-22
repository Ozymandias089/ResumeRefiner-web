"use client";

import * as React from "react";
import { IconTrash } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

type Props = {
    disabled?: boolean;
    onClick: () => void;
    label?: string;            // 기본 "삭제"
    className?: string;
};

export function DeleteRowButton({
                                    disabled,
                                    onClick,
                                    label = "삭제",
                                    className,
                                }: Props) {
    return (
        <Button
            type="button"
            variant="destructive"
            size="sm"
            disabled={disabled}
            onClick={onClick}
            className={className}
        >
            <IconTrash className="h-4 w-4" />
            <span className="ml-2">{label}</span>
        </Button>
    );
}
