  // src/lib/api.ts
export interface LoginResponse {
  id: number
  name: string
  token: string
  authorities?: { authority: string }[]
  avatar?: string
  needsCompletion?: boolean
  status: "ACTIVE" | "BANNED"  // hoặc string nếu bạn muốn linh hoạt
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
