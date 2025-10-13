"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export default function GoogleCallback() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const token = searchParams.get("token")
    const name = searchParams.get("name")
    const email = searchParams.get("email")
    const needsCompletion = searchParams.get("needsCompletion") === "true"

    if (token && email) {
      // 👉 Lưu token và user info
      localStorage.setItem("token", token)
      localStorage.setItem(
        "user",
        JSON.stringify({ name, email, token, role: "ROLE_USER" })
      )

      if (needsCompletion) {
        router.push("/authenticate/complete-profile") // cần bổ sung level + goal
      } else {
        router.push("/home") // đủ thông tin → sang home
      }

    } else {
      router.push("/authenticate/login?error=google")
    }
  }, [router, searchParams])

  return <p className="text-center mt-10">⏳ Đang đăng nhập bằng Google...</p>
}
