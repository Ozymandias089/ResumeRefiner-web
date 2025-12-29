"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import type { ResumeCustomSectionForm } from "@/features/resumes/new/types/form";
import {CUSTOM_TYPE_OPTIONS} from "@/features/resumes/new/constants";
import {DeleteRowButton} from "@/components/resumes/blocks/DeleteRowButton";

export function CustomSectionsBlock(props: {
    custom: ResumeCustomSectionForm[];
    disabled?: boolean;
    onAddAction: () => void;
    onRemoveAction: (idx: number) => void;
    onChangeItemAction: (idx: number, patch: Partial<ResumeCustomSectionForm>) => void;
}) {
    const { custom, disabled, onAddAction, onRemoveAction, onChangeItemAction } = props;

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>커스텀 섹션</CardTitle>
                <Button type="button" variant="outline" onClick={onAddAction} disabled={disabled}>
                    섹션 추가
                </Button>
            </CardHeader>

            <CardContent className="space-y-6">
                {custom.length === 0 ? (
                    <div className="text-sm text-muted-foreground">
                        필요하다면 섹션을 추가해 “프로젝트/수상/자격증/기술스택” 등을 자유롭게 넣을 수 있어요.
                    </div>
                ) : null}

                {custom.map((c, idx) => (
                    <div key={idx} className="space-y-4">
                        {idx > 0 && <Separator />}

                        <div className="flex items-center justify-between">
                            <div className="text-sm font-medium">섹션 #{idx + 1}</div>
                            <DeleteRowButton
                                className="bg-destructive/90 hover:bg-destructive"
                                disabled={disabled}
                                onClickAction={() => onRemoveAction(idx)}
                                label="삭제"
                            />
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label>유형</Label>
                                <Select
                                    disabled={disabled}
                                    value={String(c.type)}
                                    onValueChange={(v) => onChangeItemAction(idx, { type: v as any })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="유형 선택" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {CUSTOM_TYPE_OPTIONS.map((o) => (
                                            <SelectItem key={String(o.value)} value={String(o.value)}>
                                                {o.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>제목 *</Label>
                                <Input
                                    disabled={disabled}
                                    value={c.subject??""}
                                    onChange={(e) => onChangeItemAction(idx, { subject: e.target.value })}
                                    placeholder="예: 개인 프로젝트"
                                />
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <Label>내용 *</Label>
                                <Textarea
                                    disabled={disabled}
                                    value={c.content??""}
                                    onChange={(e) => onChangeItemAction(idx, { content: e.target.value })}
                                    placeholder="핵심 역할, 사용 기술, 성과 등을 적어주세요."
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
