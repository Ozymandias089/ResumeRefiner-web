"use client";

import { IconArrowRight, IconFileDescription } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatMDHM } from "@/lib/datetime";
import { useRecentResumes } from "@/features/dashboard/hooks/useRecentResumes";

export function DashboardRecentResumes() {
  const { items: resumes, loading } = useRecentResumes(5);

  return (
      <Card className="h-full">
        <CardHeader className="flex flex-row items-center justify-between gap-2">
          <div>
            <CardTitle className="text-base">최근 이력서</CardTitle>
            <CardDescription>
              최근에 수정된 이력서입니다.
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
                      <TableRow key={resume.slug}>
                        <TableCell className="max-w-[200px] truncate">
                          {resume.title}
                        </TableCell>
                        <TableCell className="hidden text-right text-xs text-muted-foreground md:table-cell">
                          {formatMDHM(resume.updatedAt)}
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
  );
}
