export const reviewKeys = {
    all: ["reviews"] as const,

    myPage: (page: number, size: number) =>
        ["reviews", "me", page, size] as const,

    resumePage: (slug: string, page: number, size: number) =>
        ["reviews", "resume", slug, page, size] as const,

    latest: (slug: string) =>
        ["reviews", "resume", slug, "latest"] as const,

    detail: (slug: string, reviewId: number) =>
        ["reviews", "resume", slug, "detail", reviewId] as const,
};
