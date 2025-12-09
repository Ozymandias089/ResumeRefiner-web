"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function AuthResultPage() {
  const searchParams = useSearchParams();
  const flow = searchParams.get("flow"); // "signup" | "login" | null

  const router = useRouter();

  const isSignup = flow === "signup";
  const isLogin = flow === "login";

  const title = isSignup
    ? "회원가입이 완료되었습니다."
    : isLogin
    ? "로그인에 성공했습니다."
    : "인증이 완료되었습니다.";

  const description = isSignup
    ? "이제 ResumeRefiner의 기능을 바로 이용할 수 있습니다."
    : isLogin
    ? "이제 ResumeRefiner 대시보드로 이동할 수 있습니다."
    : "인증 상태를 확인했습니다.";

      const handleLogout = async () => {
    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

      await fetch(`${baseUrl}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      // 로그아웃 후 개발용 스텁 페이지로 이동
      router.push("/auth/result?flow=logout");
    } catch (error) {
      console.error("Logout failed", error);
      router.push("/auth/result?flow=logout");
    }
  };

  return (
    <div className="min-h-screen bg-muted flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-xl text-center">{title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <p className="text-sm text-muted-foreground">{description}</p>
          <div className="flex flex-col gap-3 mt-4">
            <Button asChild>
              <Link href="/dashboard">대시보드로 이동</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/">랜딩 페이지로 돌아가기</Link>
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              로그아웃
            </Button>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            ※ 현재 페이지는 개발 단계에서 인증 성공 여부를 확인하기 위한 스텁 페이지입니다.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
