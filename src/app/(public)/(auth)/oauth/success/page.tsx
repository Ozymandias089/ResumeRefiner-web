"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { currentUserStore } from "@/features/auth/current-user-store";

export default function OAuthSuccessPage() {
    const router = useRouter();

    useEffect(() => {
        currentUserStore.refresh().finally(() => {
            router.replace("/dashboard");
        });
    }, [router]);

    return <div className="p-6">로그인 처리 중...</div>;
}
