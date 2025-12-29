"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IconPhoto, IconTrash } from "@tabler/icons-react";
import { ellipsizeMiddle } from "@/lib/formatters";

export function ResumeImageBlock(props: {
    photoUrl?: string | null;
    photoFile: File | null;

    // ✅ create 폼에서는 안 써도 되게 optional
    removePhoto?: boolean;
    onToggleRemoveAction?: (remove: boolean) => void;

    disabled?: boolean;
    onChangeFileAction: (file: File | null) => void;
}) {
    const {
        photoUrl,
        photoFile,
        removePhoto = false,
        onToggleRemoveAction,
        disabled,
        onChangeFileAction,
    } = props;

    const inputRef = React.useRef<HTMLInputElement | null>(null);
    const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);

    React.useEffect(() => {
        if (!photoFile) {
            setPreviewUrl(null);
            return;
        }
        const url = URL.createObjectURL(photoFile);
        setPreviewUrl(url);
        return () => URL.revokeObjectURL(url);
    }, [photoFile]);

    const effectiveSrc = removePhoto ? undefined : (previewUrl ?? photoUrl ?? undefined);

    const label = photoFile
        ? ellipsizeMiddle(photoFile.name)
        : removePhoto
            ? "삭제 예정"
            : photoUrl
                ? "현재 등록된 사진"
                : "선택된 파일 없음";

    // 생성 폼: photoUrl 없음 → delete는 “선택 취소”만 가능
    const canDelete =
        !!photoFile || (!!photoUrl && !removePhoto);

    return (
        <Card>
            <CardHeader>
                <CardTitle>이력서 사진</CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16 rounded-md">
                        <AvatarImage src={effectiveSrc} alt="resume photo preview" />
                        <AvatarFallback className="rounded-md">
                            <IconPhoto className="h-5 w-5" />
                        </AvatarFallback>
                    </Avatar>

                    <div className="min-w-0 text-muted-foreground">
                        <span className="block max-w-[220px] truncate">{label}</span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <input
                        ref={inputRef}
                        type="file"
                        accept="image/*"
                        hidden
                        disabled={disabled}
                        onChange={(e) => {
                            const f = e.target.files?.[0] ?? null;
                            e.currentTarget.value = "";
                            onToggleRemoveAction?.(false);
                            onChangeFileAction(f);
                        }}
                    />

                    <Button
                        type="button"
                        variant="outline"
                        disabled={disabled}
                        onClick={() => inputRef.current?.click()}
                    >
                        파일 선택
                    </Button>

                    <Button
                        type="button"
                        variant="destructive"
                        disabled={disabled || !canDelete}
                        onClick={() => {
                            if (photoFile) {
                                // ✅ create: 선택 취소
                                onChangeFileAction(null);
                                return;
                            }
                            // ✅ edit: 서버 이미지 삭제 의도
                            if (photoUrl) onToggleRemoveAction?.(true);
                        }}
                    >
                        <IconTrash className="h-4 w-4" />
                        <span className="ml-2">{photoFile ? "선택 취소" : "삭제"}</span>
                    </Button>

                    {photoUrl && removePhoto && onToggleRemoveAction && (
                        <Button
                            type="button"
                            variant="secondary"
                            disabled={disabled}
                            onClick={() => onToggleRemoveAction(false)}
                        >
                            삭제 취소
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
