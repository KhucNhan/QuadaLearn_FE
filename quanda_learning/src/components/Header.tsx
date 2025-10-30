"use client";

import { useState, useEffect, useRef } from "react";
import { Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import "../styles/Header.css";
import { ProfileModal } from "../app/profile-modal-user/Profile";

interface HeaderProps {
  setActiveSection: (section: string) => void;
}

export default function Header({ setActiveSection }: HeaderProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false); // Mobile menu
  const [user, setUser] = useState<any>(null);
  const [showDropdown, setShowDropdown] = useState(false); // Avatar dropdown
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);


  // Lấy user từ localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    const reloadUser = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) setUser(JSON.parse(storedUser));
    };

    window.addEventListener("userUpdated", reloadUser);
    return () => window.removeEventListener("userUpdated", reloadUser);
  }, []);


  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavClick = (sectionId: string) => {
    router.push(`/#${sectionId}`);
    setOpen(false); // Đóng menu mobile khi click
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setShowDropdown(false);
    router.push("/authenticate/login");
  };

  const renderAvatar = () => (
    <div className="relative" ref={dropdownRef}>
      <button onClick={() => setShowDropdown(!showDropdown)}>
        {user.avatar && user.avatar !== "/images/default-avatar.png" ? (
          <img
            src={
              user.avatar.startsWith("http") || user.avatar.startsWith("blob:")
                ? user.avatar
                : `http://localhost:8888${user.avatar}`
            }
            alt="Tài khoản"
            className="w-12 h-12 rounded-full border-2 border-white shadow-md hover:scale-105 transition-transform object-cover"
          />
        ) : (
          <div
            className="w-12 h-12 flex items-center justify-center 
             bg-gradient-to-br from-yellow-300 via-orange-400 to-pink-500 
             text-white text-xl font-extrabold 
             rounded-full border-4 border-white 
             shadow-lg hover:scale-110 transition-transform duration-300"
          >
            {user.email?.charAt(0).toUpperCase()}
          </div>
        )}
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl z-50 border border-indigo-100 animate-fade-in">
          <div className="py-2">
            <button
              onClick={() => {
                setIsProfileOpen(true); // mở modal
                setShowDropdown(false); // đóng dropdown
              }}
              className="w-full text-left px-4 py-3 text-gray-800 font-semibold 
                        hover:bg-indigo-100 hover:text-indigo-700 
                        transition-all duration-200 rounded-t-xl flex items-center space-x-2"
            >
              <i className="fas fa-user-circle text-indigo-500"></i>
              <span>Thông tin</span>
            </button>

            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-3 text-red-600 font-semibold hover:bg-red-100 hover:text-red-800 transition-all duration-200 rounded-b-xl flex items-center space-x-2"
            >
              <i className="fas fa-sign-out-alt text-red-500"></i>
              <span>Đăng xuất</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const desktopNav = !user ? (
    <nav className="hidden md:flex space-x-8 mt-4 md:mt-0 text-white font-semibold text-lg drop-shadow-md">
      <button onClick={() => router.push('/')} className="hover:text-yellow-300 transition-colors duration-300">Trang chủ</button>
      <button onClick={() => handleNavClick("courses")} className="hover:text-yellow-300 transition-colors duration-300">Khóa học phổ biến</button>
      <button onClick={() => handleNavClick("featureAI")} className="hover:text-yellow-300 transition-colors duration-300">Tính năng AI</button>
      <button onClick={() => handleNavClick("capacityTest")} className="hover:text-yellow-300 transition-colors duration-300">Kiểm tra trình độ</button>
    </nav>
  ) : (
    <nav className="hidden md:flex space-x-20 mt-4 md:mt-0 text-white font-semibold text-lg drop-shadow-md">
      <button
        onClick={() => setActiveSection("home")}
        className="hover:text-yellow-300 transition-colors duration-300"
      >
        Trang chủ
      </button>
      <button onClick={() => router.push('/my-courses')} className="hover:text-yellow-300 transition-colors duration-300">Khóa học</button>
      <button onClick={() => router.push('/notifications')} className="hover:text-yellow-300 transition-colors duration-300">Luyện tập</button>
      <button onClick={() => router.push('/notifications')} className="hover:text-yellow-300 transition-colors duration-300">Thông báo</button>
    </nav>
  );

  const mobileNav = !user ? (
    <>
      <a onClick={() => router.push('/')} className="block px-6 py-3 hover:bg-white/20 text-white font-semibold">Trang chủ</a>
      <a onClick={() => handleNavClick("courses")} className="block px-6 py-3 hover:bg-white/20 text-white font-semibold">Khóa học phổ biến</a>
      <a onClick={() => handleNavClick("featureAI")} className="block px-6 py-3 hover:bg-white/20 text-white font-semibold">Tính năng AI</a>
      <a onClick={() => handleNavClick("capacityTest")} className="block px-6 py-3 hover:bg-white/20 text-white font-semibold">Kiểm tra trình độ</a>
    </>
  ) : (
    <>
      <a onClick={() => router.push('/dashboard')} className="block px-6 py-3 hover:bg-white/20 text-white font-semibold">Trang chủ</a>
      <a onClick={() => router.push('/my-courses')} className="block px-6 py-3 hover:bg-white/20 text-white font-semibold">Khóa học</a>
      <a onClick={() => router.push('/notifications')} className="block px-6 py-3 hover:bg-white/20 text-white font-semibold">Luyện tập</a>
      <a onClick={() => router.push('/notifications')} className="block px-6 py-3 hover:bg-white/20 text-white font-semibold">Thông báo</a>
    </>
  );

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

        {/* Desktop Nav */}
        {desktopNav}

        {/* Avatar hoặc nút đăng nhập */}
        {!user ? (
          <button
            onClick={() => router.push("/authenticate/login")}
            className="mt-4 md:mt-0 inline-block bg-yellow-400 text-indigo-900 font-bold px-6 py-3 rounded-full shadow-lg hover:bg-yellow-300 transition-colors duration-300 drop-shadow-md"
          >
            Bắt đầu học
          </button>
        ) : (
          renderAvatar()
        )}

        {/* Nút mở menu mobile */}
        <button
          className="md:hidden absolute top-6 right-6 text-white"
          onClick={() => setOpen(!open)}
        >
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Nav */}
      {open && (
        <nav className="md:hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 border-t border-white/30">
          {mobileNav}
        </nav>
      )}

      {/* Modal render độc lập, không phụ thuộc dropdown */}
      {user && (
        <ProfileModal
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
          userId={user.id}  // ✅ Truyền userId vào đây
        />
      )}
    </header>
  );
}
