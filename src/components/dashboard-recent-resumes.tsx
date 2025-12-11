"use client"

import { useEffect, useState } from "react"
import { IconArrowRight, IconFileDescription } from "@tabler/icons-react"

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

// 타입은 백엔드 응답에 맞게 나중에 조정하면 됨
type DashboardResume = {
  id: number
  title: string
  slug: string
  updatedAt: string
  lastReviewAt?: string | null
}

const mockData: DashboardResume[] = [
  {
    id: 1,
    title: "백엔드 개발자 지원 이력서",
    slug: "backend-developer",
    updatedAt: "2025-01-10T12:23:45.123Z",
    lastReviewAt: "2025-01-11T10:24:13.321Z",
  },
  {
    id: 2,
    title: "SI 경력 개발자 포지션",
    slug: "si-experienced",
    updatedAt: "2025-01-09T09:13:32.000Z",
    lastReviewAt: null,
  },
]

export function DashboardRecentResumes() {
  const [resumes, setResumes] = useState<DashboardResume[]>(mockData)
  const [loading, setLoading] = useState(false)

  // TODO: 백엔드 준비되면 여기에 실제 API 연동
  // useEffect(() => {
  //   async function load() {
  //     try {
  //       setLoading(true)
  //       const res = await fetch("/api/resumes?limit=5", {
  //         credentials: "include",
  //       })
  //       if (!res.ok) return
  //       const data = await res.json()
  //       setResumes(data.items)
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
          <CardTitle className="text-base">최근 이력서</CardTitle>
          <CardDescription>
            최근에 수정하거나 리뷰한 이력서입니다.
          </CardDescription>
        </div>
        <Button variant="ghost" size="sm" asChild>
          <a href="/resumes">
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
        ) : resumes.length === 0 ? (
          <div className="py-8 text-center text-sm text-muted-foreground">
            아직 등록된 이력서가 없습니다.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>제목</TableHead>
                <TableHead className="hidden text-right md:table-cell">
                  마지막 수정
                </TableHead>
                <TableHead className="text-right">액션</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {resumes.map((resume) => (
                <TableRow key={resume.id}>
                  <TableCell className="max-w-[200px] truncate">
                    {resume.title}
                  </TableCell>
                  <TableCell className="hidden text-right text-xs text-muted-foreground md:table-cell">
                    {new Date(resume.updatedAt).toLocaleString("ko-KR", {
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="icon"
                      asChild
                      className="size-8"
                    >
                      <a href={`/resumes/${resume.slug}`}>
                        <IconFileDescription className="size-4" />
                        <span className="sr-only">이력서 열기</span>
                      </a>
                    </Button>
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
