"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import type { ResumeProfileForm } from "@/features/resumes/new/types/form";

export function ProfileBlock(props: {
    profile: ResumeProfileForm;
    onChange: (patch: Partial<ResumeProfileForm>) => void;
}) {
    const { profile, onChange } = props;

    return (
        <Card>
            <CardHeader>
                <CardTitle>프로필</CardTitle>
            </CardHeader>

            <CardContent className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                    <Label>이름</Label>
                    <Input value={profile.name} onChange={(e) => onChange({ name: e.target.value })} />
                </div>

                <div className="space-y-2">
                    <Label>이메일</Label>
                    <Input value={profile.email} onChange={(e) => onChange({ email: e.target.value })} />
                </div>

                <div className="space-y-2">
                    <Label>전화번호</Label>
                    <Input value={profile.phone} onChange={(e) => onChange({ phone: e.target.value })} />
                </div>

                <div className="space-y-2 md:col-span-2">
                    <Label>지역</Label>
                    <Input
                        value={profile.location}
                        onChange={(e) => onChange({ location: e.target.value })}
                        placeholder="예: 서울특별시 강남구 …"
                    />
                </div>
            </CardContent>
        </Card>
    );
}
