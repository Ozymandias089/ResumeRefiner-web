"use client";

import * as React from "react";
import { format, parse, isValid } from "date-fns";
import { ko } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type DatePickerProps = {
    value?: string; // yyyy-MM-dd
    onChange: (value?: string) => void;
    placeholder?: string;
    disabledFuture?: boolean;
    fromYear?: number;
    toYear?: number;
};

function toDate(value?: string) {
    if (!value) return undefined;
    const d = parse(value, "yyyy-MM-dd", new Date());
    return isValid(d) ? d : undefined;
}

function toValue(date?: Date) {
    return date ? format(date, "yyyy-MM-dd") : undefined;
}

export function DatePicker({
                               value,
                               onChange,
                               placeholder = "YYYY-MM-DD",
                               disabledFuture = true,
                               fromYear = 1900,
                               toYear = new Date().getFullYear(),
                           }: DatePickerProps) {
    const selected = toDate(value);

    // 입력창은 사용자가 타이핑하는 중엔 value가 "부분"일 수 있어서 별도 상태로 관리
    const [text, setText] = React.useState(value ?? "");
    React.useEffect(() => setText(value ?? ""), [value]);

    const tryCommit = (raw: string) => {
        const trimmed = raw.trim();
        if (!trimmed) {
            onChange(undefined);
            return;
        }
        const d = parse(trimmed, "yyyy-MM-dd", new Date());
        if (!isValid(d)) return; // 잘못된 입력이면 커밋 안 함(사용자가 수정하도록)
        if (disabledFuture && d > new Date()) return;
        onChange(toValue(d));
    };

    return (
        <Popover>
            <div className="flex gap-2">
                {/* 직접 입력 */}
                <Input
                    value={text}
                    placeholder={placeholder}
                    onChange={(e) => setText(e.target.value)}
                    onBlur={() => tryCommit(text)}
                    inputMode="numeric"
                />

                {/* 달력 버튼 */}
                <PopoverTrigger asChild>
                    <Button variant="outline" className="shrink-0 px-3">
                        <CalendarIcon className="h-4 w-4" />
                        <span className="sr-only">날짜 선택</span>
                    </Button>
                </PopoverTrigger>
            </div>

            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={selected}
                    onSelect={(d) => onChange(toValue(d ?? undefined))}
                    locale={ko}
                    captionLayout="dropdown"     // ✅ 연/월 드롭다운
                    fromYear={fromYear}
                    toYear={toYear}
                    disabled={(d) => {
                        if (disabledFuture && d > new Date()) return true;
                        if (d < new Date(`${fromYear}-01-01`)) return true;
                        return false;
                    }}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
}
