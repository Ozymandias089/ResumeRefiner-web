// src/app/(public)/(auth)/signup/page.tsx
import { SignupForm } from "@/components/auth/signup-form";
import { AppLogo } from "@/components/common/app-logo";

type Props = {
  searchParams?: Record<string, string | string[] | undefined>;
};

function pick(v: string | string[] | undefined) {
  return Array.isArray(v) ? v[0] : v;
}

export default function SignupPage({ searchParams }: Props) {
  const email = pick(searchParams?.email) ?? "";

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
