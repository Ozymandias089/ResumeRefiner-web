// src/app/(print)/layout.tsx
import "@/styles/print-resume.css";

export default function PrintLayout({ children }: { children: React.ReactNode }) {
    // AppShell 없이 "본문만" 렌더링
    return <>{children}</>;
}
