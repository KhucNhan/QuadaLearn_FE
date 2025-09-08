// src/api/registerUser.ts

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  currentLevel: string;
  goal: string;
}

export async function registerUser(userData: RegisterData): Promise<any> {
  try {
    const res = await fetch("http://localhost:8888/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Lỗi đăng ký");
    }

    return await res.json();
  } catch (error: any) {
    throw new Error(error.message || "Đã xảy ra lỗi khi đăng ký");
  }
}
