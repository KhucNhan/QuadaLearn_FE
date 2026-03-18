import CoursesByLevel from "@/components/course/CoursesByLevel";

const levels = ["Beginner", "Elementary", "Intermediate", "Upper-Intermediate", "Advanced", "Proficient"];

export default function CoursesByLevels() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16 space-y-16">
      {levels.map((level) => (
        <div id={level} key={level}>
          <CoursesByLevel level={level} />
        </div>
      ))}
    </div>
  );
}
