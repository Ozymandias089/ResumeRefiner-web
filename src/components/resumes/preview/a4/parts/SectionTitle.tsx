import React from "react";

export function SectionTitle({ children }: { children: React.ReactNode }) {
    return (
        <div className="mt-6 mb-2 flex items-center gap-3">
            <h2 className="text-[13px] font-semibold tracking-wide text-foreground">{children}</h2>
            <div className="h-px flex-1 bg-border" />
        </div>
    );
}
