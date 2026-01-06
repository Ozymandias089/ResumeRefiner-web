# ResumeRefiner Web

ResumeRefiner는 **이력서 작성 · 관리 · 리뷰**를 한 곳에서 제공하는 웹 서비스입니다.  
이 저장소는 ResumeRefiner의 **프런트엔드(Next.js App Router 기반)** 코드베이스입니다.

---

## 주요 기능

- 이력서 생성 / 수정 / 미리보기 (A4 기준)
- 경력 · 학력 · 군복무 · 커스텀 섹션 관리
- AI 기반 이력서 리뷰 연동
- 세션 기반 로그인 / 로그아웃
- Google OAuth2 소셜 로그인
- 반응형 UI (데스크톱 중심)

---

## 기술 스택

### Framework & Runtime
- **Next.js 16 (App Router)**
- **React 19**
- TypeScript 5

### UI / Styling
- Tailwind CSS 4
- shadcn/ui (Radix UI 기반)
- lucide-react / tabler-icons
- vaul, sonner

### Form / State
- react-hook-form
- zod
- @tanstack/react-query
- @tanstack/react-table

### Date & Utility
- date-fns
- react-day-picker
- clsx / tailwind-merge

---

## 백엔드
[ResumeRefiner-backend](https://github.com/Ozymandias089/ResumeRefiner-backend)

---

## 프로젝트 구조 (요약)

```

src/
├─ app/
│  ├─ (public)/        # 로그인 전 접근 가능 (landing, login, signup, oauth)
│  ├─ (app)/           # 로그인 후 보호 영역 (dashboard, resumes, settings)
│  └─ proxy.ts         # 인증 기반 라우팅 가드
│
├─ components/         # 공용 UI 컴포넌트
├─ features/           # 도메인 단위 기능 (auth, resumes, reviews 등)
├─ shared/             # apiFetch, 유틸, 공통 로직
└─ styles/

````

---

## 인증 구조

- **세션 기반 인증**
- 백엔드(Spring Boot)에서 세션 생성
- 프런트는 `credentials: include` 로 API 호출
- 로그인 상태는 `currentUserStore`를 통해 전역 관리

### OAuth2 로그인 흐름 (Google)

1. 프런트에서 `/oauth2/authorization/google` 이동
2. Google 인증
3. 백엔드에서 회원 생성/조회 + 세션 생성
4. `/oauth/success` 페이지로 리다이렉트
5. 프런트에서 `/api/auth/me` 호출 후 `/dashboard` 이동

---

## 🚀 로컬 개발

### 1. 의존성 설치
```bash
npm install
````

### 2. 개발 서버 실행

```bash
npm run dev
```

기본 주소:

```
http://localhost:3000
```

> 백엔드 서버(Spring Boot)가 별도로 실행 중이어야 합니다.

---

## API 연동

Next.js `rewrites`를 사용해 API 요청을 백엔드로 프록시합니다.

```ts
/api/*            → 백엔드 API
/oauth2/*         → OAuth2 시작
/login/oauth2/*   → OAuth2 콜백
```

---

## 배포

* **Frontend**: Vercel
* **Backend**: Render (Spring Boot)
* **Auth**: Google OAuth2
* **Session**: Cookie 기반 (SameSite=None, Secure)

배포 환경에서는 커스텀 도메인 사용을 권장합니다.

---

## 버전

* **v1.0.0**

    * 기본 이력서 작성 / 수정 / 조회
    * 세션 기반 로그인
    * Google OAuth2 로그인
    * 프런트엔드 기능 안정화

---

##  향후 계획

* 소셜 로그인 확장 (Kakao / Naver)
* 이력서 PDF 내보내기
* 리뷰 히스토리 비교
* 다국어 지원
* 모바일 UX 개선

---

## 라이선스

이 프로젝트는 개인 프로젝트이며, 별도의 라이선스를 명시하지 않습니다.
