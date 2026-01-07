"use client";

import { useEffect, useSyncExternalStore } from "react";
import { profileStore } from "../profile-store";

export function useProfile() {
    const state = useSyncExternalStore(
        profileStore.subscribe,
        profileStore.getSnapshot,
        profileStore.getSnapshot
    );

    useEffect(() => {
        profileStore.ensureLoaded();
    }, []);

    return {
        profile: state.profile,
        isLoading: state.isLoading,
        error: state.error,
        hasLoaded: state.hasLoaded,
        refresh: profileStore.refresh,
        clear: profileStore.clear,
    };
}
