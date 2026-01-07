import { ReviewTone, CareerStage } from "@/features/reviews/types/enums";

export const TONE_LABEL: Record<ReviewTone, string> = {
    [ReviewTone.PROFESSIONAL]: "프로페셔널(기본)",
    [ReviewTone.NEUTRAL]: "중립",
    [ReviewTone.FORMAL]: "격식",
};

export const STAGE_LABEL: Record<CareerStage, string> = {
    [CareerStage.UNKNOWN]: "미지정",
    [CareerStage.STUDENT]: "학생/취준",
    [CareerStage.ENTRY]: "신입(주니어)",
    [CareerStage.MID]: "미들",
    [CareerStage.SENIOR]: "시니어",
    [CareerStage.LEAD]: "리드/매니저",
};

export const FOCUS_OPTIONS = [
    { key: "backend", label: "백엔드 역량" },
    { key: "performance", label: "성능/최적화" },
    { key: "collaboration", label: "협업/커뮤니케이션" },
    { key: "problem_solving", label: "문제 해결" },
    { key: "architecture", label: "설계/아키텍처" },
    { key: "writing", label: "문서화/정리" },
] as const;

export type FocusKey = (typeof FOCUS_OPTIONS)[number]["key"];
