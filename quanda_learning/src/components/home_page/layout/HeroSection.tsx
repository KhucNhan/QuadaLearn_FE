export default function HeroSection() {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat text-white py-24"
      style={{
        backgroundImage: `url('https://img.freepik.com/premium-vector/paper-layer-circle-blue-abstract-background-curves-lines-use-banner-cover-poster-wallpap_941064-291.jpg')`,
      }}
    >
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 drop-shadow-lg leading-snug">
          🚀 Bắt đầu hành trình <span className="text-yellow-300">chinh phục tiếng Anh</span> ngay hôm nay!
        </h1>
        <p className="text-lg md:text-xl mb-8 text-white/90 font-medium drop-shadow">
          Học mọi lúc, mọi nơi — từ người mới bắt đầu đến trình độ cao cấp.  
          Cùng hàng ngàn học viên tiến bộ mỗi ngày 🌟
        </p>
        <a
          href="#courses"
          className="bg-yellow-400 text-indigo-900 font-bold px-8 py-3 rounded-full shadow-lg hover:bg-yellow-300 transition duration-300"
        >
          Khám phá khóa học
        </a>
      </div>
    </section>
  );
}
