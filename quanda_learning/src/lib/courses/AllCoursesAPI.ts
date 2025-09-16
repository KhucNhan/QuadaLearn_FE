export interface Course {
  id: number;
  name: string;
  image: string;
  level: string;
  description: string;
}

export async function fetchCourses(): Promise<Course[]> {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Bạn chưa đăng nhập!");
    }

    const response = await fetch("http://localhost:8888/courses", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // 👈 gửi token tại đây
      },
    });

    if (!response.ok) {
      throw new Error("Không thể lấy danh sách khóa học");
    }

    const data = await response.json();

    const courses = data.map((course: any) => ({
      id: course.id,
      name: course.name,
      image: course.image,
      level: course.level,
      description: course.description,
    }));

    return courses;
  } catch (error) {
    console.error("❌ Lỗi khi fetch courses:", error);
    return [];
  }
}
