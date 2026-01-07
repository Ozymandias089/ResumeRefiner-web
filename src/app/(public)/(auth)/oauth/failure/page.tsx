// src/app/(public)/(auth)/oauth/failure/page.tsx
type Props = {
  searchParams?: Record<string, string | string[] | undefined>;
};

function pick(param: string | string[] | undefined): string | undefined {
  if (Array.isArray(param)) return param[0];
  return param;
}

export default function OAuthFailurePage({ searchParams }: Props) {
  const error = pick(searchParams?.error) ?? "unknown";
  const message = pick(searchParams?.message);

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-xl border p-6 space-y-3">
        <h1 className="text-xl font-semibold">OAuth 로그인 실패</h1>
        <p className="text-sm text-muted-foreground">
          인증 과정에서 문제가 발생했습니다.
        </p>

        <div className="rounded-md bg-muted p-3 text-sm">
          <div><b>error</b>: {error}</div>
          {message ? <div><b>message</b>: {message}</div> : null}
        </div>

        <a
          href="/login"
          className="inline-flex h-9 items-center justify-center rounded-md border px-4 text-sm"
        >
          로그인으로 돌아가기
        </a>
      </div>
    </main>
  );
}
