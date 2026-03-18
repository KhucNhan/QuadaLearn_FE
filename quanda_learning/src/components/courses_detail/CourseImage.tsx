"use client";
export default function CourseImage({ src }: { src: string }) {
  return (
    <img
      src={src}
      alt="Course cover"
      className="rounded-lg shadow-lg w-full object-cover mb-6"
    />
  );
}
