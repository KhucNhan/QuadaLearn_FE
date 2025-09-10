"use client";

import { useEffect, useState } from "react";
import { fetchCourses, Course } from "@/lib/CoursesAPI"; // Đường dẫn tuỳ chỉnh

function CourseCard({ course }: { course: Course }) {
  return (
    <article className="bg-white rounded-lg shadow-md p-6 flex flex-col">
      <img
        src={course.image}
        alt={course.name}
        className="rounded-md mb-4 object-cover h-48 w-full"
      />
      <h3
        className="text-xl font-semibold mb-2 text-indigo-700"
        title={course.name} // hiển thị full tên khi hover
>
        {course.name.length > 15 ? course.name.slice(0, 15) + "..." : course.name}
      </h3>
      <p className="text-gray-700 flex-grow">{course.description}</p>
      <p className="text-sm text-gray-500 mt-2">Trình độ: {course.level}</p>
      <button className="mt-4 bg-indigo-600 text-white py-2 rounded-md font-semibold hover:bg-indigo-700 transition">
        Xem chi tiết
      </button>
    </article>
  );
}

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses()
      .then((data) => setCourses(data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="courses" className="space-y-12">
      {loading ? (
        <p className="text-center text-gray-500">Đang tải dữ liệu...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </div>
      )}
    </section>
  );
}
