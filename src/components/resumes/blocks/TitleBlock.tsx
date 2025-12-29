"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import type { LanguageCode } from "@/features/resumes/types/enum";
import { LANGUAGE_OPTIONS } from "@/features/resumes/new/constants";

export function TitleBlock(props: {
    title: string;
    languageCode: LanguageCode;
    onChangeTitleAction: (v: string) => void;
    onChangeLanguageCodeAction: (v: LanguageCode) => void;
}) {
    const { title, languageCode, onChangeTitleAction, onChangeLanguageCodeAction } = props;

    return (
        <Card>
            <CardHeader>
                <CardTitle>기본 정보</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                    <Label>제목 *</Label>
                    <Input value={title} onChange={(e) => onChangeTitleAction(e.target.value)} />
                </div>

                <div className="space-y-2">
                    <Label>언어</Label>
                    <Select value={String(languageCode)} onValueChange={(v) => onChangeLanguageCodeAction(v as any)}>
                        <SelectTrigger>
                            <SelectValue placeholder="언어 선택" />
                        </SelectTrigger>
                        <SelectContent>
                            {LANGUAGE_OPTIONS.map((o) => (
                                <SelectItem key={String(o.value)} value={String(o.value)}>
                                    {o.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </CardContent>
        </Card>
    );
}
