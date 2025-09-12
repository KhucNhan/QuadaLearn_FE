import Courses from "@/components/sections/Courses";

export default function HighlightedCourses() {
  return (
    <div id="courses" className="max-w-6xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold text-center mb-12 text-indigo-700">
        Khóa học nổi bật
      </h2>
      <Courses />
    </div>
  );
}
