import { apiFetch } from "@/shared/api/client"
import type { DashboardResume, DashboardReview, ListResponse } from "./types"

export const dashboardApi = {
  recentResumes(limit = 5) {
    // ✅ 네 실제 엔드포인트로 바꿔
    return apiFetch<ListResponse<DashboardResume>>(
      `/api/resumes?limit=${limit}`
    )
  },

  recentReviews(limit = 5) {
    // ✅ 네 실제 엔드포인트로 바꿔
    return apiFetch<ListResponse<DashboardReview>>(
      `/api/reviews?limit=${limit}`
    )
  },
}
