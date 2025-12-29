"use client";

import { useEffect, useState } from "react";
import { resumeApi } from "@/features/resumes/api";
import type { ResumeSummary } from "@/features/resumes/types/api";

export function useRecentResumes(limit = 5) {
  const [items, setItems] = useState<ResumeSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let canceled = false;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const data = await resumeApi.getResumeSummaries({
          page: 0,
          size: limit,
          sort: "UPDATED_AT_DESC",
        });

        if (canceled) return;
        setItems(data.resumes ?? []);
      } catch (e: any) {
        if (canceled) return;
        setError(e?.message ?? "최근 이력서를 불러오지 못했습니다.");
        setItems([]);
      } finally {
        if (!canceled) setLoading(false);
      }
    }

    load();
    return () => {
      canceled = true;
    };
  }, [limit]);

  return { items, loading, error };
}
