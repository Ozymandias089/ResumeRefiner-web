"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { FieldDescription } from "../ui/field";

export function SignupBox() {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const handleSignupClick = () => {
    if (!email) {
      return; // 필요시 에러 메시지 표시
    }
    router.push(`/signup?email=${encodeURIComponent(email)}`);
  };

  return (
    <div className="w-full max-w-sm mx-auto space-y-6">
      {/* Title */}
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">회원가입</h2>
        <p className="text-sm text-muted-foreground">
          이메일로 가입하거나 Google 계정으로 시작하세요.
        </p>
      </div>
      {/* Email Input */}
      <div className="space-y-2">
        <Label htmlFor="email">이메일</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          className="bg-background"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      {/* Signup button */}
      <Button
        size="lg"
        className="w-full text-base font-semibold"
        onClick={handleSignupClick}
      >
        <Link href="/signup">회원가입하기</Link>
      </Button>
      {/* OR separator */}
      <div className="relative">
        <Separator className="bg-muted-foreground/20" />
        <span className="absolute inset-0 flex items-center justify-center text-xs text-muted-foreground bg-muted/40 px-2">
          Or continue with
        </span>
      </div>
      {/* Social login (Google) */}
      <Button
        size="lg"
        variant="outline"
        className="w-full text-base font-semibold flex items-center gap-2"
      >
        <svg
          className="h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
            fill="currentColor"
          />
        </svg>
        Google
      </Button>
      <FieldDescription className="px-6 text-center">
        계속 진행하면, <a href="#">서비스 이용약관</a>과{" "}
        <a href="#">개인정보 처리방침</a>에 동의하는 것으로 간주됩니다.
      </FieldDescription>
    </div>
  );
}
