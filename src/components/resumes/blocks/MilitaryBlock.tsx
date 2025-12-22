// src/features/resumes/new/components/blocks/MilitaryBlock.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import type { ResumeMilitaryForm } from "@/features/resumes/new/types/form";
import type { MilitaryStatus, MilitaryBranch } from "@/features/resumes/types/enum";
import {MILITARY_BRANCH_OPTIONS, MILITARY_STATUS_OPTIONS} from "@/features/resumes/new/constants";

export function MilitaryBlock(props: {
    military: ResumeMilitaryForm;
    disabled?: boolean;
    onChange: (patch: Partial<ResumeMilitaryForm>) => void;
    onChangeStatus: (status: MilitaryStatus) => void;
    onChangeBranch: (branch: MilitaryBranch) => void;
}) {
    const { military, disabled, onChange, onChangeStatus, onChangeBranch } = props;

    const extraDisabled = disabled || String(military.militaryStatus) === "NOT_APPLICABLE";

    return (
        <Card>
            <CardHeader>
                <CardTitle>군 복무</CardTitle>
            </CardHeader>

            <CardContent className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                    <Label>상태</Label>
                    <Select
                        value={String(military.militaryStatus)}
                        onValueChange={(v) => onChangeStatus(v as any)}
                        disabled={disabled}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="군복무 상태" />
                        </SelectTrigger>
                        <SelectContent>
                            {MILITARY_STATUS_OPTIONS.map((o) => (
                                <SelectItem key={String(o.value)} value={String(o.value)}>
                                    {o.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label>군별</Label>
                    <Select
                        value={String(military.branch)}
                        onValueChange={(v) => onChangeBranch(v as any)}
                        disabled={extraDisabled}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="군별 선택" />
                        </SelectTrigger>
                        <SelectContent>
                            {MILITARY_BRANCH_OPTIONS.map((o) => (
                                <SelectItem key={String(o.value)} value={String(o.value)}>
                                    {o.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {String(military.militaryStatus) === "NONE" ? (
                        <p className="text-xs text-muted-foreground">
                            ‘해당없음’ 선택 시 군별/기간/계급/비고 입력은 비활성화됩니다.
                        </p>
                    ) : null}
                </div>

                <div className="space-y-2">
                    <Label>복무 기간</Label>
                    <Input
                        disabled={extraDisabled}
                        value={military.period}
                        onChange={(e) => onChange({ period: e.target.value })}
                        placeholder="예: 2020.03 ~ 2021.12"
                    />
                </div>

                <div className="space-y-2">
                    <Label>계급</Label>
                    <Input
                        disabled={extraDisabled}
                        value={military.rank}
                        onChange={(e) => onChange({ rank: e.target.value })}
                    />
                </div>

                <div className="space-y-2 md:col-span-2">
                    <Label>비고</Label>
                    <Textarea
                        disabled={extraDisabled}
                        value={military.notes}
                        onChange={(e) => onChange({ notes: e.target.value })}
                    />
                </div>
            </CardContent>
        </Card>
    );
}
