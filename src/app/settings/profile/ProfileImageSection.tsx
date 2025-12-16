"use client";

import {MemberDetails} from "@/features/profile/types/api";
import {useProfileMutations} from "@/features/profile/hooks/useProfileMutations";

type Props = {
    profile: MemberDetails;
};

export function ProfileImageSection({ profile }: Props) {
    const { uploadProfileImage, isUploadingProfileImage } = useProfileMutations();

    return (
        <section>
            <h2 className="flex items-center gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={profile.profileImageUrl ?? "/avatar-placeholder.png"}
                    alt="Profile Image"
                    className="h-20 rounded-full object-cover border"
                />
                <label className="text-sm">
                    <input
                        type="file"
                        accept="image/*"
                        hidden
                        disabled={isUploadingProfileImage}
                        onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            await uploadProfileImage(file);
                        }}
                    />
                    <span className="cursor-pointer underline text-muted-foreground">
                        {isUploadingProfileImage ? "Uploading..." : "Change Image"}
                    </span>
                </label>
            </h2>
        </section>
    );
}