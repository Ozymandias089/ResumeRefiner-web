// src/components/resumes/ResumeTwoPaneShell.tsx
import { Separator } from "@/components/ui/separator";

export function ResumeTwoPaneShell(props: {
    left: React.ReactNode;
    right: React.ReactNode;
}) {
    const { left, right } = props;

    return (
        <div className="h-[calc(100dvh-4rem)]">
            <div
                className={[
                    "grid h-full gap-0",
                    "grid-cols-1",
                    "lg:grid-cols-[minmax(0,1fr)_1px_clamp(320px,33vw,560px)]",
                    "xl:grid-cols-[minmax(0,1fr)_1px_clamp(360px,30vw,620px)]",
                ].join(" ")}
            >
                {/* Left */}
                <div className="min-w-0 overflow-auto overflow-x-auto p-4 md:p-6">
                    {left}
                </div>

                {/* Divider */}
                <div className="hidden lg:block">
                    <Separator orientation="vertical" className="h-full" />
                </div>

                {/* Right */}
                <aside className="min-w-0 overflow-auto border-t lg:border-t-0 p-4 md:p-6">
                    {right}
                </aside>
            </div>
        </div>
    );
}
