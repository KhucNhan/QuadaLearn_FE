"use client";
import { Course } from "@/lib/courses/Course_detail";

export default function CourseContent({ course }: { course: Course }) {
  // Mảng màu gradient + màu chữ tương ứng
  const colors = [
    { bg: "from-purple-50 to-purple-100", text: "text-purple-700", icon: "text-purple-500" },
    { bg: "from-teal-50 to-teal-100", text: "text-teal-700", icon: "text-teal-500" },
    { bg: "from-yellow-50 to-yellow-100", text: "text-yellow-700", icon: "text-yellow-500" },
    { bg: "from-pink-50 to-pink-100", text: "text-pink-700", icon: "text-pink-500" },
    { bg: "from-green-50 to-green-100", text: "text-green-700", icon: "text-green-500" },
    { bg: "from-indigo-50 to-indigo-100", text: "text-indigo-700", icon: "text-indigo-500" },
  ];

  return (
    <>
      <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
        {course.name}
      </h1>
      <p className="text-gray-700 mb-6 leading-relaxed">{course.description}</p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Course Curriculum
        </h2>
        <ul className="space-y-4">
          {course.lessons.map((item, index) => {
            const color = colors[index % colors.length]; // lấy màu theo index
            return (
              <li
                key={item.id}
                className={`bg-gradient-to-r ${color.bg} rounded-lg shadow p-4 flex items-start space-x-4 transition transform`}
              >
                <div className={`flex-shrink-0 mt-1 ${color.icon}`}>
                  <i className="fas fa-book text-3xl"></i>
                </div>

                <div>
                  <h3 className={`text-lg font-semibold ${color.text}`}>{item.title}</h3>
                  <p className="text-gray-700 italic">{item.knowledgeTag}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
