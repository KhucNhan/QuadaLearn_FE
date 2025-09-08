"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "../../styles/login_and_register/RegisterForm.css";
import { registerUser } from "@/lib/RegisterAPI";

export default function RegisterForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    currentLevel: "",
    goal: "",
  });

  const [errorMessage, setErrorMessage] = useState(""); // 🔥 State lưu lỗi

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Reset lỗi khi người dùng thay đổi input
    setErrorMessage("");
  };

  const validate = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const levelOrder = ["A1", "A2", "B1", "B2", "C1", "C2"];

    if (!formData.name.trim()) return "Vui lòng nhập họ và tên.";
    if (formData.name.length < 2 || formData.name.length > 50)
      return "Họ và tên phải từ 2 đến 50 ký tự.";
    if (!formData.email.trim()) return "Vui lòng nhập email.";
    if (!emailRegex.test(formData.email)) return "Email không hợp lệ.";
    if (!formData.currentLevel) return "Vui lòng chọn trình độ hiện tại.";
    if (!formData.goal) return "Vui lòng chọn mục tiêu.";
    if (
      levelOrder.indexOf(formData.goal) <=
      levelOrder.indexOf(formData.currentLevel)
    )
      return "Mục tiêu phải cao hơn trình độ hiện tại.";
    if (formData.password.length < 6)
      return "Mật khẩu phải có ít nhất 6 ký tự.";
    if (formData.password !== formData.confirmPassword)
      return "Mật khẩu xác nhận không khớp.";

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const error = validate();
    if (error) {
      setErrorMessage(error);
      return;
    }

    try {
      const response = await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        currentLevel: formData.currentLevel,
        goal: formData.goal,
      });

      router.push("/login");
    } catch (err: any) {
      setErrorMessage("Đăng ký thất bại: " + err.message);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <form onSubmit={handleSubmit} className="form-container space-y-6">
        <h2 className="text-3xl font-bold text-center">Đăng Ký</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Họ và tên"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <select
            name="currentLevel"
            value={formData.currentLevel}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Trình độ hiện tại</option>
            <option value="A1">A1 - Sơ cấp</option>
            <option value="A2">A2 - Sơ trung cấp</option>
            <option value="B1">B1 - Trung cấp</option>
            <option value="B2">B2 - Trung cao cấp</option>
            <option value="C1">C1 - Cao cấp</option>
            <option value="C2">C2 - Thành thạo</option>
          </select>

          <select
            name="goal"
            value={formData.goal}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Chọn mục tiêu</option>
            <option value="A1">A1 - Sơ cấp</option>
            <option value="A2">A2 - Sơ trung cấp</option>
            <option value="B1">B1 - Trung cấp</option>
            <option value="B2">B2 - Trung cao cấp</option>
            <option value="C1">C1 - Cao cấp</option>
            <option value="C2">C2 - Thành thạo</option>
          </select>

          <input
            type="password"
            name="password"
            placeholder="Mật khẩu"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Xác nhận mật khẩu"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        {/* 🔥 Hiển thị lỗi nếu có */}
        {errorMessage && (
          <div className="text-red-600 text-center font-semibold bg-red-100 p-3 rounded-lg border border-red-400">
            {errorMessage}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Đăng Ký
        </button>

        <p className="text-center text-gray-600 mt-4">
          Đã có tài khoản?{" "}
          <button
            type="button"
            onClick={() => router.push("/login")}
            className="text-blue-600 hover:underline font-semibold"
          >
            Đăng nhập ngay
          </button>
        </p>
      </form>
    </div>
  );
}
