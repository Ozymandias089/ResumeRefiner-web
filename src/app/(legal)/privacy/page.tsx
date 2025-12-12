import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "개인정보 처리방침 | ResumeRefiner",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-muted flex items-center justify-center px-4 py-10">
      <Card className="w-full max-w-3xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">개인정보 처리방침</CardTitle>
          <p className="text-sm text-muted-foreground">
            ResumeRefiner가 개인정보를 처리하는 방법을 안내합니다.
          </p>
        </CardHeader>

        <CardContent className="prose prose-sm max-w-none dark:prose-invert">
          <p>
            ResumeRefiner(이하 “서비스”)는 이용자의 개인정보를 중요하게
            보호하며, 다음과 같은 원칙에 따라 개인정보를 처리합니다.
          </p>

          <h3>1. 수집하는 개인정보</h3>
          <ul>
            <li>이메일 주소</li>
            <li>사용자 이름(또는 핸들)</li>
            <li>이력서 내용 및 업로드된 파일</li>
          </ul>

          <h3>2. 개인정보의 이용 목적</h3>
          <ul>
            <li>회원 식별 및 인증</li>
            <li>이력서 분석 및 피드백 제공</li>
            <li>서비스 운영 및 품질 개선</li>
          </ul>

          <h3>3. 개인정보의 보관 및 파기</h3>
          <p>
            개인정보는 서비스 이용 기간 동안 보관되며, 회원 탈퇴 시 지체 없이
            파기됩니다.
          </p>

          <h3>4. 제3자 제공</h3>
          <p>서비스는 이용자의 개인정보를 제3자에게 제공하지 않습니다.</p>

          <hr />

          <p className="text-sm text-muted-foreground">
            마지막 업데이트: 2025-12-12
          </p>

          <div className="mt-6 flex items-center gap-3">
            <Link href="/" className="underline text-sm">
              홈으로
            </Link>
            <Link href="/terms" className="underline text-sm">
              서비스 이용약관
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
