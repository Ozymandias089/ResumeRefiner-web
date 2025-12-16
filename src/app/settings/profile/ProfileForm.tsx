"use client";

import { MemberDetails } from "@/features/profile/types/api";
import { useProfileMutations } from "@/features/profile/hooks/useProfileMutations";
import {useState} from "react";

type Props = {
    profile: MemberDetails;
};

export function ProfileForm({ profile } : Props) {
    const { updateProfile, isUpdatingProfile } = useProfileMutations();

    const [name, setName] = useState(profile.name);
    const [email, setEmail] = useState(profile.email);

    return (
        <section>
            <h2 className="text-lg font-semibold mb-4">프로필 정보</h2>

            <div className="space-y-4 max-w-md">
                <div>
                    <label className="text-sm font-medium">이름</label>
                    <input
                        className="mt-1 w-full border rounded px-3 py-2 text-sm"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div>
                    <label className="text-sm font-medium">Email</label>
                    <input
                        className="mt-1 w-full border rounded px-3 py-2 text-sm"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <button
                    disabled={isUpdatingProfile}
                    className="text-sm underline"
                    onClick={async () => {
                        await updateProfile({
                            name: name !== profile.name ? name : undefined,
                            email: email !== profile.email ? email : undefined,
                        });
                    }}
                >
                    {isUpdatingProfile ? "Saving..." : "Save changes"}
                </button>
            </div>
        </section>
    );
}