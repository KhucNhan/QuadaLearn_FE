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
      {/* Header cố định trên cùng */}
      <div className="fixed top-0 left-0 w-full z-50 h-16">
        <Header />
      </div>

      {/* Nội dung phía dưới header */}
      <div className="flex flex-1 pt-16">
        {/* Sidebar cố định dưới header */}
        <div className="fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] z-40 bg-white shadow border-t border-indigo-300 ">
          <Sidebar />
        </div>



        {/* Nội dung chính bên phải sidebar */}
        <main className="ml-64 flex-1 bg-gray-50 pt-[41px]">
          <HeroSection />
          <HighlightedCourses />
          <CoursesByLevels />
          <Footer />
        </main>

      </div>
    </div>
  );
}
