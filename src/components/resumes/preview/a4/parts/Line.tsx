import { nonEmpty } from "../helpers";

export function Line({ label, value }: { label: string; value?: string | null }) {
    const v = nonEmpty(value);
    if (!v) return null;

    return (
        <div className="flex gap-2 text-[11.5px] leading-5 text-foreground">
            <div className="w-20 shrink-0 text-muted-foreground">{label}</div>
            <div className="min-w-0 flex-1 wrap-break-word">{v}</div>
        </div>
    );
}
