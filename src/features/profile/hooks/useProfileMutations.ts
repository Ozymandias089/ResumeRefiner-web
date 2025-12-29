"use client"

import { useCallback, useState } from "react";
import { profileApi } from "@/features/profile/api";
import { currentUserStore } from "@/features/auth/current-user-store";
import {
    ChangePasswordRequest,
    ChangeProfileInfoRequest,
    MemberDetails,
    UploadProfileImageResponse
} from "@/features/profile/types/api";
import { profileStore } from "../profile-store";

type MutationState = {
    isUpdatingProfile: boolean;
    isUploadingProfileImage: boolean;
    isDeletingProfileImage: boolean;
    isChangingPassword: boolean;
    error: unknown;
};

export function useProfileMutations() {
    const [state, setState] = useState<MutationState>({
        isUpdatingProfile : false,
        isUploadingProfileImage: false,
        isDeletingProfileImage: false,
        isChangingPassword: false,
        error: null,
    });

    const setLoading = (key: keyof MutationState, value: boolean) => {
        setState((prev) => ({ ...prev, [key]: value }));
    };

    const setError = (error: unknown) => {
        setState((prev) => ({ ...prev, error}));
    };

    /**
     * PATCH /api/profile
     * 응답: MemberDetails (GET /api/profile과 동일)
     */
    const updateProfile = useCallback(
        async (payload: ChangeProfileInfoRequest): Promise<MemberDetails> => {
            setLoading("isUpdatingProfile", true);
            setError(null);

            try {
                const updated = await profileApi.updateProfile(payload);

                // 헤더/사이드바 등 전역 유저 상태도 최신화
                // (currentUserStore가 내부적으로 /api/auth/me를 치든 /api/profile을 치든 상관없음)
                await currentUserStore.refresh();
                await profileStore.refresh();

                return updated;
            } catch (e) {
                setError(e);
                throw e;
            } finally {
                setLoading("isUpdatingProfile", false);
            }
        },
        []
    );

    /**
     * POST /api/media/profile-image (multipart)
     * 응답: UploadProfileImageResponseDTO { profileImageUrl, fileId }
     */
    const uploadProfileImage = useCallback(
        async (file: File): Promise<UploadProfileImageResponse> => {
            setLoading("isUploadingProfileImage", true);
            setError(null);

            try {
                const res = await profileApi.uploadProfileImage(file);

                // 전역 상태 갱신 (아바타/프로필 이미지 반영)
                await currentUserStore.refresh();
                await profileStore.refresh();

                return res;
            } catch (e) {
                setError(e);
                throw e;
            } finally {
                setLoading("isUploadingProfileImage", false);
            }
        },
        []
    );

    const deleteProfileImage = useCallback(async (): Promise<void> => {
        setLoading("isDeletingProfileImage", true);
        setError(null);

        try {
            await profileApi.deleteProfileImage();

            // 전역 상태 갱신 (아바타/프로필 이미지 제거 반영)
            await currentUserStore.refresh();
            await profileStore.refresh();
        } catch (e) {
            setError(e);
            throw e;
        } finally {
            setLoading("isDeletingProfileImage", false);
        }
    }, []);

    /**
     * PATCH /api/profile/password
     * 응답: ChangePasswordResponseDTO { message }
     */
    const changePassword = useCallback(
        async (payload: ChangePasswordRequest): Promise<{ message: string }> => {
            setLoading("isChangingPassword", true);
            setError(null);

            try {
                const res = await profileApi.changePassword(payload);

                // 비밀번호 변경은 보통 currentUser 갱신이 꼭 필요하진 않지만,
                // 세션 정책에 따라 갱신/재로그인 요구가 있을 수 있으니 필요하면 여기서 처리.
                return res;
            } catch (e) {
                setError(e);
                throw e;
            } finally {
                setLoading("isChangingPassword", false);
            }
        },
        []
    );

    return {
        // actions
        updateProfile,
        uploadProfileImage,
        deleteProfileImage,
        changePassword,

        // flags
        isUpdatingProfile: state.isUpdatingProfile,
        isUploadingProfileImage: state.isUploadingProfileImage,
        isDeletingProfileImage: state.isDeletingProfileImage,
        isChangingPassword: state.isChangingPassword,

        // error
        error: state.error,

        // helpers
        clearError: () => setError(null),
    };
};