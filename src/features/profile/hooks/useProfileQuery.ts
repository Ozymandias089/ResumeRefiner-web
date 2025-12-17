"use client";

import {MemberDetails} from "@/features/profile/types/api";
import {useCallback, useEffect, useState} from "react";
import {profileApi} from "@/features/profile/api";

type State = {
    data: MemberDetails | null;
    isLoading: boolean;
    error: unknown;
    hasLoaded: boolean;
};

export function useProfileQuery(options?: {auto?: boolean}) {
    const auto = options?.auto ?? true;

    const [state, setState] = useState<State>({
        data: null,
        isLoading: false,
        error: null,
        hasLoaded: false,
    });

    const fetchProfile = useCallback(async () => {
        setState((prev) => ({
            ...prev,
            isLoading: true,
            error: null,
        }));

        try {
            const data = await profileApi.getProfile();
            setState({
                data,
                isLoading: false,
                error: null,
                hasLoaded: true,
            })
            return data;
        } catch (e) {
            setState((prev => ({
                ...prev,
                isLoading: false,
                error: e,
                hasLoaded: true,
            })));

            throw e;
        }
    }, []);

    useEffect(() => {
        if (!auto) return;
        // 최초 1회 로드
        if (state.hasLoaded) return;

        void fetchProfile();
    }, [auto, fetchProfile, state.hasLoaded]);

    const refresh = useCallback(async () => {
        return await fetchProfile();
    }, [fetchProfile]);

    const clear = useCallback(() => {
        setState({
            data: null,
            isLoading: false,
            error: null,
            hasLoaded: false,
        });
    }, []);

    return {
        profile: state.data,
        isLoading: state.isLoading,
        error: state.error,
        hasLoaded: state.hasLoaded,
        refresh,
        clear,
    };
}