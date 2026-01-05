"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useReviewActions } from "@/features/reviews/hooks/useReviews";

import { ReviewTone, CareerStage } from "@/features/reviews/types/enums";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// ✅ 한국어 라벨
const TONE_LABEL: Record<ReviewTone, string> = {
  [ReviewTone.PROFESSIONAL]: "프로페셔널(기본)",
  [ReviewTone.NEUTRAL]: "중립",
  [ReviewTone.FORMAL]: "격식",
};

const STAGE_LABEL: Record<CareerStage, string> = {
  [CareerStage.UNKNOWN]: "미지정",
  [CareerStage.STUDENT]: "학생/취준",
  [CareerStage.ENTRY]: "신입(주니어)",
  [CareerStage.MID]: "미들",
  [CareerStage.SENIOR]: "시니어",
  [CareerStage.LEAD]: "리드/매니저",
};

// ✅ 체크 옵션(원하면 더 줄여도 됨)
const FOCUS_OPTIONS = [
  { key: "backend", label: "백엔드 역량" },
  { key: "performance", label: "성능/최적화" },
  { key: "collaboration", label: "협업/커뮤니케이션" },
  { key: "problem_solving", label: "문제 해결" },
  { key: "architecture", label: "설계/아키텍처" },
  { key: "writing", label: "문서화/정리" },
] as const;

