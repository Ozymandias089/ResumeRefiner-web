import {
    CreateReviewRequest,
    CreateReviewResponse,
    GetReviewDetailResponse,
    GetReviewPageResponse
} from "@/features/reviews/types/type";
import { apiFetch, ApiResponseMeta } from "@/shared/api/client";

export type GetReviewPageParams = {
    page?: number;
    size?: number;
};

function buildPageQs(params: GetReviewPageParams = {}) {
    const { page = 0, size = 20 } = params;

    const qs = new URLSearchParams();
    qs.set("page", String(page));
    qs.set("size", String(size));
    return qs.toString();
}

export const reviewApi = {
    /**
     * 생성: POST /api/resumes/{slug}/reviews
     *
     * 백엔드가 Location 헤더를 주는 스타일이면 meta로 slug 추출 가능.
     * (현재 CreateReviewResponseDTO를 내려주므로, 응답 바디로 받는 버전을 기본으로 둠)
     */
    postReview(slug: string, payload: CreateReviewRequest = {}): Promise<CreateReviewResponse> {
        return apiFetch<CreateReviewResponse>(
            `/api/resumes/${encodeURIComponent(slug)}/reviews`,
            { method: "POST", json: payload }
        );
    },

    /**
     * (옵션) 생성 + Location header 활용 버전
     * - 서버가 201 + Location만 주는 형태로 바뀌면 이 함수 쓰면 됨
     */
    async postReviewMeta(
        slug: string,
        payload: CreateReviewRequest = {}
    ): Promise<{ location: string }> {
        const meta: ApiResponseMeta<void> = await apiFetch(
            `/api/resumes/${encodeURIComponent(slug)}/reviews`,
            { method: "POST", json: payload, meta: true }
        );

        const location = meta.headers.get("Location");
        if (!location) throw new Error("Location header missing");
        return { location };
    },

    /**
     * 삭제: DELETE /api/resumes/{slug}/reviews/{reviewId}
     */
    deleteReview(slug: string, reviewId: number): Promise<void> {
        return apiFetch<void>(
            `/api/resumes/${encodeURIComponent(slug)}/reviews/${reviewId}`,
            { method: "DELETE" }
        );
    },

    /**
     * 내 전체 리뷰 최신 목록 조회
     * GET /api/reviews?page=0&size=20
     */
    getMyReviews(params: GetReviewPageParams = {}): Promise<GetReviewPageResponse> {
        const qs = buildPageQs(params);
        return apiFetch<GetReviewPageResponse>(`/api/reviews?${qs}`, { method: "GET" });
    },

    /**
     * 특정 이력서의 리뷰 최신 목록 조회
     * GET /api/resumes/{slug}/reviews?page=0&size=20
     */
    getResumeReviews(slug: string, params: GetReviewPageParams = {}): Promise<GetReviewPageResponse> {
        const qs = buildPageQs(params);
        return apiFetch<GetReviewPageResponse>(
            `/api/resumes/${encodeURIComponent(slug)}/reviews?${qs}`,
            { method: "GET" }
        );
    },

    /**
     * 특정 이력서의 가장 최신 리뷰 간단 조회
     * GET /api/resumes/{slug}/reviews/latest
     */
    getLatestReview(slug: string): Promise<CreateReviewResponse | null> {
        return apiFetch<CreateReviewResponse | null>(
            `/api/resumes/${encodeURIComponent(slug)}/reviews/latest`,
            { method: "GET" }
        );
    },

    /**
     * 특정 리뷰 상세
     * GET /api/resumes/{slug}/reviews/{reviewId}
     *
     * (네가 이미 GetReviewDetailResponseDTO를 만들었으니 보통 이 경로가 자연스러움)
     */
    getReviewDetail(slug: string, reviewId: number): Promise<GetReviewDetailResponse> {
        return apiFetch<GetReviewDetailResponse>(
            `/api/resumes/${encodeURIComponent(slug)}/reviews/${reviewId}`,
            { method: "GET" }
        );
    },
};