"use client";

import { AppLogo } from "@/components/app-logo";

export function LandingLeftSection() {
  return (
    <section className="relative flex-1 flex flex-col justify-center px-12 md:px-20">
      {/* Logo - top-left */}
      <div className="absolute top-8 left-12 md:left-20">
        <AppLogo size="lg" />
      </div>

      {/* Hero */}
      <div className="max-w-lg space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          당신의 이력서를
          <br />
          <span className="text-primary">단 5분 만에 개선</span>해보세요.
        </h1>

        <p className="text-muted-foreground text-base md:text-lg">
          AI가 문장 단위로 분석하여 더 강력한 이력서를 만들어드립니다.
          <br />
          지금 바로 업계 기준에 맞춘 리뷰를 받아보세요.
        </p>
      </div>
    </section>
  );
}