export function ResumeReviewCreatePanel(props: { slug: string }) {
  const router = useRouter();
  const actions = useReviewActions(props.slug);

  // ✅ enum 사용
  const [tone, setTone] = useState<ReviewTone>(ReviewTone.PROFESSIONAL);
  const [stage, setStage] = useState<CareerStage>(CareerStage.ENTRY);

  // ✅ 폼 기반 커스텀 옵션
  const [jobTarget, setJobTarget] = useState("주니어 백엔드 개발자");
  const [focus, setFocus] = useState<string[]>(["backend"]);
  const [extraNotes, setExtraNotes] = useState("");

  // ✅ 고급 모드(파워유저용) — 기본은 OFF
  const [advanced, setAdvanced] = useState(false);
  const [rawJson, setRawJson] = useState<string>("");

  const computedJson = useMemo(() => {
    // 서버에서 jsonb로 저장되므로 "유효 JSON"만 보장하면 됨
    const obj = {
      jobTarget: jobTarget.trim() || undefined,
      focus: focus.length ? focus : undefined,
      extraNotes: extraNotes.trim() || undefined,
    };
    return JSON.stringify(obj, null, 2);
  }, [jobTarget, focus, extraNotes]);

  const customizationRequestJson = useMemo(() => {
    if (advanced) {
      const t = rawJson.trim();
      return t.length ? t : null;
    }
    // 기본 모드: 폼 → JSON 자동 생성
    return computedJson;
  }, [advanced, rawJson, computedJson]);

  const toggleFocus = (k: string) => {
    setFocus((prev) => (prev.includes(k) ? prev.filter((x) => x !== k) : [...prev, k]));
  };

  const onCreate = async () => {
    // ✅ 고급 모드면 JSON 유효성 검사
    if (advanced) {
      const t = rawJson.trim();
      if (t.length) {
        try {
          JSON.parse(t);
        } catch {
          alert("JSON 형식이 올바르지 않습니다.");
          return;
        }
      }
    }

    // ✅ 스펙 유지: tone/stage/customizationRequestJson 그대로 보냄
    const res = await actions.createAsync({
      tone,
      careerStage: stage,
      customizationRequestJson: customizationRequestJson ?? undefined,
    });

    // createAsync가 CreateReviewResponseDTO를 그대로 반환한다면
    // res?.id 로 상세로 이동 가능. (없으면 목록으로)
    const createdId = res?.id as number | undefined;

    if (createdId && Number.isFinite(createdId)) {
      router.push(`/resumes/${props.slug}/reviews/${createdId}`);
    } else {
      router.push(`/resumes/${props.slug}/reviews`);
    }
  };

  return (
      <Card>
        <CardHeader className="flex flex-row items-start justify-between gap-3">
          <div className="min-w-0">
            <CardTitle className="truncate">새 리뷰 생성</CardTitle>
            <p className="mt-1 text-xs text-muted-foreground">
              이 이력서에 대해 AI 리뷰를 생성합니다.
            </p>
          </div>

          <Button
              variant="secondary"
              size="sm"
              onClick={() => router.push(`/resumes/${props.slug}/reviews`)}
          >
            목록
          </Button>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* 톤 */}
          <div className="space-y-2">
            <Label>톤</Label>
            <Select value={tone} onValueChange={(v) => setTone(v as ReviewTone)}>
              <SelectTrigger>
                <SelectValue placeholder="톤 선택" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(ReviewTone).map((t) => (
                    <SelectItem key={t} value={t}>
                      {TONE_LABEL[t]}
                    </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              결과 문장 스타일(말투/어조)에 영향을 줍니다.
            </p>
          </div>

          {/* 경력 단계 */}
          <div className="space-y-2">
            <Label>경력 단계</Label>
            <Select value={stage} onValueChange={(v) => setStage(v as CareerStage)}>
              <SelectTrigger>
                <SelectValue placeholder="경력 단계 선택" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(CareerStage).map((s) => (
                    <SelectItem key={s} value={s}>
                      {STAGE_LABEL[s]}
                    </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              경험 수준에 맞춰 표현/강조 포인트를 조정합니다.
            </p>
          </div>

          <Separator />

          {/* 커스텀 요청 */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>요청 옵션</Label>
              <div className="flex items-center gap-2">
                <Label className="text-xs text-muted-foreground">고급(JSON)</Label>
                <Switch
                    checked={advanced}
                    onCheckedChange={(v) => {
                      setAdvanced(v);
                      if (v && !rawJson.trim()) setRawJson(computedJson);
                    }}
                />
              </div>
            </div>

            {!advanced ? (
                <>
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">목표 직무</Label>
                    <Input
                        value={jobTarget}
                        onChange={(e) => setJobTarget(e.target.value)}
                        placeholder="예) 주니어 백엔드 개발자"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">강조 포인트</Label>
                    <div className="flex flex-wrap gap-2">
                      {FOCUS_OPTIONS.map((o) => {
                        const on = focus.includes(o.key);
                        return (
                            <Button
                                key={o.key}
                                type="button"
                                variant={on ? "default" : "secondary"}
                                size="sm"
                                onClick={() => toggleFocus(o.key)}
                            >
                              {o.label}
                            </Button>
                        );
                      })}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      리뷰에서 특히 강조하고 싶은 관점을 선택하세요.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">추가 요청(선택)</Label>
                    <Textarea
                        value={extraNotes}
                        onChange={(e) => setExtraNotes(e.target.value)}
                        placeholder="예) 성과 중심으로 더 구체적으로, 문장을 간결하게, STAR 방식 적용 등"
                        className="min-h-24"
                    />
                  </div>

                  <details className="rounded-md border p-3">
                    <summary className="cursor-pointer text-sm">전송되는 데이터 보기</summary>
                    <pre className="mt-2 max-h-60 overflow-auto rounded-md bg-muted/30 p-3 text-xs">
                  {computedJson}
                </pre>
                  </details>
                </>
            ) : (
                <>
                  <p className="text-xs text-muted-foreground">
                    고급 모드에서는 JSON을 직접 수정할 수 있습니다.
                  </p>
                  <Textarea
                      value={rawJson}
                      onChange={(e) => setRawJson(e.target.value)}
                      className="min-h-[220px] font-mono text-xs"
                      placeholder={computedJson}
                  />
                  <p className="text-xs text-muted-foreground">
                    JSON이 아니면 서버에서 거절될 수 있습니다.
                  </p>
                </>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => router.push(`/resumes/${props.slug}`)}>
              취소
            </Button>
            <Button onClick={onCreate} disabled={actions.isCreating}>
              {actions.isCreating ? "생성 중..." : "리뷰 생성"}
            </Button>
          </div>
        </CardContent>
      </Card>
  );
}
