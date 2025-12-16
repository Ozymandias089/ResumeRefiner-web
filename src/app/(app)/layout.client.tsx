"use client";

import dynamic from "next/dynamic";
import type React from "react";

const AppShell = dynamic(
    () => import("./_app-shell").then((m) => m.AppShell),
    { ssr: false }
);

export default function AppLayoutClient({ children }: { children: React.ReactNode }) {
    return <AppShell>{children}</AppShell>;
}
