"use client";

import { useEffect, useSyncExternalStore } from "react";
import { currentUserStore } from "../current-user-store";

export function useCurrentUser() {
  const state = useSyncExternalStore(
    currentUserStore.subscribe,
    currentUserStore.getSnapshot,
    currentUserStore.getSnapshot // SSR에서도 동일 스냅샷
  );

  // 최초 사용 시 1회 로드
  useEffect(() => {
    currentUserStore.ensureLoaded();
  }, []);

  return {
    user: state.user,
    isLoading: state.isLoading,
    error: state.error,
    refresh: currentUserStore.refresh,
    clear: currentUserStore.clear,
    hasLoaded: state.hasLoaded,
  };
}
