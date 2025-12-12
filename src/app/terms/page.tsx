import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "서비스 이용약관 | ResumeRefiner",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-muted flex items-center justify-center px-4 py-10">
      <Card className="w-full max-w-3xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">서비스 이용약관</CardTitle>
          <p className="text-sm text-muted-foreground">
            ResumeRefiner 서비스 이용에 적용되는 기본 약관입니다.
          </p>
        </CardHeader>

        <CardContent className="prose prose-sm max-w-none dark:prose-invert">
          <p>
            본 약관은 ResumeRefiner(이하 “서비스”)가 제공하는 이력서 분석 및
            피드백 서비스의 이용과 관련하여 서비스와 이용자 간의 권리·의무 및
            책임사항을 규정함을 목적으로 합니다.
          </p>

          <h3>제1조 (서비스의 내용)</h3>
          <p>
            서비스는 이용자가 업로드한 이력서를 기반으로 AI를 활용한 분석 및
            피드백 기능을 제공합니다. 제공되는 피드백은 참고용이며, 채용 결과를
            보장하지 않습니다.
          </p>

          <h3>제2조 (이용자의 책임)</h3>
          <p>
            이용자는 본인이 업로드한 정보에 대해 적법한 권리를 보유하고 있어야
            하며, 타인의 권리를 침해해서는 안 됩니다.
          </p>

          <h3>제3조 (서비스 변경 및 중단)</h3>
          <p>
            서비스는 기능 개선, 운영상 필요에 따라 일부 또는 전부를 변경하거나
            중단할 수 있습니다.
          </p>

          <h3>제4조 (면책)</h3>
          <p>
            서비스는 AI 분석 결과의 정확성, 완전성, 특정 목적에의 적합성을
            보장하지 않습니다.
          </p>

          <hr />

          <p className="text-sm text-muted-foreground">
            마지막 업데이트: 2025-12-12
          </p>

          <div className="mt-6 flex items-center gap-3">
            <Link href="/" className="underline text-sm">
              홈으로
            </Link>
            <Link href="/privacy" className="underline text-sm">
              개인정보 처리방침
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
