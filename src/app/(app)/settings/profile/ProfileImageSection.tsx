"use client";

import { MemberDetails } from "@/features/profile/types/api";
import { useProfileMutations } from "@/features/profile/hooks/useProfileMutations";
import { toast } from "sonner";
import * as React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

type Props = {
    profile: MemberDetails;
};

export function ProfileImageSection({ profile }: Props) {
    const { uploadProfileImage, isUploadingProfileImage } = useProfileMutations();
    const fileRef = React.useRef<HTMLInputElement | null>(null);

    const onPick = () => fileRef.current?.click();

    return (
        <Card className="max-w-2xl">
            <CardHeader>
                <CardTitle>프로필 사진</CardTitle>
            </CardHeader>

            <CardContent className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16 rounded-full">
                        <AvatarImage
                            src={profile.profileImageUrl ?? "/avatar-placeholder.png"}
                            alt={profile.name}
                        />
                        <AvatarFallback>
                            {profile.name?.slice(0, 1)?.toUpperCase() ?? "U"}
                        </AvatarFallback>
                    </Avatar>

                    <div className="leading-tight">
                        <div className="font-medium">{profile.name}</div>
                        <div className="text-sm text-muted-foreground">@{profile.handle}</div>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <input
                        ref={fileRef}
                        type="file"
                        accept="image/*"
                        hidden
                        disabled={isUploadingProfileImage}
                        onChange={async (e) => {
                            const file = e.target.files?.[0];
                            // 같은 파일 재선택 가능하도록 초기화
                            e.currentTarget.value = "";
                            if (!file) return;

                            try {
                                await uploadProfileImage(file);
                                toast.success("프로필 사진이 변경되었습니다.");
                            } catch (err: unknown) {
                                const msg =
                                    typeof err === "object" && err && "message" in err
                                        ? (err as any).message
                                        : null;
                                toast.error(msg ?? "이미지 업로드에 실패했습니다.");
                            }
                        }}
                    />

                    <Button
                        type="button"
                        variant="outline"
                        onClick={onPick}
                        disabled={isUploadingProfileImage}
                    >
                        {isUploadingProfileImage ? "업로드 중..." : "사진 변경"}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
