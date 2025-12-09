"use client";

import { cn } from "@/lib/utils";

type AppLogoProps = {
  showText?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const iconSizeMap: Record<NonNullable<AppLogoProps["size"]>, string> = {
  sm: "h-6 w-6 text-xs",
  md: "h-8 w-8 text-sm",
  lg: "h-10 w-10 text-base",
};

const textSizeMap: Record<NonNullable<AppLogoProps["size"]>, string> = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg", // 로고 커지면 텍스트도 따라 커짐
};

export function AppLogo({
  showText = true,
  size = "md",
  className,
}: AppLogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div
        className={cn(
          "rounded-md bg-primary/10 flex items-center justify-center font-bold",
          iconSizeMap[size]
        )}
      >
        RR
      </div>
      {showText && (
        <span
          className={cn(
            "font-semibold tracking-tight",
            textSizeMap[size]
          )}
        >
          ResumeRefiner
        </span>
      )}
    </div>
  );
}
