"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useReviewActions } from "@/features/reviews/hooks/useReviews";
import { ReviewTone, CareerStage } from "@/features/reviews/types/enums";

import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { ReviewPanelCard } from "../details/ReviewPanelParts";
import { CreateHeaderActions } from "./ResumeReviewCreateParts";
import {normalizeReviewBasePath, reviewPath} from "@/components/reviews/reviewPath";
import {FOCUS_OPTIONS, STAGE_LABEL, TONE_LABEL} from "@/components/reviews/create/reviewCreateConstants";

export function ResumeReviewCreatePanel(props: { slug: string; basePath?: string }) {
  const router = useRouter();
  const basePath = normalizeReviewBasePath(props.slug, props.basePath);
  const actions = useReviewActions(props.slug);

  const [tone, setTone] = useState<ReviewTone>(ReviewTone.PROFESSIONAL);
  const [stage, setStage] = useState<CareerStage>(CareerStage.ENTRY);

  const [jobTarget, setJobTarget] = useState("주니어 백엔드 개발자");
  const [focus, setFocus] = useState<string[]>(["backend"]);
  const [extraNotes, setExtraNotes] = useState("");

  const [advanced, setAdvanced] = useState(false);
  const [rawJson, setRawJson] = useState<string>("");

  const computedJson = useMemo(() => {
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
    return computedJson;
  }, [advanced, rawJson, computedJson]);

  const toggleFocus = (k: string) => {
    setFocus((prev) => (prev.includes(k) ? prev.filter((x) => x !== k) : [...prev, k]));
  };

  const goList = () => router.push(basePath);

  const onCreate = async () => {
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

    const res = await actions.createAsync({
      tone,
      careerStage: stage,
      customizationRequestJson: customizationRequestJson ?? undefined,
    });

    const createdId = res?.id as number | undefined;

    if (createdId && Number.isFinite(createdId)) {
      router.push(reviewPath(basePath, String(createdId)));
    } else {
      router.push(basePath);
    }
  };

  return (
      <ReviewPanelCard
          title="새 리뷰 생성"
          subtitle="이 이력서에 대해 AI 리뷰를 생성합니다."
          right={<CreateHeaderActions onGoListAction={goList} />}
      >
        <CardContent className="space-y-4 p-0">
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
                </>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={goList}>
              취소
            </Button>
            <Button onClick={onCreate} disabled={actions.isCreating}>
              {actions.isCreating ? "생성 중..." : "리뷰 생성"}
            </Button>
          </div>
        </CardContent>
      </ReviewPanelCard>
  );
}
