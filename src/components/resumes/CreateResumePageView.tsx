import {useCreateResumeForm} from "@/features/resumes/new/hooks/useCreateResumeForm";
import {Button} from "@/components/ui/button";
import {TitleBlock} from "@/components/resumes/blocks/TitleBlock";
import {ProfileBlock} from "@/components/resumes/blocks/ProfileBlock";
import {ResumeImageBlock} from "@/components/resumes/blocks/ResumeImageBlock";
import {MilitaryBlock} from "@/components/resumes/blocks/MilitaryBlock";
import {EducationBlock} from "@/components/resumes/blocks/EducationBlock";
import {ExperienceBlock} from "@/components/resumes/blocks/ExperienceBlock";
import {CustomSectionsBlock} from "@/components/resumes/blocks/CustomSectionsBlock";

export function CreateResumePageView(){

    const f = useCreateResumeForm();

    return (
        <div className="mx-auto w-full max-w-4xl space-y-6 p-4 md:p-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-semibold">새 이력서 만들기</h1>
                    <p className="text-sm text-muted-foreground">
                        고정 블럭 + 커스텀 블럭 추가 방식
                    </p>
                </div>
                <Button onClick={f.submit} disabled={f.submitting}>
                    {f.submitting ? "생성 중..." : "생성"}
                </Button>
            </div>

            <TitleBlock
                title={f.state.title}
                languageCode={f.state.languageCode}
                onChangeTitle={f.setTitle}
                onChangeLanguageCode={f.setLanguageCode}
            />
            <ProfileBlock
                profile={f.state.profile}
                onChange={f.updateProfile}
            />
            <ResumeImageBlock
                photoFile={f.state.photoFile}
                onChangeFile={f.setPhotoFile}
                disabled={f.submitting}
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
                onAdd={f.addEducation}
                onRemove={f.removeEducation}
                onChangeItem={f.updateEducation}
            />
            <ExperienceBlock
                experiences={f.state.experiences}
                onAdd={f.addExperience}
                onRemove={f.removeExperience}
                onChangeItem={f.updateExperience}
            />
            <CustomSectionsBlock
                custom={f.state.custom}
                onAdd={f.addCustomSection}
                onRemove={f.removeCustomSection}
                onChangeItem={f.updateCustomSection}
            />
        </div>
    );
}