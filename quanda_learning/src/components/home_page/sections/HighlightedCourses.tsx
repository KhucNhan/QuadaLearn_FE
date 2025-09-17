import AllCourses from "./AllCourses";


export default function HighlightedCourses() {
  return (
    <div id="courses" className="max-w-6xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold text-center mb-12 text-indigo-700">
        Khóa học
      </h2>
      <AllCourses />
    </div>
  );
}
