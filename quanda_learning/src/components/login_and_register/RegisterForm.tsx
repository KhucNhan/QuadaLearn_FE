"use client";
import { useRouter } from "next/navigation";
import "../../styles/login_and_register/RegisterForm.css"; // Đảm bảo đường dẫn đúng

export default function RegisterForm() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          alert("Đăng ký thành công (demo)");
        }}
        className="form-container space-y-6"
      >
        <h2 className="text-3xl font-bold text-center">Đăng Ký</h2>

        {/* 2 cột input */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Họ và tên" required />
          <input type="email" placeholder="Email" required />

          <select
            id="currentLevel"
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
            id="goalLevel"
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

          <input type="password" placeholder="Mật khẩu" required />
          <input type="password" placeholder="Xác nhận mật khẩu" required />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
        >
          Đăng Ký
        </button>

        <p className="text-center text-gray-600 mt-4">
          Đã có tài khoản?{" "}
          <button
            type="button"
            onClick={() => router.push("/authenticate/login")}
            className="text-blue-600 hover:underline font-semibold"
          >
            Đăng nhập ngay
          </button>
        </p>
      </form>
    </div>
  );
}
