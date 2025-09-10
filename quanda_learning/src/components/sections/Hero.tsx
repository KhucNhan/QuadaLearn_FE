"use client";
import { useRouter } from 'next/navigation';
import '../../styles/Hero.css';


export default function Hero() {
  const router = useRouter;
  const appRouter = router();
  return (
    <section id="gioi-thieu" className="flex flex-col-reverse md:flex-row items-center gap-10 md:gap-20">
      <div className="md:w-1/2 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-600 mb-4 leading-tight">
          Tiếng Anh không còn là rào cản – mà là cánh cửa mở ra cơ hội mới!
        </h1>
        <p id="titleHero" className="text-gray-700 text-lg md:text-xl mb-6">
          Học tiếng Anh không chỉ là học ngữ pháp và từ vựng – mà là mở ra cánh cửa đến với thế giới cơ hội.
        </p>
        <button
          onClick={() => appRouter.push("/authenticate/register")}
          className="custom-btn"
        >
          Đăng ký ngay
        </button>
      </div>

      <div className="md:w-1/2">
        <img
          src="images/heroImage/663f1e9a15e82.png"
          alt="Học viên đang học tiếng Anh"
          className="rounded-lg mx-auto"
        />
      </div>
    </section>
  );
}
