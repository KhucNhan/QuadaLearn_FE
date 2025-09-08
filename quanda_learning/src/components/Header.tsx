"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import '../styles/Header.css';
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between">
        {/* Logo + Tiêu đề */}
        <div className="flex items-center space-x-4">
          <img
            src="https://logoart.vn/blog/wp-content/uploads/2013/03/thiet-ke-logo-sao-kim-7-1.jpg"
            alt="Logo"
            className="w-14 h-14 rounded-full shadow-lg"
          />
          <h1 className="text-white text-3xl md:text-4xl font-extrabold drop-shadow-lg">
            QuadaLearn
          </h1>
        </div>

        {/* Thanh điều hướng trên máy tính */}
        <nav className="hidden md:flex space-x-8 mt-4 md:mt-0 text-white font-semibold text-lg drop-shadow-md">
          <a href="#" className="hover:text-yellow-300 transition-colors duration-300">Trang chủ</a>
          <a href="#courses" className="hover:text-yellow-300 transition-colors duration-300">Khóa học phổ biến</a>
          <a href="#featureAI" className="hover:text-yellow-300 transition-colors duration-300">Tính năng AI</a>
          <a href="#capacityTest" className="hover:text-yellow-300 transition-colors duration-300">Kiểm tra trình độ</a>
        </nav>

        {/* Nút bắt đầu */}
        <button
          onClick={() => router.push("/login")}
          className="mt-4 md:mt-0 inline-block bg-yellow-400 text-indigo-900 font-bold px-6 py-3 rounded-full shadow-lg hover:bg-yellow-300 transition-colors duration-300 drop-shadow-md"
        >
          Bắt đầu học
        </button>

        {/* Nút mở menu di động */}
        <button
          className="md:hidden absolute top-6 right-6 text-white"
          onClick={() => setOpen(!open)}
        >
          <Menu size={28} />
        </button>
      </div>

      {/* Menu điều hướng trên thiết bị di động */}
      {open && (
        <nav className="md:hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 border-t border-white/30">
          <a href="#" className="block px-6 py-3 hover:bg-white/20 text-white font-semibold">Trang chủ</a>
          <a href="#" className="block px-6 py-3 hover:bg-white/20 text-white font-semibold">Tính năng</a>
          <a href="#" className="block px-6 py-3 hover:bg-white/20 text-white font-semibold">Bảng giá</a>
          <a href="#" className="block px-6 py-3 hover:bg-white/20 text-white font-semibold">Liên hệ</a>
        </nav>
      )}
    </header>
  );
}
