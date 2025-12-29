// src/features/resumes/edit/utils/rhfDirty.ts
/** react-hook-form dirtyFields가 "이 서브트리에 변경이 있는가?" */
export function isDirtyTree(d: unknown): boolean {
    if (d === true) return true;
    if (!d) return false;
    if (Array.isArray(d)) return d.some(isDirtyTree);
    if (typeof d === "object") return Object.values(d as Record<string, unknown>).some(isDirtyTree);
    return false;
}

/** dirtyFields가 true인 리프만 뽑아 nested partial을 만든다 */
export function pickDirtyObject<T extends Record<string, any>>(values: T, dirty: any): Partial<T> {
    if (!dirty || dirty === true) return values; // 통째로 dirty면 통째로 포함
    const out: any = {};
    for (const key of Object.keys(dirty)) {
        const d = dirty[key];
        if (!isDirtyTree(d)) continue;

        const v = (values as any)[key];
        if (d === true) {
            out[key] = v;
        } else if (Array.isArray(v)) {
            // 배열은 상위 레벨에서 정책적으로 처리하는 편이 안전하므로,
            // 여기서는 그냥 values 전체를 넣게 하지 말고 호출부에서 처리하게 둠.
            out[key] = v;
        } else if (v && typeof v === "object") {
            out[key] = pickDirtyObject(v, d);
        } else {
            out[key] = v;
        }
    }
    return out;
}
