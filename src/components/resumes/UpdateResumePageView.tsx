// src/features/resumes/edit/components/UpdateResumePageView.tsx
"use client";

import { Button } from "@/components/ui/button";
import { TitleBlock } from "@/components/resumes/blocks/TitleBlock";
import { ProfileBlock } from "@/components/resumes/blocks/ProfileBlock";
import { ResumeImageBlock } from "@/components/resumes/blocks/ResumeImageBlock";
import { MilitaryBlock } from "@/components/resumes/blocks/MilitaryBlock";
import { EducationBlock } from "@/components/resumes/blocks/EducationBlock";
import { ExperienceBlock } from "@/components/resumes/blocks/ExperienceBlock";
import { CustomSectionsBlock } from "@/components/resumes/blocks/CustomSectionsBlock";
import {useUpdateResumeForm} from "@/features/resumes/edit/hooks/useUpdateResumeForm";

export function UpdateResumePageView({ slug }: { slug: string }) {
    const f = useUpdateResumeForm(slug);

    if (f.loading) return null; // 너 스타일대로 Skeleton 넣어도 됨
    if (f.error) return <div className="p-6 text-sm">불러오기 실패</div>;

    return (
        <div className="mx-auto w-full max-w-4xl space-y-6 p-4 md:p-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-semibold">이력서 수정</h1>
                    <p className="text-sm text-muted-foreground">
                        변경된 블럭만 PATCH (If-Match)
                    </p>
                </div>
                <Button onClick={f.submit} disabled={f.submitting || !f.canSubmit}>
                    {f.submitting ? "저장 중..." : "저장"}
                </Button>
            </div>

            <TitleBlock
                title={f.state.title}
                languageCode={f.state.languageCode}
                onChangeTitleAction={f.setTitle}
                onChangeLanguageCodeAction={f.setLanguageCode}
            />

            <ProfileBlock profile={f.state.profile} onChangeAction={f.updateProfile} />

            <ResumeImageBlock
                photoUrl={f.photoUrl}
                photoFile={f.state.photoFile}
                removePhoto={f.state.removePhoto}
                disabled={f.submitting}
                onChangeFileAction={f.setPhotoFile}
                onToggleRemoveAction={f.toggleRemovePhoto}
            />

            <MilitaryBlock
                military={f.state.military}
                disabled={f.submitting}
                onChange={f.updateMilitary}
                onChangeStatus={f.setMilitaryStatus}
                onChangeBranch={(branch) => f.updateMilitary({ branch })}
            />

            <EducationBlock
                education={f.state.education}
                onAddAction={f.addEducation}
                onRemoveAction={f.removeEducation}
                onChangeItemAction={f.updateEducation}
            />

            <ExperienceBlock
                experiences={f.state.experiences}
                onAddAction={f.addExperience}
                onRemoveAction={f.removeExperience}
                onChangeItemAction={f.updateExperience}
            />

            <CustomSectionsBlock
                custom={f.state.custom}
                onAddAction={f.addCustomSection}
                onRemoveAction={f.removeCustomSection}
                onChangeItemAction={f.updateCustomSection}
            />
        </div>
    );
}
