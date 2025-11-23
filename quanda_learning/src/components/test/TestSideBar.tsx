import React, { useEffect, useState } from "react";

type TestSidebarProps = {
  totalQuestions: number;
  onNavigate: (index: number) => void;
  answers: Record<number, string>;
  onSubmit: () => void;
  isSubmitted: boolean; // Nhận props để biết đã submit chưa
};

export default function TestSidebar({
  totalQuestions,
  onNavigate,
  answers,
  onSubmit,
  isSubmitted,
}: TestSidebarProps) {
  const [timeLeft, setTimeLeft] = useState(1 * 60); // X x minutes

  // Countdown - CHỈ chạy khi chưa submit
  useEffect(() => {
    if (isSubmitted) return; // Dừng timer nếu đã submit

    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [isSubmitted]);

  // Khi hết giờ thì auto submit - CHỈ khi chưa submit
  useEffect(() => {
    if (timeLeft === 0 && !isSubmitted) {
      const t = setTimeout(() => {
        onSubmit();
      }, 0);
      return () => clearTimeout(t);
    }
  }, [timeLeft, onSubmit, isSubmitted]);

  // format hh:mm:ss
  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <aside className="w-72 h-screen sticky top-0 bg-white border-l border-gray-200 p-6 flex flex-col">
      {/* Timer */}
      <div className="text-center mb-6">
        <p className="text-lg font-semibold">Thời gian còn lại</p>
        <p className={`text-2xl font-bold ${isSubmitted ? 'text-gray-400' : 'text-red-600'}`}>
          {formatTime(timeLeft)}
        </p>
        {isSubmitted && (
          <p className="text-sm text-gray-500 mt-1">Đã nộp bài</p>
        )}
      </div>

      {/* Question navigation */}
      <div className="mb-6">
        <p className="text-lg font-semibold mb-3">Các câu hỏi</p>
        <div className="grid grid-cols-5 gap-2">
          {Array.from({ length: totalQuestions }, (_, i) => {
            const isAnswered = answers[i + 1];
            return (
              <button
                key={i}
                onClick={() => onNavigate(i)}
                className={`w-10 h-10 rounded-full ${
                  isAnswered
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 hover:bg-indigo-500 hover:text-white"
                }`}
              >
                {i + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Submit button */}
      <button
        onClick={onSubmit}
        disabled={isSubmitted}
        className={`mt-auto w-full py-3 rounded-lg font-semibold ${
          isSubmitted
            ? "bg-gray-400 text-gray-200 cursor-not-allowed"
            : "bg-indigo-600 text-white hover:bg-indigo-700"
        }`}
      >
        {isSubmitted ? "Đã nộp bài" : "Nộp bài"}
      </button>
    </aside>
  );
}
