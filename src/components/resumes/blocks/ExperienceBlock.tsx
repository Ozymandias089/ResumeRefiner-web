"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

import type { ResumeExperienceForm } from "@/features/resumes/new/types/form";
import {DeleteRowButton} from "@/components/resumes/blocks/DeleteRowButton";

export function ExperienceBlock(props: {
    experiences: ResumeExperienceForm[];
    disabled?: boolean;
    onAdd: () => void;
    onRemove: (idx: number) => void;
    onChangeItem: (idx: number, patch: Partial<ResumeExperienceForm>) => void;
}) {
    const { experiences, disabled, onAdd, onRemove, onChangeItem } = props;

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>경력</CardTitle>
                <Button type="button" variant="outline" onClick={onAdd} disabled={disabled}>
                    경력 추가
                </Button>
            </CardHeader>

            <CardContent className="space-y-6">
                {experiences.length === 0 ? (
                    <div className="text-sm text-muted-foreground">
                        아직 경력이 없다면 비워두어도 됩니다.
                    </div>
                ) : null}

                {experiences.map((x, idx) => (
                    <div key={idx} className="space-y-4">
                        {idx > 0 && <Separator />}

                        <div className="flex items-center justify-between">
                            <div className="text-sm font-medium">경력 #{idx + 1}</div>
                            <DeleteRowButton
                                className="bg-destructive/90 hover:bg-destructive"
                                disabled={disabled}
                                onClick={() => onRemove(idx)}
                                label="삭제"
                            />
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label>회사 *</Label>
                                <Input
                                    disabled={disabled}
                                    value={x.company}
                                    onChange={(e) => onChangeItem(idx, { company: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>역할 *</Label>
                                <Input
                                    disabled={disabled}
                                    value={x.role}
                                    onChange={(e) => onChangeItem(idx, { role: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <Label>기간 *</Label>
                                <Input
                                    disabled={disabled}
                                    value={x.period}
                                    onChange={(e) => onChangeItem(idx, { period: e.target.value })}
                                    placeholder="예: 2023.01 ~ 2024.06"
                                />
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <Label>설명</Label>
                                <Textarea
                                    disabled={disabled}
                                    value={x.description}
                                    onChange={(e) => onChangeItem(idx, { description: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
