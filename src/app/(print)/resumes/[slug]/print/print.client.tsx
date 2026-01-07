"use client";

import { useEffect } from "react";
import { useResumeDetails } from "@/features/resumes/hooks/useResumeDetails";
import { ResumeA4 } from "@/components/resumes/preview/ResumeA4";

async function waitForImages(root: HTMLElement) {
    const imgs = Array.from(root.querySelectorAll("img")) as HTMLImageElement[];
    await Promise.all(
        imgs.map((img) => {
            if (img.complete) return Promise.resolve();
            return new Promise<void>((resolve) => {
                const done = () => resolve();
                img.addEventListener("load", done, { once: true });
                img.addEventListener("error", done, { once: true });
            });
        })
    );
}

export default function PrintResumeClient({ slug }: { slug: string }) {
    const { data, isLoading } = useResumeDetails(slug);

    useEffect(() => {
        if (isLoading || !data) return;

        const run = async () => {
            // 폰트/이미지 로딩 대기 (Safari에서 백지 방지에 매우 중요)
            // @ts-ignore
            await (document.fonts?.ready ?? Promise.resolve());

            const root = document.querySelector(".print-root") as HTMLElement | null;
            if (root) await waitForImages(root);

            // 레이아웃 확정 2프레임
            await new Promise<void>((r) => requestAnimationFrame(() => requestAnimationFrame(() => r())));

            window.print();
        };

        run();
    }, [isLoading, data]);

    if (isLoading || !data) {
        return <div style={{ padding: 24 }}>Preparing…</div>;
    }

    // 이 페이지는 "A4만" 보여주면 됨
    return <ResumeA4 resume={data} mode="print" showTitle />;
}
