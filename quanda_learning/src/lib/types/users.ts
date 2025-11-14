export interface Role {
  id: number;
  name: string; // ví dụ: "ROLE_ADMIN", "ROLE_USER"
}

export type Gender = "MALE" | "FEMALE";

export interface User {
  id: number;
  email: string;
  password?: string; // không nên hiển thị ra UI, chỉ để type khớp
  name?: string;
  currentLevel?: string; // ví dụ: "A2", "B1"
  goal?: string; // ví dụ: "B2", "IELTS 6.5"
  image?: string | null; // ảnh đại diện
  background?: string | null; // ảnh nền
  gender?: Gender | null;
  roles?: Role[]; // danh sách role (ví dụ: ROLE_USER, ROLE_ADMIN)
}
