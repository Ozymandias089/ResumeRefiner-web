"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import {AppShell} from "@/app/(app)/_app-shell";

export default function AppLayoutClient({
                                            children,
                                        }: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const { user, isLoading, hasLoaded } = useCurrentUser();

    useEffect(() => {
        if (hasLoaded && !isLoading && !user) {
            router.replace("/"); // (public) 랜딩
        }
    }, [hasLoaded, isLoading, user, router]);

    // 🔑 아직 판정 중 → 로딩 화면
    if (!hasLoaded || isLoading) {
        return (
            <div className="flex h-screen items-center justify-center text-muted-foreground">
                Loading...
            </div>
        );
    }

    // 🔑 로그인 안 됨 → 리다이렉트 중 화면
    if (!user) {
        return (
            <div className="flex h-screen items-center justify-center text-muted-foreground">
                Redirecting...
            </div>
        );
    }

    // ✅ 로그인 됐을 때만 앱 렌더
    return <AppShell>{children}</AppShell>;
}
