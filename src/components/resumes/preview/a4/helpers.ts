export const nonEmpty = (v?: string | null) => {
    const s = (v ?? "").trim();
    return s.length ? s : null;
};

export const byOrder = <T extends { displayOrder: number }>(a: T, b: T) =>
    (a.displayOrder ?? 0) - (b.displayOrder ?? 0);

export function normalizeNewlines(s: string) {
    return s.replace(/\r\n/g, "\n");
}
