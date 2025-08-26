export default function Hero() {
  return (
    <section id="gioi-thieu" className="flex flex-col-reverse md:flex-row items-center gap-10 md:gap-20">
      <div className="md:w-1/2 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-600 mb-4 leading-tight">
          Học Tiếng Anh Dễ Dàng và Hiệu Quả
        </h1>
        <p className="text-gray-700 text-lg md:text-xl mb-6">
          Trang web học tập tiếng Anh được thiết kế đơn giản, dễ sử dụng, giúp bạn nâng cao kỹ năng mọi lúc mọi nơi.
        </p>
        <a href="#khoa-hoc" className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-indigo-700 transition">
          Khám phá các khóa học
        </a>
      </div>
      <div className="md:w-1/2">
        <img
          src="https://storage.googleapis.com/a1aa/image/d33aa945-3931-4c83-65c7-458590e0aa5f.jpg"
          alt="Học viên đang học tiếng Anh"
          className="rounded-lg shadow-lg mx-auto"
        />
      </div>
    </section>
  );
}
