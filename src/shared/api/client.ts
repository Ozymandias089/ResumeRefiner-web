// src/shared/api/client.ts
export type ApiErrorPayload = { message?: string; code?: string };

export class ApiError extends Error {
  status: number;
  payload?: ApiErrorPayload;

  constructor(status: number, message: string, payload?: ApiErrorPayload) {
    super(message);
    this.status = status;
    this.payload = payload;
  }
}

type RequestInitEx = Omit<RequestInit, "body"> & {
  json?: unknown;
  /** body를 직접 쓰고 싶으면 json 대신 body 사용 */
  body?: BodyInit | null;
};

export async function apiFetch<T>(
  input: string,
  init: RequestInitEx = {}
): Promise<T> {
  const { json, headers, body, ...rest } = init;

  const res = await fetch(input, {
    ...rest,
    credentials: "include",
    headers: {
      ...(json ? { "Content-Type": "application/json" } : {}),
      ...headers,
    },
    body: json ? JSON.stringify(json) : body ?? null,
  });

  if (!res.ok) {
    const payload = (await res.json().catch(() => undefined)) as
      | ApiErrorPayload
      | undefined;

    throw new ApiError(
      res.status,
      payload?.message || "요청 중 오류가 발생했습니다.",
      payload
    );
  }

  // 204 No Content 방어
  if (res.status === 204) return undefined as T;

  return (await res.json()) as T;
}
