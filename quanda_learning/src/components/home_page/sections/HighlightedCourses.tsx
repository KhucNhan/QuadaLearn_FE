import AllCourses from "./AllCourses";
import { Course } from "@/lib/courses/AllCoursesAPI";

interface HighlightedCoursesProps {
  onSelectCourse: (course: Course) => void;
}

export default function HighlightedCourses({ onSelectCourse }: HighlightedCoursesProps) {
  return (
    <div id="courses" className="max-w-6xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold text-center mb-12 text-indigo-700">
        Khóa học
      </h2>
      {/* Truyền callback xuống AllCourses */}
      <AllCourses onSelectCourse={onSelectCourse} />
    </div>
  );
}
