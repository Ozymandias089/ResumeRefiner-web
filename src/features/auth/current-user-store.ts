// src/features/auth/current-user-store.ts
import { authApi } from "./api";
import type { CurrentUser } from "./types";

type Snapshot = {
  user: CurrentUser | null;
  isLoading: boolean;
  error: string | null;
  hasLoaded: boolean;
};

let snapshot: Snapshot = {
  user: null,
  isLoading: false,
  error: null,
  hasLoaded: false,
};

const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
}

function set(partial: Partial<Snapshot>) {
  snapshot = { ...snapshot, ...partial };
  emit();
}

let inFlight: Promise<void> | null = null;

async function loadInternal() {
  set({ isLoading: true, error: null });

  try {
    const user = await authApi.me();
    set({ user, isLoading: false, error: null, hasLoaded: true });
  } catch (e: any) {
    // 보통 비로그인(401)도 여기로 들어올 수 있음 → user=null 로 고정
    set({
      user: null,
      isLoading: false,
      error: e?.message ?? "내 정보 조회에 실패했습니다.",
      hasLoaded: true,
    });
  }
}

export const currentUserStore = {
  // React useSyncExternalStore 용
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  getSnapshot() {
    return snapshot;
  },

  // 외부에서 제어
  async ensureLoaded() {
    if (snapshot.hasLoaded) return;
    if (!inFlight) {
      inFlight = loadInternal().finally(() => {
        inFlight = null;
      });
    }
    return inFlight;
  },

  async refresh() {
    // 강제로 다시 로드
    if (!inFlight) {
      inFlight = loadInternal().finally(() => {
        inFlight = null;
      });
    }
    return inFlight;
  },

  clear() {
    // 로그아웃 등에서 즉시 반영
    set({ user: null, error: null, isLoading: false, hasLoaded: true });
  },
};
