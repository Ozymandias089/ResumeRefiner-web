"use client";

import { Separator } from "@/components/ui/separator";
import { LandingLeftSection } from "@/components/landing/left-section";
import { LandingRightSection } from "@/components/landing/right-section";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex">
      <LandingLeftSection />
      <Separator orientation="vertical" className="h-[70%] self-center" />
      <LandingRightSection />
    </div>
  );
}
