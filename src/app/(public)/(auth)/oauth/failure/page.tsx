// src/app/(public)/(auth)/oauth/failure/page.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function OAuthFailurePage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // 선택: 백엔드가 ?reason=... 같은 걸 붙여주면 표시
    const reason = searchParams.get("reason");

    return (
        <div className="min-h-[60vh] flex items-center justify-center p-6">
            <div className="w-full max-w-md rounded-lg border bg-background p-6 shadow-sm">
                <h1 className="text-xl font-semibold">로그인에 실패했어요</h1>
                <p className="mt-2 text-sm text-muted-foreground">
                    OAuth 인증 과정에서 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.
                </p>

                {reason && (
                    <div className="mt-4 rounded-md border bg-muted/40 p-3 text-sm">
                        <div className="font-medium">사유</div>
                        <div className="mt-1 wrap-break-word text-muted-foreground">{reason}</div>
                    </div>
                )}

                <div className="mt-6 flex gap-2">
                    <button
                        type="button"
                        className="inline-flex h-9 items-center justify-center rounded-md border px-4 text-sm font-medium hover:bg-accent"
                        onClick={() => router.replace("/")}
                    >
                        랜딩으로 돌아가기
                    </button>

                    <button
                        type="button"
                        className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:opacity-90"
                        onClick={() => router.replace("/login")}
                    >
                        다시 로그인
                    </button>
                </div>
            </div>
        </div>
    );
}
