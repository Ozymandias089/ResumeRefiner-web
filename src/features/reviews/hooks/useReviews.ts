"use client";

import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { reviewKeys } from "./reviewKeys";
import {reviewApi} from "@/features/reviews/api";
import {CreateReviewRequest} from "@/features/reviews/types/type";

/**
 * 페이지네이션을 컴포넌트에서 들고 있지 않게 해주는 내부 유틸.
 * - next/prev만 호출하면 됨
 */
function usePager(defaults?: { page?: number; size?: number }) {
    const [page, setPage] = useState(defaults?.page ?? 0);
    const [size, setSize] = useState(defaults?.size ?? 20);

    const next = () => setPage((p) => p + 1);
    const prev = () => setPage((p) => Math.max(0, p - 1));
    const reset = () => setPage(0);

    return { page, size, setPage, setSize, next, prev, reset };
}

/**
 * 내 리뷰 목록 (페이지네이션 내장)
 * 컴포넌트: const my = useMyReviews();
 */
export function useMyReviews(defaults?: { page?: number; size?: number }) {
    const pager = usePager(defaults);

    const query = useQuery({
        queryKey: reviewKeys.myPage(pager.page, pager.size),
        queryFn: () => reviewApi.getMyReviews({ page: pager.page, size: pager.size }),
    });

    const hasPrev = query.data?.hasPrev ?? pager.page > 0;
    const hasNext = query.data?.hasNext ?? false;

    return {
        ...pager,
        ...query,
        hasPrev,
        hasNext,
        next: () => hasNext && pager.next(),
        prev: () => hasPrev && pager.prev(),
        reviews: query.data?.reviews ?? [],
        totalElements: query.data?.totalElements ?? 0,
    };
}

/**
 * 특정 이력서 리뷰 목록 (페이지네이션 내장)
 * 컴포넌트: const list = useResumeReviews(slug);
 */
export function useResumeReviews(
    slug: string,
    defaults?: { page?: number; size?: number }
) {
    const pager = usePager(defaults);

    const query = useQuery({
        queryKey: reviewKeys.resumePage(slug, pager.page, pager.size),
        queryFn: () => reviewApi.getResumeReviews(slug, { page: pager.page, size: pager.size }),
        enabled: !!slug,
    });

    const hasPrev = query.data?.hasPrev ?? pager.page > 0;
    const hasNext = query.data?.hasNext ?? false;

    return {
        slug,
        ...pager,
        ...query,
        hasPrev,
        hasNext,
        next: () => hasNext && pager.next(),
        prev: () => hasPrev && pager.prev(),
        reviews: query.data?.reviews ?? [],
        totalElements: query.data?.totalElements ?? 0,
    };
}

/**
 * 특정 이력서 최신 리뷰
 * 컴포넌트: const latest = useLatestReview(slug);
 */
export function useLatestReview(
    slug: string,
    opts?: { refetchInterval?: number }
) {
    const query = useQuery({
        queryKey: reviewKeys.latest(slug),
        queryFn: () => reviewApi.getLatestReview(slug),
        enabled: !!slug,
        refetchInterval: opts?.refetchInterval,
    });

    return {
        ...query,
        latest: query.data ?? null,
    };
}

/**
 * 리뷰 상세
 * 컴포넌트: const detail = useReviewDetail(slug, reviewId);
 */
export function useReviewDetail(slug: string, reviewId: number) {
    const query = useQuery({
        queryKey: reviewKeys.detail(slug, reviewId),
        queryFn: () => reviewApi.getReviewDetail(slug, reviewId),
        enabled: !!slug && !!reviewId,
    });

    return {
        ...query,
        detail: query.data,
    };
}

/**
 * 특정 이력서에 대한 리뷰 액션(생성/삭제) 모음 훅
 * 컴포넌트에서 TS 코드 최소화:
 *   const actions = useReviewActions(slug);
 *   <Button onClick={() => actions.create()} />
 */
export function useReviewActions(slug: string) {
    const qc = useQueryClient();

    const createMut = useMutation({
        mutationFn: (payload?: CreateReviewRequest) => reviewApi.postReview(slug, payload ?? {}),
        onSuccess: async () => {
            await qc.invalidateQueries({ queryKey: reviewKeys.latest(slug) });
            await qc.invalidateQueries({ queryKey: reviewKeys.all });
        },
    });

    const deleteMut = useMutation({
        mutationFn: (reviewId: number) => reviewApi.deleteReview(slug, reviewId),
        onSuccess: async () => {
            await qc.invalidateQueries({ queryKey: reviewKeys.latest(slug) });
            await qc.invalidateQueries({ queryKey: reviewKeys.all });
        },
    });

    return useMemo(
        () => ({
            // "호출만" 하면 되도록 래핑
            create: (payload?: CreateReviewRequest) => createMut.mutate(payload),
            createAsync: (payload?: CreateReviewRequest) => createMut.mutateAsync(payload),

            remove: (reviewId: number) => deleteMut.mutate(reviewId),
            removeAsync: (reviewId: number) => deleteMut.mutateAsync(reviewId),

            isCreating: createMut.isPending,
            isRemoving: deleteMut.isPending,

            createError: createMut.error,
            removeError: deleteMut.error,
        }),
        [createMut, deleteMut]
    );
}
