// src/lib/api.ts
export interface LoginResponse {
  id: number;
  token: string;
  name: string;
  authorities: { authority: string }[];
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  const res = await fetch("http://localhost:8888/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error("Đăng nhập thất bại");
  }

  return res.json();
}
