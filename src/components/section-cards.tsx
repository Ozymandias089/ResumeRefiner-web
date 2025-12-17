"use client"

import { IconCalendar, IconFileDescription, IconSparkles, IconStars } from "@tabler/icons-react"

import { useCurrentUser } from "@/hooks/use-current-user"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { formatDate } from "@/lib/datetime"

export function SectionCards() {
  const { user } = useCurrentUser()

  const credits = user?.credits ?? 0
  const resumeCount = user?.resumeCount ?? 0
  const reviewCount = user?.reviewCount ?? 0

  const createdAt = user?.createdAt ? new Date(user.createdAt) : null
  const now = new Date()
  const daysSinceJoined =
    createdAt != null
      ? Math.floor(
          (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24)
        )
      : null

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {/* 1) 남은 크레딧 */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>남은 크레딧</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {credits.toLocaleString()}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconSparkles />
              AI 리뷰 실행에 사용됩니다
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            필요한 만큼 충전해서 사용하세요
          </div>
          <div className="text-muted-foreground">
            Billing 페이지에서 크레딧을 충전할 수 있습니다.
          </div>
        </CardFooter>
      </Card>

      {/* 2) 등록한 이력서 개수 */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>등록한 이력서</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {resumeCount.toLocaleString()}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconFileDescription />
              이력서 관리
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Resumes 페이지에서 이력서를 관리하세요
          </div>
          <div className="text-muted-foreground">
            신규 이력서를 업로드하고, 기존 이력서를 수정할 수 있습니다.
          </div>
        </CardFooter>
      </Card>

      {/* 3) 수행한 리뷰 횟수 */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>실행한 리뷰</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {reviewCount.toLocaleString()}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconStars />
              리뷰 히스토리
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Reviews 페이지에서 상세 피드백을 다시 확인할 수 있습니다
          </div>
          <div className="text-muted-foreground">
            문장별 피드백과 점수를 한 번 더 점검해 보세요.
          </div>
        </CardFooter>
      </Card>

      {/* 4) 가입 일자 / 사용 기간 */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>가입 정보</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {daysSinceJoined != null ? `${daysSinceJoined}일째` : "-"}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconCalendar />
              {createdAt ? formatDate(createdAt) : "가입일 정보 없음"}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            ResumeRefiner와 함께한 시간
          </div>
          <div className="text-muted-foreground">
            꾸준히 이력서를 다듬으면서 포트폴리오를 완성해 보세요.
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
