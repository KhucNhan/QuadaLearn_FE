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
    login: "images/login_register/anhnenlogin.png",
    register: "https://img.freepik.com/psd-premium/studente-3d-che-legge-dal-notebook-alla-sua-scrivania-render-3d-di-studente-seduto-davanti-alla-scrivania_753500-432.jpg",
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
    <div className="flex min-h-screen">
      {/* Left side image */}
      <div className="relative w-1/2 hidden md:block">
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
        <div id="textHello" className="absolute bottom-10 left-10 text-white space-y-2 max-w-md z-10">
          <h1 className="text-4xl font-bold drop-shadow-lg float">
            {titles[type].heading}
          </h1>
          <p className="text-lg drop-shadow float">
            {titles[type].paragraph}
          </p>
        </div>


      </div>

      {/* Right side form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 gradient-bg relative">

        <img
          src="https://icons.veryicon.com/png/System/Longhorn%20R2/Back%20Button.png"
          alt="Back"
          className="absolute top-4 right-4 w-10 h-10 cursor-pointer shake-icon hover:scale-110 transition-transform duration-300"
          onClick={() => router.push("/")}
        />

        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
