// src/shared/api/client.ts
export type ApiErrorPayload = { message?: string; code?: string };

export class ApiError extends Error {
  status: number;
  payload?: ApiErrorPayload;

  constructor(status: number, message: string, payload?: ApiErrorPayload) {
    super(String(message)); // 혹시 message가 문자열이 아니어도 안전
    Object.setPrototypeOf(this, ApiError.prototype); // Error 상속 안정화
    this.name = "ApiError";
    this.status = status;
    this.payload = payload;
  }
}


type RequestInitEx = Omit<RequestInit, "body"> & {
  json?: unknown;
  /** body를 직접 쓰고 싶으면 json 대신 body 사용 */
  body?: BodyInit | null;
  /** data + headers + status까지 받고 싶을 때 */
  meta?: boolean;
};

export type ApiResponseMeta<T> = {
  data?: T;
  status?: number;
  headers: Headers;
};

export async function apiFetch<T>(
  input: string,
  init: RequestInitEx = {}
): Promise<T> {
  const { json, headers, body, meta, ...rest } = init;

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

    console.error("[apiFetch] error", {
      url: input,
      status: res.status,
      payload,
    });

    throw new ApiError(
      res.status,
      payload?.message || "요청 중 오류가 발생했습니다.",
      payload
    );
  }

  // meta 모드: 바디가 없어도 headers/status를 돌려줄 수 있음
  if (meta) {
    let data: unknown = undefined;
    if (res.status !== 204) {
      const text = await res.text();
      if (text) data = JSON.parse(text) as T;
    }
    return { data, status: res.status, headers: res.headers } as T;
  }

  // 204 No Content 방어
  if (res.status === 204) return undefined as T;

  // body 없는 201 같은 케이스도 방어 (Location-only)
  const text = await res.text();
  if (!text) return undefined as T;
  return JSON.parse(text) as T;
}
