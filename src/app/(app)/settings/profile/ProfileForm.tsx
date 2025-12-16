"use client";

import { MemberDetails } from "@/features/profile/types/api";
import { useProfileMutations } from "@/features/profile/hooks/useProfileMutations";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type Props = {
    profile: MemberDetails;
};

export function ProfileForm({ profile }: Props) {
    const { updateProfile, isUpdatingProfile } = useProfileMutations();

    const [name, setName] = useState(profile.name);
    const [email, setEmail] = useState(profile.email);

    const isDirty = useMemo(() => {
        return name !== profile.name || email !== profile.email;
    }, [name, email, profile.name, profile.email]);

    const onCancel = () => {
        setName(profile.name);
        setEmail(profile.email);
        toast.message("변경사항을 취소했습니다.");
    };

    const onSave = async () => {
        if (!isDirty) return;

        // 프런트 최소 검증(UX용)
        if (!name.trim()) {
            toast.error("이름을 입력해 주세요.");
            return;
        }
        if (!email.trim()) {
            toast.error("이메일을 입력해 주세요.");
            return;
        }

        try {
            await updateProfile({
                name: name !== profile.name ? name : undefined,
                email: email !== profile.email ? email : undefined,
            });
            toast.success("프로필 정보가 저장되었습니다.");
            // 여기서 profile이 query로 다시 refetch되면 state도 맞춰질 텐데,
            // 혹시 refetch가 느리면 낙관적으로 그대로 둬도 됨.
        } catch (err: unknown) {
            const msg =
                typeof err === "object" && err && "message" in err
                    ? (err as any).message
                    : null;
            toast.error(msg ?? "저장에 실패했습니다.");
        }
    };

    return (
        <Card className="max-w-2xl">
            <CardHeader>
                <CardTitle>프로필 정보</CardTitle>
            </CardHeader>

            <CardContent className="space-y-5">
                <div className="space-y-2">
                    <Label htmlFor="name">이름</Label>
                    <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoComplete="name"
                        disabled={isUpdatingProfile}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email">이메일</Label>
                    <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                        disabled={isUpdatingProfile}
                    />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onCancel}
                        disabled={isUpdatingProfile || !isDirty}
                    >
                        취소
                    </Button>
                    <Button
                        type="button"
                        onClick={onSave}
                        disabled={isUpdatingProfile || !isDirty}
                    >
                        {isUpdatingProfile ? "저장 중..." : "저장"}
                    </Button>
                </div>

                {!isDirty ? (
                    <div className="text-xs text-muted-foreground">
                        변경된 내용이 없습니다.
                    </div>
                ) : null}
            </CardContent>
        </Card>
    );
}
