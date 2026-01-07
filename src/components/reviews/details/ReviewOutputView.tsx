"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Textarea } from "@/components/ui/textarea";

// ✅ A4 i18n 재사용
import { UI, LABELS, langOf } from "@/components/resumes/preview/a4/i18n";

type Issue = { type: string; message: string };
type Improvement = { before: string; after: string; rationale?: string };

type SectionResult = {
  sectionKey: string;
  issues: Issue[];
  improvements: Improvement[];
};

type ReviewOutput = {
  schemaVersion: number;
  summary?: string;
  overallImprovedText?: string;
  sectionResults?: SectionResult[];
};

function parseOutput(json?: string): ReviewOutput | null {
  if (!json) return null;
  try {
    return JSON.parse(json) as ReviewOutput;
  } catch {
    return null;
  }
}

function issueVariant(type: string) {
  if (type === "tone") return "destructive";
  if (type === "format") return "secondary";
  if (type === "content" || type === "detail") return "secondary";
  return "outline";
}

async function copyToClipboard(text: string) {
  await navigator.clipboard.writeText(text);
}

/**
 * sectionKey -> 라벨
 * - experiences -> 경력/EXPERIENCE
 * - customSections_INTRODUCTION -> 소개/Introduction
 */
function sectionLabel(sectionKey: string, lang: "KO" | "EN") {
  const ui = UI[lang];
  const labels = LABELS[lang];

  if (sectionKey === "experiences") return ui.experience;

  if (sectionKey.startsWith("customSections_")) {
    const raw = sectionKey.replace(
      "customSections_",
      ""
    ) as keyof typeof labels.customType;
    return labels.customType[raw] ?? raw;
  }

  return sectionKey;
}

export function ReviewOutputView(props: {
  outputJson?: string;
  langCode?: "KO" | "EN";
}) {
  // ✅ 지금은 langCode가 없으니 기본 KO. (나중에 detail에 languageCode 넣으면 연결)
  const lang = props.langCode ?? "KO";
  const output = useMemo(
    () => parseOutput(props.outputJson),
    [props.outputJson]
  );
  const [copied, setCopied] = useState<string | null>(null);

  if (!output) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>결과</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            결과를 해석할 수 없어요.
          </p>
          <pre className="mt-3 max-h-[420px] overflow-auto rounded-md border bg-muted/30 p-3 text-xs">
            {props.outputJson ?? ""}
          </pre>
        </CardContent>
      </Card>
    );
  }

  // ✅ "빈 섹션" 숨기기: issues=0 && improvements=0 인 섹션은 렌더링하지 않음
  const sections = (output.sectionResults ?? []).filter(
    (s) => (s.issues?.length ?? 0) > 0 || (s.improvements?.length ?? 0) > 0
  );

  return (
    <div className="space-y-4">
      {/* Summary */}
      {output.summary && (
        <Card>
          <CardHeader className="flex flex-row items-start justify-between gap-3">
            <CardTitle>요약</CardTitle>
            <Badge variant="outline">v{output.schemaVersion}</Badge>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap text-sm leading-relaxed">
              {output.summary}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Overall Improved Text */}
      {output.overallImprovedText && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-3">
            <CardTitle>전체 개선문</CardTitle>
            <Button
              size="sm"
              variant="secondary"
              onClick={async () => {
                await copyToClipboard(output.overallImprovedText!);
                setCopied("overall");
                setTimeout(() => setCopied(null), 1200);
              }}
            >
              {copied === "overall" ? "복사됨" : "복사"}
            </Button>
          </CardHeader>
          <CardContent>
            <Textarea
              value={output.overallImprovedText}
              readOnly
              className="min-h-[180px] text-sm"
            />
          </CardContent>
        </Card>
      )}

      {/* Section Results */}
      {sections.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>섹션별 개선</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Accordion type="multiple" className="w-full">
              {sections.map((s) => (
                <AccordionItem key={s.sectionKey} value={s.sectionKey}>
                  {/* ✅ 좁아도 안 깨지게: 세로 스택 + 배지 wrap */}
                  <AccordionTrigger className="py-3">
                    <div className="flex w-full min-w-0 flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <span className="min-w-0 truncate text-sm">
                        {sectionLabel(s.sectionKey, lang)}
                      </span>

                      <div className="flex shrink-0 flex-wrap items-center justify-end gap-2">
                        {/* ✅ 뱃지는 0일 때 숨기기(원하면) */}
                        {s.issues.length > 0 && (
                          <Badge
                            variant="secondary"
                            className="px-2 py-0.5 text-[11px]"
                          >
                            이슈 {s.issues.length}
                          </Badge>
                        )}
                        {s.improvements.length > 0 && (
                          <Badge
                            variant="default"
                            className="px-2 py-0.5 text-[11px]"
                          >
                            개선 {s.improvements.length}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent className="space-y-4">
                    {/* issues */}
                    {s.issues.length > 0 && (
                      <div className="space-y-2">
                        <div className="text-xs font-medium text-muted-foreground">
                          이슈
                        </div>
                        <div className="space-y-2">
                          {s.issues.map((i, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <Badge variant={issueVariant(i.type) as any}>
                                {i.type}
                              </Badge>
                              <p className="text-sm leading-relaxed">
                                {i.message}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {s.issues.length > 0 && s.improvements.length > 0 && (
                      <Separator />
                    )}

                    {/* improvements */}
                    {s.improvements.length > 0 && (
                      <div className="space-y-3">
                        <div className="text-xs font-medium text-muted-foreground">
                          개선안
                        </div>

                        {s.improvements.map((imp, idx) => (
                          <div
                            key={idx}
                            className="space-y-3 rounded-lg border p-3"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <div className="text-sm font-medium">
                                #{idx + 1}
                              </div>
                              <Button
                                size="sm"
                                variant="secondary"
                                onClick={async () => {
                                  await copyToClipboard(imp.after);
                                  const k = `${s.sectionKey}-${idx}`;
                                  setCopied(k);
                                  setTimeout(() => setCopied(null), 1200);
                                }}
                              >
                                {copied === `${s.sectionKey}-${idx}`
                                  ? "복사됨"
                                  : "After 복사"}
                              </Button>
                            </div>

                            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                              <div className="space-y-1">
                                <div className="text-xs font-medium text-muted-foreground">
                                  Before
                                </div>
                                <pre className="whitespace-pre-wrap rounded-md bg-muted/30 p-2 text-xs">
                                  {imp.before}
                                </pre>
                              </div>

                              <div className="space-y-1">
                                <div className="text-xs font-medium text-muted-foreground">
                                  After
                                </div>
                                <pre className="whitespace-pre-wrap rounded-md bg-muted/30 p-2 text-xs">
                                  {imp.after}
                                </pre>
                              </div>
                            </div>

                            {imp.rationale && (
                              <div className="whitespace-pre-wrap text-xs text-muted-foreground">
                                {imp.rationale}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      )}

      {/* raw */}
      <details className="rounded-md border p-3">
        <summary className="cursor-pointer text-sm">원본 JSON 보기</summary>
        <pre className="mt-2 max-h-[420px] overflow-auto rounded-md bg-muted/30 p-3 text-xs">
          {JSON.stringify(output, null, 2)}
        </pre>
      </details>
    </div>
  );
}
