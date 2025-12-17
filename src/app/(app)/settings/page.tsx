"use client";

import { IconUserCircle, IconShieldLock } from "@tabler/icons-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SettingsPage() {
    return (
        <div className="px-4 lg:px-6">
            <h1 className="text-2xl font-semibold mb-6">설정</h1>

            <div className="grid gap-4 md:grid-cols-2">
                <Link href="/settings/profile">
                    <Card className="hover:bg-muted/50 transition cursor-pointer">
                        <CardHeader className="flex flex-row items-center gap-3">
                            <IconUserCircle className="size-6" />
                            <CardTitle>프로필</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground">
                            이름, 이메일, 프로필 사진을 관리합니다.
                        </CardContent>
                    </Card>
                </Link>

                <Link href="/settings/security">
                    <Card className="hover:bg-muted/50 transition cursor-pointer">
                        <CardHeader className="flex flex-row items-center gap-3">
                            <IconShieldLock className="size-6" />
                            <CardTitle>보안</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground">
                            비밀번호 변경 및 계정 보안 설정
                        </CardContent>
                    </Card>
                </Link>
            </div>
        </div>
    );
}
