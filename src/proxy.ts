// src/proxy.ts
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const PUBLIC_PATHS = ["/", "/login", "/signup", "/terms", "/privacy"]

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith("/api")) {
    return NextResponse.next();
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

  // 2️⃣ 세션 쿠키 확인 (실제 쿠키 이름)
  const sessionCookie = request.cookies.get("RESUMEREFINERSESSION")

  // ─────────────────────────────
  // 3️⃣ 로그인 상태
  // ─────────────────────────────
  if (sessionCookie) {
    // 로그인 상태에서 공개 페이지 접근 → 대시보드로 강제 이동
    if (PUBLIC_PATHS.includes(pathname)) {
      const url = request.nextUrl.clone()
      url.pathname = "/dashboard"
      return NextResponse.redirect(url)
    }

    // 그 외는 통과
    return NextResponse.next()
  }

  // ─────────────────────────────
  // 4️⃣ 비로그인 상태
  // ─────────────────────────────
  if (!sessionCookie) {
    // 공개 페이지는 통과
    if (PUBLIC_PATHS.includes(pathname)) {
      return NextResponse.next()
    }

    // 보호 페이지 접근 → 랜딩으로
    const url = request.nextUrl.clone()
    url.pathname = "/"
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api).*)"],
}
