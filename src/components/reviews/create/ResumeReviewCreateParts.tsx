"use client";

import { Button } from "@/components/ui/button";

export function CreateHeaderActions(props: { onGoListAction: () => void }) {
    return (
        <Button variant="secondary" size="sm" onClick={props.onGoListAction}>
            목록
        </Button>
    );
}
