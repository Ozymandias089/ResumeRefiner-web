import { apiFetch } from "@/shared/api/client";
import type {
    MemberDetails,
    ChangeProfileInfoRequest,
    ChangePasswordRequest,
    ChangePasswordResponse, UploadProfileImageResponse,
} from "./types/api";

export const profileApi = {
    getProfile(): Promise<MemberDetails> {
        return apiFetch<MemberDetails>("/api/profile", {
            method: "GET",
        });
    },

    updateProfile(payload: ChangeProfileInfoRequest): Promise<MemberDetails> {
        return apiFetch<MemberDetails>("/api/profile", {
            method: "PATCH",
            json: payload,
        });
    },

    changePassword(payload: ChangePasswordRequest): Promise<ChangePasswordResponse> {
        return apiFetch<ChangePasswordResponse>("/api/profile/password", {
            method: "PATCH",
            json: payload,
        });
    },

    uploadProfileImage(file: File): Promise<UploadProfileImageResponse> {
        const formData = new FormData();
        formData.append("file", file);

        return apiFetch<UploadProfileImageResponse>("/api/media/profile-image", {
            method: "POST",
            body: formData,
        })
    },
};