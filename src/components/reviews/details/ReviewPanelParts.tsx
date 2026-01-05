"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export function ReviewPanelCard(props: {
    title: string;
    right?: React.ReactNode;
    subtitle?: React.ReactNode;
    children: React.ReactNode;
}) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-start justify-between gap-3">
                <div className="min-w-0">
                    <CardTitle className="truncate">{props.title}</CardTitle>
                    {props.subtitle ? (
                        <div className="mt-1 text-xs text-muted-foreground">{props.subtitle}</div>
                    ) : null}
                </div>
                {props.right}
            </CardHeader>
            <CardContent className="space-y-4">{props.children}</CardContent>
        </Card>
    );
}

export function ReviewPanelLoading() {
    return (
        <div className="space-y-2">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
        </div>
    );
}

export function ReviewPanelError(props: { message?: string; onRetry?: () => void }) {
    return (
        <div className="space-y-2">
            <p className="text-sm text-destructive">{props.message ?? "불러오지 못했어요."}</p>
            {props.onRetry ? (
                <Button variant="secondary" onClick={props.onRetry}>
                    다시 시도
                </Button>
            ) : null}
        </div>
    );
}

export function ReviewPanelEmpty(props: { children?: React.ReactNode }) {
    return (
        <div className="space-y-3">
            <p className="text-sm text-muted-foreground">아직 생성된 리뷰가 없어요.</p>
            {props.children}
        </div>
    );
}
