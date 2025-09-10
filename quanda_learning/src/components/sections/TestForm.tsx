"use client";

import { useState, useEffect } from "react";

export default function TestForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [level, setLevel] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [path, setPath] = useState<string[]>([]);
  const [isValid, setIsValid] = useState(false);

  // 🧠 Kiểm tra hợp lệ của họ tên
  const validateName = (name: string): boolean => {
    const words = name.trim().split(/\s+/);
    const hasLetters = /[a-zA-ZÀ-ỹ]/.test(name); // kiểm tra có chứa chữ cái (tiếng Việt cũng có)

    return (
      words.length >= 2 &&
      words.every((word) => word.length >= 1) && // mỗi từ ≥ 1 ký tự
      hasLetters
    );
  };


  // 🧠 Regex kiểm tra email đúng định dạng
  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // ✅ useEffect để kiểm tra hợp lệ mỗi khi input thay đổi
  useEffect(() => {
    const nameValid = validateName(name);
    const emailValid = validateEmail(email);
    const levelValid = level !== "";

    setIsValid(nameValid && emailValid && levelValid);
  }, [name, email, level]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let fb = "";
    let learningPath: string[] = [];

    if (level === "beginner") {
      fb = `Chào ${name}, bạn đang ở trình độ Sơ cấp. Bạn nên tập trung vào các khóa học cơ bản để xây dựng nền tảng vững chắc.`;
      learningPath = [
        "Khóa học Tiếng Anh Giao Tiếp cơ bản",
        "Khóa học Ngữ Pháp Tiếng Anh cơ bản",
        "Khóa học Từ Vựng Tiếng Anh theo chủ đề",
        "Luyện phát âm chuẩn",
      ];
    } else if (level === "intermediate") {
      fb = `Chào ${name}, bạn đang ở trình độ Trung cấp. Bạn nên nâng cao kỹ năng nghe, nói và viết để tự tin hơn.`;
      learningPath = [
        "Khóa học Tiếng Anh Giao Tiếp nâng cao",
        "Khóa học Ngữ Pháp Tiếng Anh nâng cao",
        "Luyện nghe tiếng Anh qua đoạn hội thoại thực tế",
        "Rèn luyện viết tiếng Anh",
      ];
    } else if (level === "advanced") {
      fb = `Chào ${name}, bạn đang ở trình độ Cao cấp. Bạn nên luyện tập chuyên sâu và chuẩn bị cho các chứng chỉ tiếng Anh quốc tế.`;
      learningPath = [
        "Khóa học Tiếng Anh Giao Tiếp chuyên sâu",
        "Luyện viết luận và thuyết trình",
        "Ôn luyện các chứng chỉ tiếng Anh quốc tế",
        "Phát triển kỹ năng phản xạ tiếng Anh",
      ];
    }

    setFeedback(fb);
    setPath(learningPath);
  };

  return (
    <section id="capacityTest" className="mx-auto bg-indigo-50 rounded-lg p-10 shadow-lg space-y-8">
      <h2 className="text-3xl font-bold text-indigo-700 text-center">
        Bài kiểm tra đánh giá trình độ miễn phí
      </h2>
      <p className="text-center text-gray-700 text-lg max-w-3xl mx-auto">
        Làm bài kiểm tra trình độ miễn phí để nhận phản hồi chi tiết và lộ trình học tập cá nhân hóa dành riêng cho bạn.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
            Họ và tên
          </label>
          <input
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Nhập họ và tên của bạn"
            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          {!validateName(name) && name !== "" && (
            <p className="text-red-500 text-sm mt-1">
              Vui lòng nhập đầy đủ họ và tên (ít nhất 2 từ, mỗi từ ≥ 1 ký tự và có chứa chữ cái).
            </p>
          )}

        </div>

        <div>
          <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Nhập email của bạn"
            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          {!validateEmail(email) && email !== "" && (
            <p className="text-red-500 text-sm mt-1">Email không đúng định dạng.</p>
          )}
        </div>

        <div>
          <label htmlFor="level" className="block text-gray-700 font-semibold mb-2">
            Mục tiêu
          </label>
          <select
            id="level"
            name="level"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="">Chọn mục tiêu</option>
            <option value="beginner">A1 - A2</option>
            <option value="intermediate">B1 - B2</option>
            <option value="advanced">C1 - C2</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={!isValid}
          className={`w-full py-3 rounded-md font-semibold transition ${isValid
            ? "bg-indigo-600 text-white hover:bg-indigo-700"
            : "bg-gray-400 text-white cursor-not-allowed"
            }`}
        >
          Bắt đầu kiểm tra trình độ
        </button>
      </form>

      {feedback && (
        <div className="bg-white p-6 rounded-md shadow-md space-y-4">
          <h3 className="text-2xl font-semibold text-indigo-700">Phản hồi trình độ của bạn</h3>
          <p className="text-gray-700">{feedback}</p>
          {path.length > 0 && (
            <>
              <h4 className="text-xl font-semibold text-indigo-600">Lộ trình học tập đề xuất</h4>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {path.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </section>
  );
}
