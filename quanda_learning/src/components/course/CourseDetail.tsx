"use client";

import React, { useEffect, useState } from "react";
import CourseImage from "../../components/courses_detail/CourseImage";
import CourseContent from "../../components/courses_detail/CourseContent";
import CourseSidebar from "../../components/courses_detail/CourseSidebar";
import { fetchCourseWithLessons, Course } from "../../lib/courses/Course_detail";

interface CourseDetailProps {
  course: Course; 
  onBack: () => void;
}

export default function CourseDetail({ course, onBack }: CourseDetailProps) {
  const [detailedCourse, setDetailedCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  // ✅ Gọi API khi course.id thay đổi
  useEffect(() => {
    const loadCourse = async () => {
      try {
        const data = await fetchCourseWithLessons(course.id);
        setDetailedCourse(data);
      } catch (err) {
        console.error("Lỗi khi tải chi tiết khóa học:", err);
      } finally {
        setLoading(false);
      }
    };

    loadCourse();
  }, [course.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-lg text-gray-600">
        <i className="fas fa-spinner fa-spin mr-2"></i> Đang tải dữ liệu khóa học...
      </div>
    );
  }

  if (!detailedCourse) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500 text-lg">
        Không tìm thấy khóa học.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-8 lg:px-16">
      <button
        onClick={onBack}
        className="mb-6 text-indigo-600 hover:underline flex items-center"
      >
        <i className="fas fa-arrow-left mr-2"></i> Quay lại
      </button>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <CourseImage src={detailedCourse.image} />
          <CourseContent course={detailedCourse} />
        </div>
        <CourseSidebar courseId={detailedCourse.id} />
      </div>
    </div>
  );
}
