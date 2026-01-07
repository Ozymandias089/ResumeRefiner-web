// src/proxy.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 로그인 없이 접근 가능한 경로 (정확히 이 경로들만)
const PUBLIC_PATHS = ["/", "/login", "/signup", "/terms", "/privacy", "/public"];

// 로그인 필요(보호) 경로 프리픽스들
const PROTECTED_PREFIXES = ["/dashboard", "/resumes", "/settings", "/reviews"];

function isPublicPath(pathname: string) {
  return PUBLIC_PATHS.includes(pathname);
}

function isProtectedPath(pathname: string) {
  return PROTECTED_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 0) Next 내부/정적 리소스는 무조건 통과
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/assets") ||
    pathname.startsWith("/images")
  ) {
    return NextResponse.next();
  }

  // 1) API는 원래대로 패스
  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // 2) OAuth 플로우 경로는 세션 없어도 무조건 통과
  if (
    pathname.startsWith("/oauth2") ||
    pathname.startsWith("/login/oauth2") ||
    pathname.startsWith("/oauth/success") ||
    pathname.startsWith("/oauth/failure")
  ) {
    return NextResponse.next();
  }

  // 3) 세션 쿠키 존재 여부 (⚠️ 쿠키=로그인 확정 아님. 단지 "추정"만)
  const hasSessionCookie = Boolean(request.cookies.get("RESUMEREFINERSESSION"));

  // 4) PUBLIC 경로는 항상 통과 (중요: 여기서 절대 /dashboard로 리다이렉트하지 않음)
  //    -> 쿠키가 stale(무효)여도 루프 안 생김
  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  // 5) 보호 경로는 "쿠키가 없으면" 로그인 페이지로 보냄
  //    쿠키가 있으면 통과시켜서, 실제 로그인 여부는 페이지에서 /me로 판정
  if (isProtectedPath(pathname)) {
    if (!hasSessionCookie) {
      const url = request.nextUrl.clone();
      url.pathname = "/"; // 또는 "/login"
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // 6) 그 외 경로는 일단 통과 (원하면 여기서 정책 강화 가능)
  return NextResponse.next();
}

// matcher에서 api는 제외(이미 위에서 처리하지만, 성능상 제외 유지)
export const config = {
  matcher: ["/((?!api).*)"],
};
