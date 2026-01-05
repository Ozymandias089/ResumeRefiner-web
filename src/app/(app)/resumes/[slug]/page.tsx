// src/app/(app)/resumes/[slug]/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function ResumeDetailsRoute({
                                                     params,
                                                 }: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    return (
        <Card>
            <CardHeader>
                <CardTitle>리뷰</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                    오른쪽 패널에서 이력서 리뷰를 확인하거나 새 리뷰를 생성할 수 있어요.
                </p>

                <div className="flex gap-2">
                    <Button asChild>
                        <Link href={`/resumes/${slug}/reviews`}>리뷰 목록</Link>
                    </Button>
                    <Button variant="secondary" asChild>
                        <Link href={`/resumes/${slug}/reviews/new`}>새 리뷰 생성</Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
