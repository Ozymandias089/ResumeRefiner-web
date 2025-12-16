"use client";

import {useProfile} from "@/features/profile/hooks/userProfile";
import {ProfileImageSection} from "@/app/settings/profile/ProfileImageSection";
import {ProfileForm} from "@/app/settings/profile/ProfileForm";

export default function ProfilePage() {
    const { profile, isLoading, error } = useProfile();

    if (isLoading && !profile) {
        return <div className="text-sm text-muted-foreground">Loading...</div>;
    }

    if (error) {
        return (
            <div className="text-sm text-destructive">
                프로필 정보를 불러오지 못했습니다.
            </div>
        );
    }

    if (!profile) return null;

    return (
        <div className="spage-y-8">
            <ProfileImageSection profile={profile} />
            <ProfileForm profile={profile} />
        </div>
    );
}