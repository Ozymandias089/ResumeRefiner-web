import { useMemo } from "react";
import type { ResumeCustomSection } from "@/features/resumes/types/api";
import { ResumeCustomSectionsType } from "@/features/resumes/types/enum";
import {A4Labels} from "@/components/resumes/preview/a4/types";
import {byOrder, nonEmpty} from "@/components/resumes/preview/a4/helpers";

export type CustomSectionItemView = {
    key: string;
    showSubject: boolean;
    subject: string | null;
    content: string | null;
};

export type CustomSectionGroupView = {
    type: ResumeCustomSectionsType;
    sectionTitle: string;
    items: CustomSectionItemView[];
};

function makeStableKey(sec: ResumeCustomSection, index: number) {
    // 1) id가 있으면 최우선 사용 (API에 id가 있다면 여기만 바꾸면 전체 개선됨)
    // @ts-expect-error - optional id support
    const id = sec.id as string | undefined;
    if (id) return `custom:${id}`;

    // 2) 없으면 “충돌 가능성 낮춘 합성키”
    // displayOrder는 중복될 수도 있으니 index 포함
    return `custom:${sec.type}:${sec.displayOrder}:${index}`;
}

export function useCustomSectionsView(args: {
    customSections: ResumeCustomSection[];
    labels: A4Labels;
    order: ResumeCustomSectionsType[];
}) {
    const { customSections, labels, order } = args;

    return useMemo<CustomSectionGroupView[]>(() => {
        if (!customSections.length) return [];

        const sorted = [...customSections].sort(byOrder);

        // type별 그룹
        const grouped = sorted.reduce<Record<string, ResumeCustomSection[]>>((acc, cur) => {
            const k = String(cur.type);
            (acc[k] ??= []).push(cur);
            return acc;
        }, {});

        // type 순서 고정
        const typeRank = new Map<ResumeCustomSectionsType, number>(order.map((t, i) => [t, i]));
        const sortedTypes: ResumeCustomSectionsType[] = Object.values(grouped)
            .map((list) => list[0]!.type)
            .sort((a, b) => (typeRank.get(a) ?? 999) - (typeRank.get(b) ?? 999));

        return sortedTypes.map((type) => {
            const list = grouped[String(type)] ?? [];
            const sectionTitle = labels.customType[type];

            const items: CustomSectionItemView[] = list.map((sec, idx) => {
                const subject = nonEmpty(sec.subject);
                const showSubject = !!subject && subject !== sectionTitle;

                return {
                    key: makeStableKey(sec, idx),
                    showSubject,
                    subject,
                    content: sec.content ?? null,
                };
            });

            return { type, sectionTitle, items };
        });
    }, [customSections, labels, order]);
}
