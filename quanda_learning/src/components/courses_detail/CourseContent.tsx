

"use client";
import { useState } from "react";
import { Course } from "@/lib/courses/Course_detail";
import LessonDetail from "./LessonDetail";
export default function CourseContent({ course }: { course: Course }) {
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null);

  if (selectedLesson) {
    return (
      <LessonDetail lessonId={selectedLesson} onBack={() => setSelectedLesson(null)} />
    );
  }

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
      <h1 className="text-3xl font-extrabold text-gray-900 mb-4">{course.name}</h1>
      <p className="text-gray-700 mb-6 leading-relaxed">{course.description}</p>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Course Curriculum</h2>
        <ul className="space-y-4">
          {course.lessons.map((lesson, index) => {
            const color = colors[index % colors.length];
            return (
              <li key={lesson.id} className={`bg-gradient-to-r ${color.bg} p-4 rounded-lg shadow`}>
                <h3 className={`${color.text} text-lg font-semibold`}>{lesson.title}</h3>
                <p className="text-gray-600">{lesson.knowledgeTag}</p>

                <button
                  onClick={() => setSelectedLesson(lesson.id)}
                  className="mt-3 w-full px-6 py-3 rounded-2xl font-semibold bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:scale-105 transition transform"
                >
                  🚀 Bắt đầu học
                </button>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
