export enum MilitaryStatus {
    NOT_APPLICABLE = "NOT_APPLICABLE", // 대상 아님(예: 여성/외국인 등) - UX에서 "해당 없음"
    NOT_SERVED = "NOT_SERVED",     // 미필
    SERVING = "SERVING",        // 복무중
    SERVED = "SERVED",         // 군필
    EXEMPT = "EXEMPT"          // 면제
}

export enum MilitaryBranch {
    ARMY="ARMY",
    NAVY="NAVY",
    AIR_FORCE="AIR_FORCE",
    MARINE="MARINE",
    SOCIAL_SERVICE="SOCIAL_SERVICE", // 사회복무요원 등
    OTHER="OTHER"
}

export enum LanguageCode {
    KO = "KO",
    EN = "EN"
}

export enum EducationDegrees {
    HIGH_SCHOOL = "HIGH_SCHOOL",
    ASSOCIATE = "ASSOCIATE",   // 전문학사
    BACHELOR = "BACHELOR",    // 학사
    MASTER = "MASTER",      // 석사
    DOCTOR = "DOCTOR",      // 박사
    OTHER = "OTHER"
}

export enum ResumeCustomSectionsType {
    INTRODUCTION = "INTRODUCTION",   // 자기소개
    PROJECT = "PROJECT",        // 프로젝트
    CERTIFICATION = "CERTIFICATION",  // 자격증
    AWARD = "AWARD",          // 수상
    ACTIVITY = "ACTIVITY",       // 대외활동
    MILITARY_NOTE = "MILITARY_NOTE",  // 병역 관련 보충 설명
    OTHER = "OTHER",
}

export enum Gender {
    MALE = "MALE",
    FEMALE = "FEMALE",
}

export type ResumeSort =
    | "UPDATED_AT_DESC"
    | "UPDATED_AT_ASC"
    | "CREATED_AT_DESC"
    | "CREATED_AT_ASC"
    | "TITLE_ASC"
    | "TITLE_DESC";
