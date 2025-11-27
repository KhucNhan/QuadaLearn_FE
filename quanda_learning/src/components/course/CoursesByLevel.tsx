"use client";

import { useEffect, useState } from "react";
import { fetchCoursesByLevel, Course } from "@/lib/courses/CoursesAPI";
import { CourseCard, levelMap } from "./course-card";

interface CoursesByLevelProps {
  level: string;
  onSelectCourse: (course: Course) => void; // 👈 thêm callback
}

export default function CoursesByLevel({ level, onSelectCourse }: CoursesByLevelProps) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCoursesByLevel(level)
      .then((data) => setCourses(data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [level]);

  if (loading) return <p className="text-gray-500 text-center">Đang tải {level}...</p>;

  if (courses.length === 0) return <p className="text-gray-500 text-center">Chưa có khóa học {level}</p>;

  return (
    <section className="space-y-6">
      <h2 className="text-[40px] pt-5 text-center font-bold text-indigo-700">{level}</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-4" style={{ marginBottom: 30 }}>
        {courses.map((c) => (
          <CourseCard
            key={c.id}
            id={String(c.id)}
            title={c.name}
            description={c.description}
            level={levelMap[c.level] ?? "Beginner"}
            duration="12h 30m"
            students={1200}
            rating={4.5}
            image={c.image}
            isRecommended={levelMap[c.level] === "Beginner"}
            onSelectCourse={() => onSelectCourse(c)} // 👈 click -> mở CourseDetail
          />
        ))}
      </div>
    </section>
  );
}
