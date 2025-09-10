"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Courses from "@/components/sections/Courses";

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
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-indigo-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Chào mừng bạn đến với Học Tiếng Anh Online
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Khám phá các khóa học từ cơ bản đến nâng cao, được thiết kế để phù hợp với mọi trình độ.
          </p>
          <a
            href="#courses"
            className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-md shadow hover:bg-gray-100 transition"
          >
            Khám phá khóa học
          </a>
        </div>
      </section>

      {/* Courses Section */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <Courses />
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-6 mt-16">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} Học Tiếng Anh Online. All rights reserved.</p>
          <nav className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Giới thiệu</a>
            <a href="#" className="hover:text-white">Liên hệ</a>
            <a href="#" className="hover:text-white">Điều khoản</a>
          </nav>
        </div>
      </footer>
    </main>
  )
}
