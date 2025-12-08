// src/app/debug/page.tsx
"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

type HealthResponse = unknown;   // 백엔드 구현에 맞게 타입 나중에 좁혀도 됨
type VersionResponse = unknown;

export default function DebugServerStatusPage() {
  const {
    data: health,
    isLoading: healthLoading,
    isError: healthError,
    error: healthErrorObj,
    refetch: refetchHealth,
  } = useQuery<HealthResponse>({
    queryKey: ["server-health"],
    queryFn: async () => {
      const res = await api.get("/api/health");
      return res.data;
    },
  });

  const {
    data: version,
    isLoading: versionLoading,
    isError: versionError,
    error: versionErrorObj,
    refetch: refetchVersion,
  } = useQuery<VersionResponse>({
    queryKey: ["server-version"],
    queryFn: async () => {
      const res = await api.get("/api/version");
      return res.data;
    },
  });

  const isAnyLoading = healthLoading || versionLoading;
  const isAnyError = healthError || versionError;

  const handleRetry = () => {
    refetchHealth();
    refetchVersion();
    toast("서버 상태를 다시 확인합니다.");
  };

  return (
    <div className="w-full space-y-4">
      <h1 className="text-xl font-semibold">Server Debug</h1>
      <p className="text-sm text-muted-foreground">
        백엔드 서버와의 연결 상태를 확인하기 위한 테스트 페이지입니다.
      </p>

      <Card>
        <CardHeader>
          <CardTitle>Connection</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <span className="font-medium">Base URL:</span>
            <code className="rounded bg-muted px-2 py-1 text-xs">
              {process.env.NEXT_PUBLIC_API_BASE_URL ?? "NOT SET"}
            </code>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-medium">Status:</span>
            {isAnyLoading && (
              <span className="text-amber-600">Checking...</span>
            )}
            {!isAnyLoading && !isAnyError && (
              <span className="text-emerald-600">OK (reachable)</span>
            )}
            {!isAnyLoading && isAnyError && (
              <span className="text-red-600">Error (unreachable or failed)</span>
            )}
          </div>

          <button
            type="button"
            onClick={handleRetry}
            className="mt-2 inline-flex items-center rounded border px-3 py-1 text-xs hover:bg-accent"
          >
            다시 시도
          </button>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>/api/health</CardTitle>
          </CardHeader>
          <CardContent className="text-xs">
            {healthLoading && <p>Loading...</p>}
            {healthError && (
              <div className="space-y-1">
                <p className="text-red-600">요청 실패</p>
                <p className="text-muted-foreground">
                  {healthErrorObj instanceof Error
                    ? healthErrorObj.message
                    : "Unknown error"}
                </p>
              </div>
            )}
            {!healthLoading && !healthError && (
              <pre className="overflow-auto rounded bg-muted p-2">
                {JSON.stringify(health, null, 2)}
              </pre>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>/api/version</CardTitle>
          </CardHeader>
          <CardContent className="text-xs">
            {versionLoading && <p>Loading...</p>}
            {versionError && (
              <div className="space-y-1">
                <p className="text-red-600">요청 실패</p>
                <p className="text-muted-foreground">
                  {versionErrorObj instanceof Error
                    ? versionErrorObj.message
                    : "Unknown error"}
                </p>
              </div>
            )}
            {!versionLoading && !versionError && (
              <pre className="overflow-auto rounded bg-muted p-2">
                {JSON.stringify(version, null, 2)}
              </pre>
            )}
          </CardContent>
        </Card>
      </div>

      <Separator className="my-2" />

      <p className="text-xs text-muted-foreground">
        이 페이지는 개발 환경에서만 사용하는 디버그 용도입니다.
      </p>
    </div>
  );
}
