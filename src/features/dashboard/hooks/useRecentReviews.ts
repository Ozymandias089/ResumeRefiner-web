"use client"

import { useEffect, useState } from "react"
import { dashboardApi } from "../api"
import type { DashboardReview } from "../types"

const devMock: DashboardReview[] = [
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

export function useRecentReviews(limit = 5) {
  const [items, setItems] = useState<DashboardReview[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let canceled = false

    async function load() {
      setLoading(true)
      setError(null)

      try {
        const data = await dashboardApi.recentReviews(limit)
        if (canceled) return
        setItems(data.items ?? [])
      } catch (e: any) {
        if (canceled) return
        setError(e?.message ?? "최근 리뷰를 불러오지 못했습니다.")

        if (process.env.NODE_ENV === "development") {
          setItems(devMock.slice(0, limit))
        } else {
          setItems([])
        }
      } finally {
        if (!canceled) setLoading(false)
      }
    }

    load()
    return () => {
      canceled = true
    }
  }, [limit])

  return { items, loading, error }
}
