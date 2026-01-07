"use client";

import { Button } from "@/components/ui/button";
import { SignupBox } from "@/components/landing/signup-box";
import Link from "next/link";

export function LandingRightSection() {
  return (
    <section className="w-[40%] min-w-[320px] bg-muted/40 relative flex flex-col justify-center px-8 md:px-10">
      {/* Login Button */}
      <div className="absolute top-6 right-6">
        <Button asChild variant="ghost" size="sm">
          <Link href="/login">로그인</Link>
        </Button>
      </div>

      <SignupBox />
    </section>
  );
}
