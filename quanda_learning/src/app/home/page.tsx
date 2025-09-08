"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    // Lấy token & name từ localStorage
    const token = localStorage.getItem("token");
    const userName = localStorage.getItem("name");

    if (!token) {
      // Nếu chưa login thì chuyển về trang login
      router.push("/login");
    } else {
      setName(userName || "Người dùng");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    router.push("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">🏠 Trang Home</h1>
      <p className="text-lg mb-6">Xin chào, {name}</p>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
      >
        Đăng xuất
      </button>
    </div>
  );
}
