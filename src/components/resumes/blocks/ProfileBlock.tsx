"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import type { ResumeProfileForm } from "@/features/resumes/new/types/form";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Gender} from "@/features/resumes/types/enum";
import {DatePicker} from "@/components/ui/date-picker";

export function ProfileBlock(props: {
    profile: ResumeProfileForm;
    onChangeAction: (patch: Partial<ResumeProfileForm>) => void;
}) {
    const { profile, onChangeAction } = props;

    return (
        <Card>
            <CardHeader>
                <CardTitle>프로필</CardTitle>
            </CardHeader>

            <CardContent className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                    <Label>이름</Label>
                    <Input value={profile.name??""} onChange={(e) => onChangeAction({ name: e.target.value })} />
                </div>

                <div className="space-y-2">
                    <Label>성별</Label>
                    <Select
                        value={profile.gender}
                        onValueChange={(value) =>
                            onChangeAction({ gender: value as Gender })
                        }
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="성별 선택" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={Gender.MALE}>남성</SelectItem>
                            <SelectItem value={Gender.FEMALE}>여성</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label>생년월일</Label>
                    <DatePicker
                        value={profile.birthDate}
                        onChange={(value) => onChangeAction({ birthDate: value })}
                        placeholder="YYYY-MM-DD"
                    />
                </div>

                <div className="space-y-2">
                    <Label>이메일</Label>
                    <Input value={profile.email} onChange={(e) => onChangeAction({ email: e.target.value })} />
                </div>

                <div className="space-y-2">
                    <Label>전화번호</Label>
                    <Input value={profile.phone} onChange={(e) => onChangeAction({ phone: e.target.value })} />
                </div>

                <div className="space-y-2 md:col-span-2">
                    <Label>지역</Label>
                    <Input
                        value={profile.location}
                        onChange={(e) => onChangeAction({ location: e.target.value })}
                        placeholder="예: 서울특별시 강남구 …"
                    />
                </div>
            </CardContent>
        </Card>
    );
}
