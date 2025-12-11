"use client"

import { useEffect, useState } from "react"

export type CurrentUser = {
  id: number
  handle: string
  email: string
  name: string
  role: "USER" | "ADMIN" | string
  isActive: boolean
  profileImageUrl: string | null
  credits: number
  creditUpdatedAt: string
  resumeCount: number
  reviewCount: number
  createdAt: string
}

export function useCurrentUser() {
  const [user, setUser] = useState<CurrentUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let canceled = false

    async function load() {
      try {
        setLoading(true)
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        const res = await fetch(`${baseUrl}/api/auth/me`, {
          credentials: "include",
        })

        if (!res.ok) {
          // 비로그인 상태이거나 에러인 경우
          if (!canceled) {
            setUser(null)
          }
          return
        }

        const data = (await res.json()) as CurrentUser
        if (!canceled) {
          setUser(data)
        }
      } catch (e) {
        if (!canceled) {
          setError(e as Error)
        }
      } finally {
        if (!canceled) {
          setLoading(false)
        }
      }
    }

    load()

    return () => {
      canceled = true
    }
  }, [])

  return { user, loading, error }
}
