"use client"

import { useEffect, useState } from "react"
import { dashboardApi } from "../api"
import type { DashboardResume } from "../types"

const devMock: DashboardResume[] = [
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

export function useRecentResumes(limit = 5) {
  const [items, setItems] = useState<DashboardResume[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let canceled = false

    async function load() {
      setLoading(true)
      setError(null)

      try {
        const data = await dashboardApi.recentResumes(limit)
        if (canceled) return
        setItems(data.items ?? [])
      } catch (e: any) {
        if (canceled) return
        setError(e?.message ?? "최근 이력서를 불러오지 못했습니다.")

        // 개발 편의: API 아직 없으면 mock으로라도 화면 유지
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
