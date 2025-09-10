"use client";
import { ReactNode } from "react";
import '../../styles/login_and_register/AuthLayout.css';
import { useRouter } from "next/navigation";

export default function AuthLayout({
  children,
  type,
}: {
  children: ReactNode;
  type: "login" | "register";
}) {
  const router = useRouter();
  const images = {
    login: "/images/login_register/anhnenlogin.png",
    register: "https://img.freepik.com/psd-premium/studente-3d-che-legge-dal-notebook-alla-scrivania-render-3d_753500-432.jpg",

  };

  const titles = {
    login: {
      heading: "Chào mừng bạn trở lại!",
      paragraph: "Đăng nhập để tiếp tục trải nghiệm tuyệt vời của chúng tôi.",
    },
    register: {
      heading: "Tạo tài khoản mới",
      paragraph: "Đăng ký để bắt đầu hành trình cùng chúng tôi.",
    },
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Image top trên mobile, left trên desktop */}
      <div className="relative w-full md:w-1/2 h-64 md:h-auto">
        <img
          src={images[type]}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className={`absolute inset-0 bg-gradient-to-t ${type === "login"
            ? "from-black/60 via-white/0 to-white/0"
            : "from-black/60 via-black/30 to-transparent"
            }`}
        />
        <div className="absolute bottom-4 left-4 sm:bottom-10 sm:left-10 text-white space-y-1 sm:space-y-2 max-w-xs sm:max-w-md z-10">
          <h1 className="text-xl sm:text-3xl md:text-4xl font-bold drop-shadow-lg">
            {titles[type].heading}
          </h1>
          <p className="text-sm sm:text-base md:text-lg drop-shadow">
            {titles[type].paragraph}
          </p>
        </div>
      </div>


     {/* Right side form */}
<div className="w-full md:w-1/2 flex flex-col md:flex justify-center items-center px-4 sm:px-6 lg:px-8 py-8 sm:py-10 gradient-bg relative">
  {/* Back icon */}
  <img
    src="https://static.vecteezy.com/system/resources/previews/018/842/857/non_2x/cute-3d-home-button-real-estate-mortgage-loan-concept-icon-3d-render-free-png.png"
    alt="Back"
    className="absolute top-4 right-4 w-8 h-8 sm:w-10 sm:h-10 cursor-pointer shake-icon hover:scale-110 transition-transform duration-300"
    onClick={() => router.push("/")}
  />

  {/* Form content */}
  <div className="w-full max-w-md sm:max-w-lg md:max-w-md mt-6 md:mt-0">
    {children}
  </div>
</div>


    </div>
  );
}
