"use client"

import { IconArrowRight, IconStars } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formatMDHM } from "@/lib/datetime"
import { useRecentReviews } from "@/features/dashboard/hooks/useRecentReviews"

export function DashboardRecentReviews() {
  const { items: reviews, loading } = useRecentReviews(5);

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between gap-2">
        <div>
          <CardTitle className="text-base">최근 리뷰</CardTitle>
          <CardDescription>
            최근 실행한 이력서 리뷰 내역입니다.
          </CardDescription>
        </div>
        <Button variant="ghost" size="sm" asChild>
          <a href="/reviews">
            전체 보기
            <IconArrowRight className="ml-1 size-3" />
          </a>
        </Button>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="py-8 text-center text-sm text-muted-foreground">
            불러오는 중...
          </div>
        ) : reviews.length === 0 ? (
          <div className="py-8 text-center text-sm text-muted-foreground">
            아직 실행한 리뷰가 없습니다.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>이력서</TableHead>
                <TableHead className="hidden text-right md:table-cell">
                  리뷰 시각
                </TableHead>
                <TableHead className="text-right">점수</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reviews.map((review) => (
                <TableRow key={review.id}>
                  <TableCell className="max-w-[200px] truncate">
                    {review.resumeTitle}
                  </TableCell>
                  <TableCell className="hidden text-right text-xs text-muted-foreground md:table-cell">
                    {formatMDHM(review.createdAt)}
                  </TableCell>
                  <TableCell className="text-right text-sm">
                    {review.overallScore != null ? (
                      <span className="inline-flex items-center gap-1">
                        <IconStars className="size-4" />
                        {review.overallScore.toFixed(1)}
                      </span>
                    ) : (
                      <span className="text-muted-foreground text-xs">
                        점수 없음
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}
