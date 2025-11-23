export interface Role {
  id: number;
  name: string; // ví dụ: "ROLE_ADMIN", "ROLE_USER"
}

export type Gender = "MALE" | "FEMALE";
export type UserStatus = "ACTIVE" | "BANNED";

export interface User {
  id: number;
  email: string;
  password?: string; // không hiển thị ra UI
  name?: string;
  currentLevel?: string;
  goal?: string;
  image?: string | null;
  background?: string | null;
  gender?: Gender | null;
  roles?: Role[];

  // 🟢 Trạng thái người dùng
  status: UserStatus;
}

