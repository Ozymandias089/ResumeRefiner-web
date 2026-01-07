// src/app/settings/layout.tsx
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { getServerProfile } from "@/features/profile/server";

export default async function SettingsLayout({
                                                 children,
                                             }: {
    children: ReactNode;
}) {
    const profile = await getServerProfile();

    if (!profile) {
        redirect("/login");
    }

    return <>{children}</>;
}
