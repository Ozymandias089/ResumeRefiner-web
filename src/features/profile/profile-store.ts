import { profileApi } from "./api";
import type { MemberDetails } from "./types/api";

type Snapshot = {
    profile: MemberDetails | null;
    isLoading: boolean;
    error: string | null;
    hasLoaded: boolean;
};

let snapshot: Snapshot = {
    profile: null,
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
        const profile = await profileApi.getProfile();
        set({ profile, isLoading: false, error: null, hasLoaded: true });
    } catch (e: any) {
        set({
            profile: null,
            isLoading: false,
            error: e?.message ?? "프로필 조회에 실패했습니다.",
            hasLoaded: true,
        });
    }
}

export const profileStore = {
    subscribe(listener: () => void) {
        listeners.add(listener);
        return () => listeners.delete(listener);
    },
    getSnapshot() {
        return snapshot;
    },

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
        if (!inFlight) {
            inFlight = loadInternal().finally(() => {
                inFlight = null;
            });
        }
        return inFlight;
    },

    clear() {
        set({ profile: null, error: null, isLoading: false, hasLoaded: true });
    },
};
