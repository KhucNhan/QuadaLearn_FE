"use client";

import { useEffect, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { fetchCourseWithLessons, Course } from "@/lib/courses/Course_detail"; // Cập nhật đường dẫn nếu cần
import { useRouter } from "next/navigation";

interface Props {
  courseId: number;
}

export default function CourseSidebar({ courseId }: Props) {
  const router = useRouter;
  const appRouter = router();
  const [lessonCount, setLessonCount] = useState<number>(0);

  useEffect(() => {
    fetchCourseWithLessons(courseId)
      .then((data: Course) => {
        setLessonCount(data.lessons.length);
      })
      .catch((err) => {
        console.error("Lỗi khi tải dữ liệu khóa học:", err);
      });
  }, [courseId]);

  const estimatedDuration = lessonCount * 2;

  return (
    <aside className="lg:w-1/3 mt-10 lg:mt-0">
      <div className="sticky top-24 bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          {/* Ảnh khóa học */}
          <div className="flex-shrink-0">
            <img
              src="https://marketplace.canva.com/JTFGw/MAFeyDJTFGw/1/tl/canva-realistic-right-3d-button-MAFeyDJTFGw.png"
              alt="Khóa học"
              className="w-16 h-16 rounded-full shadow-md"
            />
          </div>

          {/* Đánh giá */}
          <div className="flex items-center space-x-1 text-yellow-400">
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star-half-alt"></i>
            <span className="text-gray-600 text-sm ml-2">(4.5/5)</span>
          </div>
        </div>
        <button onClick={() => appRouter.push("/authenticate/register")} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition">
          Đăng ký ngay
        </button>
        <ul className="mt-6 space-y-3 text-gray-700">
          <li className="flex items-center space-x-3">
            <i className="fas fa-clock text-blue-600"></i>
            <span>Thời lượng: {estimatedDuration} ngày</span>
          </li>
          <li className="flex items-center space-x-3">
            <i className="fas fa-video text-blue-600"></i>
            <span>{lessonCount} bài học</span>
          </li>
          <li className="flex items-center space-x-3">
            <i className="fas fa-book-open text-blue-600"></i>
            <span>Các bài học hấp dẫn, cuốn hút và dễ hiểu</span>
          </li>
          <li className="flex items-center space-x-3">
            <i className="fas fa-spell-check text-blue-600"></i>
            <span>Bài tập thực hành và kiểm tra từ vựng</span>
          </li>
          <li className="flex items-center space-x-3">
            <i className="fas fa-language text-blue-600"></i>
            <span>Nâng cao kiến thức ngoại ngữ</span>
          </li>
        </ul>
      </div>
    </aside>
  );
}
