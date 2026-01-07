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

import type { ResumeEducationForm } from "@/features/resumes/new/types/form";
import {DEGREE_OPTIONS} from "@/features/resumes/new/constants";
import {DeleteRowButton} from "@/components/resumes/blocks/DeleteRowButton";

export function EducationBlock(props: {
    education: ResumeEducationForm[];
    disabled?: boolean;
    onAddAction: () => void;
    onRemoveAction: (idx: number) => void;
    onChangeItemAction: (idx: number, patch: Partial<ResumeEducationForm>) => void;
}) {
    const { education, disabled, onAddAction, onRemoveAction, onChangeItemAction } = props;

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>학력</CardTitle>
                <Button type="button" variant="outline" onClick={onAddAction} disabled={disabled}>
                    학력 추가
                </Button>
            </CardHeader>

            <CardContent className="space-y-6">
                {education.map((e, idx) => (
                    <div key={idx} className="space-y-4">
                        {idx > 0 && <Separator />}

                        <div className="flex items-center justify-between">
                            <div className="text-sm font-medium">학력 #{idx + 1}</div>
                            <DeleteRowButton
                                className="bg-destructive/90 hover:bg-destructive"
                                disabled={disabled || education.length <= 1}
                                onClickAction={() => onRemoveAction(idx)}
                                label="삭제"
                            />
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label>학교명 *</Label>
                                <Input
                                    disabled={disabled}
                                    value={e.schoolName ?? ""}
                                    onChange={(ev) => onChangeItemAction(idx, { schoolName: ev.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>전공</Label>
                                <Input
                                    disabled={disabled}
                                    value={e.major ?? ""}
                                    onChange={(ev) => onChangeItemAction(idx, { major: ev.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>학위</Label>
                                <Select
                                    disabled={disabled}
                                    value={String(e.degree ?? "NONE")}
                                    onValueChange={(v) =>
                                        onChangeItemAction(idx, { degree: v === "NONE" ? null : (v as any) })
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="학위 선택" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {DEGREE_OPTIONS.map((o) => (
                                            <SelectItem key={String(o.value)} value={String(o.value)}>
                                                {o.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>기간</Label>
                                <Input
                                    disabled={disabled}
                                    value={e.period ?? ""}
                                    onChange={(ev) => onChangeItemAction(idx, { period: ev.target.value })}
                                    placeholder="예: 2018.03 ~ 2022.02"
                                />
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <Label>설명</Label>
                                <Textarea
                                    disabled={disabled}
                                    value={e.description ?? ""}
                                    onChange={(ev) => onChangeItemAction(idx, { description: ev.target.value })}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
