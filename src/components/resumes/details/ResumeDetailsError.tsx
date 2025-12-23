// src/components/resumes/details/ResumeDetailsError.tsx
export function ResumeDetailsError({ message }: { message?: string }) {
    return (
        <div className="mx-auto w-full max-w-3xl px-6 py-12">
            <h1 className="text-xl font-semibold">이력서를 불러오지 못했어요.</h1>
            <p className="mt-2 text-sm text-muted-foreground">{message ?? "Unknown error"}</p>
        </div>
    );
}
