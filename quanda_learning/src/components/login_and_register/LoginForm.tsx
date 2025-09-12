"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/authenticate/LoginAPI";
import "../../styles/login_and_register/LoginForm.css";

export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const data = await login(email, password);

      // 👉 Lưu token (tuỳ bạn có dùng hay không)
      localStorage.setItem("token", data.token);

      // 👉 Lưu thông tin người dùng vào localStorage để Header hiển thị avatar
      localStorage.setItem("user", JSON.stringify({
        id: data.id,
        name: data.name,
        email: email,
        token: data.token,
        role: data.authorities?.[0]?.authority || "USER"
      }));


      // 👉 Điều hướng sau khi đăng nhập
      router.push("/home");
    } catch (err) {
      setError("Sai email hoặc mật khẩu");
      console.error(err);
    }
  };

  return (
    <div className="form-container-login mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-3xl font-bold text-center gradient-text">
          Đăng Nhập
        </h2>

        {error && (
          <p className="text-red-500 text-center font-medium">
            {error}
          </p>
        )}


        <div>
          <label htmlFor="email" className="block font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="password" className="block font-medium text-gray-700">
            Mật khẩu
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <div className="mt-2 flex items-center space-x-2">
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              className="h-4 w-4 text-blue-600"
            />
            <label htmlFor="showPassword" className="text-sm text-gray-600">
              Hiển thị mật khẩu
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
        >
          Đăng Nhập
        </button>

        <p className="text-center text-gray-600 mt-4">
          Bạn chưa có tài khoản?{" "}
          <button
            type="button"
            onClick={() => router.push("/authenticate/register")}
            className="text-blue-600 hover:underline font-semibold"
          >
            Đăng ký ngay
          </button>
        </p>
      </form>
    </div>
  );
}
