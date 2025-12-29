import { nonEmpty, normalizeNewlines } from "../helpers";

export function TextBlock({ value }: { value?: string | null }) {
    const v0 = nonEmpty(value);
    if (!v0) return null;

    const v = normalizeNewlines(v0);
    return (
        <div className="text-[11.5px] leading-5 text-foreground whitespace-pre-line wrap-break-word">
            {v}
        </div>
    );
}
