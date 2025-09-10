"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Courses from "@/components/sections/Courses";
import CoursesByLevel from "@/components/course/CoursesByLevel";
import Footer from "@/components/Footer";

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    // Lấy token & name từ localStorage
    const token = localStorage.getItem("token");
    const userName = localStorage.getItem("name");

    if (!token) {
      // Nếu chưa login thì chuyển về trang login
      router.push("/authenticate/login");
    } else {
      setName(userName || "Người dùng");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    router.push("/authenticate/login");
  };

  return (
    <div className="flex">
      {/* Sidebar cố định */}
      <aside className="w-64 h-screen fixed top-0 left-0 bg-white shadow-md">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-indigo-600">Menu</h2>
        </div>
        <nav className="p-6 space-y-4 overflow-y-auto h-[calc(100%-4rem)]">
          <a
            href="#courses"
            className="block text-gray-700 hover:text-indigo-600"
          >
            Khóa học nổi bật
          </a>
          <a href="#A1" className="block text-gray-700 hover:text-indigo-600">
            Level A1
          </a>
          <a href="#A2" className="block text-gray-700 hover:text-indigo-600">
            Level A2
          </a>
          <a href="#B1" className="block text-gray-700 hover:text-indigo-600">
            Level B1
          </a>
          <a href="#B2" className="block text-gray-700 hover:text-indigo-600">
            Level B2
          </a>
          <a href="#C1" className="block text-gray-700 hover:text-indigo-600">
            Level C1
          </a>
          <a href="#C2" className="block text-gray-700 hover:text-indigo-600">
            Level C2
          </a>
        </nav>
      </aside>

      {/* Nội dung chính */}
      <main className="flex-1 ml-64 min-h-screen bg-gray-50 flex flex-col">
        <header className="flex items-center justify-between bg-indigo-900 bg-opacity-90 border-b border-indigo-800 px-6 py-4">
          <h1 className="text-xl font-semibold text-white">Trang chủ</h1>
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-indigo-300 font-medium">
                {name || "user@example.com"}
              </p>
            </div>
            <img
              alt="Avatar người dùng"
              className="w-10 h-10 rounded-full object-cover"
              src="https://storage.googleapis.com/a1aa/image/e66e60e8-316d-4893-bc52-7cd1dd98e305.jpg"
              width={40}
              height={40}
            />
          </div>
        </header>
        {/* Hero Section */}
        <section className="bg-indigo-600 text-white py-20">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Chào mừng bạn đến với Học Tiếng Anh Online
            </h1>
            <p className="text-lg md:text-xl mb-8">
              Khám phá các khóa học từ cơ bản đến nâng cao, được thiết kế để phù
              hợp với mọi trình độ.
            </p>
            <a
              href="#courses"
              className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-md shadow hover:bg-gray-100 transition"
            >
              Khám phá khóa học
            </a>
          </div>
        </section>

        {/* Top 6 Courses Section */}
        <div id="courses" className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-indigo-700">
            Khóa học nổi bật
          </h2>
          <Courses />
        </div>

        <div className="max-w-6xl mx-auto px-6 py-16 space-y-16">
          <div id="A1">
            <CoursesByLevel level="A1" />
          </div>
          <div id="A2">
            <CoursesByLevel level="A2" />
          </div>
          <div id="B1">
            <CoursesByLevel level="B1" />
          </div>
          <div id="B2">
            <CoursesByLevel level="B2" />
          </div>
          <div id="C1">
            <CoursesByLevel level="C1" />
          </div>
          <div id="C2">
            <CoursesByLevel level="C2" />
          </div>
        </div>

        {/* Footer nằm trong main */}
        <Footer />
      </main>
    </div>
  );
}
