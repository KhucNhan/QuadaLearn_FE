export type Course = {
  id: number;
  name: string;
  description: string;
  level: string;
  image: string;
};

export async function fetchCourses(): Promise<Course[]> {
  const res = await fetch("http://localhost:8888/courses/top6");
  console.log(res);

  if (!res.ok) {
    throw new Error("Failed to fetch courses");
  }

  return res.json();
}

export async function fetchCoursesByLevel(level: string): Promise<Course[]> {
  const res = await fetch(`http://localhost:8888/courses/level?level=${level}`);
  if (!res.ok) {
    throw new Error("Failed to fetch courses by level");
  }
  return res.json();
}