"use client";
import { useState } from "react";
import { Menu } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="text-2xl font-semibold text-indigo-600">
          Học Tiếng Anh
        </a>
        <nav className="hidden md:flex space-x-8 text-gray-700 font-medium">
          <a href="#gioi-thieu" className="hover:text-indigo-600 transition">Giới thiệu</a>
          <a href="#khoa-hoc" className="hover:text-indigo-600 transition">Khóa học</a>
          <a href="#tinh-nang" className="hover:text-indigo-600 transition">Tính năng AI</a>
          <a href="#test-nang-luc" className="hover:text-indigo-600 transition">Test năng lực</a>
        </nav>
        <button className="md:hidden text-gray-700" onClick={() => setOpen(!open)}>
          <Menu size={24} />
        </button>
      </div>
      {open && (
        <nav className="md:hidden bg-white border-t border-gray-200">
          <a href="#gioi-thieu" className="block px-6 py-3 hover:bg-indigo-50 text-indigo-600 font-semibold">Giới thiệu</a>
          <a href="#khoa-hoc" className="block px-6 py-3 hover:bg-indigo-50">Khóa học</a>
          <a href="#tinh-nang" className="block px-6 py-3 hover:bg-indigo-50">Tính năng AI</a>
          <a href="#test-nang-luc" className="block px-6 py-3 hover:bg-indigo-50">Test năng lực</a>
        </nav>
      )}
    </header>
  );
}
