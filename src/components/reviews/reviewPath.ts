export function normalizeReviewBasePath(slug: string, basePath?: string) {
    return basePath?.trim() || `/resumes/${slug}/reviews`;
}

export function reviewPath(basePath: string, sub?: string) {
    if (!sub) return basePath;
    return `${basePath}/${sub}`.replace(/\/+$/, "");
}
