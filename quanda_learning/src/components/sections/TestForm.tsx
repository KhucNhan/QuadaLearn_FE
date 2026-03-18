"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

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
      className="mx-auto bg-indigo-50 rounded-lg p-10 shadow-lg space-y-8"
    >
      <h2 className="text-3xl font-bold text-indigo-700 text-center">
        Bài kiểm tra đánh giá trình độ miễn phí
      </h2>
      <p className="text-center text-gray-700 text-lg max-w-3xl mx-auto">
        Làm bài kiểm tra trình độ miễn phí để nhận phản hồi chi tiết và lộ trình
        học tập cá nhân hóa dành riêng cho bạn.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-gray-700 font-semibold mb-2"
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
            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          {!validateName(name) && name !== "" && (
            <p className="text-red-500 text-sm mt-1">
              Vui lòng nhập đầy đủ họ và tên (ít nhất 2 từ, có chứa chữ cái).
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-gray-700 font-semibold mb-2"
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
            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          {!validateEmail(email) && email !== "" && (
            <p className="text-red-500 text-sm mt-1">
              Email không đúng định dạng.
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="level"
            className="block text-gray-700 font-semibold mb-2"
          >
            Mục tiêu
          </label>
          <select
            id="level"
            name="level"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="">Chọn mục tiêu</option>
            <option value="beginner">A1 - A2</option>
            <option value="intermediate">B1 - B2</option>
            <option value="advanced">C1 - C2</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={!isValid}
          className={`w-full py-3 rounded-md font-semibold transition ${
            isValid
              ? "bg-indigo-600 text-white hover:bg-indigo-700"
              : "bg-gray-400 text-white cursor-not-allowed"
          }`}
        >
          Bắt đầu kiểm tra trình độ
        </button>
      </form>
    </section>
  );
}
