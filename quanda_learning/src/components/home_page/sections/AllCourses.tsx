

"use client";
import React, { useEffect, useState } from "react";
import { fetchCourses, Course } from "@/lib/courses/AllCoursesAPI";
import "../../../styles/button/ButtonCourses.css";

interface AllCoursesProps {
  onSelectCourse: (course: Course) => void; 
}

const AllCourses: React.FC<AllCoursesProps> = ({ onSelectCourse }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await fetchCourses();
        setCourses(data);
      } catch (error) {
        console.error("Lỗi khi tải khóa học:", error);
      } finally {
        setLoading(false);
      }
    };
    loadCourses();
  }, []);

  if (loading) {
    return <p>Đang tải khóa học...</p>;
  }

  return (
    <div className="course-page-container">
      <div className="course-grid">
        {courses.map((course) => (
          <div className="course-card" key={course.id}>
            <img
              src={course.image}
              alt={course.name}
              className="course-image"
              onError={(e) =>
                ((e.target as HTMLImageElement).src =
                  "https://via.placeholder.com/400x200?text=No+Image")
              }
            />
            <div className="course-content">
              <div className="course-card-title">{course.name}</div>
              <div className="course-card-desc">{course.description}</div>
            </div>
            <div className="course-footer">
              <button
                className="course-button"
                onClick={() => onSelectCourse(course)}
              >
                Khám phá
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCourses;
