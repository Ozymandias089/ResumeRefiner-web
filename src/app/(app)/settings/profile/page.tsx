"use client";

import { useProfile } from "@/features/profile/hooks/userProfile";
import { ProfileImageSection } from "@/app/(app)/settings/profile/ProfileImageSection";
import { ProfileForm } from "@/app/(app)/settings/profile/ProfileForm";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfilePage() {
    const { profile, isLoading, error } = useProfile();

    if (isLoading && !profile) {
        return (
            <div className="px-4 lg:px-6 space-y-6">
                <div className="space-y-2">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-4 w-56" />
                </div>
                <Skeleton className="h-24 w-full max-w-2xl" />
                <Skeleton className="h-56 w-full max-w-2xl" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="px-4 lg:px-6 text-sm text-destructive">
                프로필 정보를 불러오지 못했습니다.
            </div>
        );
    }

    if (!profile) return null;

    return (
        <div className="px-4 lg:px-6 space-y-8">
            <ProfileImageSection profile={profile} />
            <ProfileForm profile={profile} />
        </div>
    );
}
