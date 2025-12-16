"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { profileApi } from "@/features/profile/api";

export default function SecurityPage() {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [loading, setLoading] = useState(false);

    const submit = async () => {
        if (!oldPassword || !newPassword || !confirm) {
            toast.error("모든 칸을 입력해 주세요.");
            return;
        }
        if (newPassword.length < 8) {
            toast.error("비밀번호는 최소 8자 이상이어야 합니다.");
            return;
        }
        if (newPassword !== confirm) {
            toast.error("새 비밀번호가 일치하지 않습니다.");
            return;
        }

        try {
            setLoading(true);
            await profileApi.changePassword({ oldPassword, newPassword });
            toast.success("비밀번호가 변경되었습니다.");
            setOldPassword("");
            setNewPassword("");
            setConfirm("");
        } catch (e: unknown) {
            const msg =
                typeof e === "object" && e && "message" in e ? (e as any).message : null;
            toast.error(msg ?? "비밀번호 변경에 실패했습니다.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="px-4 lg:px-6 max-w-xl">
            <h1 className="text-2xl font-semibold mb-6">보안</h1>

            <Card>
                <CardHeader>
                    <CardTitle>비밀번호 변경</CardTitle>
                </CardHeader>

                <CardContent>
                    <form
                        className="space-y-4"
                        onSubmit={(e) => {
                            e.preventDefault();
                            submit();
                        }}
                    >
                        <Input
                            type="password"
                            placeholder="현재 비밀번호"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            autoComplete="current-password"
                        />
                        <Input
                            type="password"
                            placeholder="새 비밀번호"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            autoComplete="new-password"
                        />
                        <Input
                            type="password"
                            placeholder="새 비밀번호 확인"
                            value={confirm}
                            onChange={(e) => setConfirm(e.target.value)}
                            autoComplete="new-password"
                        />

                        <Button
                            type="submit"
                            disabled={loading || !oldPassword || !newPassword || !confirm}
                        >
                            변경하기
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
