"use client";
import { useState } from "react";

export default function TestForm() {
  const [feedback, setFeedback] = useState<string | null>(null);
  const [path, setPath] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = formData.get("name") as string;
    const level = formData.get("level") as string;

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
    } else {
      fb = "Vui lòng chọn trình độ hiện tại của bạn để nhận phản hồi.";
    }

    setFeedback(fb);
    setPath(learningPath);
  };

  return (
    <section id="test-nang-luc" className="max-w-4xl mx-auto bg-indigo-50 rounded-lg p-10 shadow-lg space-y-8">
      <h2 className="text-3xl font-bold text-indigo-700 text-center">
        Test Năng Lực Miễn Phí
      </h2>
      <p className="text-center text-gray-700 text-lg max-w-3xl mx-auto">
        Tham gia bài test năng lực miễn phí để nhận phản hồi chi tiết và lộ trình học cá nhân hóa phù hợp với bạn.
      </p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
            Họ và tên
          </label>
          <input
            id="name"
            name="name"
            required
            placeholder="Nhập họ và tên của bạn"
            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="Nhập email của bạn"
            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
        <div>
          <label htmlFor="level" className="block text-gray-700 font-semibold mb-2">
            Trình độ hiện tại
          </label>
          <select
            id="level"
            name="level"
            required
            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="">Chọn trình độ</option>
            <option value="beginner">Sơ cấp</option>
            <option value="intermediate">Trung cấp</option>
            <option value="advanced">Cao cấp</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-md font-semibold hover:bg-indigo-700 transition"
        >
          Bắt đầu test năng lực
        </button>
      </form>

      {feedback && (
        <div className="bg-white p-6 rounded-md shadow-md space-y-4">
          <h3 className="text-2xl font-semibold text-indigo-700">Phản hồi năng lực của bạn</h3>
          <p className="text-gray-700">{feedback}</p>
          {path.length > 0 && (
            <>
              <h4 className="text-xl font-semibold text-indigo-600">Lộ trình học đề xuất</h4>
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
