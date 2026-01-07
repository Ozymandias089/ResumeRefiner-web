"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import React from "react";
import { FieldDescription } from "../ui/field";
import {GoogleLoginButton} from "@/components/auth/GoogleLoginButton";

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
      >회원가입하기</Button>

      {/* OR separator */}
      <div className="relative">
        <Separator className="bg-muted-foreground/20" />
        <span className="absolute inset-0 flex items-center justify-center text-xs text-muted-foreground bg-muted/40 px-2">
          Or continue with
        </span>
      </div>
      {/* Social login (Google) */}
      <GoogleLoginButton label="Google로 로그인" />

      <FieldDescription className="px-6 text-center">
        계속 진행하면, <a href="/terms">서비스 이용약관</a>과{" "}
        <a href="/privacy">개인정보 처리방침</a>에 동의하는 것으로 간주됩니다.
      </FieldDescription>
    </div>
  );
}
