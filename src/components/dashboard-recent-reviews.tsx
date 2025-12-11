"use client"

import { useEffect, useState } from "react"
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

type DashboardReview = {
  id: number
  resumeTitle: string
  resumeSlug: string
  createdAt: string
  overallScore?: number | null
}

const mockReviews: DashboardReview[] = [
  {
    id: 101,
    resumeTitle: "백엔드 개발자 지원 이력서",
    resumeSlug: "backend-developer",
    createdAt: "2025-01-11T10:24:13.321Z",
    overallScore: 4.3,
  },
  {
    id: 102,
    resumeTitle: "SI 경력 개발자 포지션",
    resumeSlug: "si-experienced",
    createdAt: "2025-01-10T21:02:00.000Z",
    overallScore: 3.8,
  },
]

export function DashboardRecentReviews() {
  const [reviews, setReviews] = useState<DashboardReview[]>(mockReviews)
  const [loading, setLoading] = useState(false)

  // TODO: 실제 API 연결
  // useEffect(() => {
  //   async function load() {
  //     try {
  //       setLoading(true)
  //       const res = await fetch("/api/reviews?limit=5", {
  //         credentials: "include",
  //       })
  //       if (!res.ok) return
  //       const data = await res.json()
  //       setReviews(data.items)
  //     } finally {
  //       setLoading(false)
  //     }
  //   }
  //   load()
  // }, [])

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
                    {new Date(review.createdAt).toLocaleString("ko-KR", {
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
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
