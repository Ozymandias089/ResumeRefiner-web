export type Role = "USER" | "ADMIN";

export type CurrentUser = {
  id: number;
  handle: string;
  email: string;
  name: string;
  role: Role;
  isActive: boolean;

  profileImageUrl?: string | null;

  credits: number;
  creditUpdatedAt?: string | null;

  resumeCount: number;
  reviewCount: number;

  createdAt: string; // ISO
};
