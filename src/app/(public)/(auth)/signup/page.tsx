"use client";

import { useSearchParams } from "next/navigation";
import { SignupForm } from "@/components/auth/signup-form";
import { AppLogo } from "@/components/app-logo";

export default function SignupPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="/public" className="flex items-center gap-2 self-center font-medium">
          <AppLogo size="md" />
        </a>
        <SignupForm defaultEmail={email} />
      </div>
    </div>
  );
}
