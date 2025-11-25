"use client";

import { use, useEffect, useState } from "react";
import { fetchCourseWithLessons } from "@/lib/courses/Course_detail";
import CourseImage from "@/components/courses_detail/CourseImage";
import CourseContent from "@/components/courses_detail/CourseContent";
import CourseSidebar from "@/components/courses_detail/CourseSidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface PageProps {
  params: Promise<{ id: string }>; 
}

export default function CourseDetailPage({ params }: PageProps) {
  // ✅ unwrap params Promise bằng React.use()
  const { id } = use(params);
  const courseId = Number(id);

  const [activeSection, setActiveSection] = useState<string>("home");
  const [course, setCourse] = useState<any>(null);

  // ✅ fetch dữ liệu trong useEffect (client side)
  useEffect(() => {
    async function loadCourse() {
      const data = await fetchCourseWithLessons(courseId);
      setCourse(data);
    }
    loadCourse();
  }, [courseId]);

  if (!course) {
    return <div className="text-center mt-20">Đang tải khóa học...</div>;
  }

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 h-16 bg-white shadow-md">
        <Header setActiveSection={setActiveSection} />
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row lg:space-x-12 " style={{ marginTop: "95px" }}>
          <div className="lg:w-2/3">
            <CourseImage src={course.image} />
            <CourseContent course={course} />
          </div>
          <CourseSidebar courseId={courseId} />
        </div>
      </main>

      <Footer />
    </>
  );
}
