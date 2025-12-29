// src/components/resumes/details/ResumeDetailsLoading.tsx
import { Skeleton } from "@/components/ui/skeleton";

export function ResumeDetailsLoading() {
    return (
        <div className="mx-auto w-full max-w-6xl px-6 py-8">
            <div className="flex items-center justify-between">
                <Skeleton className="h-7 w-64" />
                <div className="flex gap-2">
                    <Skeleton className="h-9 w-24" />
                    <Skeleton className="h-9 w-24" />
                </div>
            </div>
            <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_380px]">
                <Skeleton className="h-[900px] w-full rounded-xl" />
                <Skeleton className="h-[520px] w-full rounded-xl" />
            </div>
        </div>
    );
}
