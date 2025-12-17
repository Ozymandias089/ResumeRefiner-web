/**
 * Profile info change API Request/Response Types
 */

/**
 * RESPONSE:
 * GET /api/profile, PATCH /api/profile
 */
export type MemberDetails = {
    id: number;
    handle: string;
    email: string;
    name: string;
    role: string;
    isActive: boolean;

    provider: string | null;
    providerUserId: string | null;

    profileImageUrl: string | null;
    credits: number;
    creditUpdatedAt: string | null; // Instant → ISO string
    resumeCount: number;
    reviewCount: number;
    createdAt: string;
    updatedAt: string;
};

/**
 * REQUEST:
 * PATCH /api/profile
 */
export type ChangeProfileInfoRequest = {
    name?: string | null;
    email?: string | null;
};

/**
 * REQUEST:
 * PATCH /api/profile/password
 */
export type ChangePasswordRequest = {
    oldPassword: string;
    newPassword: string;
};

/**
 * RESPONSE:
 * PATCH /api/profile/password
 */
export type ChangePasswordResponse = {
    message: string;
};

/**
 * RESPONSE:
 * POST /api/media/profile-image
 */
export type UploadProfileImageResponse = {
    profileImageUrl: string;
    fileId: number;
};