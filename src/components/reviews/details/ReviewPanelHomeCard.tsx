import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ReviewPanelHomeCard(props: {
    slug: string;
    mode?: "read" | "edit";
}) {
    const { slug, mode = "read" } = props;

    const base =
        mode === "edit"
            ? `/resumes/${slug}/edit/reviews`
            : `/resumes/${slug}/reviews`;

    return (
        <Card>
            <CardHeader>
                <CardTitle>리뷰</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                    오른쪽 패널에서 이력서 리뷰를 확인하거나 새 리뷰를 생성할 수 있어요.
                </p>

                <div className="flex flex-wrap gap-2">
                    <Button asChild>
                        <Link href={base}>리뷰 목록</Link>
                    </Button>
                    <Button variant="secondary" asChild>
                        <Link href={`${base}/new`}>새 리뷰 생성</Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
