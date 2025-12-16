// src/features/profile/server.ts
import type { MemberDetails } from "./types/api";
import { cookies } from "next/headers";

const BACKEND_BASE =
    process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";

export async function getServerProfile(): Promise<MemberDetails | null> {
    // Next 16: cookies()는 Promise
    const cookieStore: any = await cookies();
    const all = typeof cookieStore.getAll === "function" ? cookieStore.getAll() : [];
    const cookieHeader = all.map((c: any) => `${c.name}=${c.value}`).join("; ");

    console.log("[getServerProfile] cookies:", all.map((c:any)=>c.name));
    console.log("[getServerProfile] cookieHeader length:", cookieHeader.length);

    const res = await fetch(`${BACKEND_BASE}/api/profile`, {
        method: "GET",
        headers: cookieHeader ? { cookie: cookieHeader } : {},
        cache: "no-store",
    });

    console.log("[getServerProfile] url:", `${BACKEND_BASE}/api/profile`);

    console.log("[getServerProfile] status:", res.status);

    if (!res.ok) {
        console.log("getServerProfile failed:", res.status);
        return null;
    }

    return (await res.json()) as MemberDetails;
}
