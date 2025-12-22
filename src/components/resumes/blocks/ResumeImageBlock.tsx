"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IconPhoto, IconTrash } from "@tabler/icons-react";
import {ellipsizeMiddle} from "@/lib/formatters";

export function ResumeImageBlock(props: {
    photoFile: File | null;
    disabled?: boolean;
    onChangeFile: (file: File | null) => void;
}) {
    const { photoFile, disabled, onChangeFile } = props;
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

    return (
        <Card>
            <CardHeader>
                <CardTitle>이력서 사진</CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16 rounded-md">
                        <AvatarImage src={previewUrl ?? undefined} alt="resume photo preview" />
                        <AvatarFallback className="rounded-md">
                            <IconPhoto className="h-5 w-5" />
                        </AvatarFallback>
                    </Avatar>

                    <div className="text-muted-foreground min-w-0">
                        <span className="block max-w-[220px] truncate">
                            {photoFile ? ellipsizeMiddle(photoFile.name) : "선택된 파일 없음"}
                        </span>
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
                            onChangeFile(f);
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
                        disabled={disabled || !photoFile}
                        onClick={() => onChangeFile(null)}
                    >
                        <IconTrash className="h-4 w-4" />
                        <span className="ml-2">삭제</span>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
