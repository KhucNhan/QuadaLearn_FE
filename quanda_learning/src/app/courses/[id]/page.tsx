
import { fetchCourseWithLessons } from "@/lib/courses/Course_detail";
import CourseImage from "@/components/courses_detail/CourseImage";
import CourseContent from "@/components/courses_detail/CourseContent";
import CourseSidebar from "@/components/courses_detail/CourseSidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface PageProps {
  params: { id: string };
}

export default async function CourseDetailPage({ params }: PageProps) {
  const courseId = Number(params.id);
  const course = await fetchCourseWithLessons(courseId);
  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row lg:space-x-12">
          <div className="lg:w-2/3">
            <CourseImage src={course.image} />
            <CourseContent course={course} />
          </div>
          <CourseSidebar courseId={courseId} />
        </div>
      </main>
      <Footer />
    </>
  );
}
