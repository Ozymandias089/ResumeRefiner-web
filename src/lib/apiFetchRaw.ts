export async function apiFetchRaw(input: RequestInfo, init?: RequestInit) {
    const res = await fetch(input, {
        credentials: "include",
        ...init,
    });

    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || `HTTP ${res.status}`);
    }
    return res;
}
