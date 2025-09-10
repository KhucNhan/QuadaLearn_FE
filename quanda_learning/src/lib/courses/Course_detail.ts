// services/courseApi.ts

export interface Lesson {
  id: number;
  title: string;
  content: string;
  knowledgeTag: string;
}

export interface Course {
  id: number;
  name: string;
  image: string;
  level: string;
  description: string;
  lessons: Lesson[];
}

export async function fetchCourseWithLessons(courseId: number): Promise<Course> {
  const res = await fetch(`http://localhost:8888/courses/${courseId}/lessons`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`Lỗi khi lấy dữ liệu khóa học (Mã lỗi ${res.status})`);
  }

  return await res.json();
}
