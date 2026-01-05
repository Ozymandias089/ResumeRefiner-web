import { CareerStage, ReviewTone } from "@/features/reviews/types/enums";

export type CreateReviewRequest = {
    tone?: ReviewTone | null;                 // 서버 기본값: PROFESSIONAL
    careerStage?: CareerStage | null;         // 서버 기본값: UNKNOWN
    customizationRequestJson?: string | null; // nullable
};

export type CreateReviewResponse = {
    id: number;
    resumeId: number;
    resumeVersion: number;
    sequencePerVersion: number;
    model: string;
    tone: ReviewTone;

    inputSchemaVersion: number;
    inputSnapshotJson: string;

    customRequestSchemaVersion: number | null;
    customRequestJson: string | null;

    outputSchemaVersion: number; // output 객체는 null 불가라 보통 여기들도 채워지는 구조가 깔끔
    outputJson: string;

    createdAt: string; // Instant -> ISO string (권장)
    updatedAt: string;
};

export type GetReviewDetailResponse = {
    reviewId: number;

    // 표시용 (리스트/상세 공통)
    title: string;
    slug: string;

    resumeVersion: number;
    sequencePerVersion: number;

    // Meta
    tone: ReviewTone;
    model: string;
    createdAt: string; // Instant -> ISO string 권장
    updatedAt: string;

    // input snapshot
    inputSchemaVersion: number;
    inputSnapshotJson: string;

    // customization request (optional)
    customRequestSchemaVersion: number | null;
    customRequestJson: string | null;

    // output snapshot
    outputSchemaVersion: number;
    outputJson: string;
};

export type GetReviewPageResponse = {
    reviews: ReviewListItemResponse[];
    page: number;
    size: number;
    totalElements: number;
    hasPrev: boolean;
    hasNext: boolean;
};

export type ReviewListItemResponse = {
    reviewId: number;
    title: string;
    slug: string;
    resumeVersion: number;
    createdAt: string;
};