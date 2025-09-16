"use client";

import Sidebar from "@/components/home_page/layout/Sidebar";
import Header from "@/components/Header";
import HeroSection from "@/components/home_page/layout/HeroSection";
import HighlightedCourses from "@/components/home_page/sections/HighlightedCourses";
import CoursesByLevels from "@/components/home_page/sections/CoursesByLevels";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="fixed top-0 left-0 w-full z-50 h-16">
        <Header />
      </div>

      {/* Main content layout */}
      <div className="flex flex-1 pt-16 relative">
        {/* Sidebar (ẩn trên mobile, hiển thị trên desktop) */}
        <div className="hidden md:block fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] z-40 bg-white shadow border-t border-indigo-300">
          <Sidebar />
        </div>

        {/* Nội dung chính */}
        <main className="w-full md:ml-64 flex-1 bg-gray-50 pt-[41px] transition-all duration-300 ease-in-out">
          <HeroSection />
          <HighlightedCourses />
          <CoursesByLevels />
          <Footer />
        </main>
      </div>
    </div>
  );
}
