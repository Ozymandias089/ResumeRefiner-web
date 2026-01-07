// src/proxy.ts
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const PUBLIC_PATHS = ["/", "/login", "/signup", "/terms", "/privacy"]

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // ✅ API는 원래대로 패스
  if (pathname.startsWith("/api")) {
    return NextResponse.next()
  }

  // ✅ OAuth2 플로우 경로는 세션 없어도 무조건 통과 (가장 중요)
  if (
      pathname.startsWith("/oauth2") ||
      pathname.startsWith("/login/oauth2") ||
      pathname.startsWith("/oauth/success") ||
      pathname.startsWith("/oauth/failure")
  ) {
    return NextResponse.next()
  }

  // 1️⃣ Next 내부 / 정적 리소스 제외
  if (
      pathname.startsWith("/_next") ||
      pathname.startsWith("/favicon") ||
      pathname.startsWith("/assets") ||
      pathname.startsWith("/images")
  ) {
    return NextResponse.next()
  }

  // 2️⃣ 세션 쿠키 확인
  const sessionCookie = request.cookies.get("RESUMEREFINERSESSION")

  // 3️⃣ 로그인 상태
  if (sessionCookie) {
    if (PUBLIC_PATHS.includes(pathname)) {
      const url = request.nextUrl.clone()
      url.pathname = "/dashboard"
      return NextResponse.redirect(url)
    }
    return NextResponse.next()
  }

  // 4️⃣ 비로그인 상태
  if (PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.next()
  }

  const url = request.nextUrl.clone()
  url.pathname = "/"
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ["/((?!api).*)"],
}
