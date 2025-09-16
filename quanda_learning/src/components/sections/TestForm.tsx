"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "../../styles/TestForm.css";

export default function TestForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [level, setLevel] = useState("");
  const [isValid, setIsValid] = useState(false);
  const router = useRouter();

  // 🧠 Kiểm tra hợp lệ của họ tên
  const validateName = (name: string): boolean => {
    const words = name.trim().split(/\s+/);
    const hasLetters = /[a-zA-ZÀ-ỹ]/.test(name);

    return (
      words.length >= 2 &&
      words.every((word) => word.length >= 1) &&
      hasLetters
    );
  };

  // 🧠 Regex kiểm tra email
  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // ✅ kiểm tra hợp lệ input
  useEffect(() => {
    const nameValid = validateName(name);
    const emailValid = validateEmail(email);
    const levelValid = level !== "";

    setIsValid(nameValid && emailValid && levelValid);
  }, [name, email, level]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 👉 chuyển hướng sang trang /level_test
    router.push("/test/level_test");
  };

  return (
    <section
      id="capacityTest"
      className="relative overflow-hidden min-h-screen flex items-center"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700"></div>
      
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl bg-pattern"></div>
        <div className="absolute top-32 right-20 w-24 h-24 bg-blue-300/20 rounded-full blur-lg bg-pattern"></div>
        <div className="absolute bottom-20 left-32 w-40 h-40 bg-purple-300/15 rounded-full blur-xl bg-pattern"></div>
        <div className="absolute bottom-10 right-10 w-28 h-28 bg-indigo-300/20 rounded-full blur-lg bg-pattern"></div>
      </div>

      <div className="relative w-full max-w-2xl mx-auto px-6 py-16 text-center">
        <h2 className="form-title text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
          Bài kiểm tra đánh giá trình độ miễn phí
        </h2>
        <p className="form-description text-white/90 text-lg md:text-xl mb-12 leading-relaxed">
          Làm bài kiểm tra trình độ miễn phí để nhận phản hồi chi tiết và lộ trình
          học tập cá nhân hóa dành riêng cho bạn.
        </p>

        <form onSubmit={handleSubmit} className="form-container bg-white rounded-3xl shadow-2xl p-8 space-y-6 backdrop-blur-sm border border-white/20 relative overflow-hidden">
          
          <div className="text-left relative">
            <label
              htmlFor="name"
              className="form-label block text-gray-700 font-semibold mb-3 text-base transition-all duration-300"
            >
              Họ và tên
            </label>
            <input
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Nhập họ và tên của bạn"
              className="form-input w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 text-gray-700 placeholder-gray-400 bg-gray-50/50"
            />
            {!validateName(name) && name !== "" && (
              <p className="text-red-500 text-sm mt-2 flex items-center bg-red-50 p-2 rounded-lg">
                <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Vui lòng nhập đầy đủ họ và tên (ít nhất 2 từ, có chứa chữ cái).
              </p>
            )}
          </div>

          <div className="text-left relative">
            <label
              htmlFor="email"
              className="form-label block text-gray-700 font-semibold mb-3 text-base transition-all duration-300"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Nhập email của bạn"
              className="form-input w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 text-gray-700 placeholder-gray-400 bg-gray-50/50"
            />
            {!validateEmail(email) && email !== "" && (
              <p className="text-red-500 text-sm mt-2 flex items-center bg-red-50 p-2 rounded-lg">
                <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Email không đúng định dạng.
              </p>
            )}
          </div>

          <div className="text-left relative">
            <label
              htmlFor="level"
              className="form-label block text-gray-700 font-semibold mb-3 text-base transition-all duration-300"
            >
              Mục tiêu
            </label>
            <select
              id="level"
              name="level"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              required
              className="custom-select form-input w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 text-gray-700 bg-gray-50/50 appearance-none cursor-pointer"
            >
              <option value="">Chọn mục tiêu học tập</option>
              <option value="beginner">A1 - A2 (Người mới bắt đầu)</option>
              <option value="intermediate">B1 - B2 (Trung cấp)</option>
              <option value="advanced">C1 - C2 (Nâng cao)</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={!isValid}
            className={`test-button w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform relative overflow-hidden ${
              isValid
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl hover:scale-105"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            <span className="flex items-center justify-center relative z-10">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Bắt đầu kiểm tra trình độ
            </span>
          </button>

          {/* Success message when form is valid */}
          {isValid && (
            <div className="success-message text-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
              <span className="text-green-700 font-medium flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Tuyệt vời! Bạn đã sẵn sàng để khám phá trình độ của mình.
              </span>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
