"use client";

import { MemberDetails } from "@/features/profile/types/api";
import { useProfileMutations } from "@/features/profile/hooks/useProfileMutations";
import { toast } from "sonner";
import * as React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type Props = {
    profile: MemberDetails;
};

export function ProfileImageSection({ profile }: Props) {
    const {
        uploadProfileImage,
        deleteProfileImage,
        isUploadingProfileImage,
        isDeletingProfileImage,
    } = useProfileMutations();

    const fileRef = React.useRef<HTMLInputElement | null>(null);

    const hasImage = Boolean(profile.profileImageUrl);
    const isBusy = isUploadingProfileImage || isDeletingProfileImage;

    const onPick = () => fileRef.current?.click();

    const onConfirmDelete = async () => {
        try {
            await deleteProfileImage();
            toast.success("프로필 사진이 삭제되었습니다.");
        } catch (err: unknown) {
            const msg =
                typeof err === "object" && err && "message" in err ? (err as any).message : null;
            toast.error(msg ?? "프로필 사진 삭제에 실패했습니다.");
        }
    };

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
                    {/* 파일 선택 */}
                    <input
                        ref={fileRef}
                        type="file"
                        accept="image/*"
                        hidden
                        disabled={isBusy}
                        onChange={async (e) => {
                            const file = e.target.files?.[0];
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

                    <Button type="button" variant="outline" onClick={onPick} disabled={isBusy}>
                        {isUploadingProfileImage ? "업로드 중..." : "사진 변경"}
                    </Button>

                    {/* 삭제 AlertDialog */}
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                                type="button"
                                variant="ghost"
                                disabled={!hasImage || isBusy}
                                title={!hasImage ? "삭제할 프로필 사진이 없습니다." : undefined}
                            >
                                {isDeletingProfileImage ? "삭제 중..." : "삭제"}
                            </Button>
                        </AlertDialogTrigger>

                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>프로필 사진 삭제</AlertDialogTitle>
                                <AlertDialogDescription>
                                    프로필 사진을 삭제하면 기본 아바타로 표시됩니다.
                                    <br />
                                    정말 삭제하시겠습니까?
                                </AlertDialogDescription>
                            </AlertDialogHeader>

                            <AlertDialogFooter>
                                <AlertDialogCancel disabled={isDeletingProfileImage}>
                                    취소
                                </AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={onConfirmDelete}
                                    disabled={isDeletingProfileImage}
                                >
                                    삭제
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </CardContent>
        </Card>
    );
}
