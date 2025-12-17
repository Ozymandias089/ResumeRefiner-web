export type DashboardResume = {
  id: number
  title: string
  slug: string
  updatedAt: string
  lastReviewAt?: string | null
}

export type DashboardReview = {
  id: number
  resumeTitle: string
  resumeSlug: string
  createdAt: string
  overallScore?: number | null
}

// 목록 API가 이런 형태면 좋음(네 백엔드에 맞게 조정)
export type ListResponse<T> = {
  items: T[]
}
