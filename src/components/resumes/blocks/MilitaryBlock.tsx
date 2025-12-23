import { MilitaryBranch, MilitaryStatus } from "@/features/resumes/types/enum";
import { ResumeMilitaryForm } from "@/features/resumes/new/types/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MILITARY_BRANCH_OPTIONS, MILITARY_STATUS_OPTIONS } from "@/features/resumes/new/constants";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const isDetailDisabledStatus = (status: MilitaryStatus) =>
    status === "NOT_APPLICABLE" || status === "EXEMPT";

export function MilitaryBlock(props: {
    military: ResumeMilitaryForm;
    disabled?: boolean;
    onChange: (patch: Partial<ResumeMilitaryForm>) => void;
    onChangeStatus: (status: MilitaryStatus) => void;
    onChangeBranch: (branch: MilitaryBranch | null) => void; // nullable 반영
}) {
    const { military, disabled, onChange, onChangeStatus, onChangeBranch } = props;

    const status = military.militaryStatus as MilitaryStatus;
    const extraDisabled = !!disabled || isDetailDisabledStatus(status);

    const handleChangeStatus = (next: MilitaryStatus) => {
        onChangeStatus(next);

        if (isDetailDisabledStatus(next)) {
            onChange({
                branch: null,   // nullable이니까 null이 정답
                period: "",
                rank: "",
                notes: "",
            });
        }
    };

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
                        onValueChange={(v) => handleChangeStatus(v as MilitaryStatus)}
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
                        value={military.branch ? String(military.branch) : ""} // ✅ null이면 빈 값
                        onValueChange={(v) => onChangeBranch(v ? (v as MilitaryBranch) : null)}
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

                    {String(military.militaryStatus) === "NOT_APPLICABLE" ? (
                        <p className="text-xs text-muted-foreground">
                            ‘해당없음’ 선택 시 군별/기간/계급/비고 입력은 비활성화됩니다.
                        </p>
                    ) : null}

                    {String(military.militaryStatus) === "EXEMPT" ? (
                        <p className="text-xs text-muted-foreground">
                            ‘면제’ 선택 시 군별/기간/계급/비고 입력은 비활성화됩니다.
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
