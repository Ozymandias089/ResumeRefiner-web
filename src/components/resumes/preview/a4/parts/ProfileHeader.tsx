import { cn } from "@/lib/utils";
import type { ResumeProfileResponse } from "@/features/resumes/types/api";
import { SectionTitle } from "./SectionTitle";
import { Line } from "./Line";
import { nonEmpty } from "../helpers";
import Image from "next/image";

export function ProfileHeader(props: {
    profile: ResumeProfileResponse | null;
    photoUrl?: string | null;
    ui: {
        profile: string;
        contact: {
            gender: string;
            age: string;
            birthDate: string;
            email: string;
            phone: string;
            location: string;
        };
    };
    labels: {
        gender: Record<string, string>;
    };
}) {
    const { profile, photoUrl, ui, labels } = props;

    const photoSrc = nonEmpty(photoUrl) ?? "/images/profile-placeholder.png";

    return (
        <div className="flex items-start gap-6">
            <div className="flex-1 min-w-0">
                <div className="text-[18px] font-semibold leading-6 wrap-break-word">
                    {nonEmpty(profile?.name) ?? ""}
                </div>

                <SectionTitle>{ui.profile}</SectionTitle>

                <div className="grid grid-cols-2 gap-x-8 gap-y-1">
                    <div className="col-span-2">
                        <Line
                            label={ui.contact.gender}
                            value={profile?.gender ? labels.gender[profile.gender] : null}
                        />
                    </div>

                    <Line label={ui.contact.age} value={profile?.age?.toString() ?? null} />
                    <Line label={ui.contact.birthDate} value={profile?.birthDate ?? null} />
                    <Line label={ui.contact.email} value={profile?.email ?? null} />
                    <Line label={ui.contact.phone} value={profile?.phone ?? null} />

                    <div className="col-span-2">
                        <Line label={ui.contact.location} value={profile?.location ?? null} />
                    </div>
                </div>
            </div>

            <div className="shrink-0">
                <Image
                    src={photoSrc}
                    alt="Photo"
                    referrerPolicy="no-referrer"
                    className={cn("h-[140px] w-[105px] object-cover rounded-md border bg-muted")}
                />
            </div>
        </div>
    );
}
