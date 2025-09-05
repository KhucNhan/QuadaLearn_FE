export type Course = {
  id: number;
  name: string;
  description: string;
  level: string;
  image: string;
};

export async function fetchCourses(): Promise<Course[]> {
  const res = await fetch("http://localhost:8080/courses/top6");
  console.log(res);

  if (!res.ok) {
    throw new Error("Failed to fetch courses");
  }

  return res.json();
}