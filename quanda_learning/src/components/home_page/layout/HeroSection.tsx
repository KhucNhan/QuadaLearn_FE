export default function HeroSection() {
  return (
    <section className="bg-indigo-600 text-white py-20">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Chào mừng bạn đến với Học Tiếng Anh Online
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Khám phá các khóa học từ cơ bản đến nâng cao, được thiết kế để phù hợp với mọi trình độ.
        </p>
        <a
          href="#courses"
          className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-md shadow hover:bg-gray-100 transition"
        >
          Khám phá khóa học
        </a>
      </div>
    </section>
  );
}
